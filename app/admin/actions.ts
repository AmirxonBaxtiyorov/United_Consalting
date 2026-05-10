'use server';

import { redirect } from 'next/navigation';
import { clearAdminCookie } from '@/lib/admin-auth';

export async function logoutAction() {
  await clearAdminCookie();
  redirect('/admin/login');
}
