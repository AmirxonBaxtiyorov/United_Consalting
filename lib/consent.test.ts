import { describe, it, expect, beforeEach } from 'vitest';
import {
  CONSENT_STORAGE_KEY,
  hasAnalyticsConsent,
  readConsent,
  writeConsent,
  clearConsent,
} from './consent';

class MemoryStorage {
  private map = new Map<string, string>();
  getItem(k: string) { return this.map.get(k) ?? null; }
  setItem(k: string, v: string) { this.map.set(k, v); }
  removeItem(k: string) { this.map.delete(k); }
  clear() { this.map.clear(); }
  key() { return null; }
  get length() { return this.map.size; }
}

describe('consent', () => {
  beforeEach(() => {
    const storage = new MemoryStorage();
    Object.defineProperty(globalThis, 'window', {
      value: {
        localStorage: storage,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      },
      configurable: true,
    });
    Object.defineProperty(globalThis, 'localStorage', {
      value: storage,
      configurable: true,
    });
    (globalThis as unknown as { CustomEvent: typeof CustomEvent }).CustomEvent =
      class<T> {
        type: string;
        detail: T;
        constructor(type: string, init?: { detail: T }) {
          this.type = type;
          this.detail = (init?.detail as T);
        }
      } as unknown as typeof CustomEvent;
  });

  it('returns null when nothing stored', () => {
    expect(readConsent()).toBe(null);
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it('stores and reads "all"', () => {
    writeConsent('all');
    expect(readConsent()).toBe('all');
    expect(hasAnalyticsConsent()).toBe(true);
  });

  it('stores and reads "essential" without granting analytics', () => {
    writeConsent('essential');
    expect(readConsent()).toBe('essential');
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it('clearConsent removes the value', () => {
    writeConsent('all');
    clearConsent();
    expect(readConsent()).toBe(null);
  });

  it('storage key is stable across versions', () => {
    expect(CONSENT_STORAGE_KEY).toBe('ugc_cookie_consent_v1');
  });
});
