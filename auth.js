/* ==========================================================================
   펫티시에 고객 회원 (회원가입 · 로그인 · 아이디/비밀번호 찾기 · 마이페이지 · 주문 내역)
   - 아이디로 가입하고 로그인해요. 이메일·휴대폰 번호는 아이디/비밀번호 찾기에 쓰여요.
   - firebase-config.js 에 설정값이 있으면 파이어베이스로 실제 회원을 받고,
     비어 있으면(null) 이 브라우저에만 저장되는 "미리보기 모드"로 동작해요.
   - 네이버 · 카카오 간편로그인은 SOCIAL 에 켜기(true)만 하면 버튼이 살아나도록 자리를 만들어 두었어요.

   파이어베이스에 저장되는 곳
   - users/{uid}       : 회원 정보 (본인·관리자만 보기)
   - usernames/{아이디} : 아이디 → 로그인 연결 (아이디 중복 확인용)
   - findid/{암호값}    : 아이디 찾기용 (이름+휴대폰, 이름+이메일을 되돌릴 수 없게 바꾼 값 → 가려진 아이디)
   ========================================================================== */
const Auth = (function () {
  const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  const SOCIAL = { naver: false, kakao: false };   // 간편로그인 연결 후 true 로 바꿔요
  const ID_RULE = /^[a-z][a-z0-9_]{3,15}$/;          // 영문 소문자로 시작, 영문·숫자·밑줄 4~16자

  const cfg = typeof FIREBASE_CONFIG !== "undefined" && FIREBASE_CONFIG && FIREBASE_CONFIG.projectId ? FIREBASE_CONFIG : null;
  const mode = cfg ? "firebase" : "demo";
  let user = null, fb = null;
  const subs = [];

  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tel = v => String(v || "").replace(/[^0-9]/g, "").replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
  const digits = v => String(v || "").replace(/[^0-9]/g, "");
  const normId = v => String(v || "").trim().toLowerCase();
  const normMail = v => String(v || "").trim().toLowerCase();
  const isMail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const fail = (code, msg) => { const e = new Error(msg); e.code = code; return e; };
  const mask = id => id.length <= 4 ? id.slice(0, 2) + "*".repeat(id.length - 2) : id.slice(0, id.length - 3) + "***";

  /* ── 에러 문구 ── */
  const MSG = {
    "auth/email-already-in-use": "이미 다른 아이디로 가입된 이메일이에요. 아이디 찾기를 이용해 주세요.",
    "auth/id-taken": "이미 사용 중인 아이디예요. 다른 아이디를 정해 주세요.",
    "auth/invalid-id": "아이디는 영문 소문자로 시작하는 4~16자(영문·숫자·밑줄)로 정해 주세요.",
    "auth/invalid-email": "이메일 주소를 다시 확인해 주세요.",
    "auth/weak-password": "비밀번호는 8자 이상으로 정해 주세요.",
    "auth/user-not-found": "아이디 또는 비밀번호가 맞지 않아요.",
    "auth/wrong-password": "아이디 또는 비밀번호가 맞지 않아요.",
    "auth/invalid-credential": "아이디 또는 비밀번호가 맞지 않아요.",
    "auth/invalid-login-credentials": "아이디 또는 비밀번호가 맞지 않아요.",
    "auth/too-many-requests": "로그인 시도가 너무 많았어요. 잠시 후 다시 시도해 주세요.",
    "auth/network-request-failed": "인터넷 연결을 확인해 주세요.",
    "auth/requires-recent-login": "보안을 위해 다시 로그인한 뒤 시도해 주세요."
  };
  const message = e => MSG[e && e.code] || (e && e.message && !/Firebase|firestore|permission/i.test(e.message) ? e.message : "잠시 후 다시 시도해 주세요.");

  /* ── 아이디 찾기용 값 : 이름+휴대폰 / 이름+이메일 을 되돌릴 수 없는 값으로 바꿔 저장 ── */
  async function sha(s) {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
  }
  const keyTel = (name, t) => sha("pt-find:t:" + String(name || "").replace(/\s/g, "") + ":" + digits(t));
  const keyMail = (name, m) => sha("pt-find:e:" + String(name || "").replace(/\s/g, "") + ":" + normMail(m));

  /* ── 미리보기 모드 저장소 ── */
  const LS = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ── 공통 저장소 (파이어베이스 / 미리보기) ── */
  const store = {
    async getName(id) {
      if (mode === "firebase") { const d = await fb.db.collection("usernames").doc(id).get(); return d.exists ? d.data() : null; }
      return LS.get("pt-demo-names", {})[id] || null;
    },
    async getFind(key) {
      if (mode === "firebase") { const d = await fb.db.collection("findid").doc(key).get(); return d.exists ? d.data() : null; }
      return LS.get("pt-demo-find", {})[key] || null;
    },
    async putFind(key, val) {
      if (mode === "firebase") return fb.db.collection("findid").doc(key).set(val);
      const all = LS.get("pt-demo-find", {}); all[key] = val; LS.set("pt-demo-find", all);
    },
    async delFind(key) {
      if (mode === "firebase") { try { await fb.db.collection("findid").doc(key).delete(); } catch (e) {} return; }
      const all = LS.get("pt-demo-find", {}); delete all[key]; LS.set("pt-demo-find", all);
    }
  };
  async function writeFind(p, uid) {
    const v = { uid, id: mask(p.username), at: new Date().toISOString().slice(0, 10) };
    await Promise.all([store.putFind(await keyTel(p.name, p.tel), v), store.putFind(await keyMail(p.name, p.email), v)]);
  }
  async function clearFind(p) {
    await Promise.all([store.delFind(await keyTel(p.name, p.tel)), store.delFind(await keyMail(p.name, p.email))]);
  }

  /* ── 시작 ── */
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
    fb.auth.languageCode = "ko";
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
  async function hashPw(s) { try { return await sha("pt::" + s); } catch (e) { return btoa(unescape(encodeURIComponent("pt::" + s))); } }
  function bootDemo() {
    const uid = LS.get("pt-demo-session", null), users = LS.get("pt-demo-users", {});
    const rec = Object.values(users).find(r => r.uid === uid);
    user = rec ? { uid: rec.uid, ...rec.profile } : null;
    emit();
    return Promise.resolve(user);
  }

  /* ── 아이디 중복 확인 ── */
  async function checkId(id) {
    id = normId(id);
    if (!ID_RULE.test(id)) throw fail("auth/invalid-id", MSG["auth/invalid-id"]);
    await ready;
    return !(await store.getName(id));
  }

  /* ── 회원가입 ── */
  async function signUp(d) {
    const username = normId(d.username), email = normMail(d.email);
    if (!ID_RULE.test(username)) throw fail("auth/invalid-id", MSG["auth/invalid-id"]);
    if (String(d.password || "").length < 8) throw fail("auth/weak-password", MSG["auth/weak-password"]);
    if (!isMail(email)) throw fail("auth/invalid-email", MSG["auth/invalid-email"]);
    await ready;
    if (await store.getName(username)) throw fail("auth/id-taken", MSG["auth/id-taken"]);
    const profile = {
      username, name: String(d.name || "").trim(), tel: tel(d.tel), email,
      zip: d.zip || "", addr1: d.addr1 || "", addr2: String(d.addr2 || "").trim(),
      marketing: !!d.marketing, provider: "id", agreedAt: new Date().toISOString()
    };
    if (mode === "firebase") {
      const cred = await fb.auth.createUserWithEmailAndPassword(email, d.password);
      const uid = cred.user.uid;
      try {
        await fb.db.collection("usernames").doc(username).set({ uid, email });   // 먼저 아이디 자리부터 잡기
      } catch (e) {
        try { await cred.user.delete(); } catch (x) {}
        throw fail("auth/id-taken", MSG["auth/id-taken"]);
      }
      await fb.db.collection("users").doc(uid).set({ ...profile, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      try { await writeFind(profile, uid); } catch (e) {}
      try { await cred.user.updateProfile({ displayName: profile.name }); } catch (e) {}
      user = { uid, ...profile }; emit(); return user;
    }
    const users = LS.get("pt-demo-users", {});
    if (Object.values(users).some(r => r.profile.email === email)) throw fail("auth/email-already-in-use", MSG["auth/email-already-in-use"]);
    const uid = "demo-" + Math.random().toString(36).slice(2, 10);
    users[username] = { uid, pw: await hashPw(d.password), profile: { ...profile, createdAt: new Date().toISOString() } };
    LS.set("pt-demo-users", users);
    const names = LS.get("pt-demo-names", {}); names[username] = { uid, email }; LS.set("pt-demo-names", names);
    await writeFind(profile, uid);
    LS.set("pt-demo-session", uid);
    return bootDemo();
  }

  /* ── 로그인 · 로그아웃 ── */
  async function signIn(id, password) {
    id = normId(id);
    await ready;
    const bad = fail("auth/invalid-credential", MSG["auth/invalid-credential"]);
    if (!id || !password) throw bad;
    if (mode === "firebase") {
      const n = await store.getName(id);
      if (!n) throw bad;
      await fb.auth.signInWithEmailAndPassword(n.email, password);
      user = await withProfile(fb.auth.currentUser); emit(); return user;
    }
    const r = LS.get("pt-demo-users", {})[id];
    if (!r || r.pw !== await hashPw(password)) throw bad;
    LS.set("pt-demo-session", r.uid);
    return bootDemo();
  }
  async function signOut() {
    if (mode === "firebase") await fb.auth.signOut();
    else { try { localStorage.removeItem("pt-demo-session"); } catch (e) {} }
    user = null; emit();
  }

  /* ── 아이디 찾기 : 이름 + (휴대폰 또는 이메일) ── */
  async function findId(name, by, value) {
    if (!String(name || "").trim()) throw fail("find/name", "이름을 입력해 주세요.");
    if (by === "tel" && digits(value).length < 10) throw fail("find/tel", "휴대폰 번호를 다시 확인해 주세요.");
    if (by === "email" && !isMail(normMail(value))) throw fail("auth/invalid-email", MSG["auth/invalid-email"]);
    await ready;
    const key = by === "tel" ? await keyTel(name, value) : await keyMail(name, value);
    const r = await store.getFind(key);
    return r ? { id: r.id, at: r.at } : null;
  }

  /* ── 비밀번호 찾기 : 아이디 + 가입한 이메일이 맞으면 재설정 메일 발송 ── */
  async function resetPassword(id, email) {
    id = normId(id); email = normMail(email);
    if (!id) throw fail("find/id", "아이디를 입력해 주세요.");
    if (!isMail(email)) throw fail("auth/invalid-email", MSG["auth/invalid-email"]);
    await ready;
    const n = await store.getName(id);
    if (!n || normMail(n.email) !== email) throw fail("find/nomatch", "아이디와 가입한 이메일이 맞지 않아요. 다시 확인해 주세요.");
    if (mode === "firebase") await fb.auth.sendPasswordResetEmail(n.email);
    // 미리보기 모드는 메일을 보내지 않아요
  }

  function social(name) {
    if (!SOCIAL[name]) throw fail("auth/social-pending", (name === "naver" ? "네이버" : "카카오") + " 간편로그인은 곧 열릴 예정이에요. 지금은 아이디로 가입해 주세요.");
    // 연결 후: 네이버·카카오 로그인 → 서버(Cloud Functions)에서 파이어베이스 맞춤 토큰 발급 → signInWithCustomToken
    location.href = `auth-${name}.html?next=` + encodeURIComponent(location.pathname + location.search);
  }

  /* ── 회원 정보 ── */
  async function saveProfile(d) {
    if (!user) throw fail("auth/no-user", "로그인이 필요해요.");
    const p = { name: String(d.name || "").trim(), tel: tel(d.tel), zip: d.zip || "", addr1: d.addr1 || "", addr2: String(d.addr2 || "").trim(), marketing: !!d.marketing };
    const before = { ...user };
    if (mode === "firebase") await fb.db.collection("users").doc(user.uid).set(p, { merge: true });
    else { const users = LS.get("pt-demo-users", {}); const r = users[user.username]; if (r) { r.profile = { ...r.profile, ...p }; LS.set("pt-demo-users", users); } }
    user = { ...user, ...p };
    if (before.username && (before.name !== user.name || digits(before.tel) !== digits(user.tel))) {
      try { await clearFind(before); await writeFind(user, user.uid); } catch (e) {}
    }
    emit(); return user;
  }
  async function changePassword(current, next) {
    if (String(next || "").length < 8) throw fail("auth/weak-password", MSG["auth/weak-password"]);
    if (mode === "firebase") {
      const u = fb.auth.currentUser;
      try { await u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, current)); }
      catch (e) { throw fail("auth/wrong-password", "지금 비밀번호가 맞지 않아요."); }
      await u.updatePassword(next); return;
    }
    const users = LS.get("pt-demo-users", {}); const r = users[user.username];
    if (!r || r.pw !== await hashPw(current)) throw fail("auth/wrong-password", "지금 비밀번호가 맞지 않아요.");
    r.pw = await hashPw(next); LS.set("pt-demo-users", users);
  }
  async function deleteAccount(current) {
    if (!user) return;
    const me = { ...user };
    if (mode === "firebase") {
      const u = fb.auth.currentUser;
      try { await u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, current)); }
      catch (e) { throw fail("auth/wrong-password", "비밀번호가 맞지 않아요."); }
      try { await clearFind(me); } catch (e) {}
      if (me.username) { try { await fb.db.collection("usernames").doc(me.username).delete(); } catch (e) {} }
      await fb.db.collection("users").doc(u.uid).delete();
      await u.delete();
    } else {
      const users = LS.get("pt-demo-users", {}); const r = users[me.username];
      if (!r || r.pw !== await hashPw(current)) throw fail("auth/wrong-password", "비밀번호가 맞지 않아요.");
      await clearFind(me);
      delete users[me.username]; LS.set("pt-demo-users", users);
      const names = LS.get("pt-demo-names", {}); delete names[me.username]; LS.set("pt-demo-names", names);
      try { localStorage.removeItem("pt-demo-session"); } catch (e) {}
    }
    user = null; emit();
  }

  /* ── 주문 저장 · 내 주문 ── */
  async function saveOrder(order) {
    const o = { ...order, uid: user ? user.uid : null, status: order.status || "주문서 접수" };
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
  function emit() { subs.forEach(f => { try { f(user); } catch (e) {} }); paintHeader(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paintHeader); else paintHeader();

  function next(def) {
    const n = new URLSearchParams(location.search).get("next") || def || "shop.html";
    return /^[\w\-]+\.html(\?[^#]*)?$/.test(n) ? n : "shop.html";   // 사이트 안 페이지로만 이동
  }

  const ready = (mode === "firebase" ? bootFirebase() : bootDemo()).catch(() => { user = null; emit(); return null; });

  return {
    mode, ready, get user() { return user; }, onChange(f) { subs.push(f); }, social, SOCIAL, ID_RULE,
    checkId, signUp, signIn, signOut, findId, resetPassword, saveProfile, changePassword, deleteAccount,
    saveOrder, myOrders, message, esc, tel, next
  };
})();
