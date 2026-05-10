import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { getActivity, isSupabaseConfigured } from '@/lib/supabase';
import { SupabaseDownNotice } from '../leads/SupabaseDownNotice';
import { ActivityClient } from './ActivityClient';

export const dynamic = 'force-dynamic';

export default async function ActivityPage() {
  if (!(await isAdmin())) redirect('/adminpaneljigar/login');
  if (!isSupabaseConfigured()) return <SupabaseDownNotice />;

  const items = await getActivity(500);
  return <ActivityClient items={items} />;
}
