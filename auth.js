/* ==========================================================================
   펫티시에 고객 회원 (회원가입 · 로그인 · 마이페이지 · 주문 내역)
   - firebase-config.js 에 설정값이 있으면 파이어베이스로 실제 회원을 받아요.
   - 설정값이 비어 있으면(null) "미리보기 모드"로 동작해요.
     이 브라우저에만 임시로 저장되니, 고객 확인용으로만 쓰고 실제 오픈 전에는 꼭 파이어베이스를 연결해 주세요.
   - 네이버 · 카카오 간편로그인은 SOCIAL 에 켜기(true)만 하면 버튼이 살아나도록 자리를 만들어 두었어요.
   ========================================================================== */
const Auth = (function () {
  const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  const SOCIAL = { naver: false, kakao: false };   // 간편로그인 연결 후 true 로 바꿔요

  const cfg = typeof FIREBASE_CONFIG !== "undefined" && FIREBASE_CONFIG && FIREBASE_CONFIG.projectId ? FIREBASE_CONFIG : null;
  const mode = cfg ? "firebase" : "demo";
  let user = null, fb = null;
  const subs = [];
  const emit = () => { subs.forEach(f => { try { f(user); } catch (e) {} }); paintHeader(); };

  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tel = v => String(v || "").replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
  const fail = (code, msg) => { const e = new Error(msg); e.code = code; return e; };

  /* ── 에러 문구 ── */
  const MSG = {
    "auth/email-already-in-use": "이미 가입된 이메일이에요. 로그인해 주세요.",
    "auth/invalid-email": "이메일 주소를 다시 확인해 주세요.",
    "auth/weak-password": "비밀번호는 8자 이상으로 정해 주세요.",
    "auth/user-not-found": "이메일 또는 비밀번호가 맞지 않아요.",
    "auth/wrong-password": "이메일 또는 비밀번호가 맞지 않아요.",
    "auth/invalid-credential": "이메일 또는 비밀번호가 맞지 않아요.",
    "auth/invalid-login-credentials": "이메일 또는 비밀번호가 맞지 않아요.",
    "auth/too-many-requests": "잠시 후 다시 시도해 주세요. 로그인 시도가 너무 많았어요.",
    "auth/network-request-failed": "인터넷 연결을 확인해 주세요.",
    "auth/requires-recent-login": "보안을 위해 다시 로그인한 뒤 시도해 주세요."
  };
  const message = e => MSG[e && e.code] || (e && e.message && !/^Firebase/.test(e.message) ? e.message : "잠시 후 다시 시도해 주세요.");

  /* ── 파이어베이스 ── */
  function load(src) {
    return new Promise((ok, no) => {
      if (document.querySelector(`script[src="${src}"]`)) return ok();
      const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s);
    });
  }
  async function bootFirebase() {
    if (!window.firebase || !firebase.auth) {
      await load(SDK + "firebase-app-compat.js");
      await Promise.all([load(SDK + "firebase-auth-compat.js"), load(SDK + "firebase-firestore-compat.js")]);
    }
    if (!firebase.apps.length) firebase.initializeApp(cfg);
    fb = { auth: firebase.auth(), db: firebase.firestore() };
    return new Promise(ok => {
      let first = true;
      fb.auth.onAuthStateChanged(async u => {
        user = u ? await withProfile(u) : null;
        if (first) { first = false; ok(user); }
        emit();
      });
    });
  }
  async function withProfile(u) {
    let p = {};
    try { const d = await fb.db.collection("users").doc(u.uid).get(); if (d.exists) p = d.data(); } catch (e) {}
    return { uid: u.uid, email: u.email, ...p };
  }

  /* ── 미리보기 모드 (이 브라우저에만 저장) ── */
  const LS = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  async function hash(s) {
    try {
      const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("pt::" + s));
      return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
    } catch (e) { return btoa(unescape(encodeURIComponent("pt::" + s))); }
  }
  function bootDemo() {
    const uid = LS.get("pt-demo-session", null), users = LS.get("pt-demo-users", {});
    const rec = Object.values(users).find(r => r.uid === uid);
    user = rec ? { uid: rec.uid, email: rec.email, ...rec.profile } : null;
    emit();
    return Promise.resolve(user);
  }


  /* ── 회원가입 ── */
  async function signUp(d) {
    const email = String(d.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw fail("auth/invalid-email", MSG["auth/invalid-email"]);
    if (String(d.password || "").length < 8) throw fail("auth/weak-password", MSG["auth/weak-password"]);
    const profile = {
      name: String(d.name || "").trim(), tel: tel(d.tel), email,
      zip: d.zip || "", addr1: d.addr1 || "", addr2: d.addr2 || "",
      marketing: !!d.marketing, provider: "email", agreedAt: new Date().toISOString()
    };
    if (mode === "firebase") {
      const cred = await fb.auth.createUserWithEmailAndPassword(email, d.password);
      try { await cred.user.updateProfile({ displayName: profile.name }); } catch (e) {}
      await fb.db.collection("users").doc(cred.user.uid).set({ ...profile, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      user = { uid: cred.user.uid, ...profile }; emit(); return user;
    }
    const users = LS.get("pt-demo-users", {});
    if (users[email]) throw fail("auth/email-already-in-use", MSG["auth/email-already-in-use"]);
    const uid = "demo-" + Math.random().toString(36).slice(2, 10);
    users[email] = { uid, email, pw: await hash(d.password), profile: { ...profile, createdAt: new Date().toISOString() } };
    LS.set("pt-demo-users", users); LS.set("pt-demo-session", uid);
    return bootDemo();
  }

  /* ── 로그인 · 로그아웃 ── */
  async function signIn(email, password) {
    email = String(email || "").trim().toLowerCase();
    if (mode === "firebase") { await fb.auth.signInWithEmailAndPassword(email, password); user = await withProfile(fb.auth.currentUser); emit(); return user; }
    const r = LS.get("pt-demo-users", {})[email];
    if (!r || r.pw !== await hash(password)) throw fail("auth/invalid-credential", MSG["auth/invalid-credential"]);
    LS.set("pt-demo-session", r.uid);
    return bootDemo();
  }
  async function signOut() {
    if (mode === "firebase") await fb.auth.signOut();
    else { try { localStorage.removeItem("pt-demo-session"); } catch (e) {} }
    user = null; emit();
  }
  async function resetPassword(email) {
    email = String(email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw fail("auth/invalid-email", MSG["auth/invalid-email"]);
    if (mode === "firebase") { fb.auth.languageCode = "ko"; try { await fb.auth.sendPasswordResetEmail(email); } catch (e) { if (e.code !== "auth/user-not-found") throw e; } return; }
    // 미리보기 모드는 메일을 보내지 않아요
  }
  function social(name) {
    if (!SOCIAL[name]) throw fail("auth/social-pending", (name === "naver" ? "네이버" : "카카오") + " 간편로그인은 곧 열릴 예정이에요. 지금은 이메일로 가입해 주세요.");
    // 연결 후: 네이버·카카오 로그인 → 서버(Cloud Functions)에서 파이어베이스 맞춤 토큰 발급 → signInWithCustomToken
    location.href = `auth-${name}.html?next=` + encodeURIComponent(location.pathname + location.search);
  }

  /* ── 회원 정보 ── */
  async function saveProfile(d) {
    if (!user) throw fail("auth/no-user", "로그인이 필요해요.");
    const p = { name: String(d.name || "").trim(), tel: tel(d.tel), zip: d.zip || "", addr1: d.addr1 || "", addr2: String(d.addr2 || "").trim(), marketing: !!d.marketing };
    if (mode === "firebase") await fb.db.collection("users").doc(user.uid).set(p, { merge: true });
    else { const users = LS.get("pt-demo-users", {}); const r = users[user.email]; if (r) { r.profile = { ...r.profile, ...p }; LS.set("pt-demo-users", users); } }
    user = { ...user, ...p }; emit(); return user;
  }
  async function changePassword(current, next) {
    if (String(next || "").length < 8) throw fail("auth/weak-password", MSG["auth/weak-password"]);
    if (mode === "firebase") {
      const u = fb.auth.currentUser;
      await u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, current));
      await u.updatePassword(next); return;
    }
    const users = LS.get("pt-demo-users", {}); const r = users[user.email];
    if (!r || r.pw !== await hash(current)) throw fail("auth/wrong-password", "지금 비밀번호가 맞지 않아요.");
    r.pw = await hash(next); LS.set("pt-demo-users", users);
  }
  async function deleteAccount(current) {
    if (!user) return;
    if (mode === "firebase") {
      const u = fb.auth.currentUser;
      await u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, current));
      await fb.db.collection("users").doc(u.uid).delete();
      await u.delete();
    } else {
      const users = LS.get("pt-demo-users", {}); const r = users[user.email];
      if (!r || r.pw !== await hash(current)) throw fail("auth/wrong-password", "비밀번호가 맞지 않아요.");
      delete users[user.email]; LS.set("pt-demo-users", users); try { localStorage.removeItem("pt-demo-session"); } catch (e) {}
    }
    user = null; emit();
  }

  /* ── 주문 저장 · 내 주문 ── */
  async function saveOrder(order) {
    const o = { ...order, uid: user ? user.uid : null, status: order.status || "주문 접수" };
    if (mode === "firebase") {
      await fb.db.collection("orders").doc(o.id).set({ ...o, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      return o;
    }
    const all = LS.get("pt-demo-orders", []); all.unshift(o); LS.set("pt-demo-orders", all.slice(0, 100));
    return o;
  }
  async function myOrders() {
    if (!user) return [];
    if (mode === "firebase") {
      const q = await fb.db.collection("orders").where("uid", "==", user.uid).get();
      return q.docs.map(d => d.data()).sort((a, b) => String(b.at).localeCompare(String(a.at)));
    }
    return LS.get("pt-demo-orders", []).filter(o => o.uid === user.uid);
  }

  /* ── 헤더 : 장바구니 옆 로그인 / 내 정보 버튼 ── */
  const ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.2" r="3.8"/><path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6"/></svg>';
  function paintHeader() {
    const cart = document.querySelector(".top .cart-link"); if (!cart) return;
    let a = document.querySelector(".top .acct-link");
    if (!a) { a = document.createElement("a"); a.className = "acct-link"; cart.parentNode.insertBefore(a, cart); }
    a.href = user ? "mypage.html" : "login.html?next=" + encodeURIComponent(location.pathname.split("/").pop() + location.search);
    a.innerHTML = ICON + `<span>${user ? "내 정보" : "로그인"}</span>`;
    a.setAttribute("aria-label", user ? "내 정보 보기" : "로그인");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paintHeader); else paintHeader();

  function next(def) {
    const n = new URLSearchParams(location.search).get("next") || def || "shop.html";
    return /^[\w\-]+\.html(\?[^#]*)?$/.test(n) ? n : "shop.html";   // 사이트 안 페이지로만 이동
  }

  const ready = (mode === "firebase" ? bootFirebase() : bootDemo()).catch(() => { user = null; emit(); return null; });

  return {
    mode, ready, get user() { return user; }, onChange(f) { subs.push(f); }, social, SOCIAL,
    signUp, signIn, signOut, resetPassword, saveProfile, changePassword, deleteAccount,
    saveOrder, myOrders, message, esc, tel, next
  };
})();
