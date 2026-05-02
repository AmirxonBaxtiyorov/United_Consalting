import { ImageResponse } from 'next/og';
import { getCountry } from '@/data/countries';
import { routing, type Locale } from '@/i18n/routing';

export const alt = 'United Global Consulting — Country guide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function CountryOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const country = getCountry(slug);
  const safeLocale = (routing.locales.includes(locale as Locale) ? locale : 'en') as Locale;
  const name = country?.name[safeLocale] ?? 'Study destination';
  const language = country?.language ?? '';
  const universities = country?.universities_count ?? 0;
  const tuitionFrom = country?.tuition_year.bachelor;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #061a2e 0%, #0a2540 55%, #1e3a5f 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(900px circle at 0% 100%, rgba(255, 184, 0, 0.18), transparent 55%), radial-gradient(800px circle at 100% 0%, rgba(0, 212, 170, 0.22), transparent 55%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#00d4aa',
              borderRadius: 14,
              fontSize: 24,
              fontWeight: 800,
              color: '#031612',
              letterSpacing: '-0.04em',
            }}
          >
            UG
          </div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>
            United Global Consulting
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: '#7dffd6',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
            }}
          >
            Study in
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginTop: 8,
            }}
          >
            {name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              color: '#cbd5e1',
              maxWidth: 1000,
            }}
          >
            {universities}+ universities · {language || 'multilingual programs'}
            {typeof tuitionFrom === 'number' && tuitionFrom > 0
              ? ` · tuition from $${tuitionFrom.toLocaleString('en-US')}/yr`
              : ''}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            position: 'relative',
            fontSize: 22,
            color: '#cbd5e1',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: '#00d4aa',
              display: 'flex',
            }}
          />
          unitedglobal.uz/countries
        </div>
      </div>
    ),
    { ...size }
  );
}
