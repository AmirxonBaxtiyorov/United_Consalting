'use server';

import { redirect } from 'next/navigation';
import { setAdminCookie, verifyCredentials, isAdminConfigured } from '@/lib/admin-auth';

export type LoginState = { error?: string };

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: 'Tizim sozlanmagan. Administrator bilan bog\'laning.' };
  }
  const login = String(formData.get('login') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  if (!login || !password) return { error: 'Login va parolni kiriting.' };
  if (!verifyCredentials(login, password)) return { error: 'Login yoki parol noto\'g\'ri.' };
  await setAdminCookie();
  redirect('/adminpaneljigar/leads');
}
