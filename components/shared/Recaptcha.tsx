'use client';

import Script from 'next/script';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function RecaptchaLoader() {
  if (!SITE_KEY) return null;
  return (
    <Script
      strategy="afterInteractive"
      src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
    />
  );
}

export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (!SITE_KEY) return null;
  if (typeof window === 'undefined' || !window.grecaptcha) return null;

  return new Promise<string | null>((resolve) => {
    window.grecaptcha!.ready(async () => {
      try {
        const token = await window.grecaptcha!.execute(SITE_KEY!, { action });
        resolve(token);
      } catch {
        resolve(null);
      }
    });
  });
}
