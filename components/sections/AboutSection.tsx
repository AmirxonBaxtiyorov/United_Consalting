import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ShieldCheck, UserCheck, BadgeCheck, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function AboutSection() {
  const t = useTranslations('about');

  const points = [
    { key: 'point_1', Icon: ShieldCheck },
    { key: 'point_2', Icon: UserCheck },
    { key: 'point_3', Icon: BadgeCheck },
  ] as const;

  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="aspect-[5/6] relative rounded-3xl overflow-hidden shadow-[var(--shadow-card-hover)]">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Team consultation"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="hidden md:block absolute -bottom-6 -right-6 rounded-2xl bg-accent text-accent-foreground p-5 shadow-[var(--shadow-card-hover)]">
            <div className="text-sm font-semibold">Tashkent</div>
            <div className="text-xs opacity-90">Office-based consultations</div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent-dark">
            {t('eyebrow')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-fg)]">
            {t('title')}
          </h2>
          <p className="mt-5 text-lg text-[var(--color-fg)]/80">{t('lead')}</p>
          <p className="mt-3 text-base text-muted-fg">{t('body')}</p>

          <ul className="mt-8 space-y-4">
            {points.map(({ key, Icon }) => (
              <li key={key} className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center size-10 rounded-xl bg-accent/10 text-accent-dark shrink-0">
                  <Icon className="size-5" />
                </span>
                <div>
                  <div className="font-semibold text-[var(--color-fg)]">{t(`${key}_t`)}</div>
                  <div className="text-sm text-muted-fg">{t(`${key}_d`)}</div>
                </div>
              </li>
            ))}
          </ul>

          <Link href="/about" className="inline-block mt-8">
            <Button variant="outline" size="lg">
              {t('cta')}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
