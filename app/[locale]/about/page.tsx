import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { CTASection } from '@/components/sections/CTASection';
import { TrustBar } from '@/components/sections/TrustBar';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('about') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <div className="pt-10 md:pt-16" />
      <AboutSection />
      <TrustBar />
      <ProcessSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
