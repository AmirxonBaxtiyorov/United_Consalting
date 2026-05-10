import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { getPartners, isSupabaseConfigured } from '@/lib/supabase';
import { SupabaseDownNotice } from '../../leads/SupabaseDownNotice';
import { PartnersClient } from './PartnersClient';

export const dynamic = 'force-dynamic';

export default async function PartnersAdminPage() {
  if (!(await isAdmin())) redirect('/adminpaneljigar/login');
  if (!isSupabaseConfigured()) return <SupabaseDownNotice />;

  const partners = await getPartners(true);
  return <PartnersClient partners={partners} />;
}
