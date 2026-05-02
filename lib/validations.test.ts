import { describe, it, expect } from 'vitest';
import { contactSchema } from './validations';

const base = {
  name: 'Ali',
  phone: '+998 90 123 45 67',
  consent: true,
};

describe('contactSchema', () => {
  it('accepts a minimal valid payload', () => {
    const r = contactSchema.safeParse(base);
    expect(r.success).toBe(true);
  });

  it('rejects names shorter than 2 chars', () => {
    const r = contactSchema.safeParse({ ...base, name: 'A' });
    expect(r.success).toBe(false);
  });

  it('rejects names longer than 100 chars', () => {
    const r = contactSchema.safeParse({ ...base, name: 'a'.repeat(101) });
    expect(r.success).toBe(false);
  });

  it('rejects malformed phone numbers', () => {
    const r = contactSchema.safeParse({ ...base, phone: 'not-a-phone' });
    expect(r.success).toBe(false);
  });

  it('accepts an optional empty email', () => {
    const r = contactSchema.safeParse({ ...base, email: '' });
    expect(r.success).toBe(true);
  });

  it('rejects an invalid email when provided', () => {
    const r = contactSchema.safeParse({ ...base, email: 'not-email' });
    expect(r.success).toBe(false);
  });

  it('rejects unknown degree values', () => {
    const r = contactSchema.safeParse({ ...base, degree: 'unknown' });
    expect(r.success).toBe(false);
  });

  it('accepts allowed degree values', () => {
    for (const d of ['bachelor', 'master', 'phd', 'language', 'undecided'] as const) {
      const r = contactSchema.safeParse({ ...base, degree: d });
      expect(r.success).toBe(true);
    }
  });

  it('rejects messages over 2000 chars', () => {
    const r = contactSchema.safeParse({ ...base, message: 'x'.repeat(2001) });
    expect(r.success).toBe(false);
  });

  it('rejects when consent is missing', () => {
    const { consent: _c, ...rest } = base;
    void _c;
    const r = contactSchema.safeParse(rest);
    expect(r.success).toBe(false);
  });

  it('accepts honeypot when empty, rejects when filled', () => {
    expect(contactSchema.safeParse({ ...base, website: '' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, website: 'spam.com' }).success).toBe(false);
  });

  it('accepts allowed locales only', () => {
    expect(contactSchema.safeParse({ ...base, locale: 'ru' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, locale: 'uz' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, locale: 'en' }).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, locale: 'de' }).success).toBe(false);
  });

  it('strips/trims whitespace on name and phone', () => {
    const r = contactSchema.safeParse({ ...base, name: '  Ali  ', phone: '  +998901234567  ' });
    expect(r.success).toBe(true);
    if (r.success) {
      expect(r.data.name).toBe('Ali');
      expect(r.data.phone).toBe('+998901234567');
    }
  });
});
