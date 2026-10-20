/* ==========================================================================
   펫티시에 알림 서버 (파이어베이스 Cloud Functions)
   - 새 주문이 들어오거나, 클래스 예약금 결제가 완료되면 텔레그램으로 알려줘요.
   - 봇 토큰·채팅 ID 는 관리자 페이지 → 쇼핑 설정 → 텔레그램 알림 에 저장한 값(shop/notify)을 읽어요.
   - 배포: 이 폴더 위에서  firebase deploy --only functions   (자세한 순서는 README.md)
   ========================================================================== */
const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
setGlobalOptions({ region: "asia-northeast3", maxInstances: 5 });
const db = getFirestore();
const won = n => (+n || 0).toLocaleString("ko-KR") + "원";

async function sendTelegram(text) {
  const snap = await db.collection("shop").doc("notify").get();
  const { botToken, chatId } = snap.exists ? snap.data() : {};
  if (!botToken || !chatId) { console.log("텔레그램 설정이 비어 있어 알림을 보내지 않았어요."); return; }
  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
  });
  if (!res.ok) console.error("텔레그램 전송 실패", await res.text());
}

// 새 주문 (온라인 주문서)
exports.notifyNewOrder = onDocumentCreated("orders/{id}", async (event) => {
  const o = event.data && event.data.data(); if (!o) return;
  const lines = [
    "🧁 새 주문이 들어왔어요",
    `주문번호 ${o.id} · ${o.status || ""}`,
    "",
    ...(o.items || []).map(i => `· ${i.name} × ${i.qty}  ${won(i.price * i.qty)}`),
    "",
    `총 ${won(o.total)} (배송비 ${o.shipping ? won(o.shipping) : "무료"})`,
    `${o.buyer ? o.buyer.name + " · " + o.buyer.tel : ""}`,
    o.addr || "",
    o.memo ? "요청: " + o.memo : ""
  ].filter(Boolean);
  await sendTelegram(lines.join("\n"));
});

// 주문 상태가 결제 완료로 바뀔 때 (토스 결제 승인 후)
exports.notifyOrderPaid = onDocumentUpdated("orders/{id}", async (event) => {
  const before = event.data.before.data(), after = event.data.after.data();
  if (!before || !after || before.status === after.status || after.status !== "결제 완료") return;
  await sendTelegram(`💳 결제 완료 · 주문번호 ${after.id}\n총 ${won(after.total)} · ${after.buyer ? after.buyer.name : ""}`);
});

// 클래스 예약: 고객이 정보를 입력하고 예약금을 결제(또는 입금 대기 신청)했을 때
exports.notifyReservation = onDocumentUpdated("reservations/{id}", async (event) => {
  const before = event.data.before.data(), after = event.data.after.data();
  if (!before || !after || before.status === after.status) return;
  if (!["결제 완료", "입금 대기"].includes(after.status)) return;
  const lines = [
    after.status === "결제 완료" ? "🎂 클래스 예약금 결제 완료" : "🎂 클래스 예약 신청 (입금 대기)",
    after.className,
    `일정 ${after.date} ${after.time}${after.people ? " · " + after.people + "명" : ""}`,
    `예약금 ${won(after.deposit)}${after.total ? " / 총 " + won(after.total) : ""}`,
    "",
    `아이 ${after.child || "-"} · 보호자 ${after.guardian || "-"}`,
    after.tel || "",
    after.memo ? "메모: " + after.memo : ""
  ].filter(Boolean);
  await sendTelegram(lines.join("\n"));
});
