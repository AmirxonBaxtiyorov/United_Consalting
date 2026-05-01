import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { CountriesSection } from '@/components/sections/CountriesSection';
import { CTASection } from '@/components/sections/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('countries') };
}

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <CountriesSection />
      <CTASection />
    </>
  );
}
