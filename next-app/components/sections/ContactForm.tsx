'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/config';
import { COUNTRIES } from '@/data/countries';
import { CheckCircle2, AlertCircle, Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

const formSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[+()\d\s-]{7,}$/),
  email: z.string().trim().email().optional().or(z.literal('')),
  country: z.string().optional(),
  degree: z.string().optional(),
  message: z.string().max(2000).optional(),
  consent: z.boolean().refine((v) => v === true, { message: 'required' }),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm({ source = 'homepage' }: { source?: string }) {
  const t = useTranslations('contact');
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: false },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale, source }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('ok');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'ok') {
    return (
      <div className="rounded-3xl bg-white border border-border p-8 text-center">
        <span className="inline-flex items-center justify-center size-14 rounded-2xl bg-accent/10 text-accent-dark mb-4">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="text-2xl font-bold text-primary">{t('success_title')}</h3>
        <p className="mt-2 text-muted-fg">{t('success_body')}</p>
      </div>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted">
      <div className="container-x">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent-dark">{t('eyebrow')}</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">{t('title')}</h2>
            <p className="mt-4 text-muted-fg">{t('subtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:col-span-3 rounded-3xl bg-white border border-border p-6 md:p-8 space-y-5 shadow-[var(--shadow-card)]"
              noValidate
            >
              <input
                type="text"
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
                {...register('website')}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Field label={t('name')} error={errors.name?.message}>
                  <input
                    type="text"
                    {...register('name')}
                    className="input"
                    placeholder="Ivan Petrov"
                    autoComplete="name"
                  />
                </Field>
                <Field label={t('phone')} error={errors.phone?.message}>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="input"
                    placeholder="+998 ..."
                    autoComplete="tel"
                  />
                </Field>
              </div>

              <Field label={t('email')} error={errors.email?.message}>
                <input
                  type="email"
                  {...register('email')}
                  className="input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </Field>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label={t('country_interest')}>
                  <select {...register('country')} className="input" defaultValue="">
                    <option value="">{t('select_placeholder')}</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name[locale]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t('degree')}>
                  <select {...register('degree')} className="input" defaultValue="">
                    <option value="">{t('select_placeholder')}</option>
                    <option value="bachelor">{t('degree_bachelor')}</option>
                    <option value="master">{t('degree_master')}</option>
                    <option value="phd">{t('degree_phd')}</option>
                    <option value="language">{t('degree_language')}</option>
                    <option value="undecided">{t('degree_undecided')}</option>
                  </select>
                </Field>
              </div>

              <Field label={t('message')}>
                <textarea
                  {...register('message')}
                  className="input min-h-28 resize-y"
                  rows={4}
                />
              </Field>

              <label className="flex items-start gap-3 text-sm text-muted-fg">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="mt-0.5 size-4 accent-accent-dark"
                />
                <span>
                  {t('consent')}{' '}
                  <a href={`/${locale}/privacy`} className="underline text-accent-dark">
                    Privacy
                  </a>
                </span>
              </label>
              {errors.consent && (
                <p className="text-sm text-error">{t('consent')}</p>
              )}

              {status === 'error' && (
                <div className="flex items-start gap-2 rounded-xl bg-error/10 border border-error/30 p-3 text-sm text-error">
                  <AlertCircle className="size-4 mt-0.5" />
                  <div>
                    <div className="font-semibold">{t('error_title')}</div>
                    <div>{t('error_body')}</div>
                  </div>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
                {status === 'loading' ? t('submitting') : t('submit')}
              </Button>
            </form>

            <aside className="lg:col-span-2 rounded-3xl bg-primary text-white p-6 md:p-8">
              <h3 className="text-xl font-bold">{t('info_title')}</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <InfoRow Icon={Phone} label={t('phone_label')}>
                  <a href={`tel:${SITE.phoneTel}`} className="hover:text-accent">{SITE.phone}</a>
                </InfoRow>
                <InfoRow Icon={Mail} label={t('email_label')}>
                  <a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a>
                </InfoRow>
                <InfoRow Icon={MapPin} label={t('address_label')}>
                  {t('address_value')}
                </InfoRow>
                <InfoRow Icon={Clock} label={t('hours_label')}>
                  {t('hours_value')}
                </InfoRow>
              </ul>
              <div className="mt-8 flex gap-2">
                <a
                  href={SITE.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 py-3 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
                <a
                  href={SITE.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 py-3 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Send className="size-4" />
                  Telegram
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-sm font-medium text-primary">{label}</div>
      {children}
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </label>
  );
}

function InfoRow({
  Icon,
  label,
  children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="inline-flex items-center justify-center size-9 rounded-xl bg-accent/20 text-accent shrink-0">
        <Icon className="size-4" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
        <div className="text-white">{children}</div>
      </div>
    </li>
  );
}
