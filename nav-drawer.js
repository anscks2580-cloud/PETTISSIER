/* 햄버거 메뉴: 오른쪽에서 슬라이드되는 드로어 (본문은 밀리지 않음)
   메뉴는 묶음(쇼핑하기 · 케이크·클래스 · 펫티시에 이야기)별로 접혀 있고, 누르면 펼쳐져요. */
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  var css =
    '.nd-backdrop{position:fixed;inset:0;background:rgba(40,30,20,.35);opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;z-index:998}' +
    '.nd-backdrop.on{opacity:1;visibility:visible}' +
    '.nav.nd-drawer{position:fixed!important;top:0!important;right:0!important;bottom:0!important;left:auto!important;' +
      'width:min(82vw,330px)!important;height:100vh!important;height:100dvh!important;max-height:none!important;' +
      'margin:0!important;padding:72px 22px 40px!important;display:flex!important;flex-direction:column!important;' +
      'align-items:stretch!important;justify-content:flex-start!important;gap:0!important;' +
      'background:#fff!important;box-shadow:-10px 0 30px rgba(0,0,0,.12)!important;border:0!important;' +
      'transform:translateX(105%)!important;opacity:1!important;visibility:visible!important;' +
      'overflow-y:auto!important;z-index:999!important}' +
    '.nav.nd-drawer.nd-ready{transition:transform .35s cubic-bezier(.2,.7,.2,1)!important}' +
    '.nav.nd-drawer.nd-open{transform:translateX(0)!important}' +
    '.nav.nd-drawer a{display:flex!important;align-items:center!important;justify-content:flex-start!important;width:100%!important;' +
      'margin:0!important;line-height:1.4!important;text-align:left!important;text-decoration:none!important;border-top:0!important}' +
    '.nav.nd-drawer a::after{content:none!important}' +
    /* 한 줄 메뉴(리뷰 · 오시는 길)와 묶음 제목 */
    '.nav.nd-drawer a.nav-one,.nav.nd-drawer .nav-acc-btn{padding:17px 6px!important;font-size:16.5px!important;font-weight:400!important;' +
      'border-bottom:1px solid #EEECE7!important;color:#231F1C!important}' +
    '.nav.nd-drawer a.nav-one:hover{background:#FFF6CC!important}' +
    '.nav-acc-btn{display:flex;align-items:center;justify-content:space-between;width:100%;font:inherit;background:none;border:0;' +
      'cursor:pointer;text-align:left}' +
    '.nav-acc-btn::after{content:"";width:8px;height:8px;border-right:2px solid #231F1C;border-bottom:2px solid #231F1C;' +
      'transform:translateY(-3px) rotate(45deg);transition:transform .25s ease;margin-right:6px}' +
    '.nav-acc-btn[aria-expanded="true"]::after{transform:translateY(2px) rotate(-135deg)}' +
    '.nav-acc-panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}' +
    '.nav-acc-panel>div{overflow:hidden;min-height:0}' +
    '.nav-acc.open .nav-acc-panel{grid-template-rows:1fr}' +
    '.nav-acc.open .nav-acc-panel>div{border-bottom:1px solid #EEECE7;padding:6px 0 10px}' +
    /* 펼쳐졌을 때 안쪽 메뉴 */
    '.nav.nd-drawer .nav-acc-panel a{padding:11px 12px!important;font-size:15px!important;font-weight:400!important;color:#4A443E!important;border-bottom:0!important;border-radius:8px}' +
    '.nav.nd-drawer .nav-acc-panel a:hover{background:#FFF6CC!important}' +
    '.nav.nd-drawer .nav-acc-panel a[aria-current="page"]{color:#231F1C!important;font-weight:400!important}' +
    '.nd-close{position:absolute;top:16px;right:16px;width:42px;height:42px;border:0;background:none;' +
      'font-size:30px;line-height:1;cursor:pointer;color:inherit}' +
    'body.nd-lock{overflow:hidden}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── 아코디언 : 하나를 펼치면 나머지는 접혀요 ── */
  var groups = [].slice.call(nav.querySelectorAll('.nav-acc'));
  function setGroup(g, open) {
    g.classList.toggle('open', open);
    var b = g.querySelector('.nav-acc-btn');
    if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  groups.forEach(function (g) {
    var b = g.querySelector('.nav-acc-btn');
    if (!b) return;
    b.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var willOpen = !g.classList.contains('open');
      groups.forEach(function (o) { setGroup(o, false); });
      setGroup(g, willOpen);
    });
  });
  // 지금 보고 있는 페이지가 들어 있는 묶음은 펼쳐 둬요
  function openCurrent() {
    groups.forEach(function (g) { setGroup(g, !!g.querySelector('a[aria-current="page"]')); });
  }

  var home = nav.parentNode;
  var anchor = nav.nextSibling;
  var backdrop = document.createElement('div');
  backdrop.className = 'nd-backdrop';
  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'nd-close';
  closeBtn.setAttribute('aria-label', '메뉴 닫기');
  closeBtn.innerHTML = '&times;';

  var mobile = false;

  function openMenu() {
    openCurrent();
    nav.classList.add('nd-open');
    backdrop.classList.add('on');
    document.body.classList.add('nd-lock');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '메뉴 닫기');
  }
  function closeMenu() {
    nav.classList.remove('nd-open');
    backdrop.classList.remove('on');
    document.body.classList.remove('nd-lock');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
  }

  function setMode() {
    var m = getComputedStyle(toggle).display !== 'none';
    if (m === mobile) return;
    mobile = m;
    if (m) {
      // 헤더 밖(body)으로 옮겨서 헤더 레이아웃에 영향 없이 고정 배치
      nav.classList.remove('open', 'active', 'is-open', 'show');
      document.body.appendChild(backdrop);
      document.body.appendChild(nav);
      nav.insertBefore(closeBtn, nav.firstChild);
      nav.classList.add('nd-drawer');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { nav.classList.add('nd-ready'); });
      });
    } else {
      closeMenu();
      nav.classList.remove('nd-drawer', 'nd-ready');
      if (closeBtn.parentNode) closeBtn.parentNode.removeChild(closeBtn);
      home.insertBefore(nav, anchor && anchor.parentNode === home ? anchor : null);
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    }
  }

  // 기존 common.js의 햄버거 동작보다 먼저 가로채서 처리
  document.addEventListener('click', function (e) {
    if (!mobile) return;
    if (e.target.closest('.menu-toggle')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      nav.classList.contains('nd-open') ? closeMenu() : openMenu();
    }
  }, true);

  backdrop.addEventListener('click', closeMenu);
  closeBtn.addEventListener('click', closeMenu);
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nd-open')) closeMenu();
  });
  window.addEventListener('resize', setMode);

  setMode();
  openCurrent();
})();
