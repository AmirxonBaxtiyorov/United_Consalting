import { SITE } from '@/lib/config';
import type { Locale } from '@/i18n/routing';

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function localeUrl(locale: Locale, path = '') {
  return `${SITE.url}/${locale}${path}`;
}

export function SchemaOrg({ locale }: { locale: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE.name,
    alternateName: SITE.shortName,
    url: localeUrl(locale),
    logo: `${SITE.url}/icon`,
    image: `${SITE.url}/opengraph-image`,
    description:
      locale === 'ru' ? SITE.tagline_ru : SITE.tagline_en,
    sameAs: [SITE.social.instagram, SITE.social.telegram, SITE.social.whatsapp],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
      streetAddress: SITE.address,
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
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

export function WebSiteSchema({ locale }: { locale: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: localeUrl(locale),
    inLanguage: locale === 'ru' ? 'ru-RU' : locale === 'uz' ? 'uz-UZ' : 'en-US',
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

type Crumb = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

type FAQItem = { question: string; answer: string };

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

type ArticleProps = {
  headline: string;
  description: string;
  datePublished: string;
  image?: string;
  url: string;
  authorName?: string;
  inLanguage: Locale;
};

export function ArticleSchema({
  headline,
  description,
  datePublished,
  image,
  url,
  authorName = SITE.name,
  inLanguage,
}: ArticleProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image ? [image] : undefined,
    datePublished,
    dateModified: datePublished,
    author: { '@type': 'Organization', name: authorName, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/icon` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: inLanguage === 'ru' ? 'ru-RU' : inLanguage === 'uz' ? 'uz-UZ' : 'en-US',
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}

type CourseSchemaItem = { name: string; description?: string };

export function CountryCoursesSchema({
  countryName,
  universities,
  url,
}: {
  countryName: string;
  universities: CourseSchemaItem[];
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Universities in ${countryName}`,
    url,
    itemListElement: universities.map((u, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CollegeOrUniversity',
        name: u.name,
        description: u.description,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}
