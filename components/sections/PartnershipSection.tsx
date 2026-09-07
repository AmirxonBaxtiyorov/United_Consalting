import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/config';
import {
  Handshake,
  GraduationCap,
  Users,
  Languages,
  Building2,
  Percent,
  UserCheck,
  Stamp,
  Megaphone,
  BookOpen,
  BarChart3,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';

const WHO = [
  { key: 'who_1', Icon: GraduationCap },
  { key: 'who_2', Icon: Users },
  { key: 'who_3', Icon: Languages },
  { key: 'who_4', Icon: Building2 },
] as const;

const OFFER = [
  { key: 'offer_1', Icon: Percent },
  { key: 'offer_2', Icon: UserCheck },
  { key: 'offer_3', Icon: Stamp },
  { key: 'offer_4', Icon: Megaphone },
  { key: 'offer_5', Icon: BookOpen },
  { key: 'offer_6', Icon: BarChart3 },
] as const;

const STEPS = ['step_1', 'step_2', 'step_3', 'step_4'] as const;

export function PartnershipSection() {
  const t = useTranslations('partnership');

  return (
    <>
      <section className="bg-hero-grad pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="container-x">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)]/80 border border-border px-3 py-1 text-xs font-semibold tracking-wide text-[var(--color-fg)]">
              <Handshake className="size-4 text-accent-dark" />
              {t('eyebrow')}
            </span>
            <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[var(--color-fg)]">
              {t('title')}
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-fg max-w-2xl">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact">
                <Button size="lg">
                  {t('cta_apply')}
                  <ArrowRight className="size-4" />
                </Button>
              </a>
              <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  <MessageCircle className="size-4" />
                  {t('cta_contact')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionTitle
            eyebrow={t('who_eyebrow')}
            title={t('who_title')}
            subtitle={t('who_subtitle')}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {WHO.map(({ key, Icon }) => (
              <div
                key={key}
                className="rounded-3xl bg-[var(--color-surface)] border border-border p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition"
              >
                <span className="inline-flex items-center justify-center size-12 rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-[var(--color-fg)]">{t(`${key}_t`)}</h3>
                <p className="mt-2 text-sm text-muted-fg">{t(`${key}_d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted">
        <div className="container-x">
          <SectionTitle
            eyebrow={t('offer_eyebrow')}
            title={t('offer_title')}
            subtitle={t('offer_subtitle')}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {OFFER.map(({ key, Icon }) => (
              <div
                key={key}
                className="rounded-3xl bg-[var(--color-surface)] border border-border p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-10 rounded-xl bg-accent/15 text-accent-dark shrink-0">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-base font-bold text-[var(--color-fg)]">{t(`${key}_t`)}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-fg">{t(`${key}_d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <SectionTitle
            eyebrow={t('steps_eyebrow')}
            title={t('steps_title')}
            subtitle={t('steps_subtitle')}
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {STEPS.map((key, i) => (
              <li
                key={key}
                className="relative rounded-3xl bg-[var(--color-surface)] border border-border p-6 shadow-[var(--shadow-card)]"
              >
                <span className="inline-flex items-center justify-center size-10 rounded-full bg-primary text-white font-bold">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-[var(--color-fg)]">{t(`${key}_t`)}</h3>
                <p className="mt-2 text-sm text-muted-fg">{t(`${key}_d`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
