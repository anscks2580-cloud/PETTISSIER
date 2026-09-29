/* ===================== 여기만 수정하면 됩니다 (모든 페이지 공통) ===================== */
const CONFIG = {
  links: {
    store: "https://smartstore.naver.com/pettissier", // 실제 스마트스토어 주소 확인 후 교체
    kakao: "https://pf.kakao.com/_xoYhxoG",
    instagram: "https://www.instagram.com/pettissier/",
    blog: "https://blog.naver.com/pettissier",
    naverPlace: "https://map.naver.com/p/entry/place/1432165910"
  },
  address: "경기도 안양시" // 정확한 도로명 주소로 교체
};
/* ==================================================================================== */

document.querySelectorAll("[data-link]").forEach(a => { const u = CONFIG.links[a.dataset.link]; if (u) { a.href = u; a.target = "_blank"; a.rel = "noopener"; } });

const toggle = document.querySelector(".menu-toggle"), nav = document.getElementById("nav");
toggle.onclick = () => { const o = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", o); };
