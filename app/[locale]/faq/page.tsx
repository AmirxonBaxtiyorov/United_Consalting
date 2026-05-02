import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { BreadcrumbSchema, FAQSchema } from '@/components/shared/SchemaOrg';
import { SITE } from '@/lib/config';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  return {
    title: t('title'),
    alternates: {
      canonical: `/${locale}/faq`,
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'faq' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const items = (['1', '2', '3', '4', '5', '6', '7'] as const).map((n) => ({
    question: t(`q${n}`),
    answer: t(`a${n}`),
  }));

  const safeLocale = locale as Locale;

  return (
    <>
      <FAQSchema items={items} />
      <BreadcrumbSchema
        items={[
          { name: tNav('home'), url: `${SITE.url}/${safeLocale}` },
          { name: t('title'), url: `${SITE.url}/${safeLocale}/faq` },
        ]}
      />
      <FAQSection />
      <CTASection />
    </>
  );
}
