import { z } from 'zod';

// Telegram username (@user, user, t.me/user) or a phone number.
export const TELEGRAM_RE =
  /^(?:@?[A-Za-z0-9_]{4,32}|(?:https?:\/\/)?t\.me\/[A-Za-z0-9_]{4,32}|\+?[\d\s()-]{7,25})$/;

/** '' → null · any username form → '@user' · phone → digits with a leading + */
export function normalizeTelegram(value?: string | null): string | null {
  const raw = value?.trim();
  if (!raw) return null;
  const username = raw.replace(/^(?:https?:\/\/)?(?:www\.)?t\.me\//i, '').replace(/^@/, '');
  if (/^[A-Za-z0-9_]{4,32}$/.test(username) && /[A-Za-z_]/.test(username)) {
    return `@${username}`;
  }
  const digits = raw.replace(/[^\d]/g, '');
  return digits ? `+${digits}` : null;
}

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(25)
    .regex(/^[+()\d\s-]{7,}$/, 'Invalid phone format'),
  email: z.string().trim().email().optional().or(z.literal('')),
  telegram: z
    .string()
    .trim()
    .max(64)
    .regex(TELEGRAM_RE, 'Invalid telegram')
    .optional()
    .or(z.literal('')),
  country: z.string().trim().max(50).optional().or(z.literal('')),
  degree: z
    .enum(['bachelor', 'master', 'phd', 'language', 'undecided'])
    .optional(),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  consent: z.literal(true).or(z.literal('true')).or(z.literal('on')),
  locale: z.enum(['ru', 'uz', 'en']).optional(),
  source: z.string().max(100).optional(),
  // honeypot
  website: z.string().max(0).optional().or(z.literal('')),
  recaptchaToken: z.string().optional().nullable(),
});

export type ContactInput = z.infer<typeof contactSchema>;
