'use client';

import { useSyncExternalStore } from 'react';
import Script from 'next/script';
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  hasAnalyticsConsent,
} from '@/lib/consent';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_STORAGE_KEY) callback();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

const getSnapshot = (): boolean => hasAnalyticsConsent();
const getServerSnapshot = (): boolean => false;

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const ymId = process.env.NEXT_PUBLIC_YM_ID;
  const allowed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!allowed) return null;

  return (
    <>
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {ymId && (
        <Script id="ym-init" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${ymId}', 'ym');
            ym(${ymId}, 'init', { ssr: true, webvisor: true, clickmap: true, accurateTrackBounce: true, trackLinks: true });
          `}
        </Script>
      )}
    </>
  );
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;
  const w = window as unknown as {
    gtag?: (cmd: string, name: string, params?: EventParams) => void;
    ym?: (id: number, action: string, name: string, params?: EventParams) => void;
  };
  w.gtag?.('event', name, params);
  const ymId = Number(process.env.NEXT_PUBLIC_YM_ID);
  if (ymId) w.ym?.(ymId, 'reachGoal', name, params);
}
