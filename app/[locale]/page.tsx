import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CountriesSection } from '@/components/sections/CountriesSection';
import { CalculatorSection } from '@/components/sections/CalculatorSection';
import { QuizSection } from '@/components/sections/QuizSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ScholarshipsSection } from '@/components/sections/ScholarshipsSection';
import { TestimonialsPlaceholder } from '@/components/sections/TestimonialsPlaceholder';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { ContactForm } from '@/components/sections/ContactForm';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ServicesSection />
      <CountriesSection />
      <CalculatorSection />
      <QuizSection />
      <ProcessSection />
      <StatsSection />
      <ScholarshipsSection />
      <TestimonialsPlaceholder />
      <FAQSection />
      <CTASection />
      <ContactForm source="homepage" />
    </>
  );
}
