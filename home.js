/* 펫티시에 메인 (스마트스토어 첫 화면처럼) : 베스트 · 새로 나온 상품 · 전체상품(종류·정렬) · 리뷰 */
(function () {
  const E = Shop.esc;

  const card = (p, rank) => Shop.card(p, rank);
  const put = (id, list, ranked) => {
    const el = document.getElementById(id); if (!el) return;
    el.innerHTML = list.length ? list.map((p, i) => card(p, ranked ? i + 1 : 0)).join("") : '<p class="m-loading">준비 중인 상품이에요.</p>';
  };
  const newer = (a, b) => String(b.id).localeCompare(String(a.id), "en", { numeric: true });

  /* 전체상품 : 종류 · 정렬 · 더보기 */
  const ALL_CATS = ["all", "bakery", "dried", "natural"];
  const STEP = 12;
  let allCat = "all", allSort = "pop", shown = STEP;

  function drawAll() {
    let list = PRODUCTS.filter(p => allCat === "all" || p.cat === allCat);
    if (allSort === "pop") list.sort((a, b) => (!!a.soldout - !!b.soldout) || (allCat === "all" ? (!!b.best - !!a.best) || ((a.rank || 999) - (b.rank || 999)) : Shop.shelfRank(a) - Shop.shelfRank(b)));
    else if (allSort === "new") list.sort((a, b) => (!!a.soldout - !!b.soldout) || newer(a, b));
    else if (allSort === "low") list.sort((a, b) => (!!a.soldout - !!b.soldout) || (a.price - b.price));
    else list.sort((a, b) => (!!a.soldout - !!b.soldout) || (b.price - a.price));
    document.getElementById("allCount").textContent = list.length + "개";
    put("gridAll", list.slice(0, shown));
    const more = document.getElementById("allMore");
    more.hidden = list.length <= shown;
    more.textContent = `상품 더보기 (${Math.min(shown, list.length)} / ${list.length})`;
    document.querySelectorAll("#allCats button").forEach(b => b.setAttribute("aria-pressed", b.dataset.k === allCat));
    document.querySelectorAll("#allSort button").forEach(b => b.setAttribute("aria-pressed", b.dataset.s === allSort));
  }

  Shop.ready.then(() => {
    const avail = PRODUCTS.filter(p => !p.soldout);
    // 베스트 : 관리자에서 BEST 표시한 상품 → 진열 순서
    put("gridBest", [...avail.filter(p => p.best), ...avail.filter(p => !p.best)].slice(0, 8), true);
    // 새로 나온 상품 : 최근에 등록한 상품(상품번호가 큰 순)
    put("gridNew", [...avail].sort(newer).slice(0, 4));

    const cats = document.getElementById("allCats");
    cats.innerHTML = ALL_CATS.map(k => {
      const n = k === "all" ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === k).length;
      return `<button type="button" data-k="${k}">${k === "all" ? "전체" : Shop.catLabel(k)} <i>${n}</i></button>`;
    }).join("");
    cats.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { allCat = b.dataset.k; shown = STEP; drawAll(); } });
    document.getElementById("allSort").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { allSort = b.dataset.s; shown = STEP; drawAll(); } });
    document.getElementById("allMore").addEventListener("click", () => { shown += STEP; drawAll(); });
    drawAll();
  });

  /* ── 리뷰 ── */
  PT_REVIEWS.ready.then(R => {
    const el = document.getElementById("homeReviews"); if (!el) return;
    el.innerHTML = R.items.slice(0, 6).map(R.card).join("");
  });
})();
