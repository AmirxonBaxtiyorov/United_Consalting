import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/section-title';
import { MessageSquare, Target, FileSearch, PlaneTakeoff, HeartHandshake } from 'lucide-react';

const STEPS = [
  { key: 'step_1', Icon: MessageSquare },
  { key: 'step_2', Icon: Target },
  { key: 'step_3', Icon: FileSearch },
  { key: 'step_4', Icon: PlaneTakeoff },
  { key: 'step_5', Icon: HeartHandshake },
] as const;

export function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container-x">
        <SectionTitle
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[56px] h-0.5 bg-border" aria-hidden />
          <ol className="grid lg:grid-cols-5 gap-6">
            {STEPS.map(({ key, Icon }, i) => (
              <li key={key} className="relative">
                <div className="relative z-10 inline-flex items-center justify-center size-28 rounded-3xl bg-white border border-border text-primary shadow-[var(--shadow-card)]">
                  <Icon className="size-10" />
                  <span className="absolute -top-3 -right-3 inline-flex items-center justify-center size-8 rounded-full bg-accent text-accent-foreground text-sm font-bold border-4 border-muted">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-primary">{t(`${key}_t`)}</h3>
                <p className="mt-1.5 text-sm text-muted-fg">{t(`${key}_d`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
