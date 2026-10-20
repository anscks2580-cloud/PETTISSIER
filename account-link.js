/* 메인 페이지 헤더 : 로그인(내 정보) · 장바구니 버튼
   온라인 주문 페이지들은 auth.js 가 같은 버튼을 직접 그려요.
   여기서는 파이어베이스를 불러오지 않고, 로그인할 때 저장해 둔 표시(pt-member)만 보고 가볍게 그려요. */
(function () {
  var toggle = document.querySelector('.top .menu-toggle');
  if (!toggle || document.querySelector('.top .acct-link')) return;
  var member = null, count = 0;
  try { member = localStorage.getItem('pt-member'); } catch (e) {}
  try { (JSON.parse(localStorage.getItem('pt-cart')) || []).forEach(function (it) { count += +it.qty || 0; }); } catch (e) {}

  var page = location.pathname.split('/').pop() || 'index.html';
  var acct = document.createElement('a');
  acct.className = 'acct-link';
  acct.href = member ? 'mypage.html' : 'login.html?next=' + encodeURIComponent(page);
  acct.setAttribute('aria-label', member ? '내 정보 보기' : '로그인');
  acct.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.2" r="3.8"/><path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6"/></svg><span>' + (member ? '내 정보' : '로그인') + '</span>';

  var cart = document.createElement('a');
  cart.className = 'cart-link';
  cart.href = 'cart.html';
  cart.setAttribute('aria-label', '장바구니');
  cart.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/></svg><span class="cart-count"' + (count ? '' : ' hidden') + '>' + count + '</span>';

  toggle.parentNode.insertBefore(acct, toggle);
  toggle.parentNode.insertBefore(cart, toggle);
})();
