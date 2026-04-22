import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionTitle } from '@/components/ui/section-title';
import { COUNTRIES } from '@/data/countries';
import type { Locale } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export function CountriesSection() {
  const t = useTranslations('countries');
  const locale = useLocale() as Locale;

  return (
    <section id="countries" className="py-20 md:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {COUNTRIES.map((c) => (
            <Link
              key={c.slug}
              href={`/countries/${c.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition hover:-translate-y-0.5"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name[locale]}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[var(--color-fg)] shadow">
                  <Image
                    src={`https://flagcdn.com/w40/${c.code}.png`}
                    alt=""
                    width={18}
                    height={13}
                    unoptimized
                  />
                  {c.name[locale]}
                </span>
                <span className="absolute top-3 right-3 inline-flex items-center justify-center size-8 rounded-full bg-accent text-accent-foreground opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              <div className="p-4">
                <div className="text-sm text-muted-fg">
                  {c.universities_count}+ {t('universities')}
                </div>
                <div className="text-sm font-semibold text-[var(--color-fg)] mt-1">
                  {t('from_year').replace('$', String(c.tuition_year.bachelor))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
