'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  readConsent,
  writeConsent,
  type ConsentValue,
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

const getSnapshot = (): ConsentValue | null => readConsent();
const getServerSnapshot = (): ConsentValue | null => null;

export function CookieConsent() {
  const t = useTranslations('widgets');
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const decide = useCallback((value: ConsentValue) => {
    writeConsent(value);
  }, []);

  if (stored !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('cookies_title')}
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
