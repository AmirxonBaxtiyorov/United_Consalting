import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { Award, Crown, Percent, Sparkles, ArrowRight } from 'lucide-react';

const TIERS = [
  { key: 't1', Icon: Percent, tint: 'bg-info/10 text-info' },
  { key: 't2', Icon: Crown, tint: 'bg-gold/20 text-gold-dark' },
  { key: 't3', Icon: Award, tint: 'bg-accent/15 text-accent-dark' },
  { key: 't4', Icon: Sparkles, tint: 'bg-primary/10 text-primary' },
] as const;

export function ScholarshipsSection() {
  const t = useTranslations('scholarships');

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map(({ key, Icon, tint }) => (
            <div
              key={key}
              className="rounded-3xl border border-border bg-white p-6 md:p-7 hover:shadow-[var(--shadow-card-hover)] transition hover:-translate-y-0.5"
            >
              <span className={`inline-flex items-center justify-center size-12 rounded-2xl ${tint}`}>
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-primary">{t(`${key}_t`)}</h3>
              <p className="mt-2 text-sm text-muted-fg">{t(`${key}_d`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/contact">
            <Button size="lg">
              {t('cta')}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
