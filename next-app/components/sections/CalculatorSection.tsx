'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { COUNTRIES, type Country } from '@/data/countries';
import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { formatMoney } from '@/lib/utils';
import { Calculator, BedDouble, Home as HomeIcon, Building2, ArrowRight } from 'lucide-react';

type Degree = 'bachelor' | 'master' | 'phd' | 'language';
type Housing = 'dorm' | 'shared' | 'rent';

export function CalculatorSection() {
  const t = useTranslations('calculator');
  const locale = useLocale() as Locale;

  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [degree, setDegree] = useState<Degree>('bachelor');
  const [housing, setHousing] = useState<Housing>('dorm');
  const [years, setYears] = useState<number>(4);

  const breakdown = useMemo(() => {
    const tuition = country.tuition_year[degree];
    const living = country.living_year[housing];
    const { documents, visa, insurance, flight } = country.extra;
    const yearTotal = tuition + living + insurance;
    const firstYearExtras = documents + visa + flight;
    const programTotal = yearTotal * years + firstYearExtras;
    return { tuition, living, documents, visa, insurance, flight, yearTotal, programTotal };
  }, [country, degree, housing, years]);

  const DEGREE_OPTS: { value: Degree; label: string }[] = [
    { value: 'bachelor', label: t('bachelor') },
    { value: 'master', label: t('master') },
    { value: 'phd', label: t('phd') },
    { value: 'language', label: t('language') },
  ];

  const HOUSING_OPTS: { value: Housing; label: string; Icon: typeof BedDouble }[] = [
    { value: 'dorm', label: t('dorm'), Icon: BedDouble },
    { value: 'shared', label: t('shared'), Icon: HomeIcon },
    { value: 'rent', label: t('rent'), Icon: Building2 },
  ];

  return (
    <section id="calculator" className="py-20 md:py-28 bg-muted">
      <div className="container-x">
        <SectionTitle
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3 rounded-3xl bg-[var(--color-surface)] border border-border p-6 md:p-8 shadow-[var(--shadow-card)]">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-fg)]">
              <Calculator className="size-5 text-accent-dark" />
              {t('title')}
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label className="text-sm font-medium text-[var(--color-fg)]">{t('country')}</label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => setCountry(c)}
                      className={`rounded-xl border px-3 py-2 text-sm font-medium text-left transition ${
                        c.slug === country.slug
                          ? 'bg-primary text-white border-primary'
                          : 'bg-[var(--color-surface)] border-border hover:border-primary'
                      }`}
                    >
                      {c.name[locale]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--color-fg)]">{t('degree')}</label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DEGREE_OPTS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => setDegree(o.value)}
                      className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                        o.value === degree
                          ? 'bg-accent text-accent-foreground border-accent'
                          : 'bg-[var(--color-surface)] border-border hover:border-accent'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--color-fg)]">{t('housing')}</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {HOUSING_OPTS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => setHousing(o.value)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-sm font-medium transition ${
                        o.value === housing
                          ? 'bg-primary text-white border-primary'
                          : 'bg-[var(--color-surface)] border-border hover:border-primary'
                      }`}
                    >
                      <o.Icon className="size-5" />
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between text-sm font-medium text-[var(--color-fg)]">
                  <span>{t('duration')}</span>
                  <span className="tabular-nums text-accent-dark">{years} {t(years === 1 ? 'year' : 'years')}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={6}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="mt-3 w-full accent-accent-dark"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-3xl bg-primary text-white p-6 md:p-8 shadow-[var(--shadow-card-hover)]">
            <div className="text-sm tracking-[0.2em] text-accent/90 font-semibold">
              {country.name[locale].toUpperCase()} · {t(degree)}
            </div>
            <Rows
              rows={[
                { label: t('tuition'), value: breakdown.tuition, per: t('year') },
                { label: t('living'), value: breakdown.living, per: t('year') },
                { label: t('insurance'), value: breakdown.insurance, per: t('year') },
                { label: t('documents'), value: breakdown.documents, per: '' },
                { label: t('visa'), value: breakdown.visa, per: '' },
                { label: t('flight'), value: breakdown.flight, per: '' },
              ]}
            />
            <div className="mt-6 pt-6 border-t border-white/10">
              <Line label={t('total_year')} value={formatMoney(breakdown.yearTotal)} />
              <Line
                label={`${t('total_program')} (${years} ${t(years === 1 ? 'year' : 'years')})`}
                value={formatMoney(breakdown.programTotal)}
                big
              />
            </div>
            <p className="mt-4 text-xs text-white/60">{t('disclaimer')}</p>
            <Link href="/contact" className="mt-6 inline-block w-full">
              <Button variant="primary" size="lg" className="w-full">
                {t('cta')}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rows({ rows }: { rows: { label: string; value: number; per: string }[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center justify-between text-sm">
          <span className="text-white/80">{r.label}</span>
          <span className="tabular-nums">
            {formatMoney(r.value)}
            {r.per && <span className="text-white/50"> / {r.per}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Line({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-white/80">{label}</span>
      <span className={big ? 'text-2xl md:text-3xl font-bold text-accent' : 'text-lg font-semibold'}>
        {value}
      </span>
    </div>
  );
}
