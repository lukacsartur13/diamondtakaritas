/* =========================================================
   Diamond Takarítás Győr – frontend
   1) mobil navigáció        5) sticky mobil CTA sáv
   2) scroll-animációk       6) egyedi kurzor + mágneses gombok
   3) parallax + progress    7) GA4 / GTM dataLayer események
   4) sticky oldalsó index   8) ajánlatkérő űrlap
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  window.dataLayer = window.dataLayer || [];
  function track(name, params) {
    window.dataLayer.push(Object.assign({ event: name }, params || {}));
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  /* ---------- 1) Mobil navigáció ---------- */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('fonavigacio');

  if (toggle && nav) {
    nav.querySelectorAll('.nav__link').forEach(function (a, i) { a.style.setProperty('--i', i); });

    function setNav(open) {
      nav.setAttribute('data-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open && window.innerWidth <= 900 ? 'hidden' : '';
    }
    toggle.addEventListener('click', function () {
      setNav(nav.getAttribute('data-open') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) { nav.removeAttribute('data-open'); document.body.style.overflow = ''; toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---------- 2) Scroll-animációk ---------- */

  // Címek szavakra bontása maszkolt felúsztatáshoz
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach(function (w, i) {
      var outer = document.createElement('span');
      outer.className = 'split-word';
      var inner = document.createElement('span');
      inner.textContent = w;
      inner.style.setProperty('--wd', (i * 0.055) + 's');
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });

  var revealables = document.querySelectorAll('[data-reveal], [data-split]');

  if (!('IntersectionObserver' in window) || reduced) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 }); // threshold 0: a nagyon magas blokkok is megjelennek

    revealables.forEach(function (el) { io.observe(el); });

    // Csoportos késleltetés: [data-stagger] gyerekei lépcsőzetesen jelennek meg
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      var step = parseFloat(group.getAttribute('data-stagger')) || 0.09;
      Array.prototype.forEach.call(group.children, function (child, i) {
        if (child.hasAttribute('data-reveal')) child.style.setProperty('--delay', (i * step) + 's');
      });
    });
  }

  /* ---------- 3) Progress sáv, fejléc, parallax ---------- */

  var progress = document.querySelector('.progress');
  var header = document.querySelector('.header');
  var stickyBar = document.querySelector('.sticky-bar');
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';

    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
      // Lefelé görgetve elrejtjük, felfelé azonnal visszahozzuk
      if (y > 320 && y > lastY + 6) header.classList.add('is-hidden');
      else if (y < lastY - 6 || y < 120) header.classList.remove('is-hidden');
    }

    if (stickyBar) stickyBar.classList.toggle('is-visible', y > 420);

    if (!reduced) {
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.08;
        var rect = el.getBoundingClientRect();
        var offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
        el.style.transform = 'translate3d(0,' + offset.toFixed(2) + 'px,0)';
      });
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- 4) Sticky oldalsó index aktív állapota ---------- */

  var sideLinks = Array.prototype.slice.call(document.querySelectorAll('.side-index a[href^="#"]'));
  if (sideLinks.length && 'IntersectionObserver' in window) {
    var targets = sideLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sideLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-30% 0px -55% 0px' });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- 5) Marquee: tartalom duplázása a folytonos futáshoz ---------- */

  document.querySelectorAll('.marquee__track').forEach(function (track) {
    var clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.parentNode.appendChild(clone);
  });

  /* ---------- 6) Egyedi kurzor + mágneses gombok ---------- */

  if (fine && !reduced) {
    var cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    var cx = window.innerWidth / 2, cy = window.innerHeight / 2, tx = cx, ty = cy;

    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      cursor.classList.add('is-active');
    });
    document.addEventListener('mouseleave', function () { cursor.classList.remove('is-active'); });

    (function loop() {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest('a, button, summary, input, select, textarea');
      cursor.classList.toggle('is-hover', !!t);
    });

    // Mágneses hatás a fő gombokon
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + mx * 0.18 + 'px,' + my * 0.28 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- 7) Konverziós események ---------- */

  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a') : null;
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var label = (link.getAttribute('data-cta') || link.textContent || '').trim().slice(0, 80);
    var position = link.getAttribute('data-position') || 'ismeretlen';

    if (href.indexOf('tel:') === 0) return track('click_to_call', { link_url: href, cta_label: label, cta_position: position });
    if (href.indexOf('mailto:') === 0) return track('click_email', { link_url: href, cta_label: label, cta_position: position });
    if (link.closest('.nav') || link.closest('.footer')) return track('click_navigation', { link_url: href, link_text: label });
    if (link.classList.contains('btn') || link.hasAttribute('data-cta')) track('click_cta', { link_url: href, cta_label: label, cta_position: position });
  });

  /* ---------- 8) Ajánlatkérő űrlap ---------- */

  var form = document.getElementById('arajanlat-urlap');
  if (!form) return;

  var success = document.getElementById('arajanlat-koszonet');
  // Magyar telefonszám: +36 / 0036 / 06 előtag, körzet + 6-7 számjegy
  var phonePattern = /^(\+36|0036|06)[\s\-/(]*\d{1,2}[\s\-/)]*\d{3}[\s\-]*\d{3,4}$/;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  function setError(field, message) {
    var input = field.querySelector('input, select, textarea');
    var box = field.querySelector('.error');
    if (!input || !box) return;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      box.textContent = message;
      box.setAttribute('data-visible', 'true');
    } else {
      input.removeAttribute('aria-invalid');
      box.removeAttribute('data-visible');
      box.textContent = '';
    }
  }

  function validateField(field) {
    var input = field.querySelector('input, select, textarea');
    if (!input || input.type === 'hidden') return true;

    var value = (input.value || '').trim();
    var required = input.hasAttribute('required');

    if (input.type === 'checkbox') {
      if (required && !input.checked) {
        setError(field, 'A továbblépéshez kérjük, fogadja el az adatkezelési tájékoztatót.');
        return false;
      }
      setError(field, ''); return true;
    }
    if (required && !value) { setError(field, 'Kérjük, töltse ki ezt a mezőt.'); return false; }
    if (value && input.type === 'tel' && !phonePattern.test(value)) {
      setError(field, 'Kérjük, magyar formátumban adja meg (például: +36 20 123 4567).'); return false;
    }
    if (value && input.type === 'email' && !emailPattern.test(value)) {
      setError(field, 'Kérjük, ellenőrizze az e-mail-cím formátumát.'); return false;
    }
    setError(field, ''); return true;
  }

  var fields = Array.prototype.slice.call(form.querySelectorAll('.field, .consent'));

  fields.forEach(function (field) {
    var input = field.querySelector('input, select, textarea');
    if (!input) return;
    input.addEventListener('blur', function () { validateField(field); });
    input.addEventListener('change', function () {
      if (input.getAttribute('aria-invalid') === 'true' || input.type === 'checkbox') validateField(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var honeypot = form.querySelector('input[name="_honeypot"]');
    if (honeypot && honeypot.value) return; // spam

    var firstInvalid = null;
    fields.forEach(function (field) {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      var target = firstInvalid.querySelector('input, select, textarea');
      if (target) target.focus();
      firstInvalid.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      track('form_error', { form_id: 'arajanlatkeres' });
      return;
    }

    var data = new FormData(form);
    track('form_submit', {
      form_id: 'arajanlatkeres',
      form_name: 'Ingyenes árajánlatkérés',
      service: data.get('szolgaltatas') || '',
      property_type: data.get('ingatlan_tipusa') || '',
      frequency: data.get('gyakorisag') || ''
    });

    /* ---------------------------------------------------------------
       FEJLESZTŐI TEENDŐ – űrlap-továbbítás bekötése
       fetch(form.action, { method: 'POST', body: data })
         .then(function (r) { if (!r.ok) throw new Error(r.status); showSuccess(); })
         .catch(function () { ... hibaüzenet ... });
       Amíg nincs backend, csak a köszönő üzenet jelenik meg.
       --------------------------------------------------------------- */
    showSuccess();
  });

  function showSuccess() {
    form.reset();
    if (!success) return;
    form.setAttribute('hidden', 'hidden');
    success.setAttribute('data-visible', 'true');
    success.setAttribute('tabindex', '-1');
    success.focus();
    success.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
  }
})();
