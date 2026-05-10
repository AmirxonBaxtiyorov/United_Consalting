import type { LeadStatus } from '@/lib/supabase';

const STYLES: Record<string, string> = {
  new: 'bg-info/15 text-info border-info/30',
  contacted: 'bg-gold/15 text-[#a06a00] border-gold/40',
  qualified: 'bg-accent/15 text-accent-dark border-accent/30',
  won: 'bg-success/15 text-success border-success/30',
  lost: 'bg-error/10 text-error border-error/30',
};

const LABELS: Record<string, string> = {
  new: 'Yangi',
  contacted: 'Bog\'lanildi',
  qualified: 'Tasdiqlandi',
  won: 'Yutuq',
  lost: 'Yutqazildi',
};

export function StatusBadge({ status }: { status: LeadStatus | string }) {
  const cls = STYLES[status] ?? 'bg-muted text-muted-fg border-border';
  const label = LABELS[status] ?? status;
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}
