/* eslint-disable */
// United Global Consulting — Service Worker (kill switch)
// Previous versions intercepted navigation and returned a 503 fallback when
// fetches stalled, which surfaced as Chrome's "This page couldn't load" error
// for visitors with a stale SW installed. This version unregisters itself
// and clears caches so navigation always goes straight to the network.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch (_) {}
      try {
        await self.registration.unregister();
      } catch (_) {}
      try {
        const clients = await self.clients.matchAll({ type: 'window' });
        for (const client of clients) {
          client.navigate(client.url).catch(() => {});
        }
      } catch (_) {}
    })()
  );
});
