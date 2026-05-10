'use client';

import { useMemo, useState } from 'react';
import { Activity as ActivityIcon, Search, X } from 'lucide-react';
import type { ActivityRow } from '@/lib/supabase';
import { ACTION_LABELS, formatActivityWhen } from '@/lib/activity-labels';
import { cn } from '@/lib/utils';

const ACTION_GROUPS = [
  { value: 'lead', label: "So'rovnomalar" },
  { value: 'partner', label: 'Hamkorlar' },
  { value: 'auth', label: 'Kirish/chiqish' },
];

function actionDot(action: string): string {
  if (action.startsWith('lead.')) return 'bg-info';
  if (action.startsWith('partner.')) return 'bg-accent';
  if (action.startsWith('auth.')) return 'bg-gold';
  return 'bg-muted';
}

export function ActivityClient({ items }: { items: ActivityRow[] }) {
  const [query, setQuery] = useState('');
  const [groups, setGroups] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((a) => {
      if (groups.size > 0) {
        const prefix = a.action.split('.')[0];
        if (!groups.has(prefix)) return false;
      }
      if (!q) return true;
      return (
        a.action.toLowerCase().includes(q) ||
        (a.target_label?.toLowerCase().includes(q) ?? false) ||
        (a.target_id?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [items, query, groups]);

  function toggleGroup(g: string) {
    setGroups((prev) => {
      const next = new Set(prev);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">Faollik tarixi</h1>
        <p className="text-sm text-muted-fg mt-1">
          Jami: <span className="font-semibold text-[var(--color-fg)]">{items.length}</span>
          {filtered.length !== items.length && (
            <> · Ko&apos;rsatildi: <span className="font-semibold text-[var(--color-fg)]">{filtered.length}</span></>
          )}
        </p>
      </header>

      <div className="rounded-2xl bg-[var(--color-surface)] border border-border p-4 space-y-3 shadow-[var(--shadow-card)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-fg pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Amal, mijoz ismi yoki ID bo'yicha qidirish..."
            className="input pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {ACTION_GROUPS.map((g) => {
            const active = groups.has(g.value);
            return (
              <button
                key={g.value}
                type="button"
                onClick={() => toggleGroup(g.value)}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-medium transition',
                  active
                    ? 'bg-primary text-white border-primary'
                    : 'bg-[var(--color-surface)] border-border text-muted-fg hover:border-accent/40',
                )}
              >
                {g.label}
              </button>
            );
          })}
          {(query || groups.size > 0) && (
            <button
              type="button"
              onClick={() => { setQuery(''); setGroups(new Set()); }}
              className="ml-auto inline-flex items-center gap-1 text-xs text-error hover:underline"
            >
              <X className="size-3.5" />
              Tozalash
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-[var(--color-surface)] border border-border p-12 text-center">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-muted text-muted-fg mb-3">
            <ActivityIcon className="size-7" />
          </div>
          <h2 className="text-lg font-semibold">Hozircha faollik yo&apos;q</h2>
          <p className="text-sm text-muted-fg mt-1">Admin amallari shu yerda yozib boriladi.</p>
        </div>
      ) : (
        <ul className="rounded-2xl bg-[var(--color-surface)] border border-border divide-y divide-border shadow-[var(--shadow-card)] overflow-hidden">
          {filtered.map((a) => (
            <li key={a.id} className="flex items-start gap-3 p-4">
              <span className={cn('mt-2 size-2 rounded-full shrink-0', actionDot(a.action))} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">
                  {ACTION_LABELS[a.action] ?? a.action}
                  {a.target_label && (
                    <span className="text-muted-fg font-normal"> · {a.target_label}</span>
                  )}
                </div>
                {a.meta && (
                  <div className="text-xs text-muted-fg mt-0.5 font-mono">
                    {Object.entries(a.meta).map(([k, v]) => `${k}=${String(v)}`).join(' · ')}
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-fg shrink-0">{formatActivityWhen(a.created_at)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
