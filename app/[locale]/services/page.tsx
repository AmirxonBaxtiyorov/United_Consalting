import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTASection } from '@/components/sections/CTASection';
import { ContactForm } from '@/components/sections/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('services') };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ServicesSection />
      <ProcessSection />
      <CTASection />
      <ContactForm source="services" />
    </>
  );
}
