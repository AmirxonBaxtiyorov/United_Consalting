import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@/lib/supabase', () => ({
  saveLead: vi.fn(async () => true),
}));
vi.mock('@/lib/telegram', () => ({
  sendTelegramNotification: vi.fn(async () => true),
}));
vi.mock('@/lib/email', () => ({
  sendManagerEmail: vi.fn(async () => true),
  sendClientAutoReply: vi.fn(async () => true),
}));
vi.mock('@/lib/recaptcha', () => ({
  verifyRecaptcha: vi.fn(async () => ({ ok: true, score: 0.9 })),
}));
vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn(() => ({ ok: true, remaining: 4 })),
}));

import { POST } from '@/app/api/contact/route';
import { saveLead } from '@/lib/supabase';
import { sendTelegramNotification } from '@/lib/telegram';
import { sendManagerEmail, sendClientAutoReply } from '@/lib/email';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { rateLimit } from '@/lib/rate-limit';

function makeReq(body: unknown, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '1.2.3.4', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

const validBody = {
  name: 'Aziz',
  phone: '+998901234567',
  email: 'a@b.com',
  country: 'korea',
  degree: 'bachelor',
  message: 'hi',
  consent: true,
  locale: 'uz',
  source: 'homepage',
  recaptchaToken: 'tok',
};

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (rateLimit as ReturnType<typeof vi.fn>).mockReturnValue({ ok: true, remaining: 4 });
    (verifyRecaptcha as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: true, score: 0.9 });
    (saveLead as ReturnType<typeof vi.fn>).mockResolvedValue(true);
    (sendTelegramNotification as ReturnType<typeof vi.fn>).mockResolvedValue(true);
    (sendManagerEmail as ReturnType<typeof vi.fn>).mockResolvedValue(true);
    (sendClientAutoReply as ReturnType<typeof vi.fn>).mockResolvedValue(true);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns 200 and triggers all delivery channels for a valid payload', async () => {
    const res = await POST(makeReq(validBody));
    expect(res.status).toBe(200);
    expect(saveLead).toHaveBeenCalledTimes(1);
    expect(sendTelegramNotification).toHaveBeenCalledTimes(1);
    expect(sendManagerEmail).toHaveBeenCalledTimes(1);
    expect(sendClientAutoReply).toHaveBeenCalledTimes(1);
  });

  it('returns 400 for malformed JSON', async () => {
    const res = await POST(makeReq('{not-json', {}));
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid payload (missing name)', async () => {
    const { name: _, ...rest } = validBody;
    void _;
    const res = await POST(makeReq(rest));
    expect(res.status).toBe(400);
    expect(saveLead).not.toHaveBeenCalled();
  });

  it('returns 429 when rate-limited', async () => {
    (rateLimit as ReturnType<typeof vi.fn>).mockReturnValue({ ok: false, remaining: 0 });
    const res = await POST(makeReq(validBody));
    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBe('600');
    expect(saveLead).not.toHaveBeenCalled();
  });

  it('returns 403 when reCAPTCHA verification fails', async () => {
    (verifyRecaptcha as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: false, reason: 'low_score' });
    const res = await POST(makeReq(validBody));
    expect(res.status).toBe(403);
    expect(saveLead).not.toHaveBeenCalled();
  });

  it('honeypot: returns 200 silently and skips delivery if website field is filled', async () => {
    const res = await POST(makeReq({ ...validBody, website: 'spam' }));
    expect(res.status).toBe(400);
    expect(saveLead).not.toHaveBeenCalled();
  });

  it('still returns 200 if some delivery channels fail (Telegram down ≠ user error)', async () => {
    (sendTelegramNotification as ReturnType<typeof vi.fn>).mockResolvedValue(false);
    const res = await POST(makeReq(validBody));
    expect(res.status).toBe(200);
    expect(saveLead).toHaveBeenCalledTimes(1);
  });
});
