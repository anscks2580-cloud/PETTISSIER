/* ==========================================================================
   페이지 이동 로딩
   - 사이트 안의 다른 페이지로 넘어갈 때만 작동해요.
   - MODE = "write" : PETTISSIER 가 한 글자씩 적히는 화면 (기본)
     MODE = "dog"   : 강아지가 0 → 100% 달려가는 화면
   - 캐릭터를 바꾸려면(dog 모드): RUNNER_IMG 에 이미지 경로(예: "dog.png")를 넣으세요.
   - 뭉치 이야기(story.html)로 갈 때만 : 뭉치 캐릭터가 "멍!" 짖고 입에서 아지랑이가 피어오르는 화면
     (BARK_PAGES 에 파일 이름을 넣으면 그 페이지도 같은 화면이 나와요)
   ========================================================================== */
(function () {
  const MODE       = "write";  // "write" 또는 "dog"
  const WORD       = "PETTISSIER";
  const RUNNER_IMG = null;     // 예: "dog.png"  (투명 배경 PNG/SVG, 왼쪽을 보고 있는 그림 권장)
  const RUNNER_W   = 116;      // 캐릭터 가로 크기(px)
  const BARK_PAGES = ["story.html"];  // 뭉치가 짖는 로딩을 보여줄 페이지
  const DURS       = { write: 900, dog: 1200, bark: 1500 };  // 로딩 화면이 보이는 시간(ms) — bark 는 두 번 짖어요
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


  // 뭉치 캐릭터 (옆모습, 오른쪽을 보고 앉아서 짖는 모습)
  function fluff(cx, cy, rx, ry, n, amp, a0) {
    a0 = a0 || 0; let d = "";
    for (let i = 0; i <= n; i++) {
      const a = a0 + (i / n) * Math.PI * 2, x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
      if (i === 0) { d += `M${x.toFixed(1)} ${y.toFixed(1)}`; continue; }
      const m = a - Math.PI / n, cxp = cx + Math.cos(m) * rx * (1 + amp), cyp = cy + Math.sin(m) * ry * (1 + amp);
      d += `Q${cxp.toFixed(1)} ${cyp.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d + "Z";
  }
  const CREAM = "#FFF8EA", EARIN = "#F4CDB2", PINK = "#F49FAE", MOUTH = "#6B3526";
  const S = `stroke="${STROKE}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const wave = (cls, d, col, w) => `<path class="mb-wave ${cls}" d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const BARK_SVG = `
<svg viewBox="10 0 280 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="mbHaze" x="-30%" y="-60%" width="160%" height="220%">
      <feTurbulence type="fractalNoise" baseFrequency="0.016 0.05" numOctaves="2" seed="4" result="n">
        <animate attributeName="baseFrequency" dur="1.4s" values="0.016 0.05;0.028 0.085;0.02 0.06;0.016 0.05" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="15" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feGaussianBlur in="d" stdDeviation=".5"/>
    </filter>
    <radialGradient id="mbPuffG"><stop offset="0" stop-color="${YELLOW}" stop-opacity=".55"/><stop offset=".55" stop-color="#FFE866" stop-opacity=".2"/><stop offset="1" stop-color="${YELLOW}" stop-opacity="0"/></radialGradient>
    <linearGradient id="mbWaveG" x1="0" x2="1"><stop offset="0" stop-color="#804C37" stop-opacity=".1"/><stop offset=".35" stop-color="#804C37" stop-opacity=".75"/><stop offset="1" stop-color="#804C37" stop-opacity="0"/></linearGradient>
    <linearGradient id="mbWaveY" x1="0" x2="1"><stop offset="0" stop-color="${YELLOW}" stop-opacity=".2"/><stop offset=".35" stop-color="${YELLOW}" stop-opacity="1"/><stop offset="1" stop-color="${YELLOW}" stop-opacity="0"/></linearGradient>
  </defs>

  <ellipse class="mb-shadow" cx="104" cy="194" rx="62" ry="5" fill="#804C37" opacity=".14"/>

  <!-- 아지랑이 (짖을 때마다 입에서 일렁이며 피어오름) -->
  <g filter="url(#mbHaze)">
    <g class="mb-haze h1">
      <circle class="mb-puff" cx="196" cy="106" r="34" fill="url(#mbPuffG)"/>
      <path class="mb-ring" d="M194 90 Q206 106 194 124" fill="none" stroke="${YELLOW}" stroke-width="5" stroke-linecap="round"/>
      <path class="mb-ring r2" d="M206 82 Q224 106 206 132" fill="none" stroke="#804C37" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>
      ${wave("w1", "M184 100 C198 88 208 98 220 86 S244 74 258 60", "url(#mbWaveY)", 7)}
      ${wave("w2", "M186 106 C200 100 212 110 226 102 S252 96 270 98", "url(#mbWaveG)", 3.5)}
      ${wave("w3", "M184 112 C198 116 208 108 222 118 S246 126 262 122", "url(#mbWaveY)", 5.5)}
      ${wave("w4", "M188 96 C196 80 210 82 214 66 S226 46 236 34", "url(#mbWaveY)", 3.5)}
      ${wave("w5", "M188 116 C200 128 214 124 222 140", "url(#mbWaveG)", 2.5)}
    </g>
    <g class="mb-haze h2">
      <circle class="mb-puff" cx="196" cy="106" r="34" fill="url(#mbPuffG)"/>
      <path class="mb-ring" d="M194 90 Q206 106 194 124" fill="none" stroke="${YELLOW}" stroke-width="5" stroke-linecap="round"/>
      <path class="mb-ring r2" d="M206 82 Q224 106 206 132" fill="none" stroke="#804C37" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>
      ${wave("w1", "M184 100 C198 88 208 98 220 86 S244 74 258 60", "url(#mbWaveY)", 7)}
      ${wave("w2", "M186 106 C200 100 212 110 226 102 S252 96 270 98", "url(#mbWaveG)", 3.5)}
      ${wave("w3", "M184 112 C198 116 208 108 222 118 S246 126 262 122", "url(#mbWaveY)", 5.5)}
      ${wave("w4", "M188 96 C196 80 210 82 214 66 S226 46 236 34", "url(#mbWaveY)", 3.5)}
      ${wave("w5", "M188 116 C200 128 214 124 222 140", "url(#mbWaveG)", 2.5)}
    </g>
  </g>
  <g class="mb-woof"><text x="216" y="58" font-family="Gowun Dodum, sans-serif" font-size="19" font-weight="700" fill="#804C37" text-anchor="middle">멍!</text></g>

  <!-- 꼬리 -->
  <g class="mb-tail"><path d="${fluff(48, 128, 17, 25, 9, .22, -1.2)}" fill="${CREAM}" ${S} transform="rotate(-24 48 128)"/>
    <path d="M42 116q6 8 4 20M52 112q4 10 2 22" fill="none" stroke="${STROKE}" stroke-width="1.6" stroke-linecap="round" opacity=".45" transform="rotate(-24 48 128)"/></g>

  <!-- 몸 -->
  <g class="mb-body">
    <path d="${fluff(98, 152, 46, 36, 15, .13, .3)}" fill="${CREAM}" ${S}/>
    <path d="M78 140q-4 12 0 22M96 136q-4 14 0 26" fill="none" stroke="${STROKE}" stroke-width="1.6" stroke-linecap="round" opacity=".4"/>
    <path d="M112 166 Q110 186 116 190 L132 190 Q136 186 134 168" fill="${CREAM}" ${S}/>
    <path d="M128 164 Q128 186 134 190 L150 190 Q154 186 150 164" fill="${CREAM}" ${S}/>
    <path d="M123 190v-6M141 190v-6" stroke="${STROKE}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M60 176 Q56 190 66 191 L92 191 Q96 182 88 172" fill="${CREAM}" ${S}/>

    <!-- 머리 -->
    <g class="mb-head">
      <g class="mb-ear2"><path d="M124 54 L128 42 L124 40 L130 30 L127 27 L136 18 L144 12 Q152 30 152 58 Z" fill="${CREAM}" ${S}/><path d="M133 50 Q137 32 143 24 Q147 38 146 52Z" fill="${EARIN}"/>
        <path d="M152 58 l6 -6 l-5 -2 l5 -8 l-5 -1" fill="none" stroke="${STROKE}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
      <path d="${fluff(122, 90, 44, 40, 16, .1, -.2)}" fill="${CREAM}" ${S}/>
      <path d="M150 102 L176 101 L172 113 L156 114 Z" fill="${MOUTH}"/>
      <g class="mb-jaw">
        <path d="M146 104 Q162 108 176 104 Q179 112 170 117 Q155 120 146 112 Z" fill="${CREAM}" ${S}/>
        <path d="M154 106 Q164 103 172 106 Q171 113 164 113 Q156 112 154 106Z" fill="${PINK}" stroke="${STROKE}" stroke-width="1.6" stroke-linejoin="round"/>
      </g>
      <path d="M146 96 C148 86 158 84 168 86 C178 87 185 90 185 97 C185 103 177 106 168 106 C158 106 150 105 146 101" fill="${CREAM}" ${S}/>
      <ellipse cx="184" cy="93" rx="6.4" ry="5.4" fill="${STROKE}"/><ellipse cx="182" cy="91" rx="2" ry="1.3" fill="#fff" opacity=".8"/>
      <ellipse cx="147" cy="79" rx="6.2" ry="7" fill="${STROKE}"/><circle cx="149.3" cy="76.4" r="2.2" fill="#fff"/><circle cx="145.4" cy="82" r="1" fill="#fff" opacity=".8"/>
      <path d="M138 66q9-7 18-1" fill="none" stroke="${STROKE}" stroke-width="1.8" stroke-linecap="round" opacity=".5"/>
      <ellipse cx="140" cy="97" rx="7.5" ry="4.8" fill="${PINK}" opacity=".45"/>
      <path d="M92 78q-4 12 0 24M104 72q-3 10 0 20M118 118q4 4 10 4" fill="none" stroke="${STROKE}" stroke-width="1.6" stroke-linecap="round" opacity=".38"/>
      <g class="mb-ear"><path d="M90 64 L84 54 L89 52 L84 42 L90 40 L87 30 L93 28 L92 16 Q112 26 122 54 Z" fill="${CREAM}" ${S}/><path d="M97 54 Q94 36 97 26 Q108 36 114 52Z" fill="${EARIN}"/></g>
    </g>
  </g>
</svg>`;

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
      el.innerHTML = `
        <div class="pt-bark" aria-hidden="true">
          ${BARK_SVG}
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
    e.preventDefault();
    go(u.href, modeFor(u));
  });

  // 도착한 페이지: 100% 상태로 시작해서 부드럽게 걷힘
  function arrive() {
    let flag = false; try { flag = sessionStorage.getItem("pt-loading"); sessionStorage.removeItem("pt-loading"); } catch (e) {}
    if (!flag) { document.documentElement.classList.remove("pt-arrive"); return; }
    build(flag === "bark" ? "bark" : MODE); setP(1);
    el.classList.add("show", "instant", "done");
    document.documentElement.classList.remove("pt-arrive");
    const start = performance.now();
    const finish = () => setTimeout(() => {
      el.classList.remove("instant"); el.classList.add("out");
      setTimeout(() => { el.classList.remove("show", "out", "done"); }, 600);
    }, Math.max(0, 220 - (performance.now() - start)));
    if (document.readyState === "complete") finish(); else addEventListener("load", finish, { once: true });
  }
  if (document.body) arrive(); else document.addEventListener("DOMContentLoaded", arrive);

  // 뒤로가기(캐시 복원) 시 로딩 화면이 남아있지 않게
  addEventListener("pageshow", (e) => { if (e.persisted && el) { el.classList.remove("show", "out", "instant", "run", "done"); busy = false; } });
})();
