import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { getLeads, isSupabaseConfigured } from '@/lib/supabase';
import { LeadCard } from './LeadCard';
import { Database, Inbox } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  if (!(await isAdmin())) redirect('/admin/login');

  if (!isSupabaseConfigured()) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-center">
        <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-warning/15 text-warning mb-4">
          <Database className="size-7" />
        </div>
        <h1 className="text-2xl font-bold">Supabase ulanmagan</h1>
        <p className="mt-2 text-muted-fg">
          Vercel loyiha sozlamalarida quyidagi env-larni qo&apos;shing:
        </p>
        <pre className="mt-4 text-left text-xs bg-muted rounded-xl p-4 overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...`}
        </pre>
        <p className="mt-3 text-xs text-muted-fg">
          Supabase Dashboard → Project Settings → API bo&apos;limidan oling.
        </p>
      </div>
    );
  }

  const leads = await getLeads();
  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">So&apos;rovnomalar</h1>
          <p className="text-sm text-muted-fg mt-1">
            Jami: {leads.length} ta · Yangi: {counts.new ?? 0} · Bog&apos;lanildi: {counts.contacted ?? 0} · Yutuq: {counts.won ?? 0}
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-3xl bg-[var(--color-surface)] border border-border p-10 text-center">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-muted text-muted-fg mb-3">
            <Inbox className="size-7" />
          </div>
          <h2 className="text-lg font-semibold">Hozircha so&apos;rovnomalar yo&apos;q</h2>
          <p className="text-sm text-muted-fg mt-1">
            Mijoz formani to&apos;ldirgach, bu yerda paydo bo&apos;ladi.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}
