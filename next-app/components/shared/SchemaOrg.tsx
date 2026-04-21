import { SITE } from '@/lib/config';
import type { Locale } from '@/i18n/routing';

export function SchemaOrg({ locale }: { locale: Locale }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE.name,
    url: `${SITE.url}/${locale}`,
    logo: `${SITE.url}/logo.png`,
    sameAs: [SITE.social.instagram, SITE.social.telegram, SITE.social.whatsapp],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phoneTel,
        contactType: 'customer service',
        areaServed: ['UZ', 'RU', 'KZ'],
        availableLanguage: ['Russian', 'Uzbek', 'English'],
      },
    ],
    email: SITE.email,
    foundingDate: String(SITE.founded),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
