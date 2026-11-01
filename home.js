/* 펫티시에 메인 : 배너 넘김 · 베스트/신상품/카테고리 상품 · 리뷰 */
(function () {
  /* ── 메인 배너 ── */
  const track = document.getElementById("mSlides"), dotsBox = document.getElementById("mDots");
  const slides = track ? [...track.children] : [];
  let cur = 0, timer = null;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (slides.length) {
    dotsBox.innerHTML = slides.map((_, i) => `<button type="button" aria-label="${i + 1}번째 배너"></button>`).join("");
    const dots = [...dotsBox.children];
    const go = i => {
      cur = (i + slides.length) % slides.length;
      track.style.transform = `translateX(${-cur * 100}%)`;
      dots.forEach((d, k) => d.setAttribute("aria-current", k === cur));
      slides.forEach((s, k) => s.setAttribute("aria-hidden", k !== cur));
    };
    const play = () => { if (reduce) return; clearInterval(timer); timer = setInterval(() => go(cur + 1), 5500); };
    dots.forEach((d, i) => d.onclick = () => { go(i); play(); });
    document.querySelector(".m-arrow.prev").onclick = () => { go(cur - 1); play(); };
    document.querySelector(".m-arrow.next").onclick = () => { go(cur + 1); play(); };
    // 손가락으로 넘기기
    let x0 = null, y0 = null;
    track.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    track.addEventListener("touchend", e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { go(cur + (dx < 0 ? 1 : -1)); play(); }
      x0 = null;
    });
    const hero = track.parentNode;
    hero.addEventListener("mouseenter", () => clearInterval(timer));
    hero.addEventListener("mouseleave", play);
    document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : play());
    go(0); play();
  }

  /* ── 상품 ── */
  const E = Shop.esc;
  function card(p, rank) {
    const tag = p.soldout ? '<span class="sh-tag">품절</span>' : (p.best && !rank ? '<span class="sh-tag best">BEST</span>' : "");
    const hasOpt = p.options && p.options.items && p.options.items.length;
    return `<div class="sh-card${p.soldout ? " out" : ""}">
      <a href="product.html?id=${encodeURIComponent(p.id)}" style="text-decoration:none;color:inherit">
        <span class="ph">${rank ? `<span class="rank">${rank}</span>` : ""}${tag}<img src="${E(p.thumb)}" alt="${E(p.name)}" loading="lazy" width="600" height="600"></span>
        <span class="cat">${Shop.catLabel(p.cat)}</span>
        <span class="nm">${E(p.name)}</span>
        <span class="pr">${p.soldout ? "품절" : Shop.won(p.price)}</span>
      </a>
      ${hasOpt
        ? `<a class="add" href="product.html?id=${encodeURIComponent(p.id)}"${p.soldout ? ' style="display:none"' : ""}>옵션 선택</a>`
        : `<button type="button" class="add" data-add="${E(p.id)}"${p.soldout ? " disabled" : ""}>${p.soldout ? "재입고 예정" : "장바구니 담기"}</button>`}
    </div>`;
  }
  const put = (id, list, ranked) => {
    const el = document.getElementById(id); if (!el) return;
    el.innerHTML = list.length ? list.map((p, i) => card(p, ranked ? i + 1 : 0)).join("") : '<p class="m-loading">준비 중인 상품이에요.</p>';
  };
  const CAT_TABS = ["bakery", "dried", "natural", "bulk"];
  let catKey = CAT_TABS[0];

  Shop.ready.then(() => {
    const avail = PRODUCTS.filter(p => !p.soldout);
    // 베스트 : 관리자에서 BEST 표시한 상품 → 진열 순서
    const best = [...avail.filter(p => p.best), ...avail.filter(p => !p.best)].slice(0, 8);
    put("gridBest", best, true);
    // 신상품 : 최근에 등록한 상품(상품번호가 큰 순)
    const isNew = [...avail].sort((a, b) => String(b.id).localeCompare(String(a.id), "en", { numeric: true })).slice(0, 4);
    put("gridNew", isNew);
    // 카테고리
    const tabs = document.getElementById("catTabs");
    tabs.innerHTML = CAT_TABS.map(k => `<button type="button" data-k="${k}">${Shop.catLabel(k)}</button>`).join("");
    const drawCat = () => {
      tabs.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.k === catKey));
      const list = PRODUCTS.filter(p => p.cat === catKey).sort((a, b) => (!!a.soldout - !!b.soldout) || (a.rank - b.rank)).slice(0, 8);
      put("gridCat", list);
      document.getElementById("catMore").href = "shop.html?cat=" + catKey;
    };
    tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { catKey = b.dataset.k; drawCat(); } });
    drawCat();
    const pf = document.getElementById("perkFree"); if (pf) pf.textContent = `${Shop.won(SHOP.freeShippingOver)} 이상 무료배송`;
  });

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-add]"); if (!b) return;
    Shop.add(b.dataset.add, 1);
    Shop.toast("장바구니에 담았어요.", { href: "cart.html", text: "장바구니 보기" });
    const c = document.querySelector(".top .cart-count");
    if (c) { const n = Shop.count(); c.textContent = n; c.hidden = !n; }
  });

  /* ── 리뷰 ── */
  PT_REVIEWS.ready.then(R => {
    const el = document.getElementById("homeReviews"); if (!el) return;
    el.innerHTML = R.items.slice(0, 6).map(R.card).join("");
  });
})();
