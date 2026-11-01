/* 펫티시에 쇼핑몰 공통 : 상단 안내 띠 문구 · 지금 보고 있는 메뉴 표시 */
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

  /* 지금 보고 있는 메뉴 표시 (카테고리 줄 · 메뉴) */
  window.ptMarkNav = function () {
    var file = location.pathname.split("/").pop() || "index.html";
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
})();
