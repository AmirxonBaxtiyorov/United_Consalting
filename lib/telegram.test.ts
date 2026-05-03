import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendTelegramNotification } from './telegram';

const origFetch = globalThis.fetch;
const origToken = process.env.TELEGRAM_BOT_TOKEN;
const origChat = process.env.TELEGRAM_CHAT_ID;

const lead = {
  name: 'Aziz',
  phone: '+998901234567',
  email: 'a@b.com',
  country: 'korea',
  degree: 'bachelor',
  message: 'Hi <there>',
  source: 'homepage',
  locale: 'uz',
};

describe('sendTelegramNotification', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = 'test-token';
    process.env.TELEGRAM_CHAT_ID = '-100123';
  });
  afterEach(() => {
    globalThis.fetch = origFetch;
    if (origToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN;
    else process.env.TELEGRAM_BOT_TOKEN = origToken;
    if (origChat === undefined) delete process.env.TELEGRAM_CHAT_ID;
    else process.env.TELEGRAM_CHAT_ID = origChat;
  });

  it('returns false when token or chat id is missing', async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    expect(await sendTelegramNotification(lead)).toBe(false);
  });

  it('posts to the Telegram sendMessage endpoint with HTML parse mode', async () => {
    const fetchSpy = vi.fn(async () => new Response('{}', { status: 200 })) as typeof fetch;
    globalThis.fetch = fetchSpy;
    const ok = await sendTelegramNotification(lead);
    expect(ok).toBe(true);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = (fetchSpy as unknown as { mock: { calls: [string, RequestInit][] } }).mock.calls[0];
    expect(url).toBe('https://api.telegram.org/bottest-token/sendMessage');
    expect(init.method).toBe('POST');
    const body = JSON.parse(init.body as string);
    expect(body.chat_id).toBe('-100123');
    expect(body.parse_mode).toBe('HTML');
    expect(body.disable_web_page_preview).toBe(true);
  });

  it('escapes HTML metacharacters in lead fields', async () => {
    const fetchSpy = vi.fn(async () => new Response('{}', { status: 200 })) as typeof fetch;
    globalThis.fetch = fetchSpy;
    await sendTelegramNotification({ ...lead, name: '<script>', message: 'a & b' });
    const init = (fetchSpy as unknown as { mock: { calls: [string, RequestInit][] } }).mock.calls[0][1];
    const body = JSON.parse(init.body as string);
    expect(body.text).not.toContain('<script>');
    expect(body.text).toContain('&lt;script&gt;');
    expect(body.text).toContain('a &amp; b');
  });

  it('returns false when Telegram returns non-OK status', async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response('{}', { status: 400 })
    ) as typeof fetch;
    expect(await sendTelegramNotification(lead)).toBe(false);
  });

  it('returns false on network error (does not throw)', async () => {
    globalThis.fetch = vi.fn(async () => {
      throw new Error('boom');
    }) as typeof fetch;
    expect(await sendTelegramNotification(lead)).toBe(false);
  });

  it('omits optional fields when not provided', async () => {
    const fetchSpy = vi.fn(async () => new Response('{}', { status: 200 })) as typeof fetch;
    globalThis.fetch = fetchSpy;
    await sendTelegramNotification({ name: 'A', phone: '+998000' });
    const init = (fetchSpy as unknown as { mock: { calls: [string, RequestInit][] } }).mock.calls[0][1];
    const body = JSON.parse(init.body as string);
    expect(body.text).not.toContain('Email:');
    expect(body.text).not.toContain('Country:');
    expect(body.text).not.toContain('Degree:');
    expect(body.text).not.toContain('Message:');
  });
});
