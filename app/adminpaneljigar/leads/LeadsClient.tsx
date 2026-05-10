'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Download, Inbox, X } from 'lucide-react';
import type { LeadRow, LeadStatus } from '@/lib/supabase';
import { LeadCard } from './LeadCard';
import { downloadLeadsCsv } from './csv';
import { cn } from '@/lib/utils';

type DateRange = 'all' | 'today' | '7d' | '30d';

const ALL_STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'won', 'lost'];
const ALL_RANGES: DateRange[] = ['all', 'today', '7d', '30d'];

function parseStatusParam(value: string | null): Set<LeadStatus> {
  if (!value) return new Set();
  const parts = value.split(',').map((s) => s.trim()).filter(Boolean) as LeadStatus[];
  return new Set(parts.filter((s) => ALL_STATUSES.includes(s)));
}

function parseRangeParam(value: string | null): DateRange {
  if (!value) return 'all';
  return (ALL_RANGES as string[]).includes(value) ? (value as DateRange) : 'all';
}

const STATUS_FILTERS: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new', label: 'Yangi', color: 'bg-info/15 text-info border-info/30' },
  { value: 'contacted', label: "Bog'lanildi", color: 'bg-gold/15 text-[#a06a00] border-gold/40' },
  { value: 'qualified', label: 'Tasdiqlandi', color: 'bg-accent/15 text-accent-dark border-accent/30' },
  { value: 'won', label: 'Yutuq', color: 'bg-success/15 text-success border-success/30' },
  { value: 'lost', label: 'Yutqazildi', color: 'bg-error/10 text-error border-error/30' },
];

const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: 'all', label: 'Hammasi' },
  { value: 'today', label: 'Bugun' },
  { value: '7d', label: '7 kun' },
  { value: '30d', label: '30 kun' },
];

function isInRange(iso: string, range: DateRange): boolean {
  if (range === 'all') return true;
  const ms = Date.now() - new Date(iso).getTime();
  if (range === 'today') return ms < 86_400_000;
  if (range === '7d') return ms < 7 * 86_400_000;
  return ms < 30 * 86_400_000;
}

export function LeadsClient({ leads }: { leads: LeadRow[] }) {
  const router = useRouter();
  const params = useSearchParams();

  // URL is the source of truth for filters so dashboard links and refreshes
  // restore state. The free-text search box stays local — debouncing every
  // keystroke into the URL is noisy and not worth it.
  const statuses = useMemo(() => parseStatusParam(params.get('status')), [params]);
  const range = useMemo(() => parseRangeParam(params.get('range')), [params]);
  const [query, setQuery] = useState('');

  function updateUrl(next: { statuses?: Set<LeadStatus>; range?: DateRange }) {
    const sp = new URLSearchParams(params.toString());
    const nextStatuses = next.statuses ?? statuses;
    const nextRange = next.range ?? range;
    if (nextStatuses.size > 0) sp.set('status', Array.from(nextStatuses).join(','));
    else sp.delete('status');
    if (nextRange !== 'all') sp.set('range', nextRange);
    else sp.delete('range');
    const qs = sp.toString();
    router.replace(qs ? `?${qs}` : '?', { scroll: false });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (statuses.size && !statuses.has(l.status as LeadStatus)) return false;
      if (!isInRange(l.created_at, range)) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.email?.toLowerCase().includes(q) ?? false) ||
        (l.country?.toLowerCase().includes(q) ?? false) ||
        (l.message?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [leads, query, statuses, range]);

  const counts = useMemo(() => {
    return leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.status] = (acc[l.status] ?? 0) + 1;
      return acc;
    }, {});
  }, [leads]);

  function toggleStatus(s: LeadStatus) {
    const next = new Set(statuses);
    if (next.has(s)) next.delete(s);
    else next.add(s);
    updateUrl({ statuses: next });
  }

  function setRange(r: DateRange) {
    updateUrl({ range: r });
  }

  function clearFilters() {
    setQuery('');
    router.replace('?', { scroll: false });
  }

  const hasFilters = query || statuses.size > 0 || range !== 'all';

  return (
    <div className="space-y-5">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">So&apos;rovnomalar</h1>
          <p className="text-sm text-muted-fg mt-1">
            Jami: <span className="font-semibold text-[var(--color-fg)]">{leads.length}</span>
            {filtered.length !== leads.length && (
              <> · Ko&apos;rsatildi: <span className="font-semibold text-[var(--color-fg)]">{filtered.length}</span></>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => downloadLeadsCsv(filtered)}
          disabled={filtered.length === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="size-4" />
          CSV yuklab olish
        </button>
      </header>

      <div className="rounded-2xl bg-[var(--color-surface)] border border-border p-4 space-y-3 shadow-[var(--shadow-card)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-fg pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ism, telefon, email, davlat, xabar bo'yicha qidirish..."
            className="input pl-10 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Tozalash"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex size-6 items-center justify-center rounded-full hover:bg-muted"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => {
            const active = statuses.has(s.value);
            const count = counts[s.value] ?? 0;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => toggleStatus(s.value)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition',
                  active ? s.color : 'bg-[var(--color-surface)] border-border text-muted-fg hover:border-accent/40',
                )}
              >
                {s.label}
                <span className={cn('inline-block min-w-[1.25rem] text-center', active ? '' : 'text-muted-fg')}>
                  {count}
                </span>
              </button>
            );
          })}

          <div className="w-px bg-border mx-1" />

          {DATE_RANGES.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRange(r.value)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition',
                range === r.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-[var(--color-surface)] border-border text-muted-fg hover:border-accent/40',
              )}
            >
              {r.label}
            </button>
          ))}

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs text-error hover:underline"
            >
              <X className="size-3.5" />
              Filterni tozalash
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl bg-[var(--color-surface)] border border-border p-12 text-center">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-muted text-muted-fg mb-3">
            <Inbox className="size-7" />
          </div>
          <h2 className="text-lg font-semibold">
            {hasFilters ? "Filterga mos so'rovnoma topilmadi" : "Hozircha so'rovnomalar yo'q"}
          </h2>
          <p className="text-sm text-muted-fg mt-1">
            {hasFilters
              ? 'Filterni o\'zgartirib yoki tozalab ko\'ring.'
              : "Mijoz formani to'ldirgach, bu yerda paydo bo'ladi."}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}
