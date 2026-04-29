import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { BLOG_POSTS, getBlogPost } from '@/data/blog';
import { routing, type Locale } from '@/i18n/routing';
import { Clock, ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_POSTS.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title[locale as Locale],
    description: post.excerpt[locale as Locale],
    openGraph: {
      title: post.title[locale as Locale],
      description: post.excerpt[locale as Locale],
      type: 'article',
      images: [post.cover],
      publishedTime: post.published_at,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(slug);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: 'blog' });

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="py-10 md:py-14">
        <div className="container-x max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-fg hover:text-primary">
            <ArrowLeft className="size-4" /> {t('title')}
          </Link>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold text-primary">
            {post.title[locale as Locale]}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-fg">
            <span className="inline-flex items-center gap-1"><Calendar className="size-4" /> {post.published_at}</span>
            <span className="inline-flex items-center gap-1"><Clock className="size-4" /> {post.reading_time} {t('minutes')}</span>
            <span className="rounded-full bg-accent/10 text-accent-dark px-2.5 py-0.5 font-semibold capitalize">
              {post.category}
            </span>
          </div>
          <div className="mt-8 aspect-[16/9] relative rounded-3xl overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title[locale as Locale]}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
          <div
            className="prose-body mt-10"
            dangerouslySetInnerHTML={{ __html: mdToHtml(post.body[locale as Locale]) }}
          />
        </div>
      </article>

      <CTASection />

      <section className="py-16">
        <div className="container-x max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">More articles</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl bg-white border border-border overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition">
                <div className="aspect-[16/10] relative">
                  <Image src={p.cover} alt={p.title[locale as Locale]} fill sizes="33vw" className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-primary text-sm group-hover:text-accent-dark">{p.title[locale as Locale]}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-accent-dark">
                    {t('read_more')} <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function mdToHtml(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let inList = false;
  let listTag: 'ul' | 'ol' | null = null;

  const closeList = () => {
    if (inList && listTag) {
      out.push(`</${listTag}>`);
      inList = false;
      listTag = null;
    }
  };

  const inline = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      closeList();
      continue;
    }
    if (line.startsWith('### ')) {
      closeList();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      closeList();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
      continue;
    }
    const ulMatch = line.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      if (!inList || listTag !== 'ul') {
        closeList();
        out.push('<ul>');
        inList = true;
        listTag = 'ul';
      }
      out.push(`<li>${inline(ulMatch[1])}</li>`);
      continue;
    }
    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (!inList || listTag !== 'ol') {
        closeList();
        out.push('<ol>');
        inList = true;
        listTag = 'ol';
      }
      out.push(`<li>${inline(olMatch[1])}</li>`);
      continue;
    }
    closeList();
    out.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return out.join('\n');
}
