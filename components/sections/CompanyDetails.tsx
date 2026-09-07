'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/config';
import {
  Building2,
  Landmark,
  Briefcase,
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  Languages,
  CalendarDays,
  MessageCircle,
  Send,
  Instagram,
  ChevronDown,
  Copy,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const siteHost = SITE.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const telegramHandle = SITE.social.telegram.replace(/^https?:\/\/t\.me\//, '');
const instagramHandle = SITE.social.instagram.replace(/^https?:\/\/(?:www\.)?instagram\.com\//, '');

export function CompanyDetails() {
  const t = useTranslations('partnership');
  const tc = useTranslations('contact');
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const plainText = [
    SITE.name,
    `${t('d_legal')}: ${tc('legal_name')}`,
    `${t('d_activity')}: ${t('d_activity_value')}`,
    `${t('d_phone')}: ${SITE.phone}, ${SITE.phone2} (WhatsApp)`,
    `${t('d_email')}: ${SITE.email}`,
    `${t('d_site')}: ${siteHost}`,
    `${tc('office_tashkent_label')}: ${tc('office_tashkent_value')}`,
    `${tc('office_khorazm_label')}: ${tc('office_khorazm_value')}`,
    `${tc('hours_label')}: ${tc('hours_value')}`,
    `Telegram: @${telegramHandle}`,
    `Instagram: @${instagramHandle}`,
  ].join('\n');

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable (insecure context or denied) — the details stay readable on screen.
    }
  };

  return (
    <section id="requisites" className="py-20 md:py-28 bg-muted">
      <div className="container-x">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent-dark">
              {t('details_eyebrow')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-fg)]">
              {t('details_title')}
            </h2>
            <p className="mt-4 text-muted-fg">{t('details_subtitle')}</p>

            <div className="mt-8">
              <Button
                type="button"
                variant="apply"
                size="lg"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="company-details"
              >
                {open ? t('details_hide') : t('details_show')}
                <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
              </Button>
            </div>
          </div>

          <div
            id="company-details"
            hidden={!open}
            className="mt-8 rounded-3xl bg-[var(--color-surface)] border border-border p-6 md:p-8 shadow-[var(--shadow-card)]"
          >
            <dl className="grid md:grid-cols-2 gap-x-8 gap-y-5">
              <Row Icon={Building2} label={t('d_company')}>
                <span className="font-semibold">{SITE.name}</span> ({SITE.shortName})
              </Row>
              <Row Icon={Landmark} label={t('d_legal')}>
                <span className="font-semibold">{tc('legal_name')}</span>
              </Row>
              <Row Icon={Briefcase} label={t('d_activity')}>
                {t('d_activity_value')}
              </Row>
              <Row Icon={Phone} label={t('d_phone')}>
                <span className="flex flex-col gap-1">
                  <a href={`tel:${SITE.phoneTel}`} className="hover:text-accent-dark">
                    {SITE.phone}
                  </a>
                  <a href={`tel:${SITE.phone2Tel}`} className="hover:text-accent-dark">
                    {SITE.phone2}
                    <span className="ml-2 text-xs text-muted-fg">WhatsApp</span>
                  </a>
                </span>
              </Row>
              <Row Icon={Mail} label={t('d_email')}>
                <a href={`mailto:${SITE.email}`} className="hover:text-accent-dark break-all">
                  {SITE.email}
                </a>
              </Row>
              <Row Icon={MapPin} label={tc('office_tashkent_label')}>
                {tc('office_tashkent_value')}
              </Row>
              <Row Icon={MapPin} label={tc('office_khorazm_label')}>
                {tc('office_khorazm_value')}
              </Row>
              <Row Icon={Clock} label={tc('hours_label')}>
                {tc('hours_value')}
              </Row>
              <Row Icon={Globe} label={t('d_site')}>
                <a
                  href={SITE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-dark break-all"
                >
                  {siteHost}
                </a>
              </Row>
              <Row Icon={Send} label="Telegram">
                <a
                  href={SITE.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-dark break-all"
                >
                  @{telegramHandle}
                </a>
              </Row>
              <Row Icon={Instagram} label="Instagram">
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-dark break-all"
                >
                  @{instagramHandle}
                </a>
              </Row>
              <Row Icon={Languages} label={t('d_languages')}>
                {t('d_languages_value')}
              </Row>
              <Row Icon={CalendarDays} label={t('d_founded')}>
                {SITE.founded}
              </Row>
            </dl>

            <div className="mt-8 flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="md" onClick={onCopy}>
                {copied ? <Check className="size-4 text-accent-dark" /> : <Copy className="size-4" />}
                {copied ? t('details_copied') : t('details_copy')}
              </Button>
              <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button type="button" variant="outline" size="md">
                  <MessageCircle className="size-4" />
                  WhatsApp
                </Button>
              </a>
              <a href={SITE.social.telegram} target="_blank" rel="noopener noreferrer">
                <Button type="button" variant="outline" size="md">
                  <Send className="size-4" />
                  Telegram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  Icon,
  label,
  children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex items-center justify-center size-9 rounded-xl bg-accent/15 text-accent-dark shrink-0">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wider text-muted-fg">{label}</dt>
        <dd className="mt-0.5 text-sm text-[var(--color-fg)]">{children}</dd>
      </div>
    </div>
  );
}
