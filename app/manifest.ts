import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.tagline_en,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0a2540',
    theme_color: '#0a2540',
    lang: 'en',
    categories: ['education', 'business'],
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    prefer_related_applications: false,
    dir: 'ltr',
  };
}
