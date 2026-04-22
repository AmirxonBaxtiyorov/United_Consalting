'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { COUNTRIES } from '@/data/countries';
import type { Country } from '@/data/countries';
import type { Locale } from '@/i18n/routing';
import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Tag =
  | 'affordable'
  | 'mid_budget'
  | 'high_budget'
  | 'premium'
  | 'english'
  | 'asian_lang'
  | 'european_lang'
  | 'bachelor'
  | 'master'
  | 'phd'
  | 'language'
  | 'scholarship_focus'
  | 'prestige'
  | 'pr_career'
  | 'warm_aff'
  | 'asia'
  | 'europe'
  | 'north_america'
  | 'any_region';

const WEIGHT_KEYS = [
  'asia',
  'europe',
  'affordable',
  'prestige',
  'english',
  'tech',
  'warm',
  'scholarship_focus',
] as const;

function tagsToWeights(tags: Tag[]): Partial<Record<(typeof WEIGHT_KEYS)[number] | 'north_america', number>> {
  const w: Record<string, number> = {};
  tags.forEach((tag) => {
    switch (tag) {
      case 'affordable':
        w.affordable = (w.affordable ?? 0) + 3;
        break;
      case 'mid_budget':
        w.affordable = (w.affordable ?? 0) + 1;
        break;
      case 'high_budget':
        w.prestige = (w.prestige ?? 0) + 2;
        break;
      case 'premium':
        w.prestige = (w.prestige ?? 0) + 3;
        break;
      case 'english':
        w.english = (w.english ?? 0) + 3;
        break;
      case 'asian_lang':
        w.asia = (w.asia ?? 0) + 2;
        break;
      case 'european_lang':
        w.europe = (w.europe ?? 0) + 2;
        break;
      case 'scholarship_focus':
        w.scholarship_focus = (w.scholarship_focus ?? 0) + 3;
        break;
      case 'prestige':
        w.prestige = (w.prestige ?? 0) + 3;
        break;
      case 'pr_career':
        w.europe = (w.europe ?? 0) + 1;
        w.north_america = (w.north_america ?? 0) + 2;
        break;
      case 'warm_aff':
        w.affordable = (w.affordable ?? 0) + 1;
        w.warm = (w.warm ?? 0) + 2;
        break;
      case 'asia':
        w.asia = (w.asia ?? 0) + 3;
        break;
      case 'europe':
        w.europe = (w.europe ?? 0) + 3;
        break;
      case 'north_america':
        w.north_america = (w.north_america ?? 0) + 3;
        break;
    }
  });
  return w;
}

function scoreCountry(country: Country, weights: Record<string, number>): number {
  let s = 0;
  for (const k of WEIGHT_KEYS) {
    const userWeight = weights[k] ?? 0;
    const countryWeight = country.quiz_weight[k as keyof Country['quiz_weight']] ?? 0;
    s += userWeight * countryWeight;
  }
  if (weights.north_america && country.slug === 'usa') s += weights.north_america * 3;
  return s;
}

