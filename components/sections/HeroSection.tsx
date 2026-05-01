import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/config';
import { ArrowRight, CheckCircle2, MessageCircle, Star, Award, Clock } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-hero-grad pt-10 pb-14 md:pt-20 md:pb-24">
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)]/80 border border-border px-3 py-1 text-xs font-semibold tracking-wide text-[var(--color-fg)]">
              <span className="inline-block size-1.5 rounded-full bg-accent animate-pulse" />
              {t('eyebrow')}
            </span>
            <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[var(--color-fg)]">
              {t('title_part1')}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[var(--color-fg)]">{t('title_part2')}</span>
                <span className="absolute inset-x-0 bottom-1 h-3 md:h-4 bg-accent/30 rounded-sm -z-0" />
              </span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-fg max-w-xl">
              {t('subtitle')}
            </p>

            <ul className="mt-7 space-y-3 max-w-lg">
              {(['bullet_1', 'bullet_2', 'bullet_3'] as const).map((k) => (
                <li key={k} className="flex items-start gap-3 text-[var(--color-fg)]">
                  <CheckCircle2 className="size-5 mt-0.5 shrink-0 text-accent-dark" />
                  <span>{t(k)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="lg">
                  {t('cta_primary')}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  <MessageCircle className="size-4" />
                  {t('cta_whatsapp')}
                </Button>
              </a>
            </div>

            <div className="mt-7 flex items-center gap-3 text-sm text-muted-fg">
              <Award className="size-4 text-accent-dark" />
              {t('trust_line')}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-accent/20 via-gold/10 to-primary/10 blur-2xl rounded-[48px]" aria-hidden />
              <div className="relative rounded-3xl bg-[var(--color-surface)] border border-border shadow-[var(--shadow-card-hover)] overflow-hidden">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                    alt="International students on campus"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-x-4 top-4 flex justify-between items-start">
                    <span className="rounded-full bg-[var(--color-surface)]/95 px-3 py-1 text-xs font-semibold text-[var(--color-fg)] shadow">
                      {t('card_title')}
                    </span>
                    <span className="rounded-full bg-gold/95 px-3 py-1 text-xs font-semibold text-[var(--color-fg)] shadow">
                      {t('card_scholarship')}
                    </span>
                  </div>
                </div>
                <div className="p-5 border-t border-border">
                  <div className="font-semibold text-[var(--color-fg)]">{t('card_uni')}</div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-fg">
                      <Star className="size-4 text-gold" />
                      {t('card_tuition')}
                    </div>
                    <div className="flex items-center gap-2 text-muted-fg">
                      <Clock className="size-4 text-accent-dark" />
                      {t('card_visa')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
