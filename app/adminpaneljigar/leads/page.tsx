import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { getLeads, isSupabaseConfigured } from '@/lib/supabase';
import { LeadsClient } from './LeadsClient';
import { SupabaseDownNotice } from './SupabaseDownNotice';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  if (!(await isAdmin())) redirect('/adminpaneljigar/login');
  if (!isSupabaseConfigured()) return <SupabaseDownNotice />;

  const leads = await getLeads();
  return (
    <Suspense fallback={null}>
      <LeadsClient leads={leads} />
    </Suspense>
  );
}
