import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/section-title';
import { SERVICES } from '@/data/services';
import {
  GraduationCap,
  FileText,
  PenLine,
  Briefcase,
  Languages,
  Award,
  MessagesSquare,
  Stamp,
  Plane,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = {
  GraduationCap,
  FileText,
  PenLine,
  Briefcase,
  Languages,
  Award,
  MessagesSquare,
  StampIcon: Stamp,
  Plane,
} as const;

export function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-20 md:py-28 bg-muted">
      <div className="container-x">
        <SectionTitle
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(220px,auto)] gap-4 md:gap-5">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS] ?? GraduationCap;
            const span = s.span;
            return (
              <div
                key={s.key}
                className={cn(
                  'group relative overflow-hidden rounded-3xl bg-white border border-border p-6 md:p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition',
                  span === 'col' && 'md:col-span-2',
                  span === 'row' && 'md:row-span-2',
                  span === 'both' && 'md:col-span-2 md:row-span-2'
                )}
              >
                <div className="absolute -right-8 -top-8 size-32 rounded-full bg-accent/5 group-hover:bg-accent/10 transition" aria-hidden />
                <span className="relative inline-flex items-center justify-center size-12 rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="relative mt-5 text-xl md:text-2xl font-bold text-primary">
                  {t(`${s.key}_t`)}
                </h3>
                <p className="relative mt-2 text-sm md:text-base text-muted-fg max-w-md">
                  {t(`${s.key}_d`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
