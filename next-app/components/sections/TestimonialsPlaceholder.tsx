import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { Quote, ArrowRight } from 'lucide-react';

export function TestimonialsPlaceholder() {
  const t = useTranslations('testimonials');

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container-x">
        <SectionTitle
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
        <div className="max-w-2xl mx-auto rounded-3xl bg-white border border-dashed border-border p-8 md:p-10 text-center">
          <span className="inline-flex items-center justify-center size-14 rounded-2xl bg-accent/10 text-accent-dark mb-5">
            <Quote className="size-6" />
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-primary">{t('placeholder_t')}</h3>
          <p className="mt-3 text-muted-fg">{t('placeholder_d')}</p>
          <Link href="/contact" className="mt-6 inline-block">
            <Button size="md">
              {t('cta')}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
