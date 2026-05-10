import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { getLeads, getActivity, isSupabaseConfigured } from '@/lib/supabase';
import { SupabaseDownNotice } from '../leads/SupabaseDownNotice';
import { StatCard } from './StatCard';
import { CountryBreakdown } from './CountryBreakdown';
import { RecentActivity } from './RecentActivity';
import { Inbox, PhoneCall, BadgeCheck, Trophy, X, Calendar } from 'lucide-react';
import type { LeadRow } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function computeRecentCounts(leads: LeadRow[]): { todayCount: number; weekCount: number } {
  const now = Date.now();
  const dayMs = 86_400_000;
  let today = 0;
  let week = 0;
  for (const l of leads) {
    const diff = now - new Date(l.created_at).getTime();
    if (diff < dayMs) today += 1;
    if (diff < 7 * dayMs) week += 1;
  }
  return { todayCount: today, weekCount: week };
}

export default async function DashboardPage() {
  if (!(await isAdmin())) redirect('/adminpaneljigar/login');
  if (!isSupabaseConfigured()) return <SupabaseDownNotice />;

  const [leads, activity] = await Promise.all([getLeads(), getActivity(15)]);
  const { todayCount, weekCount } = computeRecentCounts(leads);

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-fg mt-1">
          Saytdagi so&apos;rovnomalar va admin faolligi haqida umumiy ko&apos;rinish.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard label="Jami" value={leads.length} Icon={Inbox} accent="primary" />
        <StatCard label="Bugun" value={todayCount} Icon={Calendar} accent="info" />
        <StatCard label="7 kunda" value={weekCount} Icon={Calendar} accent="info" />
        <StatCard label="Yangi" value={counts.new ?? 0} Icon={Inbox} accent="info" />
        <StatCard label="Bog'lanildi" value={counts.contacted ?? 0} Icon={PhoneCall} accent="gold" />
        <StatCard label="Tasdiqlandi" value={counts.qualified ?? 0} Icon={BadgeCheck} accent="accent" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <StatCard label="Yutuq" value={counts.won ?? 0} Icon={Trophy} accent="success" size="lg" />
        <StatCard label="Yutqazildi" value={counts.lost ?? 0} Icon={X} accent="error" size="lg" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CountryBreakdown leads={leads} />
        <RecentActivity items={activity} />
      </section>
    </div>
  );
}
