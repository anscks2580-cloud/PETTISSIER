/* ==========================================================================
   뭉치 이야기 : 비눗방울처럼 떠다니는 뭉치 사진
   - story.html 의 .mc-field 안에 있는 .mc-bub 들을 움직여요.
   - 사진 추가/교체 : story.html 에서 <button class="mc-bub" ...> 한 줄을 복사해
     data-size(L·M·S)와 src 만 바꾸면 됩니다. (사진은 mungchi 폴더, 정사각형 권장)
   ========================================================================== */
(function () {
  var field = document.querySelector(".mc-field");
  if (!field) return;
  var nodes = [].slice.call(field.querySelectorAll(".mc-bub"));
  if (!nodes.length) return;

  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SIZE = { L: 0.27, M: 0.2, S: 0.145 };   // 지름 = 영역 가로폭 × 비율

  // 고정된 시드 난수 (새로고침해도 비슷한 배치)
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  var W = 0, H = 0;
  var B = nodes.map(function (el, i) {
    var k = SIZE[el.dataset.size] || SIZE.M;
    return {
      el: el, k: k, r: 0, i: i,
      x: 0, y: 0, vx: 0, vy: 0, hx: 0, hy: 0,
      depth: rnd() * 2 - 1,                       // -1(뒤) ~ 1(앞)
      p1: rnd() * 6.28, p2: rnd() * 6.28, p3: rnd() * 6.28,
      f1: 0.00035 + rnd() * 0.00025, f2: 0.0003 + rnd() * 0.00025,
      rx: 0, ry: 0, hov: 0, a: 0, va: 0, born: false,
      rot: rnd() * 360
    };
  });
  // 큰 방울을 가운데 쪽에 먼저 배치
  var order = B.slice().sort(function (a, b) { return b.k - a.k; });

  function layout(first) {
    var rect = field.getBoundingClientRect();
    var nW = rect.width, nH = rect.height;
    if (!nW || !nH) return;
    var sx = W ? nW / W : 1, sy = H ? nH / H : 1;
    W = nW; H = nH;
    B.forEach(function (b) {
      b.r = (b.k * W) / 2;
      b.el.style.setProperty("--d", (b.r * 2).toFixed(1) + "px");
    });
    if (first) {
      // 황금각 나선으로 대략 배치 → 겹침 풀기
      order.forEach(function (b, j) {
        var ang = j * 2.39996 + 0.6, rad = Math.sqrt(j + 0.4) / Math.sqrt(B.length) * 0.46;
        b.hx = W / 2 + Math.cos(ang) * rad * W * 0.95;
        b.hy = H / 2 + Math.sin(ang) * rad * H * 0.95;
      });
      relax(260);
      B.forEach(function (b) { b.x = b.hx; b.y = b.hy; });
    } else {
      B.forEach(function (b) { b.hx *= sx; b.hy *= sy; b.x *= sx; b.y *= sy; });
      relax(60);
    }
  }

  function relax(n) {
    var gap = W * 0.014;
    for (var it = 0; it < n; it++) {
      for (var i = 0; i < B.length; i++) {
        var a = B[i];
        for (var j = i + 1; j < B.length; j++) {
          var b = B[j], dx = b.hx - a.hx, dy = b.hy - a.hy, d = Math.sqrt(dx * dx + dy * dy) || 0.01;
          var m = a.r + b.r + gap;
          if (d < m) {
            var p = (m - d) / 2, ux = dx / d, uy = dy / d;
            a.hx -= ux * p; a.hy -= uy * p; b.hx += ux * p; b.hy += uy * p;
          }
        }
        // 영역 안쪽으로 (가장자리는 살짝 여유)
        var pad = a.r * 0.92;
        a.hx = Math.max(pad, Math.min(W - pad, a.hx));
        a.hy = Math.max(pad, Math.min(H - pad, a.hy));
      }
    }
  }

  // ---------- 포인터 ----------
  var P = { x: 0, y: 0, on: false, px: 0, py: 0, tpx: 0, tpy: 0 };
  function setPointer(e) {
    var rect = field.getBoundingClientRect();
    P.x = e.clientX - rect.left; P.y = e.clientY - rect.top; P.on = true;
    P.tpx = (P.x / W - 0.5); P.tpy = (P.y / H - 0.5);
  }
  field.addEventListener("pointermove", setPointer);
  field.addEventListener("pointerdown", setPointer);
  field.addEventListener("pointerleave", function () { P.on = false; P.tpx = 0; P.tpy = 0; });
  field.addEventListener("pointerup", function (e) { if (e.pointerType !== "mouse") { P.on = false; P.tpx = 0; P.tpy = 0; } });

  // ---------- 물리 ----------
  var t0 = performance.now(), last = t0, running = false, visible = false, started = false;

  function step(now) {
    var dt = Math.min(2.2, (now - last) / 16.667); last = now;
    var t = now - t0, gap = W * 0.012, amp = W * 0.032;
    P.px += (P.tpx - P.px) * 0.06 * dt; P.py += (P.tpy - P.py) * 0.06 * dt;

    for (var i = 0; i < B.length; i++) {
      var a = B[i];
      // 등장 : 뽀용 하고 튀어나오는 스프링
      if (a.born) { a.va += (1 - a.a) * 0.09 * dt; a.va *= Math.pow(0.8, dt); a.a += a.va * dt; }

      // 각자 천천히 떠다니는 목표점
      var tx = a.hx + Math.sin(t * a.f1 + a.p1) * amp + Math.sin(t * a.f1 * 2.3 + a.p3) * amp * 0.35;
      var ty = a.hy + Math.cos(t * a.f2 + a.p2) * amp * 1.1 + Math.sin(t * 0.0009 + a.p1) * amp * 0.25;
      var fx = (tx - a.x) * 0.011, fy = (ty - a.y) * 0.011;

      // 포인터 : 가까운 방울은 살짝 비켜나고, 올린 방울은 기울어짐
      var hovTarget = 0;
      if (P.on) {
        var dx = a.x - P.x, dy = a.y - P.y, d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        if (d < a.r) { hovTarget = 1; }
        else {
          var R = a.r + W * 0.13;
          if (d < R) { var s = (R - d) / R; fx += (dx / d) * s * 1.1; fy += (dy / d) * s * 1.1; }
        }
        if (hovTarget) { a.tiltX = -(dy / a.r) * 16; a.tiltY = (dx / a.r) * 16; }
      }
      a.hov += (hovTarget - a.hov) * 0.12 * dt;

      // 서로 겹치지 않게 (말랑하게 밀어냄)
      for (var j = 0; j < B.length; j++) {
        if (j === i) continue;
        var b = B[j], ex = a.x - b.x, ey = a.y - b.y, e = Math.sqrt(ex * ex + ey * ey) || 0.01;
        var m = (a.r * (1 + a.hov * 0.08)) + (b.r * (1 + b.hov * 0.08)) + gap;
        if (e < m) { var q = (m - e) * 0.045 * (b.r / (a.r + b.r)) * 2; fx += (ex / e) * q; fy += (ey / e) * q; }
      }

      // 보이지 않는 경계 : 넘어가면 부드럽게 당겨옴
      var pad = a.r * 0.85;
      if (a.x < pad) fx += (pad - a.x) * 0.05; else if (a.x > W - pad) fx -= (a.x - (W - pad)) * 0.05;
      if (a.y < pad) fy += (pad - a.y) * 0.05; else if (a.y > H - pad) fy -= (a.y - (H - pad)) * 0.05;

      a.vx = (a.vx + fx * dt) * Math.pow(0.9, dt);
      a.vy = (a.vy + fy * dt) * Math.pow(0.9, dt);
    }

    for (var k = 0; k < B.length; k++) {
      var c = B[k];
      c.x += c.vx * dt; c.y += c.vy * dt;

      // 3D 기울기 : 움직이는 방향 + 포인터
      var trx = Math.max(-14, Math.min(14, -c.vy * 5)), try_ = Math.max(-14, Math.min(14, c.vx * 5));
      if (c.hov > 0.01 && c.tiltX != null) { trx = trx * (1 - c.hov) + c.tiltX * c.hov; try_ = try_ * (1 - c.hov) + c.tiltY * c.hov; }
      c.rx += (trx - c.rx) * 0.12 * dt; c.ry += (try_ - c.ry) * 0.12 * dt;

      var wob = Math.sin(t * 0.0021 + c.p2) * 0.022;               // 비눗방울처럼 말랑한 출렁임
      var sc = Math.max(0, c.a) * (1 + c.hov * 0.09);
      var z = c.depth * 46 + c.hov * 70;
      var par = (c.depth + 1.4) * 9;                                 // 앞쪽 방울일수록 시차 크게
      var X = c.x - P.px * par * 2, Y = c.y - P.py * par * 2;
      c.rot += 0.12 * dt;

      var s = c.el.style;
      s.transform = "translate3d(" + X.toFixed(1) + "px," + Y.toFixed(1) + "px," + z.toFixed(1) + "px) rotateX(" + c.rx.toFixed(2) + "deg) rotateY(" + c.ry.toFixed(2) + "deg) scale(" + (sc * (1 + wob)).toFixed(4) + "," + (sc * (1 - wob)).toFixed(4) + ")";
      s.zIndex = Math.round(100 + z);
      // 하이라이트·속사진이 기울기 반대로 움직여 입체감
      s.setProperty("--hx", (34 - c.ry * 1.1).toFixed(1) + "%");
      s.setProperty("--hy", (26 + c.rx * 1.1).toFixed(1) + "%");
      s.setProperty("--ix", (-c.ry * 0.35).toFixed(2) + "%");
      s.setProperty("--iy", (c.rx * 0.35).toFixed(2) + "%");
      s.setProperty("--rot", c.rot.toFixed(1) + "deg");
    }
    if (running) requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true; last = performance.now();
    requestAnimationFrame(step);
  }
  function stop() { running = false; }

  function birth() {
    if (started) return; started = true;
    B.slice().sort(function (a, b) { return a.hy - b.hy; }).forEach(function (b, n) {
      setTimeout(function () { b.born = true; b.va = 0.02; }, 120 + n * 75);
    });
  }

  field.classList.add("is-live");
  layout(true);

  if (reduce) {
    B.forEach(function (b) { b.el.style.transform = "translate3d(" + b.hx + "px," + b.hy + "px,0)"; });
  } else {
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) { birth(); start(); } else stop();
      }, { threshold: 0.05 }).observe(field);
    } else { birth(); start(); }
  }

  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      layout(false);
      if (reduce) B.forEach(function (b) { b.el.style.transform = "translate3d(" + b.hx + "px," + b.hy + "px,0)"; });
    }, 120);
  });

  // ---------- 크게 보기 ----------
  var lb = document.createElement("div");
  lb.className = "mc-lb";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "뭉치 사진 크게 보기");
  lb.innerHTML = '<div class="mc-lb-bub"><img alt=""></div><button type="button" class="mc-lb-x" aria-label="닫기">&times;</button>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector("img"), lastBtn = null;
  function openLb(btn) {
    var img = btn.querySelector("img");
    lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
    lastBtn = btn;
    lb.classList.add("open"); document.body.classList.add("mc-lock");
    lb.querySelector(".mc-lb-x").focus({ preventScroll: true });
  }
  function closeLb() {
    if (!lb.classList.contains("open")) return;
    lb.classList.remove("open"); document.body.classList.remove("mc-lock");
    if (lastBtn) lastBtn.focus({ preventScroll: true });
  }
  nodes.forEach(function (n) { n.addEventListener("click", function () { openLb(n); }); });
  lb.addEventListener("click", closeLb);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
})();