export function QuizSection() {
  const t = useTranslations('quiz');
  const locale = useLocale() as Locale;

  const QUESTIONS = useMemo(
    () => [
      {
        q: t('q1'),
        options: [
          { label: t('q1_a1'), tags: ['affordable'] as Tag[] },
          { label: t('q1_a2'), tags: ['mid_budget'] as Tag[] },
          { label: t('q1_a3'), tags: ['high_budget'] as Tag[] },
          { label: t('q1_a4'), tags: ['premium'] as Tag[] },
        ],
      },
      {
        q: t('q2'),
        options: [
          { label: t('q2_a1'), tags: ['english'] as Tag[] },
          { label: t('q2_a2'), tags: ['asian_lang'] as Tag[] },
          { label: t('q2_a3'), tags: ['european_lang'] as Tag[] },
          { label: t('q2_a4'), tags: [] as Tag[] },
        ],
      },
      {
        q: t('q3'),
        options: [
          { label: t('q3_a1'), tags: ['bachelor'] as Tag[] },
          { label: t('q3_a2'), tags: ['master'] as Tag[] },
          { label: t('q3_a3'), tags: ['phd'] as Tag[] },
          { label: t('q3_a4'), tags: ['language'] as Tag[] },
        ],
      },
      {
        q: t('q4'),
        options: [
          { label: t('q4_a1'), tags: ['scholarship_focus'] as Tag[] },
          { label: t('q4_a2'), tags: ['pr_career'] as Tag[] },
          { label: t('q4_a3'), tags: ['prestige'] as Tag[] },
          { label: t('q4_a4'), tags: ['warm_aff'] as Tag[] },
        ],
      },
      {
        q: t('q5'),
        options: [
          { label: t('q5_a1'), tags: ['asia'] as Tag[] },
          { label: t('q5_a2'), tags: ['europe'] as Tag[] },
          { label: t('q5_a3'), tags: ['north_america'] as Tag[] },
          { label: t('q5_a4'), tags: [] as Tag[] },
        ],
      },
    ],
    [t]
  );

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const results = useMemo(() => {
    if (!done) return [];
    const tags = answers.flatMap((a, i) => QUESTIONS[i].options[a]?.tags ?? []);
    const weights = tagsToWeights(tags);
    const scored = COUNTRIES.map((c) => ({ c, s: scoreCountry(c, weights as Record<string, number>) }));
    const maxPossible = Math.max(...scored.map((x) => x.s), 1);
    return scored
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map(({ c, s }) => ({
        country: c,
        percent: Math.round((s / maxPossible) * 100),
      }));
  }, [done, answers, QUESTIONS]);

  const choose = (optionIndex: number) => {
    const next = [...answers];
    next[step] = optionIndex;
    setAnswers(next);
  };

  const onNext = () => {
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const onBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const onRestart = () => {
    setStep(0);
    setAnswers([]);
    setDone(false);
  };

  const current = QUESTIONS[step];
  const selected = answers[step];

  return (
    <section id="quiz" className="py-20 md:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="max-w-3xl mx-auto rounded-3xl bg-[var(--color-surface)] border border-border shadow-[var(--shadow-card)] p-6 md:p-10">
          {!done ? (
            <>
              <div className="flex items-center justify-between text-xs font-semibold text-muted-fg tracking-wide">
                <span>{String(step + 1).padStart(2, '0')} / {String(QUESTIONS.length).padStart(2, '0')}</span>
                <span className="text-accent-dark inline-flex items-center gap-1">
                  <Sparkles className="size-3.5" /> AI match
                </span>
              </div>
              <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h3 className="mt-6 text-xl md:text-2xl font-bold text-[var(--color-fg)]">
                {current.q}
              </h3>

              <div className="mt-5 grid md:grid-cols-2 gap-3">
                {current.options.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    className={cn(
                      'rounded-xl border px-4 py-3 text-left text-sm md:text-base font-medium transition',
                      selected === i
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-[var(--color-surface)] text-[var(--color-fg)] border-border hover:border-accent'
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button variant="ghost" size="md" onClick={onBack} disabled={step === 0}>
                  <ArrowLeft className="size-4" />
                  {t('back')}
                </Button>
                <Button
                  size="md"
                  onClick={onNext}
                  disabled={selected === undefined}
                >
                  {step === QUESTIONS.length - 1 ? t('finish') : t('next')}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-fg)]">
                {t('result_title')}
              </h3>
              <p className="mt-2 text-muted-fg">{t('result_sub')}</p>

              <ul className="mt-6 space-y-4">
                {results.map((r, i) => (
                  <li
                    key={r.country.slug}
                    className="flex items-center gap-4 rounded-2xl border border-border p-3 md:p-4 hover:shadow-[var(--shadow-card)] transition"
                  >
                    <span className="inline-flex items-center justify-center size-10 rounded-xl bg-primary text-primary-foreground font-bold">
                      {i + 1}
                    </span>
                    <div className="relative size-16 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={r.country.image}
                        alt={r.country.name[locale]}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[var(--color-fg)]">{r.country.name[locale]}</div>
                      <div className="text-sm text-muted-fg truncate">
                        {r.country.universities_count}+ universities · from ${r.country.tuition_year.bachelor}/yr
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent-dark">{r.percent}%</div>
                      <div className="text-[10px] uppercase tracking-wide text-muted-fg">{t('match')}</div>
                    </div>
                    <Link
                      href={`/countries/${r.country.slug}`}
                      className="hidden sm:inline-flex"
                    >
                      <Button variant="outline" size="sm">
                        <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button size="lg">
                    {t('get_plan')}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" onClick={onRestart}>
                  <RotateCcw className="size-4" />
                  {t('restart')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
