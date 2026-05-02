export const CONSENT_STORAGE_KEY = 'ugc_cookie_consent_v1';
export const CONSENT_EVENT = 'ugc:consent-changed';

export type ConsentValue = 'all' | 'essential';

export function readConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === 'all' || v === 'essential' ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
    window.dispatchEvent(
      new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value })
    );
  } catch {}
}

export function clearConsent() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
  } catch {}
}

export function hasAnalyticsConsent(): boolean {
  return readConsent() === 'all';
}
