'use client';

import Script from 'next/script';

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const ymId = process.env.NEXT_PUBLIC_YM_ID;

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
  const w = window as unknown as {
    gtag?: (cmd: string, name: string, params?: EventParams) => void;
    ym?: (id: number, action: string, name: string, params?: EventParams) => void;
  };
  w.gtag?.('event', name, params);
  const ymId = Number(process.env.NEXT_PUBLIC_YM_ID);
  if (ymId) w.ym?.(ymId, 'reachGoal', name, params);
}
