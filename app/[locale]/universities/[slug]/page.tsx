import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/sections/ContactForm';
import { UNIVERSITIES, getUniversity, allUniversitySlugs } from '@/data/universities';
import { COUNTRIES } from '@/data/countries';
import type { Locale } from '@/i18n/routing';
import { MapPin, GraduationCap, Award, Languages, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function generateStaticParams() {
  return allUniversitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const u = getUniversity(slug);
  if (!u) return {};
  return {
    title: `${u.name} — ${u.city}`,
    description: u.summary[locale as Locale],
    alternates: { canonical: `/${locale}/universities/${slug}` },
    openGraph: {
      title: u.name,
      description: u.summary[locale as Locale],
      images: [u.image],
    },
  };
}

export default async function UniversityDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'university_detail' });

  const u = getUniversity(slug);
  if (!u) notFound();

  const country = COUNTRIES.find((c) => c.slug === u.countrySlug);
  const others = UNIVERSITIES.filter((x) => x.countrySlug === u.countrySlug && x.slug !== u.slug).slice(0, 3);
  const gallery = [u.image, ...(u.gallery ?? [])];

  return (
    <>
      <section className="relative bg-hero-grad pt-10 pb-12 md:pt-16 md:pb-16">
        <div className="container-x">
          <nav className="text-sm text-muted-fg mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-accent-dark">{t('breadcrumb_home')}</Link>
            <span>/</span>
            <Link href="/universities" className="hover:text-accent-dark">{t('breadcrumb_universities')}</Link>
            {country && (
              <>
                <span>/</span>
                <Link href={`/countries/${country.slug}`} className="hover:text-accent-dark">
                  {country.name[locale as Locale]}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-[var(--color-fg)] truncate">{u.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)]/80 border border-border px-3 py-1 text-xs font-semibold text-[var(--color-fg)] capitalize">
                <Sparkles className="size-3.5 text-accent-dark" />
                {u.kind}
                {country && <> · {country.name[locale as Locale]}</>}
              </span>
              <h1 className="mt-4 font-display font-extrabold text-3xl md:text-5xl text-[var(--color-fg)]">
                {u.name}
              </h1>
              <div className="mt-3 flex items-center gap-1.5 text-muted-fg">
                <MapPin className="size-4" />
                <span>{u.city}</span>
              </div>
              <p className="mt-5 text-base md:text-lg text-muted-fg">
                {u.summary[locale as Locale]}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button size="lg">
                    {t('apply_cta')}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                {country && (
                  <Link href={`/countries/${country.slug}`}>
                    <Button size="lg" variant="outline">
                      {t('country_cta', { country: country.name[locale as Locale] })}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-[var(--color-surface)] border border-border shadow-[var(--shadow-card-hover)]">
                <div className="aspect-[5/4] relative">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {gallery.length > 1 && (
        <section className="py-10 md:py-14">
          <div className="container-x">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--color-fg)] mb-6">
              {t('gallery')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {gallery.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                  <Image
                    src={src}
                    alt={`${u.name} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-muted">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="rounded-3xl bg-[var(--color-surface)] border border-border p-6 md:p-8 shadow-[var(--shadow-card)]">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent-dark">
                <GraduationCap className="size-5" />
                {t('programs_title')}
              </div>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {u.programs.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[var(--color-fg)]">
                    <CheckCircle2 className="size-4 mt-1 shrink-0 text-accent-dark" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-fg">
                <Languages className="size-4" />
                {t('language_label')}: <span className="font-semibold text-[var(--color-fg)]">{u.language}</span>
              </div>
            </div>

            <div className="rounded-3xl bg-[var(--color-surface)] border border-border p-6 md:p-8 shadow-[var(--shadow-card)]">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent-dark">
                <Award className="size-5" />
                {t('scholarships_title')}
              </div>
              <ul className="mt-4 space-y-2.5">
                {u.scholarships.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[var(--color-fg)]">
                    <span className="mt-2 inline-block size-1.5 rounded-full bg-accent-dark shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-gold/15 border border-gold/30 px-4 py-3 text-sm">
                <span className="font-semibold text-[var(--color-fg)]">{t('tuition_label')}:</span>{' '}
                <span className="text-[var(--color-fg)]">{u.tuition}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-10 rounded-3xl bg-[var(--color-surface)] border border-border p-6 md:p-8 shadow-[var(--shadow-card)]">
            <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--color-fg)]">
              {t('advantages_title')}
            </h3>
            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {u.advantages.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-[var(--color-fg)]">
                  <CheckCircle2 className="size-5 mt-0.5 shrink-0 text-accent-dark" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {others.length > 0 && country && (
        <section className="py-12 md:py-16">
          <div className="container-x">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--color-fg)] mb-6">
              {t('other_in_country', { country: country.name[locale as Locale] })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/universities/${o.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition"
                >
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={o.image}
                      alt={o.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-[var(--color-fg)] line-clamp-1">{o.name}</div>
                    <div className="text-sm text-muted-fg mt-1">{o.city}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactForm source={`university-${u.slug}`} />
    </>
  );
}
