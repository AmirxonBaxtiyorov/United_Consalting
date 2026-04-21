import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Manrope } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWidgets } from '@/components/widgets/FloatingWidgets';
import { CookieConsent } from '@/components/widgets/CookieConsent';
import { SchemaOrg } from '@/components/shared/SchemaOrg';
import { Analytics } from '@/components/shared/Analytics';
import { RecaptchaLoader } from '@/components/shared/Recaptcha';
import { SITE } from '@/lib/config';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', display: 'swap' });
const display = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-display', display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t('title'), template: '%s — United Global Consulting' },
    description: t('description'),
    keywords: t('keywords').split(',').map((s) => s.trim()),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title: t('title'),
      description: t('description'),
      url: `${SITE.url}/${locale}`,
      locale: locale === 'ru' ? 'ru_RU' : locale === 'uz' ? 'uz_UZ' : 'en_US',
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <SchemaOrg locale={locale as Locale} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWidgets />
          <CookieConsent />
          <Analytics />
          <RecaptchaLoader />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
