import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(25)
    .regex(/^[+()\d\s-]{7,}$/, 'Invalid phone format'),
  email: z.string().trim().email().optional().or(z.literal('')),
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
