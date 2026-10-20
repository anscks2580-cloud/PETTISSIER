/* ==========================================================================
   페이지 이동 로딩
   - 사이트 안의 다른 페이지로 넘어갈 때만 작동해요.
   - MODE = "write" : PETTISSIER 가 한 글자씩 적히는 화면 (기본)
     MODE = "dog"   : 강아지가 0 → 100% 달려가는 화면
   - 캐릭터를 바꾸려면(dog 모드): RUNNER_IMG 에 이미지 경로(예: "dog.png")를 넣으세요.
   - 뭉치 이야기(story.html)로 갈 때만 : 뭉치(복슬 강아지)가 고개를 들고 "멍!" 짖는 화면 (mungchi/bark 폴더 그림 6장)
     짖는 횟수는 BARKS 로 정해요. 도착한 페이지에서는 더 짖지 않고 가만히 있다가 걷혀요.
     (BARK_PAGES 에 파일 이름을 넣으면 그 페이지도 같은 화면이 나와요)
   ========================================================================== */
(function () {
  const MODE       = "write";  // "write" 또는 "dog"
  const WORD       = "PETTISSIER";
  const RUNNER_IMG = null;     // 예: "dog.png"  (투명 배경 PNG/SVG, 왼쪽을 보고 있는 그림 권장)
  const RUNNER_W   = 116;      // 캐릭터 가로 크기(px)
  const BARK_PAGES = ["story.html"];  // 뭉치가 짖는 로딩을 보여줄 페이지
  // 온라인 주문 안에서 오가는 페이지 : 이 페이지들끼리 이동할 때는 로딩 화면 없이 바로 넘어가요
  const SHOP_PAGES = ["shop.html", "product.html", "cart.html", "checkout.html", "order-done.html", "login.html", "signup.html", "mypage.html", "find-password.html"];
  const BARKS      = 2;        // 뭉치가 짖는 횟수 (한 번에 0.75초)
  const DURS       = { write: 900, dog: 1200, bark: BARKS * 750 };  // 로딩 화면이 보이는 시간(ms)
  const HOLD       = 200;      // 다 적힌(100%) 뒤 잠깐 멈춤(ms)

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


  // 뭉치 캐릭터 : 짖는 모션 6프레임 (뭉치사진/복슬 강아지 짖는 모션 시트.png 에서 잘라낸 그림)
  // 1 대기 → 2 입 열기 → 3 짖는 순간 → 4 짖는 모션 유지 → 5 입 다물기 → 6 기본 자세 (0.75초에 한 번, BARKS 번 짖어요)
  const BARK_FRAMES = [1, 2, 3, 4, 5, 6].map((n) => `mungchi/bark/bark${n}.webp`);
  const BARK_HTML = `
<div class="mb-stage">
  ${BARK_FRAMES.map((src, i) => `<img class="mb-f mb-f${i + 1}" src="${src}" alt="" decoding="async">`).join("")}
  <svg class="mb-marks" viewBox="0 0 60 70" aria-hidden="true"><g stroke="${YELLOW}" stroke-width="6" stroke-linecap="round"><path d="M12 24 L26 6"/><path d="M18 38 L42 30"/><path d="M14 52 L32 62"/></g></svg>
  <span class="mb-woof">멍!</span>
</div>`;

  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  let el, num, busy = false;

  function build(mode) {
    if (!el) {
      el = document.createElement("div");
      el.id = "pt-loader";
      el.setAttribute("role", "status");
      el.setAttribute("aria-label", "페이지를 불러오는 중");
      document.body.appendChild(el);
    }
    if (el.dataset.mode === mode) return el;
    el.dataset.mode = mode;
    el.className = el.className.replace(/\bpt-mode-\S+/g, "").trim();
    const dur = DURS[mode];
    el.style.setProperty("--pt-dur", dur + "ms");
    if (mode === "bark") {
      el.classList.add("pt-mode-bark");
      el.style.setProperty("--barks", BARKS);
      el.innerHTML = `
        <div class="pt-bark" aria-hidden="true">
          ${BARK_HTML}
          <div class="cap"><b>뭉치 이야기</b><small>PETTISSIER</small></div>
        </div>`;
    } else if (mode === "write") {
      const step = Math.round((dur - 260) / WORD.length);
      el.classList.add("pt-mode-write");
      el.innerHTML = `
        <div class="pt-write" aria-hidden="true">
          <div class="pt-word">${[...WORD].map((ch, i) => `<span style="--d:${i * step}ms">${ch}</span>`).join("")}</div>
          <i class="pt-pen"></i>
          <small>Premium Pet Dessert</small>
        </div>`;
    } else {
      el.innerHTML = `
        <div class="pt-stage" style="--dogw:${RUNNER_W}px">
          <div class="pt-ground"></div>
          <div class="pt-dog">${RUNNER_IMG ? `<img src="${RUNNER_IMG}" width="${RUNNER_W}" alt="" class="pt-img">` : DOG_SVG}</div>
        </div>
        <div class="pt-num"><b>0</b><span>%</span></div>
        <div class="pt-cap"><b>PETTISSIER</b><small>Premium Pet Dessert</small></div>`;
    }
    num = el.querySelector(".pt-num b");
    return el;
  }
  const modeFor = (u) => BARK_PAGES.some((f) => u.pathname.endsWith("/" + f)) ? "bark" : MODE;
  function setP(p) { if (num) num.textContent = Math.round(p * 100); }

  // 시작 빠르게 → 중간 여유 → 마지막 살짝 뜸들이기
  const KEYS = [[0, 0], [.32, .46], [.62, .74], [.86, .93], [1, 1]];
  function curve(t) {
    for (let i = 1; i < KEYS.length; i++) {
      const [t1, v1] = KEYS[i], [t0, v0] = KEYS[i - 1];
      if (t <= t1) { const k = (t - t0) / (t1 - t0), s = k * k * (3 - 2 * k); return v0 + (v1 - v0) * (.35 * k + .65 * s); }
    }
    return 1;
  }

  function go(url, mode) {
    busy = true;
    build(mode); setP(0);
    const DURATION = DURS[mode];
    el.classList.remove("out", "done", "run"); void el.offsetWidth; el.classList.add("show", "run");
    const t0 = performance.now();
    (function tick(now) {
      const t = Math.min(1, (now - t0) / DURATION);
      setP(curve(t));
      if (t < 1) return requestAnimationFrame(tick);
      setTimeout(() => {
        try { sessionStorage.setItem("pt-loading", mode); } catch (e) {}
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
    const isShop = (p) => SHOP_PAGES.some((f) => p.endsWith("/" + f));
    if (isShop(location.pathname) && isShop(u.pathname)) return;                // 온라인 주문 안에서는 로딩 없이 이동
    e.preventDefault();
    go(u.href, modeFor(u));
  });

  // 도착한 페이지: 100% 상태로 시작해서 부드럽게 걷힘
  function arrive() {
    let flag = false; try { flag = sessionStorage.getItem("pt-loading"); sessionStorage.removeItem("pt-loading"); } catch (e) {}
    if (!flag) { document.documentElement.classList.remove("pt-arrive"); return; }
    build(flag === "bark" ? "bark" : MODE); setP(1);
    el.classList.add("show", "instant", "done");
    if (flag === "bark") el.classList.add("still");   // 도착한 뒤에는 더 짖지 않기
    document.documentElement.classList.remove("pt-arrive");
    const start = performance.now();
    const finish = () => setTimeout(() => {
      el.classList.remove("instant"); el.classList.add("out");
      setTimeout(() => { el.classList.remove("show", "out", "done", "still"); }, 600);
    }, Math.max(0, 220 - (performance.now() - start)));
    if (document.readyState === "complete") finish(); else addEventListener("load", finish, { once: true });
  }
  if (document.body) arrive(); else document.addEventListener("DOMContentLoaded", arrive);

  // 짖는 그림을 미리 받아두기 (뭉치 이야기로 넘어갈 때 바로 보이도록)
  addEventListener("load", () => setTimeout(() => BARK_FRAMES.forEach((src) => { const im = new Image(); im.src = src; }), 600), { once: true });

  // 뒤로가기(캐시 복원) 시 로딩 화면이 남아있지 않게
  addEventListener("pageshow", (e) => { if (e.persisted && el) { el.classList.remove("show", "out", "instant", "run", "done", "still"); busy = false; } });
})();
