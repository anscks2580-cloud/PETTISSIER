/* 모바일 햄버거 메뉴: 오른쪽에서 슬라이드되는 드로어 (본문은 밀리지 않음) */
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  var css =
    '.nd-backdrop{position:fixed;inset:0;background:rgba(40,30,20,.35);opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;z-index:998}' +
    '.nd-backdrop.on{opacity:1;visibility:visible}' +
    '.nav.nd-drawer{position:fixed!important;top:0!important;right:0!important;bottom:0!important;left:auto!important;' +
      'width:min(80vw,320px)!important;height:100vh!important;height:100dvh!important;max-height:none!important;' +
      'margin:0!important;padding:84px 28px 32px!important;display:flex!important;flex-direction:column!important;' +
      'align-items:stretch!important;justify-content:flex-start!important;gap:0!important;' +
      'background:#fffaf3!important;box-shadow:-10px 0 30px rgba(0,0,0,.12)!important;border:0!important;' +
      'transform:translateX(105%)!important;opacity:1!important;visibility:visible!important;' +
      'overflow-y:auto!important;z-index:999!important}' +
    '.nav.nd-drawer.nd-ready{transition:transform .35s cubic-bezier(.2,.7,.2,1)!important}' +
    '.nav.nd-drawer.nd-open{transform:translateX(0)!important}' +
    '.nav.nd-drawer a{display:block!important;width:100%!important;padding:15px 4px!important;margin:0!important;' +
      'font-size:17px!important;text-align:left!important;border-bottom:1px solid rgba(0,0,0,.07)!important}' +
    '.nd-close{position:absolute;top:18px;right:18px;width:42px;height:42px;border:0;background:none;' +
      'font-size:30px;line-height:1;cursor:pointer;color:inherit}' +
    'body.nd-lock{overflow:hidden}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

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
})();
