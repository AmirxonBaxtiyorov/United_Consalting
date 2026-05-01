import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Home, MessageCircle } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('not_found');
  return (
    <section className="py-24 md:py-36">
      <div className="container-x text-center max-w-xl mx-auto">
        <div className="font-display text-7xl md:text-9xl font-extrabold text-primary">404</div>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-primary">{t('title')}</h1>
        <p className="mt-3 text-muted-fg">{t('subtitle')}</p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="size-4" />
              {t('home')}
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              <MessageCircle className="size-4" />
              {t('contact')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
