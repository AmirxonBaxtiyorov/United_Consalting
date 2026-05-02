/* eslint-disable */
// United Global Consulting — Service Worker
// Strategy:
//  - Static Next.js assets (/_next/static/*) → cache-first
//  - Navigation requests → network-first, fall back to /offline when offline
//  - Other requests → just go to network (no caching)

const VERSION = 'v1';
const STATIC_CACHE = `ugc-static-${VERSION}`;
const OFFLINE_URL = '/offline';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      try {
        await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
      } catch (_) {
        // ignore — offline page will be added on first online navigation
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Static Next.js assets — cache-first
  if (sameOrigin && url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(req, copy));
            return res;
          })
      )
    );
    return;
  }

  // Navigation requests — network-first with offline fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          return fresh;
        } catch (_) {
          const cache = await caches.open(STATIC_CACHE);
          const cached = await cache.match(OFFLINE_URL);
          return (
            cached ||
            new Response('Offline', { status: 503, statusText: 'Offline' })
          );
        }
      })()
    );
  }
});
