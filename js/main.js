/* =========================================================
   UNITED GLOBAL CONSULTING — main.js
   Vanilla JS. No bundler. Organized into sections.
   ========================================================= */
(function () {
  'use strict';

  /* ========== Helpers ========== */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
  const CONFIG = window.UGC_CONFIG || {};

  /* ========== Lucide icons (lazy-hydration by section, P1-14) ========== */
  const renderIcons = (root) => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons({ nameAttr: 'data-lucide', ...(root ? { root } : {}) }); }
      catch (_) {}
    }
  };
  // First pass: render icons within the initial viewport fast
  const initialRender = () => renderIcons();
  if (document.readyState !== 'loading') initialRender();
  else document.addEventListener('DOMContentLoaded', initialRender);
  window.addEventListener('load', initialRender);

  // Progressive re-render after Lucide UMD loads (it's deferred)
  let lucideTries = 0;
  const waitLucide = () => {
    if (window.lucide) { renderIcons(); return; }
    if (lucideTries++ > 40) return; // ~4s
    setTimeout(waitLucide, 100);
  };
  waitLucide();

  /* ========== Footer year ========== */
  const footerYear = $('#footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  /* ========== Theme toggle (P1-11 Dark mode) ========== */
  const themeToggle = $('#themeToggle');
  const applyTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('ugc_theme', t); } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0A0E1A' : '#0A2540');
  };
  on(themeToggle, 'click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
  // Respect prefers-color-scheme changes if user didn't choose explicitly
  try {
    const saved = localStorage.getItem('ugc_theme');
    const mq = matchMedia('(prefers-color-scheme: dark)');
    if (!saved && mq.addEventListener) {
      mq.addEventListener('change', (e) => applyTheme(e.matches ? 'dark' : 'light'));
    }
  } catch (_) {}

  /* ========== Navbar scroll state + progress + back-to-top ========== */
  const navbar = $('#navbar');
  const onScroll = () => {
    if (navbar) {
      if (window.scrollY > 8) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = docH > 0 ? Math.min(100, (window.scrollY / docH) * 100) : 0;
    const bar  = $('#scrollProgress');
    if (bar) bar.style.width = pct + '%';

    const btt = $('#backToTop');
    if (btt) {
      const show = window.scrollY > 500;
      btt.classList.toggle('visible', show);
      btt.hidden = !show;
      btt.setAttribute('aria-hidden', String(!show));
    }
  };
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();

  /* ========== Mobile drawer (P2-9 focus-trap + inert) ========== */
  const burger = $('#burger');
  const drawer = $('#mobileDrawer');
  const main   = $('#main');
  let lastFocused = null;

  const focusableIn = (ctx) =>
    $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', ctx);

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (main) main.setAttribute('inert', '');
    lastFocused = document.activeElement;
    const first = focusableIn(drawer)[0];
    if (first) first.focus();
  };
  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (main) main.removeAttribute('inert');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  };
  on(burger, 'click', () => {
    const isOpen = drawer.classList.contains('open');
    isOpen ? closeDrawer() : openDrawer();
  });
  $$('.mobile-link', drawer).forEach(a => on(a, 'click', closeDrawer));
  on(document, 'click', (e) => {
    if (drawer && drawer.classList.contains('open') &&
        !drawer.contains(e.target) && !burger.contains(e.target)) {
      closeDrawer();
    }
  });
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) closeDrawer();
    if (e.key === 'Tab' && drawer && drawer.classList.contains('open')) {
      const items = focusableIn(drawer);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ========== i18n (language switcher) ========== */
  const langBtn      = $('#langBtn');
  const langDropdown = $('.lang-dropdown');
  const currentLang  = $('#currentLang');

  on(langBtn, 'click', (e) => {
    e.stopPropagation();
    const open = langDropdown.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', String(open));
  });
  on(document, 'click', (e) => {
    if (langDropdown && !langDropdown.contains(e.target) && !langBtn.contains(e.target)) {
      langDropdown.classList.remove('open');
      langBtn && langBtn.setAttribute('aria-expanded', 'false');
    }
  });
  $$('.lang-dropdown button[data-lang]').forEach(btn => {
    on(btn, 'click', () => {
      const lang = btn.dataset.lang;
      langDropdown.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
      if (window.UGCi18n) window.UGCi18n.apply(lang);
    });
  });

  // Apply initial language as soon as i18n module is ready
  const bootI18n = () => {
    if (!window.UGCi18n) { setTimeout(bootI18n, 30); return; }
    const detected = window.UGCi18n.detect();
    window.UGCi18n.apply(detected).then(() => {
      // Update page_lang hidden input for form payload
      const pl = document.querySelector('input[name="page_lang"]');
      if (pl) pl.value = document.documentElement.lang || detected;
      // Re-render icons after DOM text changed
      renderIcons();
    });
  };
  bootI18n();

  // When language changes via dropdown later — also re-render icons
  document.addEventListener('i18n:changed', () => { renderIcons(); });

  /* ========== Scroll reveal (IntersectionObserver) ========== */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          if (delay) el.style.transitionDelay = delay + 'ms';
          el.classList.add('in-view');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ========== Counter-up animation ========== */
  const counters = $$('.counter');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target || '0', 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const value = Math.floor(target * easeOut(t));
      el.textContent = value + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cIO.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* ========== Testimonials slider (P1-2: dynamic gap, P2-10: aria-live) ========== */
  const track = $('#testimonialsTrack');
  const cards = track ? $$('.t-card', track) : [];
  const tPrev = $('#tPrev');
  const tNext = $('#tNext');
  const dotsContainer = $('#tDots');
  let tResizeTimer;

  if (track && cards.length) {
    let perView = 3;
    let index = 0;
    let autoplay;

    const computePerView = () => {
      const w = window.innerWidth;
      if (w < 640) perView = 1;
      else if (w < 900) perView = 2;
      else perView = 3;
    };

    const totalPages = () => Math.max(1, Math.ceil(cards.length / perView));

    const gapPx = () => {
      const cs = getComputedStyle(track);
      const g = parseFloat(cs.columnGap || cs.gap || '0');
      return isNaN(g) ? 24 : g;
    };

    const renderDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalPages(); i++) {
        const dot = document.createElement('button');
        dot.className = 't-dot' + (i === index ? ' active' : '');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.setAttribute('aria-selected', String(i === index));
        dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
        dotsContainer.appendChild(dot);
      }
    };
    const updateActiveDot = () => {
      $$('.t-dot', dotsContainer).forEach((d, i) => {
        d.classList.toggle('active', i === index);
        d.setAttribute('aria-selected', String(i === index));
      });
    };

    const update = () => {
      const wrap = track.parentElement;
      const pageWidth = wrap.clientWidth + gapPx();
      const offset = -(index * pageWidth);
      track.style.transform = `translateX(${offset}px)`;
      updateActiveDot();
    };

    const goTo = (i) => {
      const pages = totalPages();
      index = ((i % pages) + pages) % pages;
      update();
    };
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    const startAutoplay = () => {
      stopAutoplay();
      autoplay = setInterval(next, 5500);
    };
    const stopAutoplay = () => {
      if (autoplay) { clearInterval(autoplay); autoplay = null; }
    };

    on(tNext, 'click', () => { next(); startAutoplay(); });
    on(tPrev, 'click', () => { prev(); startAutoplay(); });
    on(track.parentElement, 'mouseenter', stopAutoplay);
    on(track.parentElement, 'mouseleave', startAutoplay);
    on(track.parentElement, 'focusin', stopAutoplay);
    on(track.parentElement, 'focusout', startAutoplay);

    // Touch swipe
    let startX = 0, currentX = 0, dragging = false;
    on(track, 'touchstart', (e) => {
      startX = e.touches[0].clientX;
      dragging = true;
      stopAutoplay();
    }, { passive: true });
    on(track, 'touchmove', (e) => {
      if (!dragging) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });
    on(track, 'touchend', () => {
      if (!dragging) return;
      dragging = false;
      const diff = currentX - startX;
      if (Math.abs(diff) > 60) diff < 0 ? next() : prev();
      startAutoplay();
    });

    const init = () => {
      const old = perView;
      computePerView();
      if (old !== perView && index >= totalPages()) index = totalPages() - 1;
      renderDots();
      update();
    };

    init();
    on(window, 'resize', () => {
      clearTimeout(tResizeTimer);
      tResizeTimer = setTimeout(init, 150);
    });
    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay(); else startAutoplay();
    });
    startAutoplay();
  }

  /* ========== FAQ accordion (P2-8 aria + icon swap) ========== */
  const faqItems = $$('.faq-item');
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    const icon = item.querySelector('.faq-toggle');
    const syncAria = () => {
      if (summary) summary.setAttribute('aria-expanded', String(item.open));
      if (icon) {
        icon.setAttribute('data-lucide', item.open ? 'minus' : 'plus');
        renderIcons(item);
      }
    };
    syncAria();
    on(item, 'toggle', () => {
      if (item.open) {
        faqItems.forEach(other => { if (other !== item && other.open) other.open = false; });
      }
      syncAria();
      // Force icon sync on all sibling items too
      faqItems.forEach(o => {
        const s = o.querySelector('summary');
        const ic = o.querySelector('.faq-toggle');
        if (s) s.setAttribute('aria-expanded', String(o.open));
        if (ic) { ic.setAttribute('data-lucide', o.open ? 'minus' : 'plus'); renderIcons(o); }
      });
    });
  });

  /* ========== Phone mask + validation (P2-12) ========== */
  // Allowed UZ carrier prefixes (Beeline, UMS, Mobiuz, Ucell, Perfectum, Uzmobile etc.)
  const UZ_PHONE_RE = /^\+998(20|33|50|55|61|62|63|65|66|67|69|70|71|72|73|74|75|76|77|78|79|88|90|91|93|94|95|97|98|99)\d{7}$/;
  const onlyDigits = (s) => (s || '').replace(/\D/g, '');
  const formatUZ = (raw) => {
    let d = onlyDigits(raw);
    if (d.startsWith('998')) d = d.slice(3);
    d = d.slice(0, 9);
    let out = '+998';
    if (d.length > 0) out += ' ' + d.slice(0, 2);
    if (d.length > 2) out += ' ' + d.slice(2, 5);
    if (d.length > 5) out += ' ' + d.slice(5, 7);
    if (d.length > 7) out += ' ' + d.slice(7, 9);
    return out;
  };
  const attachPhoneMask = (input) => {
    if (!input) return;
    on(input, 'input', () => { input.value = formatUZ(input.value); });
    on(input, 'focus', () => { if (!input.value) input.value = '+998 '; });
    on(input, 'blur', () => {
      const v = input.value.trim();
      if (v === '+998' || v === '+998 ') input.value = '';
    });
  };
  attachPhoneMask($('#phoneInput'));
  attachPhoneMask($('#exitPhone'));

  /* ========== Sanitization helpers (P0-3) ========== */
  const stripControl = (s) => String(s || '').replace(/[\x00-\x1F\x7F]/g, '');
  const sanitizeForWhatsApp = (str, max) => {
    return stripControl(str)
      .replace(/[\*_~`]/g, '')
      .replace(/\r?\n|\r|\t/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .slice(0, max || 500)
      .trim();
  };
  const sanitizeField = (str, max) => {
    return stripControl(str).replace(/\s{2,}/g, ' ').slice(0, max || 500).trim();
  };
  const escapeHtml = (s) => String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ========== UTM capture (P1-8) ========== */
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'yclid'];
  try {
    const params = new URLSearchParams(location.search);
    UTM_KEYS.forEach(k => {
      if (params.get(k)) sessionStorage.setItem(k, params.get(k));
    });
  } catch (_) {}
  const readUTM = () => {
    const out = {};
    try {
      UTM_KEYS.forEach(k => {
        const v = sessionStorage.getItem(k);
        if (v) out[k] = v;
      });
    } catch (_) {}
    return out;
  };
  // Populate hidden form fields from sessionStorage on load
  const populateUtmFields = () => {
    const utm = readUTM();
    Object.keys(utm).forEach(k => {
      const el = document.querySelector(`input[name="${k}"]`);
      if (el) el.value = utm[k];
    });
    const ref = document.querySelector('input[name="referrer"]');
    if (ref) ref.value = document.referrer || '';
  };
  populateUtmFields();

  /* ========== GA4 + event tracking (P1-7) ========== */
  const gaReady = () => typeof window.gtag === 'function';
  const gaEvent = (name, params) => {
    try { if (gaReady()) window.gtag('event', name, params || {}); } catch (_) {}
  };
  const loadGA4 = (id) => {
    if (!id || gaReady()) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true, send_page_view: true });
  };
  // Load GA only after cookie consent = accept
  try {
    if (localStorage.getItem('ugc_cookie_choice') === 'accept' && CONFIG.gaId) {
      loadGA4(CONFIG.gaId);
    }
  } catch (_) {}

  // Auto-track clicks on [data-ga-event]
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-ga-event]');
    if (!el) return;
    gaEvent(el.getAttribute('data-ga-event'), {
      label: el.textContent.trim().slice(0, 60),
      url: el.href || null
    });
  });

  /* ========== Cloudflare Turnstile (P0-4) ========== */
  // Injects script + widget only when UGC_CONFIG.turnstileSiteKey is configured.
  // The Worker endpoint (formEndpoint) must verify the token via siteverify.
  const turnstileWrap = $('#turnstileWrap');
  const turnstileKey  = (CONFIG.turnstileSiteKey || '').trim();
  let turnstileWidgetId = null;
  const loadTurnstile = () => {
    if (!turnstileWrap || !turnstileKey) return;
    turnstileWrap.dataset.sitekey = turnstileKey;
    turnstileWrap.hidden = false;
    turnstileWrap.removeAttribute('aria-hidden');
    turnstileWrap.classList.add('cf-turnstile'); // official class consumed by CF script
    if (window.turnstile) {
      try { turnstileWidgetId = window.turnstile.render(turnstileWrap, { sitekey: turnstileKey, theme: 'auto' }); } catch (_) {}
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true; s.defer = true;
    s.onload = () => {
      if (window.turnstile && turnstileWrap) {
        try { turnstileWidgetId = window.turnstile.render(turnstileWrap, { sitekey: turnstileKey, theme: 'auto' }); } catch (_) {}
      }
    };
    document.head.appendChild(s);
  };
  loadTurnstile();

  /* ========== Lead form (P0-1, P0-3, P0-4, P1-3) ========== */
  const form = $('#leadForm');
  const formSuccess = $('#formSuccess');
  const formError   = $('#formError');
  let formOpenedAt = Date.now();
  on(form, 'focusin', () => { if (!formOpenedAt) formOpenedAt = Date.now(); }, { once: true });

  const setFieldError = (name, show) => {
    const el = document.getElementById('err-' + name);
    if (el) el.hidden = !show;
    const field = form ? form.querySelector(`[name="${name}"]`) : null;
    if (field) {
      field.classList.toggle('invalid', show);
      field.setAttribute('aria-invalid', String(show));
    }
  };

  const validateForm = (fd) => {
    let ok = true;
    const name  = sanitizeField(fd.get('name'), 80);
    const phone = sanitizeField(fd.get('phone'), 20);
    const email = sanitizeField(fd.get('email'), 120);

    if (name.length < 2) { setFieldError('name', true); ok = false; } else setFieldError('name', false);
    if (!UZ_PHONE_RE.test(phone.replace(/\s/g, ''))) { setFieldError('phone', true); ok = false; } else setFieldError('phone', false);
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError('email', true); ok = false; } else setFieldError('email', false);
    if (!fd.get('consent')) { setFieldError('consent', true); ok = false; } else setFieldError('consent', false);

    return { ok, clean: { name, phone, email } };
  };

  const setLoading = (btn, loading) => {
    if (!btn) return;
    btn.dataset.loading = loading ? '1' : '';
    btn.disabled = !!loading;
    btn.setAttribute('aria-busy', String(!!loading));
  };

  const buildWaMessage = ({ name, phone, email, country, level, message, utm }) => {
    const lines = [
      'Yangi konsultatsiya soʻrovi / Новая заявка / New lead',
      '',
      'Ism/Имя/Name: ' + sanitizeForWhatsApp(name, 80),
      'Tel: ' + sanitizeForWhatsApp(phone, 20)
    ];
    if (email)   lines.push('Email: ' + sanitizeForWhatsApp(email, 120));
    if (country) lines.push('Country: ' + sanitizeForWhatsApp(country, 40));
    if (level)   lines.push('Level: ' + sanitizeForWhatsApp(level, 20));
    if (message) lines.push('Msg: ' + sanitizeForWhatsApp(message, 500));
    if (utm && Object.keys(utm).length) {
      lines.push('—');
      Object.keys(utm).forEach(k => lines.push(k + ': ' + sanitizeForWhatsApp(utm[k], 80)));
    }
    return lines.join('\n');
  };

  const postToBackend = async (payload) => {
    if (!CONFIG.formEndpoint) return { skipped: true };
    const res = await fetch(CONFIG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Backend ' + res.status);
    return res.json().catch(() => ({}));
  };

  on(form, 'submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    // Honeypot check (P0-4)
    if (fd.get('website')) { console.warn('[form] honeypot triggered'); return; }
    // Time-trap: submission < 2s after form creation is suspicious
    if (Date.now() - formOpenedAt < 2000) { console.warn('[form] too fast'); return; }

    const { ok, clean } = validateForm(fd);
    if (!ok) { form.querySelector('.invalid')?.focus(); return; }

    // Turnstile token (only if configured) — the Worker MUST verify via siteverify.
    let turnstileToken = '';
    if (turnstileKey) {
      turnstileToken = (fd.get('cf-turnstile-response') || '').toString();
      if (!turnstileToken) {
        const tErr = $('#err-turnstile');
        if (tErr) tErr.hidden = false;
        return;
      } else {
        const tErr = $('#err-turnstile');
        if (tErr) tErr.hidden = true;
      }
    }

    // Full payload with sanitization
    const payload = {
      name: clean.name,
      phone: clean.phone,
      email: clean.email,
      country: sanitizeField(fd.get('country'), 40),
      level:   sanitizeField(fd.get('level'), 20),
      message: sanitizeField(fd.get('message'), 500),
      page_lang: sanitizeField(fd.get('page_lang'), 5),
      referrer: sanitizeField(fd.get('referrer'), 500),
      utm: readUTM(),
      submitted_at: new Date().toISOString(),
      user_agent: navigator.userAgent.slice(0, 200),
      turnstile_token: turnstileToken || undefined
    };

    const submitBtn = form.querySelector('.form-submit');
    setLoading(submitBtn, true);
    if (formError) formError.hidden = true;

    // Open WhatsApp synchronously in the same click tick to avoid popup-blockers.
    // Save the user gesture by opening a blank window first; we'll replace URL after building message.
    let waWindow = null;
    try {
      const waText = buildWaMessage({ ...payload, ...payload.utm });
      const waUrl  = 'https://wa.me/' + encodeURIComponent(CONFIG.waNumber || '998885263000') + '?text=' + encodeURIComponent(waText);
      waWindow = window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (_) {}

    // Hit backend (optional — if configured)
    let backendOk = true;
    try { await postToBackend(payload); }
    catch (err) { console.warn('[form] backend error', err); backendOk = false; }

    setLoading(submitBtn, false);
    gaEvent('generate_lead', { method: CONFIG.formEndpoint ? 'backend' : 'whatsapp', value: 1 });

    if (formSuccess) {
      formSuccess.hidden = false;
      renderIcons(formSuccess);
      try { formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
    }
    // If backend failed but no configured endpoint, treat success (WhatsApp opened)
    if (!backendOk && CONFIG.formEndpoint) {
      if (formError) { formError.hidden = false; renderIcons(formError); }
    }
    // Clear form after success (keep WhatsApp window open)
    form.reset();
    populateUtmFields();
  });

  /* ========== Back to top click ========== */
  on($('#backToTop'), 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ========== Smooth-scroll with nav offset ========== */
  $$('a[href^="#"]').forEach(link => {
    on(link, 'click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ========== Cookie banner — granular (essential / analytics / marketing) ========== */
  const cookie = $('#cookieBanner');
  const cookieDetails = $('#cookieDetails');
  const COOKIE_KEY  = 'ugc_cookie_choice';
  const COOKIE_CATS = 'ugc_cookie_categories';
  const getCats = () => {
    try { return JSON.parse(localStorage.getItem(COOKIE_CATS) || '{}'); }
    catch (_) { return {}; }
  };
  const saveCats = (cats) => {
    try { localStorage.setItem(COOKIE_CATS, JSON.stringify(cats)); } catch (_) {}
  };
  const showCookie = () => {
    if (!cookie) return;
    try { if (localStorage.getItem(COOKIE_KEY)) return; } catch (_) {}
    cookie.hidden = false;
    setTimeout(() => cookie.classList.add('visible'), 50);
  };
  const hideCookie = (choice, cats) => {
    if (!cookie) return;
    cookie.classList.remove('visible');
    setTimeout(() => { cookie.hidden = true; }, 400);
    try { localStorage.setItem(COOKIE_KEY, choice); } catch (_) {}
    if (cats) saveCats(cats);
    // Turn analytics on if granted
    const analyticsOn = choice === 'accept' || (cats && cats.analytics);
    if (analyticsOn && CONFIG.gaId) loadGA4(CONFIG.gaId);
    gaEvent('consent_' + choice, cats ? { cats: Object.keys(cats).filter(k => cats[k]).join(',') } : undefined);
  };
  on($('#cookieAccept'), 'click', () => hideCookie('accept', { analytics: true, marketing: true }));
  on($('#cookieDecline'), 'click', () => hideCookie('decline', { analytics: false, marketing: false }));
  on($('#cookieSave'), 'click', () => {
    const chosen = {};
    $$('#cookieDetails input[data-cookie-cat]').forEach(cb => { chosen[cb.dataset.cookieCat] = !!cb.checked; });
    hideCookie(chosen.analytics || chosen.marketing ? 'custom' : 'decline', chosen);
  });
  on($('#cookieToggleMore'), 'click', () => {
    cookie.classList.toggle('expanded');
  });
  // Re-hydrate previously chosen categories on load for analytics/marketing gating
  (() => {
    const cats = getCats();
    if (cats.analytics && CONFIG.gaId) loadGA4(CONFIG.gaId);
    $$('#cookieDetails input[data-cookie-cat]').forEach(cb => {
      if (cats[cb.dataset.cookieCat]) cb.checked = true;
    });
  })();
  setTimeout(showCookie, 2400);

  /* ========== Exit-intent popup (NEW-15) ========== */
  const exitModal = $('#exitModal');
  const EXIT_KEY  = 'ugc_exit_shown';
  const exitForm  = $('#exitForm');
  const exitPhone = $('#exitPhone');

  const openExit = () => {
    if (!exitModal) return;
    try { if (sessionStorage.getItem(EXIT_KEY)) return; } catch (_) {}
    exitModal.hidden = false;
    requestAnimationFrame(() => exitModal.classList.add('open'));
    try { sessionStorage.setItem(EXIT_KEY, '1'); } catch (_) {}
    if (exitPhone) { setTimeout(() => exitPhone.focus(), 350); }
    renderIcons(exitModal);
    gaEvent('exit_intent_open');
  };
  const closeExit = () => {
    if (!exitModal) return;
    exitModal.classList.remove('open');
    setTimeout(() => { exitModal.hidden = true; }, 300);
  };
  $$('[data-exit-close]').forEach(el => on(el, 'click', closeExit));
  on(document, 'keydown', (e) => { if (e.key === 'Escape' && exitModal && !exitModal.hidden) closeExit(); });

  // Trigger: mouseleave to top on desktop
  on(document, 'mouseleave', (e) => {
    if (e.clientY < 10 && window.innerWidth > 768) openExit();
  });
  // Fallback: after 60s idle + scroll > 30%
  let scrolledFar = false;
  on(window, 'scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (pct > 0.3) scrolledFar = true;
  }, { passive: true });
  setTimeout(() => { if (scrolledFar) openExit(); }, 60_000);

  on(exitForm, 'submit', (e) => {
    e.preventDefault();
    const phone = sanitizeField(exitPhone.value, 20).replace(/\s/g, '');
    if (!UZ_PHONE_RE.test(phone)) {
      exitPhone.classList.add('invalid');
      exitPhone.focus();
      return;
    }
    const waText = 'Qayta qo\'ng\'iroq so\'rovi / Запрос обратного звонка / Callback request\nTel: ' + sanitizeForWhatsApp(phone, 20);
    const waUrl  = 'https://wa.me/' + encodeURIComponent(CONFIG.waNumber || '998885263000') + '?text=' + encodeURIComponent(waText);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    gaEvent('exit_intent_submit');
    closeExit();
  });

  /* ========== Data-driven widgets: Calculator, Quiz, Deadlines ========== */
  const dataUrl = (new URL('data/countries.json', document.baseURI)).href;
  let countriesData = null;
  const loadCountries = async () => {
    if (countriesData) return countriesData;
    try {
      const res = await fetch(dataUrl);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      countriesData = await res.json();
    } catch (err) {
      console.warn('[countries] load failed', err);
      countriesData = { countries: [] };
    }
    return countriesData;
  };

  const fmtUSD = (n) => '$' + Math.round(n || 0).toLocaleString('en-US');
  const langName = (names) => {
    const l = (document.documentElement.lang || 'ru').slice(0, 2);
    return names[l] || names.en || names.ru || '';
  };

  /* ------ Calculator ------ */
  const calcForm     = $('#calcForm');
  const calcCountry  = $('#calcCountry');
  const calcLevel    = $('#calcLevel');
  const calcHousing  = $('#calcHousing');
  const calcDuration = $('#calcDuration');
  const calcDurationVal = $('#calcDurationVal');
  const calcResult = {
    tuition:   $('#calcTuition'),
    living:    $('#calcLiving'),
    docs:      $('#calcDocs'),
    visa:      $('#calcVisa'),
    insurance: $('#calcInsurance'),
    flight:    $('#calcFlight'),
    total:     $('#calcTotal'),
    multiyearRow: $('#calcMultiyearRow'),
    multiyear: $('#calcMultiyear'),
    cta:       $('#calcCta')
  };

  const buildCalcOptions = () => {
    if (!calcCountry || !countriesData) return;
    calcCountry.innerHTML = countriesData.countries
      .map(c => `<option value="${c.slug}">${langName(c.name)}</option>`)
      .join('');
  };

  const runCalc = () => {
    if (!calcCountry || !countriesData) return;
    const slug = calcCountry.value;
    const c = countriesData.countries.find(x => x.slug === slug);
    if (!c) return;
    const level = calcLevel.value;
    const housing = calcHousing.value;
    const years = Math.max(1, Math.min(5, parseInt(calcDuration.value, 10) || 1));
    calcDurationVal.textContent = years;
    const tuition = c.tuition_year[level] || 0;
    const living  = c.living_year[housing] || 0;
    const { documents = 0, visa = 0, insurance = 0, flight = 0 } = c.extra || {};
    const yearOne = tuition + living + documents + visa + insurance + flight;
    calcResult.tuition.textContent   = fmtUSD(tuition);
    calcResult.living.textContent    = fmtUSD(living);
    calcResult.docs.textContent      = fmtUSD(documents);
    calcResult.visa.textContent      = fmtUSD(visa);
    calcResult.insurance.textContent = fmtUSD(insurance);
    calcResult.flight.textContent    = fmtUSD(flight);
    calcResult.total.textContent     = fmtUSD(yearOne);
    if (years > 1) {
      calcResult.multiyearRow.hidden = false;
      calcResult.multiyear.textContent = fmtUSD((tuition + living) * years + documents + visa + insurance + flight);
    } else {
      calcResult.multiyearRow.hidden = true;
    }
    if (calcResult.cta) {
      const note = encodeURIComponent(`Tuition calculator request / Запрос расчёта / Hisoblash so'rovi\nCountry: ${langName(c.name)} · Level: ${level} · Housing: ${housing} · Duration: ${years} yr\nYear-1 est.: ${fmtUSD(yearOne)}`);
      calcResult.cta.href = 'https://wa.me/' + encodeURIComponent(CONFIG.waNumber || '998885263000') + '?text=' + note;
    }
  };

  const initCalculator = async () => {
    if (!calcForm) return;
    await loadCountries();
    buildCalcOptions();
    runCalc();
    ['input', 'change'].forEach(ev => on(calcForm, ev, (e) => {
      if (e.target && e.target.name === 'duration') calcDurationVal.textContent = calcDuration.value;
      runCalc();
      if (e.type === 'change') gaEvent('calculator_use', { field: e.target.name || '' });
    }));
  };
  initCalculator();

  /* ------ Country-fit Quiz ------ */
  const quizCard = $('#quizCard');
  const quizBody = $('#quizBody');
  const quizProgress = $('#quizProgress');
  const QUIZ = [
    { key: 'region',  q: { en: 'Where in the world feels right?', ru: 'Какой регион мира вам ближе?', uz: 'Qaysi hudud sizga yaqinroq?' }, opts: [
      { label: { en: 'Asia', ru: 'Азия', uz: 'Osiyo' },               tags: { asia: 3, europe: 0 } },
      { label: { en: 'Europe', ru: 'Европа', uz: 'Yevropa' },          tags: { europe: 3, asia: 0 } },
      { label: { en: 'Americas', ru: 'Америка', uz: 'Amerika' },       tags: { europe: 0, asia: 0, prestige: 2 } },
      { label: { en: 'Anywhere', ru: 'Не важно', uz: 'Farqi yo\'q' },  tags: {} }
    ]},
    { key: 'budget', q: { en: 'Tuition budget you are comfortable with?', ru: 'Комфортный бюджет на обучение?', uz: 'O\'qish uchun byudjet?' }, opts: [
      { label: { en: 'Under $5k / year', ru: 'До $5k / год', uz: '$5k dan kam' },     tags: { affordable: 3 } },
      { label: { en: '$5k – $15k',       ru: '$5k – $15k',  uz: '$5k – $15k' },       tags: { affordable: 1 } },
      { label: { en: '$15k – $30k',      ru: '$15k – $30k', uz: '$15k – $30k' },      tags: { prestige: 1 } },
      { label: { en: '$30k+',            ru: '$30k+',       uz: '$30k+' },            tags: { prestige: 2 } }
    ]},
    { key: 'english', q: { en: 'How strong is your English?', ru: 'Как вы знаете английский?', uz: 'Ingliz tilingiz qanday?' }, opts: [
      { label: { en: 'Fluent (IELTS 7+)',  ru: 'Свободно (IELTS 7+)',     uz: 'Yuqori (IELTS 7+)' },   tags: { english: 3 } },
      { label: { en: 'Good (IELTS 6)',     ru: 'Хорошо (IELTS 6)',        uz: 'Yaxshi (IELTS 6)' },    tags: { english: 2 } },
      { label: { en: 'Basic',              ru: 'Базовый',                 uz: 'Boshlang\'ich' },        tags: { english: 1 } },
      { label: { en: 'Prefer non-English', ru: 'Предпочту не-английский', uz: 'Ingliz tilisiz' },       tags: { english: 0 } }
    ]},
    { key: 'motivation', q: { en: 'What matters most for you?', ru: 'Что для вас важнее?', uz: 'Siz uchun nima muhim?' }, opts: [
      { label: { en: 'Top-ranked university', ru: 'Престижный университет', uz: 'Obro\'li universitet' }, tags: { prestige: 3 } },
      { label: { en: 'Tech / engineering',    ru: 'IT / инженерия',         uz: 'Texnologiya' },           tags: { tech: 3 } },
      { label: { en: 'Warm climate',          ru: 'Тёплый климат',          uz: 'Issiq iqlim' },           tags: { warm: 3 } },
      { label: { en: 'Scholarship-friendly',  ru: 'Много грантов',          uz: 'Grant imkoniyati' },      tags: { scholarship_focus: 3 } }
    ]},
    { key: 'vibe', q: { en: 'Final pick — your vibe:', ru: 'Ваш вайб:', uz: 'Vayb tanlovi:' }, opts: [
      { label: { en: 'K-pop and Seoul energy',     ru: 'K-pop и Сеул',            uz: 'K-pop va Seul' },     tags: { kpop: 3, asia: 2 } },
      { label: { en: 'Historic European streets',  ru: 'Исторические улицы ЕС',   uz: 'Yevropa ko\'chalari' }, tags: { europe: 2 } },
      { label: { en: 'Silicon Valley ambition',    ru: 'Амбиции Силиконовой долины', uz: 'Silikon vodiysi ruhi' }, tags: { tech: 2, prestige: 2 } },
      { label: { en: 'Warm sea, easy living',      ru: 'Тёплое море',             uz: 'Issiq dengiz' },       tags: { warm: 2, affordable: 2 } }
    ]}
  ];

  if (quizCard && quizBody) {
    let qIdx = 0;
    const score = {};
    const lang = () => (document.documentElement.lang || 'en').slice(0, 2);

    const renderProgress = () => {
      quizProgress.innerHTML = '';
      for (let i = 0; i < QUIZ.length + 1; i++) {
        const s = document.createElement('span');
        if (i < qIdx) s.className = 'done';
        else if (i === qIdx) s.className = 'current';
        quizProgress.appendChild(s);
      }
    };

    const renderQ = () => {
      if (qIdx >= QUIZ.length) { renderResult(); return; }
      const q = QUIZ[qIdx];
      const l = lang();
      quizBody.innerHTML =
        `<div class="quiz-question">${q.q[l] || q.q.en}</div>
         <div class="quiz-options">${q.opts.map((o, i) => `<button type="button" class="quiz-option" data-idx="${i}">${o.label[l] || o.label.en}</button>`).join('')}</div>`;
      renderProgress();
      $$('.quiz-option', quizBody).forEach(btn => on(btn, 'click', () => {
        const picked = q.opts[parseInt(btn.dataset.idx, 10)];
        Object.entries(picked.tags || {}).forEach(([k, v]) => { score[k] = (score[k] || 0) + v; });
        qIdx++;
        renderQ();
      }));
    };

    const scoreCountry = (c) => {
      const w = c.quiz_weight || {};
      let s = 0;
      Object.keys(score).forEach(k => { s += (w[k] || 0) * (score[k] || 0); });
      return s;
    };

    const renderResult = async () => {
      await loadCountries();
      const ranked = [...(countriesData.countries || [])]
        .map(c => ({ c, s: scoreCountry(c) }))
        .sort((a, b) => b.s - a.s)
        .slice(0, 3);
      const maxS = Math.max(1, ranked[0]?.s || 1);
      const l = lang();
      const i18n = {
        title: { en: 'Your top matches', ru: 'Ваши лучшие совпадения', uz: 'Sizga mos davlatlar' }[l] || 'Your top matches',
        book:  { en: 'Get a personalised plan', ru: 'Получить персональный план', uz: 'Shaxsiy reja olish' }[l] || 'Get a personalised plan',
        restart: { en: 'Take again', ru: 'Пройти ещё', uz: 'Qayta' }[l] || 'Take again'
      };
      quizBody.innerHTML = `
        <div class="quiz-result">
          <h3 class="quiz-question" style="margin-bottom:12px">${i18n.title}</h3>
          <div class="quiz-results-list">
            ${ranked.map(({ c, s }) => `
              <a class="quiz-match" href="countries/${c.slug}.html">
                <img src="assets/flags/${c.code}.svg" alt="${langName(c.name)}" />
                <div><strong>${langName(c.name)}</strong><small>${c.universities_count}+ partner universities · ${c.language}</small></div>
                <span class="score">${Math.round((s / maxS) * 100)}%</span>
              </a>`).join('')}
          </div>
          <div class="quiz-actions">
            <a href="#contact" class="btn btn-primary" data-ga-event="quiz_cta"><i data-lucide="send"></i><span>${i18n.book}</span></a>
            <button type="button" class="btn btn-ghost" id="quizRestart">${i18n.restart}</button>
          </div>
        </div>`;
      renderProgress();
      renderIcons(quizBody);
      gaEvent('quiz_complete', { top: ranked[0]?.c.slug, second: ranked[1]?.c.slug });
      on($('#quizRestart'), 'click', () => { qIdx = 0; Object.keys(score).forEach(k => delete score[k]); renderQ(); });
    };

    renderQ();
  }

  /* ------ Deadlines countdown ------ */
  const deadlinesGrid = $('#deadlinesGrid');
  if (deadlinesGrid) {
    loadCountries().then(() => {
      const all = [];
      (countriesData.countries || []).forEach(c => {
        (c.typical_deadlines || []).forEach(d => all.push({ country: c, ...d }));
      });
      // Sort ascending by date; show next 6 (future + most recent past)
      all.sort((a, b) => new Date(a.date) - new Date(b.date));
      const now = Date.now();
      const future = all.filter(d => new Date(d.date).getTime() > now).slice(0, 6);
      const show = future.length ? future : all.slice(0, 4);

      deadlinesGrid.innerHTML = show.map(d => `
        <article class="deadline-card" data-deadline="${d.date}">
          <strong>${d.label}</strong>
          <small>${langName(d.country.name)} · <time datetime="${d.date}">${d.date}</time></small>
          <div class="deadline-countdown" aria-live="polite" aria-atomic="true">
            <div><strong data-dd>0</strong><small data-i18n="deadlines.days">days</small></div>
            <div><strong data-hh>0</strong><small data-i18n="deadlines.hours">hours</small></div>
            <div><strong data-mm>0</strong><small data-i18n="deadlines.minutes">min</small></div>
            <div><strong data-ss>0</strong><small data-i18n="deadlines.seconds">sec</small></div>
          </div>
        </article>`).join('');

      const tick = () => {
        const t = Date.now();
        $$('.deadline-card', deadlinesGrid).forEach(card => {
          const when = new Date(card.dataset.deadline).getTime();
          let delta = Math.max(0, when - t);
          if (delta <= 0) { card.classList.add('deadline-passed'); return; }
          const d = Math.floor(delta / 86_400_000); delta -= d * 86_400_000;
          const h = Math.floor(delta / 3_600_000);  delta -= h * 3_600_000;
          const m = Math.floor(delta / 60_000);     delta -= m * 60_000;
          const s = Math.floor(delta / 1000);
          card.querySelector('[data-dd]').textContent = d;
          card.querySelector('[data-hh]').textContent = h;
          card.querySelector('[data-mm]').textContent = m;
          card.querySelector('[data-ss]').textContent = s;
        });
      };
      tick();
      setInterval(tick, 1000);
      // Re-apply i18n labels once available
      if (window.UGCi18n) window.UGCi18n.apply(window.UGCi18n.current || document.documentElement.lang || 'en');
    });
  }

})();
