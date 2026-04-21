import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { CTASection } from '@/components/sections/CTASection';
import { ScrollText, ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cases' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CasesInner />;
}

function CasesInner() {
  const t = useTranslations('cases');
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-x">
          <SectionTitle title={t('title')} subtitle={t('subtitle')} />
          <div className="max-w-2xl mx-auto rounded-3xl bg-white border border-dashed border-border p-10 text-center">
            <span className="inline-flex items-center justify-center size-14 rounded-2xl bg-accent/10 text-accent-dark mb-5">
              <ScrollText className="size-6" />
            </span>
            <h3 className="text-2xl font-bold text-primary">{t('empty_title')}</h3>
            <p className="mt-3 text-muted-fg">{t('empty_body')}</p>
            <Link href="/contact" className="mt-6 inline-block">
              <Button size="md">
                Become the first <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
