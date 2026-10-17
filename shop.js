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
  const ready = loadRemote().then(() => {
    PRODUCTS = PRODUCTS.filter(p => !p.hidden).sort((a, b) => (a.rank || 999) - (b.rank || 999));
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

  window.addEventListener("storage", badge);
  return { ready, won, esc, byId, catLabel, items, add, setQty, remove, clear, count, totals, badge, toast, optionOf };
})();
