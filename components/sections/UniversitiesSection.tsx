import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionTitle } from '@/components/ui/section-title';
import { UNIVERSITIES } from '@/data/universities';
import { COUNTRIES } from '@/data/countries';
import type { Locale } from '@/i18n/routing';
import { ArrowUpRight, MapPin, GraduationCap } from 'lucide-react';
import Image from 'next/image';

export function UniversitiesSection() {
  const t = useTranslations('universities');
  const locale = useLocale() as Locale;

  // Show 12 featured universities — one or two per country, mix of public/private/foundation
  const featuredSlugs = [
    'usf', 'webster',
    'apu', 'taylors',
    'amity-singapore',
    'marmara', 'nisantasi',
    'tampere',
    'bologna', 'polimi',
    'rwth-aachen',
    'luxembourg',
    'rtu',
    'vistula',
    'transilvania',
    'debrecen',
    'sunderland', 'teesside',
  ];
  const list = UNIVERSITIES.filter((u) => featuredSlugs.includes(u.slug));

  return (
    <section id="universities" className="py-20 md:py-28 bg-muted">
      <div className="container-x">
        <SectionTitle
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {list.map((u) => {
            const country = COUNTRIES.find((c) => c.slug === u.countrySlug);
            return (
              <Link
                key={u.slug}
                href={`/universities/${u.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition hover:-translate-y-0.5"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  {country && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[var(--color-fg)] shadow">
                      <Image
                        src={`https://flagcdn.com/w40/${country.code}.png`}
                        alt=""
                        width={18}
                        height={13}
                        unoptimized
                      />
                      {country.name[locale]}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 rounded-full bg-accent/95 px-2.5 py-1 text-xs font-semibold text-accent-foreground shadow capitalize">
                    {u.kind}
                  </span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center justify-center size-9 rounded-full bg-accent text-accent-foreground opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-[var(--color-fg)] line-clamp-1">{u.name}</h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-fg">
                    <MapPin className="size-3.5 shrink-0" />
                    <span className="truncate">{u.city}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-fg line-clamp-2">{u.summary[locale]}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="inline-flex items-center gap-1.5 text-[var(--color-fg)] font-semibold">
                      <GraduationCap className="size-4 text-accent-dark" />
                      {u.tuition}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/universities"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold shadow hover:shadow-lg transition"
          >
            {t('see_all')}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
