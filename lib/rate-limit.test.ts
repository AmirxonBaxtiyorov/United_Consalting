import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { rateLimit } from './rate-limit';

describe('rateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows the first 5 hits from the same IP', () => {
    const ip = `1.1.1.${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      const r = rateLimit(ip);
      expect(r.ok).toBe(true);
    }
  });

  it('blocks the 6th hit within the window', () => {
    const ip = `1.1.1.${Math.random()}`;
    for (let i = 0; i < 5; i++) rateLimit(ip);
    const sixth = rateLimit(ip);
    expect(sixth.ok).toBe(false);
    expect(sixth.remaining).toBe(0);
  });

  it('isolates buckets per IP', () => {
    const a = `2.2.2.${Math.random()}`;
    const b = `3.3.3.${Math.random()}`;
    for (let i = 0; i < 5; i++) rateLimit(a);
    expect(rateLimit(a).ok).toBe(false);
    expect(rateLimit(b).ok).toBe(true);
  });

  it('resets the bucket after the 10-minute window', () => {
    const ip = `4.4.4.${Math.random()}`;
    for (let i = 0; i < 5; i++) rateLimit(ip);
    expect(rateLimit(ip).ok).toBe(false);
    vi.advanceTimersByTime(11 * 60 * 1000);
    const after = rateLimit(ip);
    expect(after.ok).toBe(true);
    expect(after.remaining).toBe(4);
  });

  it('reports decreasing remaining count', () => {
    const ip = `5.5.5.${Math.random()}`;
    expect(rateLimit(ip).remaining).toBe(4);
    expect(rateLimit(ip).remaining).toBe(3);
    expect(rateLimit(ip).remaining).toBe(2);
    expect(rateLimit(ip).remaining).toBe(1);
    expect(rateLimit(ip).remaining).toBe(0);
  });
});
