import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { QuizSection } from '@/components/sections/QuizSection';
import { ContactForm } from '@/components/sections/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('quiz') };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <QuizSection />
      <ContactForm source="quiz" />
    </>
  );
}
