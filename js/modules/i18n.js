/* =========================================================
   i18n module — UZ/RU/EN switcher with JSON dictionaries
   ========================================================= */
(function (global) {
  'use strict';

  const SUPPORTED = ['uz', 'ru', 'en'];
  const DEFAULT_LANG = 'ru';
  const STORAGE_KEY = 'ugc_lang';
  const dictCache = Object.create(null);

  const detectLang = () => {
    try {
      const url = new URLSearchParams(location.search).get('lang');
      if (url && SUPPORTED.includes(url.toLowerCase())) return url.toLowerCase();
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
      const nav = (navigator.language || 'ru').slice(0, 2).toLowerCase();
      if (SUPPORTED.includes(nav)) return nav;
    } catch (_) {}
    return DEFAULT_LANG;
  };

  const loadDict = async (lang) => {
    if (dictCache[lang]) return dictCache[lang];
    const res = await fetch(`i18n/${lang}.json`, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`i18n ${lang} failed`);
    const json = await res.json();
    dictCache[lang] = json;
    return json;
  };

  const getValue = (dict, path) => {
    return path.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), dict);
  };

  const applyDict = (dict) => {
    // Text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getValue(dict, key);
      if (typeof val === 'string') {
        if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
        else el.textContent = val;
      }
    });
    // Attributes: data-i18n-attr="placeholder:form.name_placeholder,aria-label:nav.menu_open"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const pairs = el.getAttribute('data-i18n-attr').split(',');
      pairs.forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (!attr || !key) return;
        const val = getValue(dict, key);
        if (typeof val === 'string') el.setAttribute(attr, val);
      });
    });
    // Title + meta description
    if (dict.meta) {
      if (dict.meta.title) document.title = dict.meta.title;
      const mDesc = document.querySelector('meta[name="description"]');
      if (mDesc && dict.meta.description) mDesc.setAttribute('content', dict.meta.description);
      const ogLocale = document.querySelector('meta[property="og:locale"]');
      if (ogLocale && dict.meta.og_locale) ogLocale.setAttribute('content', dict.meta.og_locale);
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && dict.meta.title) ogTitle.setAttribute('content', dict.meta.title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc && dict.meta.description) ogDesc.setAttribute('content', dict.meta.description);
    }
  };

  const applyLang = async (lang) => {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    try {
      const dict = await loadDict(lang);
      applyDict(dict);
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-lang', lang);
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
      // Update lang button label
      const label = document.getElementById('currentLang');
      if (label) label.textContent = lang.toUpperCase();
      // Highlight active item in dropdown
      document.querySelectorAll('.lang-dropdown [data-lang]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang.toLowerCase() === lang);
      });
      // Fire event
      document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang, dict } }));
      return dict;
    } catch (err) {
      console.warn('[i18n] load failed', err);
      return null;
    }
  };

  global.UGCi18n = {
    detect: detectLang,
    apply: applyLang,
    supported: SUPPORTED,
    default: DEFAULT_LANG,
    get current() { return document.documentElement.lang || DEFAULT_LANG; },
    t(path, lang) {
      const d = dictCache[lang || this.current];
      return d ? (getValue(d, path) || '') : '';
    }
  };
})(window);
