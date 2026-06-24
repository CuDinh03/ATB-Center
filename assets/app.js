(function () {
  // sticky header shadow + back-to-top visibility
  var hdr = document.getElementById('hdr');
  var totop = document.getElementById('totop');
  function onScroll() {
    var y = window.scrollY;
    if (hdr) hdr.classList.toggle('scrolled', y > 10);
    if (totop) totop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile drawer
  var drawer = document.getElementById('drawer');
  var burger = document.getElementById('burger');
  var drawerX = document.getElementById('drawerX');
  if (burger) burger.addEventListener('click', function () { drawer.classList.add('open'); });
  if (drawerX) drawerX.addEventListener('click', function () { drawer.classList.remove('open'); });
  if (drawer) drawer.addEventListener('click', function (e) {
    if (e.target === drawer || e.target.hasAttribute('data-close')) drawer.classList.remove('open');
  });

  // back to top
  if (totop) totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // FAQ accordion
  document.querySelectorAll('.faq .qh').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var q = btn.closest('.q');
      var a = q.querySelector('.qa');
      var open = q.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : null;
    });
  });

  // form mockups — demo only, no data is sent anywhere
  var mf = document.getElementById('mainForm');
  var fd = document.getElementById('formDone');
  if (mf) mf.addEventListener('submit', function (e) {
    e.preventDefault(); mf.style.display = 'none'; if (fd) fd.classList.add('show');
  });
  var hf = document.getElementById('heroForm');
  if (hf) hf.addEventListener('submit', function (e) {
    e.preventDefault();
    var b = hf.querySelector('button');
    b.textContent = '✓ Đã gửi! Sẽ liên hệ sớm';
    b.style.background = 'var(--green-600)';
    b.disabled = true;
  });
})();
