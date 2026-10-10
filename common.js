/* ===================== 여기만 수정하면 됩니다 (모든 페이지 공통) ===================== */
const CONFIG = {
  links: {
    store: "https://smartstore.naver.com/pettissier", // 실제 스마트스토어 주소 확인 후 교체
    kakao: "https://pf.kakao.com/_xoYhxoG",
    instagram: "https://www.instagram.com/pettissier/",
    blog: "https://blog.naver.com/pettissier",
    naverPlace: "https://map.naver.com/p/entry/place/1432165910"
  },
  address: "경기도 안양시 동안구 시민대로327번길 55",  // 도로명 주소
  addressDetail: "평촌더샵센트럴시티 1층 109호",      // 건물·호수 (두 번째 줄로 표시, 비워두면 숨김)
  map: {
    station: "평촌역",  // 약도에 표시할 가까운 역
    walk: ""            // 예: "도보 약 5분" (비워두면 '평촌역 인근'으로 표시)
  }
};
/* ==================================================================================== */

document.querySelectorAll("[data-link]").forEach(a => { const u = CONFIG.links[a.dataset.link]; if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; } });

const toggle = document.querySelector(".menu-toggle"), nav = document.getElementById("nav");
const setMenu = o => { nav.classList.toggle("open", o); toggle.classList.toggle("on", o); toggle.setAttribute("aria-expanded", o); toggle.setAttribute("aria-label", o ? "메뉴 닫기" : "메뉴 열기"); };
toggle.onclick = e => { e.stopPropagation(); setMenu(!nav.classList.contains("open")); };
document.addEventListener("click", e => { if (nav.classList.contains("open") && !nav.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
