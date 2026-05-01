'use client';

import { useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'ugc_cookie_consent_v1';

function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

const getStoredServer = () => null;

export function CookieConsent() {
  const t = useTranslations('widgets');
  const stored = useSyncExternalStore(subscribeStorage, getStored, getStoredServer);
  const [dismissed, setDismissed] = useState(false);

  const visible = stored === null && !dismissed;

  const decide = (value: 'all' | 'essential') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 rounded-2xl bg-primary text-white shadow-[var(--shadow-card-hover)] p-5 border border-white/10"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/20 text-accent shrink-0">
          <Cookie className="size-5" />
        </span>
        <div className="flex-1">
          <div className="font-semibold">{t('cookies_title')}</div>
          <p className="mt-1 text-sm text-white/80">{t('cookies_body')}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => decide('all')}>
              {t('cookies_accept')}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => decide('essential')}
            >
              {t('cookies_decline')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
