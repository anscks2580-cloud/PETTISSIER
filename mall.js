/* 펫티시에 쇼핑몰 공통 : 상단 안내 띠 문구 · 지금 보고 있는 메뉴 표시 · 전체상품 펼침 메뉴 · 위로 가기 버튼 */
(function () {
  var won = function (n) { return (+n || 0).toLocaleString("ko-KR") + "원"; };

  /* 상단 안내 띠 : 무료배송 기준은 관리자 '쇼핑 설정' 값을 따라가요 */
  function notice() {
    var el = document.getElementById("topNotice"); if (!el) return;
    var free = (typeof SHOP !== "undefined" && SHOP.freeShippingOver) || 60000;
    el.innerHTML = "<span><b>" + won(free) + "</b> 이상 무료배송</span><span>주문 확인 후 만들어 보내드려요</span>";
  }
  notice();
  if (typeof Shop !== "undefined" && Shop.ready) Shop.ready.then(notice);

  var file = location.pathname.split("/").pop() || "index.html";

  /* 지금 보고 있는 메뉴 표시 (카테고리 줄 · 메뉴) */
  window.ptMarkNav = function () {
    var cat = new URLSearchParams(location.search).get("cat") || "";
    if (file === "product.html") return; // 상품 상세에서는 표시 안 함
    document.querySelectorAll(".catbar a, #nav a").forEach(function (a) {
      var u; try { u = new URL(a.getAttribute("href"), location.href); } catch (e) { return; }
      var f = u.pathname.split("/").pop() || "index.html";
      var c = u.searchParams.get("cat") || "";
      if (f === file && (f !== "shop.html" || c === (cat === "all" ? "" : cat))) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  };
  window.ptMarkNav();

  /* 전체상품 : 누르면 아래에 종류(BEST · 베이커리 · 건조간식 · 자연식 · 대용량)가 내려와요 */
  var allBtn = document.querySelector(".catbar .cat-all"), sub = document.getElementById("catSub");
  if (allBtn && sub) {
    var setSub = function (open) {
      sub.hidden = !open;
      allBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    allBtn.addEventListener("click", function () { setSub(sub.hidden); });
    // 상품 목록·상세 페이지에서는 처음부터 펼쳐 둬요
    var shopPage = file === "shop.html" || file === "product.html";
    if (shopPage) { setSub(true); allBtn.classList.add("on"); }
    document.addEventListener("click", function (e) {
      if (shopPage || sub.hidden) return;
      if (!e.target.closest(".catbar")) setSub(false);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !shopPage) setSub(false); });
    // 다른 페이지에서는 화면을 내리면 다시 접혀요
    var y0 = window.scrollY;
    window.addEventListener("scroll", function () {
      if (shopPage || sub.hidden) { y0 = window.scrollY; return; }
      if (Math.abs(window.scrollY - y0) > 120) setSub(false);
    }, { passive: true });
    allBtn.addEventListener("click", function () { y0 = window.scrollY; });
  }

  /* 위로 가기 버튼 (오른쪽 아래, 반투명) */
  var top = document.createElement("button");
  top.type = "button";
  top.className = "to-top";
  top.setAttribute("aria-label", "맨 위로");
  top.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 14l6-6 6 6"/></svg><span>TOP</span>';
  document.body.appendChild(top);
  top.addEventListener("click", function () {
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  var onScroll = function () { top.classList.toggle("show", window.scrollY > 400); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
