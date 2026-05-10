import { getTranslations } from 'next-intl/server';
import { PARTNERS } from '@/data/partners';
import { getPartners, isSupabaseConfigured } from '@/lib/supabase';
import Image from 'next/image';

export async function TrustBar() {
  const t = await getTranslations('trust_bar');

  // Static partners always render; dynamic ones from Supabase (added via the
  // admin panel) are appended so the homepage stays alive even if the DB is
  // unreachable.
  const dynamic = isSupabaseConfigured() ? await getPartners() : [];
  const all = [
    ...PARTNERS,
    ...dynamic.map((d) => ({ name: d.name, logo: d.logo_url })),
  ];
  const doubled = [...all, ...all];

  return (
    <section className="py-10 bg-[var(--color-surface)] border-y border-border">
      <div className="container-x mb-6 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-muted-fg uppercase">
          {t('label')}
        </p>
      </div>
      <div className="overflow-hidden relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-surface)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-surface)] to-transparent z-10" />
        <div className="flex gap-10 animate-marquee w-max items-center">
          {doubled.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="shrink-0 h-20 w-44 relative bg-white rounded-xl border border-border p-3 flex items-center justify-center opacity-90 hover:opacity-100 transition"
              title={p.name}
            >
              <Image
                src={p.logo}
                alt={p.name}
                fill
                sizes="176px"
                className="object-contain p-3"
                unoptimized={p.logo.startsWith('http')}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
