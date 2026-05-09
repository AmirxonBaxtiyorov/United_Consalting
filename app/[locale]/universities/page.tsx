import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { UNIVERSITIES } from '@/data/universities';
import { COUNTRIES } from '@/data/countries';
import type { Locale } from '@/i18n/routing';
import { SectionTitle } from '@/components/ui/section-title';
import { ContactForm } from '@/components/sections/ContactForm';
import { ArrowUpRight, MapPin, GraduationCap } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'universities' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: `/${locale}/universities` },
  };
}

export default async function UniversitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'universities' });

  // Group by country
  const byCountry = COUNTRIES.map((country) => ({
    country,
    list: UNIVERSITIES.filter((u) => u.countrySlug === country.slug),
  })).filter((g) => g.list.length > 0);

  return (
    <>
      <section className="bg-hero-grad pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-x">
          <SectionTitle
            eyebrow={t('eyebrow')}
            title={t('full_title')}
            subtitle={t('full_subtitle')}
            align="center"
          />
        </div>
      </section>

      {byCountry.map(({ country, list }) => (
        <section key={country.slug} className="py-12 md:py-16 even:bg-muted">
          <div className="container-x">
            <div className="flex items-center gap-3 mb-8">
              <Image
                src={`https://flagcdn.com/w80/${country.code}.png`}
                alt=""
                width={36}
                height={26}
                unoptimized
                className="rounded shadow"
              />
              <div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--color-fg)]">
                  {country.name[locale as Locale]}
                </h2>
                <div className="text-sm text-muted-fg">
                  {list.length} {t('universities_in_country')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {list.map((u) => (
                <Link
                  key={u.slug}
                  href={`/universities/${u.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition hover:-translate-y-0.5"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={u.image}
                      alt={u.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <span className="absolute top-3 right-3 rounded-full bg-accent/95 px-2.5 py-1 text-xs font-semibold text-accent-foreground shadow capitalize">
                      {u.kind}
                    </span>
                    <span className="absolute bottom-3 right-3 inline-flex items-center justify-center size-9 rounded-full bg-accent text-accent-foreground opacity-0 group-hover:opacity-100 transition">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-[var(--color-fg)] line-clamp-1">{u.name}</h3>
                    <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-fg">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="truncate">{u.city}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted-fg line-clamp-2">{u.summary[locale as Locale]}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[var(--color-fg)] font-semibold text-sm">
                      <GraduationCap className="size-4 text-accent-dark" />
                      {u.tuition}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <ContactForm source="universities-list" />
    </>
  );
}
