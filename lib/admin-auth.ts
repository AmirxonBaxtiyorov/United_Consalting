import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'ugc_admin';
const MAX_AGE_DAYS = 30;
const DEFAULT_LOGIN = 'admin';

function getLogin(): string {
  return (process.env.ADMIN_LOGIN || DEFAULT_LOGIN).trim();
}

function getPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 4) return null;
  return pw;
}

export function isAdminConfigured(): boolean {
  return getPassword() !== null;
}

function tokenFor(login: string, password: string): string {
  return createHmac('sha256', password).update(`ugc-admin-v2:${login}`).digest('hex');
}

function safeEqualStr(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function verifyCredentials(loginInput: string, passwordInput: string): boolean {
  const password = getPassword();
  if (!password) return false;
  return (
    safeEqualStr(loginInput, getLogin()) &&
    safeEqualStr(passwordInput, password)
  );
}

export async function setAdminCookie(): Promise<void> {
  const password = getPassword();
  if (!password) return;
  const store = await cookies();
  store.set(COOKIE_NAME, tokenFor(getLogin(), password), {
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
  const expected = tokenFor(getLogin(), password);
  return safeEqualStr(value, expected);
}
