import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useLocale, useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { COUNTRIES, getCountry, allCountrySlugs } from '@/data/countries';
import { ContactForm } from '@/components/sections/ContactForm';
import { CTASection } from '@/components/sections/CTASection';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { formatMoney } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { Calendar, GraduationCap, BedDouble, Plane, ShieldCheck, FileText, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { BreadcrumbSchema, CountryCoursesSchema } from '@/components/shared/SchemaOrg';
import { SITE } from '@/lib/config';

export function generateStaticParams() {
  const slugs = allCountrySlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const country = getCountry(slug);
  if (!country) return {};
  const name = country.name[locale as Locale] ?? country.name.en;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const description = `${name}: admission, tuition ${formatMoney(country.tuition_year.bachelor)}+, scholarships, visa. ${t('description')}`;
  return {
    title: name,
    description,
    alternates: {
      canonical: `/${locale}/countries/${slug}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}/countries/${slug}`])),
    },
    openGraph: {
      title: name,
      description,
    },
  };
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const country = getCountry(slug);
  if (!country) notFound();

  const safeLocale = locale as Locale;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const countryName = country.name[safeLocale] ?? country.name.en;
  const countryUrl = `${SITE.url}/${safeLocale}/countries/${slug}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: tNav('home'), url: `${SITE.url}/${safeLocale}` },
          { name: tNav('countries'), url: `${SITE.url}/${safeLocale}/countries` },
          { name: countryName, url: countryUrl },
        ]}
      />
      <CountryCoursesSchema
        countryName={countryName}
        url={countryUrl}
        universities={country.universities.map((u) => ({ name: u.name, description: u.desc }))}
      />
      <CountryDetail slug={slug} locale={safeLocale} />
    </>
  );
}

function CountryDetail({ slug, locale }: { slug: string; locale: Locale }) {
  const country = getCountry(slug)!;
  const t = useTranslations('calculator');
  const tc = useTranslations('countries');
  const ts = useTranslations('scholarships');
  const pageLocale = useLocale() as Locale;
  const nameLocalized = country.name[locale] ?? country.name[pageLocale];

  const yearlyLowest =
    country.tuition_year.bachelor + country.living_year.dorm + country.extra.insurance;

  const others = COUNTRIES.filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-hero-grad">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-border px-3 py-1 text-xs font-semibold text-primary">
              <Image
                src={`https://flagcdn.com/w40/${country.code}.png`}
                alt=""
                width={18}
                height={13}
                unoptimized
              />
              {country.capital} · {country.currency_local}
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold text-primary">
              {nameLocalized}
            </h1>
            <p className="mt-4 text-lg text-muted-fg max-w-xl">
              {country.universities_count}+ universities · {country.language} · tuition from {formatMoney(country.tuition_year.bachelor)}/yr
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="lg">
                  Get admission plan
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button size="lg" variant="outline">
                  Calculate cost
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[5/4] relative rounded-3xl overflow-hidden shadow-[var(--shadow-card-hover)]">
              <Image
                src={country.image}
                alt={nameLocalized}
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          <SectionTitle title={`Why ${nameLocalized}?`} align="left" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <WhyCard Icon={GraduationCap} title="Top-ranked universities" body={`${country.universities_count}+ accredited institutions, QS-ranked flagships.`} />
            <WhyCard Icon={BookOpen} title="Language flexibility" body={country.language} />
            <WhyCard Icon={Sparkles} title="Scholarship pathways" body={`Merit + government scholarships covering up to 100% of tuition.`} />
            <WhyCard Icon={ShieldCheck} title="Low refusal rate" body="Well-documented track record of student visa approvals." />
            <WhyCard Icon={Plane} title="Strong diaspora" body="Uzbek student communities in major cities." />
            <WhyCard Icon={FileText} title="Clear process" body="From offer to visa in a structured, predictable timeline." />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted">
        <div className="container-x">
          <SectionTitle title="Top universities" align="left" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {country.universities.map((u) => (
              <div key={u.name} className="rounded-3xl bg-white border border-border p-6 shadow-[var(--shadow-card)]">
                <span className="inline-block rounded-full bg-accent/10 text-accent-dark px-2.5 py-0.5 text-xs font-semibold">
                  {u.chip}
                </span>
                <h3 className="mt-3 text-lg font-bold text-primary">{u.name}</h3>
                <p className="mt-2 text-sm text-muted-fg">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          <SectionTitle title="Cost of study + living" subtitle="Realistic annual estimate per official university and consulate data" align="left" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white border border-border p-6 md:p-8">
              <h3 className="font-bold text-primary">Tuition (per year)</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <CostRow label={t('bachelor')} value={formatMoney(country.tuition_year.bachelor)} />
                <CostRow label={t('master')} value={formatMoney(country.tuition_year.master)} />
                <CostRow label={t('phd')} value={formatMoney(country.tuition_year.phd)} />
                <CostRow label={t('language')} value={formatMoney(country.tuition_year.language)} />
              </ul>
            </div>
            <div className="rounded-3xl bg-white border border-border p-6 md:p-8">
              <h3 className="font-bold text-primary">Living (per year)</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <CostRow label={t('dorm')} value={formatMoney(country.living_year.dorm)} icon={<BedDouble className="size-4" />} />
                <CostRow label={t('shared')} value={formatMoney(country.living_year.shared)} />
                <CostRow label={t('rent')} value={formatMoney(country.living_year.rent)} />
              </ul>
              <div className="mt-5 p-4 rounded-2xl bg-accent/10">
                <div className="text-sm text-muted-fg">Lowest realistic annual budget</div>
                <div className="text-2xl font-bold text-primary">{formatMoney(yearlyLowest)}</div>
                <div className="text-xs text-muted-fg mt-1">Bachelor + dormitory + insurance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted">
        <div className="container-x">
          <SectionTitle title="Upcoming deadlines" align="left" />
          <ul className="grid md:grid-cols-2 gap-4">
            {country.typical_deadlines.map((d) => (
              <li key={d.id} className="flex items-start gap-4 rounded-3xl bg-white border border-border p-5">
                <span className="inline-flex items-center justify-center size-11 rounded-xl bg-primary/5 text-primary shrink-0">
                  <Calendar className="size-5" />
                </span>
                <div>
                  <div className="text-xs font-semibold tracking-wider text-accent-dark uppercase">{d.date}</div>
                  <div className="mt-1 font-semibold text-primary">{d.label}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          <SectionTitle title={ts('title')} subtitle={ts('subtitle')} align="left" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['t1', 't2', 't3', 't4'] as const).map((key) => (
              <div key={key} className="rounded-3xl border border-border bg-white p-5">
                <div className="font-semibold text-primary">{ts(`${key}_t`)}</div>
                <p className="text-sm text-muted-fg mt-1.5">{ts(`${key}_d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <section className="py-16 md:py-20">
        <div className="container-x">
          <SectionTitle title="Other destinations" align="left" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/countries/${c.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition"
              >
                <div className="aspect-[4/3] relative">
                  <Image src={c.image} alt={c.name[pageLocale]} fill sizes="25vw" className="object-cover group-hover:scale-105 transition" />
                </div>
                <div className="p-3">
                  <div className="font-semibold text-primary">{c.name[pageLocale]}</div>
                  <div className="text-xs text-muted-fg">{c.universities_count}+ {tc('universities')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm source={`country:${country.slug}`} />
    </>
  );
}

function WhyCard({
  Icon,
  title,
  body,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl bg-white border border-border p-6 shadow-[var(--shadow-card)]">
      <span className="inline-flex items-center justify-center size-12 rounded-2xl bg-accent/10 text-accent-dark">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 font-bold text-primary">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-fg">{body}</p>
    </div>
  );
}

function CostRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <li className="flex items-center justify-between border-b border-border last:border-0 py-2">
      <span className="inline-flex items-center gap-2 text-primary/80">
        {icon}
        {label}
      </span>
      <span className="font-semibold tabular-nums text-primary">{value}</span>
    </li>
  );
}
