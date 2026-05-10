import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'ugc_admin';
const MAX_AGE_DAYS = 30;

function getPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 4) return null;
  return pw;
}

export function isAdminConfigured(): boolean {
  return getPassword() !== null;
}

function tokenFor(password: string): string {
  return createHmac('sha256', password).update('ugc-admin-v1').digest('hex');
}

export function verifyPassword(input: string): boolean {
  const password = getPassword();
  if (!password) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(password);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function setAdminCookie(): Promise<void> {
  const password = getPassword();
  if (!password) return;
  const store = await cookies();
  store.set(COOKIE_NAME, tokenFor(password), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_DAYS * 24 * 60 * 60,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdmin(): Promise<boolean> {
  const password = getPassword();
  if (!password) return false;
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;
  const expected = tokenFor(password);
  if (value.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  } catch {
    return false;
  }
}
