/* 펫티시에 온라인 주문 공통 (상품 불러오기 · 장바구니 · 금액 계산) */
const Shop = (function () {
  const KEY = "pt-cart";
  const won = n => (n || 0).toLocaleString("ko-KR") + "원";
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = id => PRODUCTS.find(p => p.id === id);
  const catLabel = k => (CATEGORIES.find(c => c.key === k) || {}).label || "";

  /* ── 관리자(파이어베이스)에 저장된 상품·설정 불러오기 ── */
  function fsValue(v) {
    if (!v) return null;
    if ("stringValue" in v) return v.stringValue;
    if ("integerValue" in v) return Number(v.integerValue);
    if ("doubleValue" in v) return v.doubleValue;
    if ("booleanValue" in v) return v.booleanValue;
    if ("nullValue" in v) return null;
    if ("timestampValue" in v) return v.timestampValue;
    if ("arrayValue" in v) return (v.arrayValue.values || []).map(fsValue);
    if ("mapValue" in v) return fsFields(v.mapValue.fields || {});
    return null;
  }
  function fsFields(f) { const o = {}; for (const k in f) o[k] = fsValue(f[k]); return o; }
  async function loadRemote() {
    const c = typeof FIREBASE_CONFIG !== "undefined" && FIREBASE_CONFIG;
    if (!c || !c.projectId) return;
    const base = `https://firestore.googleapis.com/v1/projects/${c.projectId}/databases/(default)/documents`;
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 6000);
    try {
      const [pr, st] = await Promise.all([
        fetch(`${base}/products?pageSize=300&key=${c.apiKey}`, { signal: ctl.signal }).then(r => r.ok ? r.json() : null),
        fetch(`${base}/shop/settings?key=${c.apiKey}`, { signal: ctl.signal }).then(r => r.ok ? r.json() : null)
      ]);
      if (st && st.fields) Object.assign(SHOP, fsFields(st.fields));
      if (pr && pr.documents && pr.documents.length) {
        PRODUCTS = pr.documents.map(d => ({ id: d.name.split("/").pop(), ...fsFields(d.fields || {}) }));
      }
    } catch (e) { /* 연결 실패 시 기본 데이터 사용 */ }
    finally { clearTimeout(tm); }
  }
  // '대용량' 분류는 없앴어요 : 같은 간식이 있는 종류에 넣고, 이름은 "두부 후르츠링 (대용량)"처럼 보여줘요
  //  BULK_TO : 대용량 상품번호 → [들어갈 종류, 같은 간식(일반 크기) 상품번호]
  const BULK_TO = {
    "11888082495": ["bakery", "10833175823"],   // 두부 후르츠링 (할로윈)
    "12404550727": ["bakery", "10829745766"],   // 코코넛 고구마 볼
    "12404542115": ["dried", "11243749707"],    // 야채꼬꼬칩
    "12404512523": ["dried", "11288330864"],    // 꼬꼬 안심 져키
    "12404537428": ["dried", "11227631311"],    // 고양이 코호 연어 큐브
    "12404521217": ["dried", "11224529580"],    // 고양이 건조 열빙어
    "12404494073": ["natural", "12026300387"],  // 야채 퓨레 (옐로우)
    "12404488806": ["natural", "12026326721"]   // 야채 퓨레 (그린)
  };
  const bulkName = n => {
    if (!/벌크/.test(n)) return n;
    const t = n.replace(/\s*벌크\s*사이즈\s*/g, " ").replace(/\s+/g, " ").trim();
    return /\)$/.test(t) ? t.replace(/\)$/, " · 대용량)") : t + " (대용량)";   // 두부 후르츠링 (할로윈 · 대용량)
  };
  function fixCat(p) {
    const b = BULK_TO[p.id];
    const n = String(p.name || "");
    if (!b && p.cat !== "bulk" && !/벌크/.test(n)) return p;
    const guess = /퓨레|테린|수비드/.test(n) ? "natural" : /후르츠링|쿠키|볼|케이크|치킨/.test(n) ? "bakery" : "dried";
    return { ...p, name: bulkName(n), cat: p.cat === "bulk" || !p.cat ? (b ? b[0] : guess) : p.cat, pair: b ? b[1] : null };
  }
  // 종류별 목록에서 대용량은 같은 간식 바로 뒤에 오도록 순서 정하기
  function shelfRank(p) {
    if (!p.pair) return p.rank || 999;
    const base = PRODUCTS.find(x => x.id === p.pair);
    return (base ? base.rank || 999 : p.rank || 999) + 0.5;
  }
  const ready = loadRemote().then(() => {
    PRODUCTS = PRODUCTS.filter(p => !p.hidden).map(fixCat).sort((a, b) => (a.rank || 999) - (b.rank || 999));
    badge();
  });

  /* ── 장바구니 ── */
  let memo = [];
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return memo; } }
  function write(list) { memo = list; try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} badge(); }
  const keyOf = (id, opt) => id + (opt ? "::" + opt : "");
  function optionOf(p, label) {
    if (!p.options || !p.options.items || !p.options.items.length) return label ? undefined : null;
    return p.options.items.find(o => o.label === label);
  }
  function items() {
    return read().map(it => {
      const p = byId(it.id); if (!p || p.soldout) return null;
      const o = optionOf(p, it.opt);
      if (o === undefined || (o && o.soldout)) return null;           // 옵션이 바뀌었거나 품절
      if (p.options && p.options.items && p.options.items.length && !o) return null;
      return { ...it, key: keyOf(it.id, it.opt), p, unit: p.price + ((o && +o.add) || 0) };
    }).filter(Boolean);
  }
  function add(id, qty, opt) {
    const list = read(), f = list.find(x => x.id === id && (x.opt || "") === (opt || ""));
    if (f) f.qty = Math.min(99, f.qty + qty); else list.push(opt ? { id, opt, qty } : { id, qty });
    write(list);
  }
  function setQty(key, qty) { write(read().map(x => keyOf(x.id, x.opt) === key ? { ...x, qty: Math.max(1, Math.min(99, qty)) } : x)); }
  function remove(key) { write(read().filter(x => keyOf(x.id, x.opt) !== key)); }
  function clear() { write([]); }
  function count() { return items().reduce((s, it) => s + it.qty, 0); }

  function totals(list) {
    list = list || items();
    const subtotal = list.reduce((s, it) => s + it.unit * it.qty, 0);
    const shipping = subtotal === 0 || subtotal >= SHOP.freeShippingOver ? 0 : SHOP.shippingFee;
    return { subtotal, shipping, total: subtotal + shipping, short: Math.max(0, SHOP.minOrder - subtotal), toFree: Math.max(0, SHOP.freeShippingOver - subtotal) };
  }

  function badge() {
    const n = count();
    document.querySelectorAll("[data-cart-count]").forEach(el => { el.textContent = n; el.hidden = n === 0; });
  }

  function toast(msg, link) {
    let t = document.querySelector(".sh-toast");
    if (!t) { t = document.createElement("div"); t.className = "sh-toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.innerHTML = esc(msg) + (link ? ` <a href="${link.href}">${esc(link.text)}</a>` : "");
    t.classList.add("on");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 2600);
  }

  /* 상품 카드 (메인 · 상품 목록 공통) : 사진 · 이름 · 가격 + 가격 반대편에 장바구니 버튼 */
  const BAG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/></svg>';
  function card(p, rank) {
    const url = "product.html?id=" + encodeURIComponent(p.id);
    const tag = p.soldout ? '<span class="sh-tag">품절</span>' : (p.best && !rank ? '<span class="sh-tag best">BEST</span>' : "");
    const hasOpt = p.options && p.options.items && p.options.items.length;
    const btn = p.soldout ? "" : hasOpt
      ? `<a class="sh-cart" href="${url}" aria-label="${esc(p.name)} 옵션 선택하기">${BAG}</a>`
      : `<button type="button" class="sh-cart" data-add="${esc(p.id)}" aria-label="${esc(p.name)} 장바구니에 담기">${BAG}</button>`;
    return `<div class="sh-card${p.soldout ? " out" : ""}">
      <a class="sh-link" href="${url}">
        <span class="ph">${rank ? `<span class="rank">${rank}</span>` : ""}${tag}<img src="${esc(p.thumb)}" alt="${esc(p.name)}" loading="lazy" width="600" height="600"></span>
        <span class="nm">${esc(p.name)}</span>
      </a>
      <div class="sh-pr"><span class="pr">${p.soldout ? "품절" : won(p.price)}</span>${btn}</div>
      <span class="cat">${catLabel(p.cat)}</span>
    </div>`;
  }
  // 장바구니 버튼 (어느 페이지든 한 번만 연결)
  document.addEventListener("click", e => {
    const b = e.target.closest(".sh-cart[data-add]"); if (!b) return;
    e.preventDefault();
    add(b.dataset.add, 1);
    toast("장바구니에 담았어요.", { href: "cart.html", text: "장바구니 보기" });
    const c = document.querySelector(".top .cart-count");
    if (c) { const n = count(); c.textContent = n; c.hidden = !n; }
  });

  window.addEventListener("storage", badge);
  return { ready, won, esc, byId, catLabel, shelfRank, items, add, setQty, remove, clear, count, totals, badge, toast, optionOf, card };
})();
