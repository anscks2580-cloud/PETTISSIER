/* ==========================================================================
   페이지 이동 로딩 (강아지가 0 → 100% 달려가는 트랜지션)
   - 사이트 안의 다른 페이지로 넘어갈 때만 작동해요.
   - 캐릭터를 바꾸려면: RUNNER_IMG 에 이미지 경로(예: "dog.png")를 넣으세요.
     비워두면(null) 아래 기본 강아지(말티즈) SVG 가 나와요.
   ========================================================================== */
(function () {
  const RUNNER_IMG = null;     // 예: "dog.png"  (투명 배경 PNG/SVG, 왼쪽을 보고 있는 그림 권장)
  const RUNNER_W   = 116;      // 캐릭터 가로 크기(px)
  const DURATION   = 1900;     // 0 → 100% 까지 걸리는 시간(ms)
  const HOLD       = 320;      // 100% 도착 후 잠깐 멈춤(ms)

  const STROKE = "#231F1C", YELLOW = "#FFD900";
  const leg = (d) => `<path d="${d}" fill="none" stroke="${STROKE}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#fff" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  // 말티즈: 하얗고 길고 부드러운 털, 축 처진 긴 귀, 정수리 리본. (오른쪽을 보게 그린 뒤 CSS로 왼쪽을 보게 뒤집어요)
  const DOG_SVG = `
<svg viewBox="0 0 200 130" width="${RUNNER_W}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g class="pt-hop">
    <g class="pt-poseA">
      ${leg("M72 90 L54 102 L40 106")}${leg("M84 92 L68 104 L54 111")}
      ${leg("M126 88 L146 98 L160 100")}${leg("M116 90 L136 101 L152 108")}
    </g>
    <g class="pt-poseB">
      ${leg("M74 92 L84 104 L70 111")}${leg("M86 94 L96 106 L86 112")}
      ${leg("M124 90 L114 103 L128 110")}${leg("M114 92 L104 105 L116 112")}
    </g>
    <path d="M58 64C56 46 78 40 98 42C120 44 136 52 136 68C136 78 130 84 124 88Q120 99 111 92Q104 100 96 92Q88 100 80 92Q72 99 66 91Q60 92 60 84C58 78 58 72 58 64Z" fill="#fff" stroke="${STROKE}" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M80 58Q73 72 69 86M98 54Q91 72 87 90M116 56Q111 72 109 88" fill="none" stroke="${STROKE}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
    <g class="pt-tail">
      <path d="M62 57C48 42 58 26 76 27C92 28 102 37 100 45C90 41 79 43 71 53C68 57 65 58 62 57Z" fill="#fff" stroke="${STROKE}" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="M68 38Q80 32 92 37M70 45Q82 40 96 43" fill="none" stroke="${STROKE}" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    </g>
    <g class="pt-knot"><circle cx="148" cy="24" r="9" fill="#fff" stroke="${STROKE}" stroke-width="3"/></g>
    <circle cx="148" cy="48" r="22" fill="#fff" stroke="${STROKE}" stroke-width="3.2"/>
    <g class="pt-knot">
      <ellipse cx="139" cy="29" rx="8" ry="5" transform="rotate(-25 139 29)" fill="${YELLOW}" stroke="${STROKE}" stroke-width="2.6"/>
      <ellipse cx="157" cy="29" rx="8" ry="5" transform="rotate(25 157 29)" fill="${YELLOW}" stroke="${STROKE}" stroke-width="2.6"/>
      <circle cx="148" cy="30" r="3.8" fill="${YELLOW}" stroke="${STROKE}" stroke-width="2.6"/>
    </g>
    <ellipse cx="166" cy="56" rx="10" ry="8" fill="#fff" stroke="${STROKE}" stroke-width="3.2"/>
    <circle cx="153" cy="58" r="5" fill="#F9C9C9" opacity=".75"/>
    <ellipse cx="173" cy="53" rx="4.6" ry="3.6" fill="${STROKE}"/>
    <circle cx="158" cy="44" r="4" fill="${STROKE}"/><circle cx="159.3" cy="42.7" r="1.3" fill="#fff"/>
    <path d="M164 63q4 3 8 0" fill="none" stroke="${STROKE}" stroke-width="2" stroke-linecap="round"/>
    <path d="M167 64q1 7 5 5q2-3 0-5" fill="#F6A6A6" stroke="${STROKE}" stroke-width="1.8" stroke-linejoin="round"/>
    <g class="pt-ear"><path d="M132 32C116 38 111 68 117 94Q123 88 128 97Q134 87 141 89C147 72 147 52 141 36Z" fill="#fff" stroke="${STROKE}" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="M126 56Q123 72 124 86M133 52Q131 68 132 82" fill="none" stroke="${STROKE}" stroke-width="1.8" stroke-linecap="round" opacity=".55"/></g>
  </g>
  <ellipse class="pt-shadow" cx="100" cy="120" rx="50" ry="4" fill="#804C37" opacity=".14"/>
</svg>`;

  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let el, num, busy = false;

  function build() {
    if (el) return el;
    el = document.createElement("div");
    el.id = "pt-loader";
    el.setAttribute("role", "status");
    el.setAttribute("aria-label", "페이지를 불러오는 중");
    el.innerHTML = `
      <div class="pt-stage" style="--dogw:${RUNNER_W}px">
        <div class="pt-ground"></div>
        <div class="pt-dog">${RUNNER_IMG ? `<img src="${RUNNER_IMG}" width="${RUNNER_W}" alt="" class="pt-img">` : DOG_SVG}</div>
      </div>
      <div class="pt-num"><b>0</b><span>%</span></div>
      <div class="pt-cap"><b>PETTISSIER</b><small>Premium Pet Dessert</small></div>`;
    document.body.appendChild(el);
    num = el.querySelector(".pt-num b");
    return el;
  }
  function setP(p) { num.textContent = Math.round(p * 100); }

  // 시작 빠르게 → 중간 여유 → 마지막 살짝 뜸들이기
  const KEYS = [[0, 0], [.32, .46], [.62, .74], [.86, .93], [1, 1]];
  function curve(t) {
    for (let i = 1; i < KEYS.length; i++) {
      const [t1, v1] = KEYS[i], [t0, v0] = KEYS[i - 1];
      if (t <= t1) { const k = (t - t0) / (t1 - t0), s = k * k * (3 - 2 * k); return v0 + (v1 - v0) * (.35 * k + .65 * s); }
    }
    return 1;
  }

  function go(url) {
    busy = true;
    build(); setP(0);
    el.classList.remove("out"); void el.offsetWidth; el.classList.add("show");
    const t0 = performance.now();
    (function tick(now) {
      const t = Math.min(1, (now - t0) / DURATION);
      setP(curve(t));
      if (t < 1) return requestAnimationFrame(tick);
      setTimeout(() => {
        try { sessionStorage.setItem("pt-loading", "1"); } catch (e) {}
        location.href = url;
      }, HOLD);
    })(t0);
  }

  document.addEventListener("click", (e) => {
    if (reduce || busy || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
    let u; try { u = new URL(a.href, location.href); } catch (_) { return; }
    if (u.protocol !== location.protocol || u.host !== location.host) return;   // 외부 링크·전화·메일 제외
    if (u.pathname === location.pathname) return;                                // 같은 페이지 안 이동 제외
    e.preventDefault();
    go(u.href);
  });

  // 도착한 페이지: 100% 상태로 시작해서 부드럽게 걷힘
  function arrive() {
    let flag = false; try { flag = sessionStorage.getItem("pt-loading"); sessionStorage.removeItem("pt-loading"); } catch (e) {}
    if (!flag) { document.documentElement.classList.remove("pt-arrive"); return; }
    build(); setP(1);
    el.classList.add("show", "instant");
    document.documentElement.classList.remove("pt-arrive");
    const start = performance.now();
    const finish = () => setTimeout(() => {
      el.classList.remove("instant"); el.classList.add("out");
      setTimeout(() => { el.classList.remove("show", "out"); }, 700);
    }, Math.max(0, 380 - (performance.now() - start)));
    if (document.readyState === "complete") finish(); else addEventListener("load", finish, { once: true });
  }
  if (document.body) arrive(); else document.addEventListener("DOMContentLoaded", arrive);

  // 뒤로가기(캐시 복원) 시 로딩 화면이 남아있지 않게
  addEventListener("pageshow", (e) => { if (e.persisted && el) { el.classList.remove("show", "out", "instant"); busy = false; } });
})();
