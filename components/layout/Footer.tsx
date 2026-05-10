import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SITE } from '@/lib/config';
import { Phone, Mail, MapPin, MessageCircle, Send, Instagram } from 'lucide-react';
import Image from 'next/image';
import { CookieSettingsButton } from './CookieSettingsButton';
import { getCountry } from '@/data/countries';
import type { Locale } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  const featured = (['usa', 'italy', 'turkey'] as const)
    .map((slug) => getCountry(slug))
    .filter((c): c is NonNullable<ReturnType<typeof getCountry>> => Boolean(c));

  return (
    <footer className="bg-primary text-white/90 mt-16">
      <div className="container-x py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 text-white font-display font-bold text-lg"
              aria-label="United Global Consulting"
            >
              <span className="inline-flex items-center justify-center size-16 rounded-xl bg-white overflow-hidden p-1">
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={160}
                  height={160}
                  className="size-full object-contain"
                />
              </span>
              United Global Consulting
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20"
              >
                <MessageCircle className="size-5" />
              </a>
              <a
                href={SITE.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="inline-flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20"
              >
                <Send className="size-5" />
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20"
              >
                <Instagram className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.nav_title')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-accent">{t('nav.about')}</Link></li>
              <li><Link href="/countries" className="hover:text-accent">{t('nav.countries')}</Link></li>
              <li><Link href="/services" className="hover:text-accent">{t('nav.services')}</Link></li>
              <li><Link href="/blog" className="hover:text-accent">{t('nav.blog')}</Link></li>
              <li><Link href="/contact" className="hover:text-accent">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.services_title')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/universities" className="hover:text-accent">{t('nav.universities')}</Link></li>
              <li><Link href="/quiz" className="hover:text-accent">{t('nav.quiz')}</Link></li>
              {featured.map((c) => (
                <li key={c.slug}>
                  <Link href={`/countries/${c.slug}`} className="hover:text-accent">
                    {c.name[locale] ?? c.name.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.contact_title')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="size-4 mt-0.5 text-accent" />
                <div className="flex flex-col gap-0.5">
                  <a href={`tel:${SITE.phoneTel}`} className="hover:text-accent">{SITE.phone}</a>
                  <a href={`tel:${SITE.phone2Tel}`} className="hover:text-accent">{SITE.phone2}</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="size-4 mt-0.5 text-accent" />
                <a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 text-accent" />
                <span>{t('contact.address_value')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {year} {SITE.name}. {t('footer.rights')}.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="hover:text-white">{t('footer.privacy')}</Link>
            <Link href="/terms" className="hover:text-white">{t('footer.terms')}</Link>
            <CookieSettingsButton className="hover:text-white text-left">
              {t('footer.cookie_settings')}
            </CookieSettingsButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
