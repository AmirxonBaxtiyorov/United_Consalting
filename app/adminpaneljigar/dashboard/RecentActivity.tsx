import { Activity } from 'lucide-react';
import Link from 'next/link';
import type { ActivityRow } from '@/lib/supabase';
import { ACTION_LABELS, formatActivityWhen } from '@/lib/activity-labels';

export function RecentActivity({ items }: { items: ActivityRow[] }) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface)] border border-border p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-accent-dark" />
          <h2 className="font-semibold">So&apos;nggi faollik</h2>
        </div>
        <Link href="/adminpaneljigar/activity" className="text-xs text-accent-dark hover:underline">
          Hammasini ko&apos;rish
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-fg">Hozircha faollik yo&apos;q.</p>
      ) : (
        <ul className="space-y-3">
          {items.slice(0, 8).map((a) => (
            <li key={a.id} className="text-sm flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium truncate">
                  {ACTION_LABELS[a.action] ?? a.action}
                  {a.target_label ? <span className="text-muted-fg"> · {a.target_label}</span> : null}
                </div>
              </div>
              <span className="text-xs text-muted-fg shrink-0">{formatActivityWhen(a.created_at)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
