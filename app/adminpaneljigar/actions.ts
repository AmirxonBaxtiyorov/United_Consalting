'use server';

import { redirect } from 'next/navigation';
import { clearAdminCookie } from '@/lib/admin-auth';
import { logActivity } from '@/lib/supabase';

export async function logoutAction() {
  await logActivity({ action: 'auth.logout' });
  await clearAdminCookie();
  redirect('/adminpaneljigar/login');
}
