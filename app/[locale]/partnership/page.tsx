import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { PartnershipSection } from '@/components/sections/PartnershipSection';
import { CompanyDetails } from '@/components/sections/CompanyDetails';
import { ContactForm } from '@/components/sections/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const t = await getTranslations({ locale, namespace: 'partnership' });
  return {
    title: nav('partnership'),
    description: t('subtitle'),
    alternates: { canonical: `/${locale}/partnership` },
  };
}

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PartnershipSection />
      <CompanyDetails />
      <ContactForm source="partnership" />
    </>
  );
}
