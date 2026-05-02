import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/data/blog';
import { routing, type Locale } from '@/i18n/routing';

export const alt = 'United Global Consulting — Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function BlogOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  const safeLocale = (routing.locales.includes(locale as Locale) ? locale : 'en') as Locale;
  const title = post?.title[safeLocale] ?? 'Study abroad — practical guides';
  const category = post?.category ?? 'blog';
  const date = post?.published_at ?? '';
  const minutes = post?.reading_time;

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
              'radial-gradient(800px circle at 100% 0%, rgba(0, 212, 170, 0.22), transparent 55%)',
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
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                background: 'rgba(0, 212, 170, 0.18)',
                color: '#7dffd6',
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 22,
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              {category}
            </span>
            {date && (
              <span style={{ color: '#94a3b8', fontSize: 22 }}>{date}</span>
            )}
            {typeof minutes === 'number' && (
              <span style={{ color: '#94a3b8', fontSize: 22 }}>
                · {minutes} min read
              </span>
            )}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 1050,
            }}
          >
            {title}
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
          unitedglobal.uz/blog
        </div>
      </div>
    ),
    { ...size }
  );
}
