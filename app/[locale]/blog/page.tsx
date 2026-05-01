import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blog';
import type { Locale } from '@/i18n/routing';
import { SectionTitle } from '@/components/ui/section-title';
import { Clock, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogListInner locale={locale as Locale} />;
}

function BlogListInner({ locale }: { locale: Locale }) {
  const t = useTranslations('blog');
  const sorted = [...BLOG_POSTS].sort((a, b) => b.published_at.localeCompare(a.published_at));
  return (
    <section className="py-16 md:py-20">
      <div className="container-x">
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-3xl bg-white border border-border overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition hover:-translate-y-0.5"
            >
              <div className="aspect-[16/10] relative">
                <Image src={p.cover} alt={p.title[locale]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-fg">
                  <span className="rounded-full bg-accent/10 text-accent-dark px-2.5 py-0.5 font-semibold capitalize">
                    {p.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" /> {p.reading_time} {t('minutes')}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-primary group-hover:text-accent-dark transition">
                  {p.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-muted-fg line-clamp-3">{p.excerpt[locale]}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-dark">
                  {t('read_more')} <ArrowRight className="size-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
