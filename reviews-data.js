/* =====================================================================
   펫티시에 리뷰 (메인 · 리뷰 페이지 공용)
   ※ 관리자 페이지 → '리뷰 관리'에서 캡처를 올리고 저장하면 그 내용이 우선 적용돼요.
     이 파일은 관리자에 아직 아무것도 저장하지 않았을 때 쓰이는 기본값이에요.

   KEYWORDS : 네이버 플레이스 리뷰의 '이런 점이 좋았어요' 키워드와 표 수
   REVIEWS  : img 캡처 이미지 · source "store"(스마트스토어) / "place"(네이버 플레이스)
              cat 태그 · text 리뷰 글(비워도 됨) · date 작성 시기(예: 26.10)
   ===================================================================== */
window.PT_REVIEWS = {
  keywords: [
    { label: "아이가 잘 먹어요", count: 128 },
    { label: "케이크가 아이를 쏙 닮았어요", count: 97 },
    { label: "재료가 믿음직해요", count: 74 },
    { label: "상담이 친절해요", count: 61 },
    { label: "포장이 꼼꼼해요", count: 45 }
  ],
  items: [
    { img: "reviews/rv-01.jpg", source: "store", cat: "수제간식", text: "", date: "", alt: "리본 토핑을 올린 수제간식 후기" },
    { img: "reviews/rv-02.jpg", source: "store", cat: "수제간식", text: "", date: "", alt: "사료 토핑용 링 간식 재구매 후기" },
    { img: "reviews/rv-03.jpg", source: "store", cat: "수제간식", text: "", date: "", alt: "밥꾸미기 간식 후기" },
    { img: "reviews/rv-04.jpg", source: "store", cat: "건조간식", text: "", date: "", alt: "선물용 건조간식 묶음 후기" }
  ]
};

(function () {
  const R = window.PT_REVIEWS;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const SRC = { store: "스마트스토어", place: "네이버 플레이스" };

  function fsValue(v) {
    if (!v) return null;
    if ("stringValue" in v) return v.stringValue;
    if ("integerValue" in v) return Number(v.integerValue);
    if ("doubleValue" in v) return v.doubleValue;
    if ("booleanValue" in v) return v.booleanValue;
    if ("arrayValue" in v) return (v.arrayValue.values || []).map(fsValue);
    if ("mapValue" in v) { const o = {}, f = v.mapValue.fields || {}; for (const k in f) o[k] = fsValue(f[k]); return o; }
    return null;
  }

  /* 관리자에서 저장한 리뷰 불러오기 (shop/reviews 문서) */
  R.ready = (async function () {
    const c = typeof FIREBASE_CONFIG !== "undefined" && FIREBASE_CONFIG;
    if (!c || !c.projectId) return R;
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 6000);
    try {
      const r = await fetch(`https://firestore.googleapis.com/v1/projects/${c.projectId}/databases/(default)/documents/shop/reviews?key=${c.apiKey}`, { signal: ctl.signal });
      if (r.ok) {
        const d = await r.json(), f = d.fields || {};
        const items = fsValue(f.items), kws = fsValue(f.keywords);
        if (Array.isArray(items) && items.length) R.items = items.filter(x => x && x.img && !x.hidden);
        if (Array.isArray(kws) && kws.length) R.keywords = kws.filter(k => k && k.label);
      }
    } catch (e) { /* 연결 실패 시 기본값 */ }
    finally { clearTimeout(tm); }
    return R;
  })();

  /* 리뷰 카드 한 장 (예전 카드 모양 + 캡처 이미지) */
  R.card = function (r) {
    const src = SRC[r.source] || SRC.store;
    return `<article class="review" data-cat="${esc(r.cat)}">
      ${r.img ? `<img class="shot" src="${esc(r.img)}" alt="${esc(r.alt || (r.cat ? r.cat + " 후기" : "보호자님 후기"))}" loading="lazy" onerror="this.remove()">` : ""}
      ${r.text ? `<q>${esc(r.text)}</q>` : ""}
      ${r.cat ? `<div class="chips"><em>${esc(r.cat)}</em></div>` : ""}
      <div class="who"><span class="stars" aria-label="별점 5점">★★★★★</span><span class="src"><i aria-hidden="true">N</i>${src}${r.date ? " · " + esc(r.date) : ""}</span></div>
    </article>`;
  };

  /* '이런 점이 좋았어요' 막대 */
  R.keywordsHTML = function () {
    const ks = R.keywords || []; if (!ks.length) return "";
    const max = Math.max(...ks.map(k => +k.count || 0)) || 1;
    return ks.map(k => `<li><b style="width:${((+k.count || 0) / max * 100).toFixed(0)}%"></b><span>“${esc(k.label)}”</span><span>${+k.count || 0}</span></li>`).join("");
  };
})();
