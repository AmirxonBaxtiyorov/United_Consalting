'use client';

import { useEffect } from 'react';

// The previous SW caused "This page couldn't load" errors for some visitors
// after deploys (it returned a 503 fallback when intercepted fetches stalled).
// We now ship a kill-switch sw.js that unregisters itself, and we no longer
// register a new one from the client.
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((r) => r.unregister().catch(() => {})))
      .catch(() => {});

    if ('caches' in window) {
      caches
        .keys()
        .then((keys) => keys.forEach((k) => caches.delete(k).catch(() => {})))
        .catch(() => {});
    }
  }, []);

  return null;
}
