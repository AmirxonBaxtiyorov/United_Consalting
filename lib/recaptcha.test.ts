import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { verifyRecaptcha } from './recaptcha';

const origFetch = globalThis.fetch;
const origSecret = process.env.RECAPTCHA_SECRET_KEY;

describe('verifyRecaptcha', () => {
  beforeEach(() => {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';
  });
  afterEach(() => {
    globalThis.fetch = origFetch;
    if (origSecret === undefined) delete process.env.RECAPTCHA_SECRET_KEY;
    else process.env.RECAPTCHA_SECRET_KEY = origSecret;
  });

  it('passes through when no secret is configured', async () => {
    delete process.env.RECAPTCHA_SECRET_KEY;
    const r = await verifyRecaptcha('any-token');
    expect(r.ok).toBe(true);
    expect(r.score).toBe(1);
  });

  it('rejects when token is missing', async () => {
    const r = await verifyRecaptcha(null);
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('missing_token');
  });

  it('accepts a valid score above 0.5', async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ success: true, score: 0.9, action: 'contact_form' }), {
        status: 200,
      })
    ) as typeof fetch;
    const r = await verifyRecaptcha('tok', 'contact_form');
    expect(r.ok).toBe(true);
    expect(r.score).toBe(0.9);
  });

  it('rejects when action mismatches', async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ success: true, score: 0.9, action: 'other' }), {
        status: 200,
      })
    ) as typeof fetch;
    const r = await verifyRecaptcha('tok', 'contact_form');
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('wrong_action');
  });

  it('rejects when score is below threshold', async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ success: true, score: 0.3, action: 'contact_form' }), {
        status: 200,
      })
    ) as typeof fetch;
    const r = await verifyRecaptcha('tok', 'contact_form');
    expect(r.ok).toBe(false);
    expect(r.reason).toBe('low_score');
  });

  it('returns failure with error-codes when Google rejects', async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ success: false, 'error-codes': ['timeout-or-duplicate'] }), {
        status: 200,
      })
    ) as typeof fetch;
    const r = await verifyRecaptcha('bad');
    expect(r.ok).toBe(false);
    expect(r.reason).toContain('timeout');
  });

  it('fails open when network errors (does not block legitimate users)', async () => {
    globalThis.fetch = vi.fn(async () => {
      throw new Error('boom');
    }) as typeof fetch;
    const r = await verifyRecaptcha('tok');
    expect(r.ok).toBe(true);
    expect(r.reason).toBe('verify_failed');
  });
});
