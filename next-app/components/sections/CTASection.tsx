import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/config';
import { MessageCircle, Send, ArrowRight } from 'lucide-react';

export function CTASection() {
  const t = useTranslations('cta_section');
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-10 md:p-16 text-center shadow-[var(--shadow-card-hover)]">
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-accent/20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-gold/15 blur-3xl" aria-hidden />
          <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold">{t('title')}</h2>
          <p className="relative mt-4 text-white/80 max-w-xl mx-auto">{t('subtitle')}</p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact">
              <Button size="lg">
                {t('primary')}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <MessageCircle className="size-4" />
                {t('whatsapp')}
              </Button>
            </a>
            <a href={SITE.social.telegram} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Send className="size-4" />
                {t('telegram')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
