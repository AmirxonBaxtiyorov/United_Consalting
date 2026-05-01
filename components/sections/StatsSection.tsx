import { useTranslations } from 'next-intl';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { Globe2, Users2, Languages, Clock } from 'lucide-react';
import { COUNTRIES } from '@/data/countries';

export function StatsSection() {
  const t = useTranslations('stats');

  const universitiesCount = COUNTRIES.reduce((sum, c) => sum + c.universities_count, 0);

  const STATS = [
    { Icon: Globe2, end: universitiesCount, suffix: '+', label: t('partners') },
    { Icon: Users2, end: COUNTRIES.length, suffix: '', label: t('countries') },
    { Icon: Languages, end: 3, suffix: '', label: t('languages') },
    { Icon: Clock, end: 30, suffix: ' min', label: t('response') },
  ];

  return (
    <section className="py-20 md:py-28 bg-dark-stats text-white">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent">
            {t('eyebrow')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur p-6 md:p-8 text-center"
            >
              <span className="inline-flex items-center justify-center size-12 rounded-2xl bg-accent/20 text-accent mb-4">
                <s.Icon className="size-6" />
              </span>
              <div className="text-4xl md:text-5xl font-bold tabular-nums">
                <AnimatedCounter end={s.end} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
