'use server';

import { redirect } from 'next/navigation';
import { setAdminCookie, verifyCredentials, isAdminConfigured } from '@/lib/admin-auth';
import { logActivity } from '@/lib/supabase';

export type LoginState = { error?: string };

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: 'Tizim sozlanmagan. Administrator bilan bog\'laning.' };
  }
  const login = String(formData.get('login') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();
  if (!login || !password) return { error: 'Login va parolni kiriting.' };
  if (!verifyCredentials(login, password)) {
    await logActivity({ action: 'auth.login_failed', target_label: login });
    return { error: 'Login yoki parol noto\'g\'ri.' };
  }
  await setAdminCookie();
  await logActivity({ action: 'auth.login', target_label: login });
  redirect('/adminpaneljigar/dashboard');
}
