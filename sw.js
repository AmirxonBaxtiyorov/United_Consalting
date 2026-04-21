/* Service Worker for United Global Consulting PWA */
const CACHE = 'ugc-static-v2';
const OFFLINE_URL = 'offline.html';
const PRECACHE = [
  './',
  'index.html',
  'privacy.html',
  'terms.html',
  'thank-you.html',
  '404.html',
  'offline.html',
  'css/styles.css',
  'css/animations.css',
  'css/enhancements.css',
  'js/main.js',
  'js/modules/i18n.js',
  'i18n/uz.json',
  'i18n/ru.json',
  'i18n/en.json',
  'data/countries.json',
  'GLODAL.png',
  'favicon.svg',
  'manifest.webmanifest',
  'assets/flags/kr.svg',
  'assets/flags/sg.svg',
  'assets/flags/us.svg',
  'assets/flags/it.svg',
  'assets/flags/lu.svg',
  'assets/flags/fi.svg',
  'assets/flags/tr.svg',
  'assets/flags/jp.svg',
  'assets/flags/lv.svg',
  'assets/flags/my.svg',
  'countries/korea.html',
  'countries/singapore.html',
  'countries/usa.html',
  'countries/italy.html',
  'countries/luxembourg.html',
  'countries/finland.html',
  'countries/turkey.html',
  'countries/japan.html',
  'countries/latvia.html',
  'countries/malaysia.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Only handle same-origin + flagcdn/fonts/unsplash with stale-while-revalidate
  const isSameOrigin = url.origin === self.location.origin;
  const isStaticThirdParty = /flagcdn\.com|fonts\.(googleapis|gstatic)\.com|images\.unsplash\.com/.test(url.host);

  if (req.mode === 'navigate') {
    // Network-first for HTML pages, fallback to offline
    event.respondWith(
      fetch(req).catch(() => caches.match(req).then((r) => r || caches.match(OFFLINE_URL)))
    );
    return;
  }

  if (isSameOrigin || isStaticThirdParty) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
  }
});
