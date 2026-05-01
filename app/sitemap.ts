import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { COUNTRIES } from '@/data/countries';
import { BLOG_POSTS } from '@/data/blog';
import { SITE } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const now = new Date();
  const staticPaths = [
    '',
    '/about',
    '/services',
    '/countries',
    '/blog',
    '/cases',
    '/contact',
    '/calculator',
    '/quiz',
    '/faq',
    '/privacy',
    '/terms',
  ];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      urls.push({
        url: `${base}/${locale}${p}`,
        lastModified: now,
        changeFrequency: p === '' ? 'weekly' : 'monthly',
        priority: p === '' ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}${p}`])
          ),
        },
      });
    }
    for (const c of COUNTRIES) {
      urls.push({
        url: `${base}/${locale}/countries/${c.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
    for (const post of BLOG_POSTS) {
      urls.push({
        url: `${base}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.published_at),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return urls;
}
