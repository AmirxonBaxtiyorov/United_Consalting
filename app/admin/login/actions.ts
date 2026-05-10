'use server';

import { redirect } from 'next/navigation';
import { setAdminCookie, verifyPassword, isAdminConfigured } from '@/lib/admin-auth';

export type LoginState = { error?: string };

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: 'ADMIN_PASSWORD env-i sozlanmagan. Vercel da .env ga qo\'shing.' };
  }
  const password = String(formData.get('password') ?? '');
  if (!password) return { error: 'Parol kiriting.' };
  if (!verifyPassword(password)) return { error: 'Parol notog\'ri.' };
  await setAdminCookie();
  redirect('/admin/leads');
}
