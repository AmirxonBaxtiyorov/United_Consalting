import { Globe } from 'lucide-react';
import type { LeadRow } from '@/lib/supabase';
import { COUNTRIES } from '@/data/countries';

function countryLabel(slug: string | null): string {
  if (!slug) return "Ko'rsatilmagan";
  const c = COUNTRIES.find((x) => x.slug === slug);
  return c?.name.uz ?? slug;
}

export function CountryBreakdown({ leads }: { leads: LeadRow[] }) {
  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    const key = l.country ?? '__none__';
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const max = sorted[0]?.[1] ?? 1;

  return (
    <div className="rounded-2xl bg-[var(--color-surface)] border border-border p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="size-4 text-accent-dark" />
        <h2 className="font-semibold">Davlatlar bo&apos;yicha</h2>
      </div>
      {sorted.length === 0 ? (
        <p className="text-sm text-muted-fg">Hozircha ma&apos;lumot yo&apos;q.</p>
      ) : (
        <ul className="space-y-2">
          {sorted.map(([slug, count]) => (
            <li key={slug} className="flex items-center gap-3">
              <span className="text-sm w-32 truncate">
                {slug === '__none__' ? "Ko'rsatilmagan" : countryLabel(slug)}
              </span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${Math.round((count / max) * 100)}%` }}
                />
              </div>
              <span className="text-sm font-semibold w-8 text-right">{count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
