'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobile(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const NAV = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/countries', label: t('countries') },
    { href: '/universities', label: t('universities') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all bg-[var(--color-bg)]/95 backdrop-blur border-b border-border',
          scrolled ? 'h-16 md:h-20 shadow-sm' : 'h-16 md:h-24'
        )}
      >
        <div className="container-x h-full flex items-center justify-between gap-2 sm:gap-3">
          <Link
            href="/"
            onClick={() => setMobile(false)}
            className="flex items-center gap-2 sm:gap-3 font-display font-bold text-[var(--color-fg)] min-w-0 shrink"
            aria-label="United Global Consulting"
          >
            <Image
              src="/logo-mark.png"
              alt=""
              width={160}
              height={160}
              priority
              className="size-10 sm:size-12 md:size-14 lg:size-16 object-contain shrink-0"
            />
            <span className="hidden sm:inline text-base md:text-lg truncate">
              United Global Consulting
            </span>
            <span className="sm:hidden text-sm font-bold">UGC</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-[var(--color-fg)]/80">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-accent-dark"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href="/contact" className="hidden md:inline-flex">
              <Button variant="apply" size="md">
                {t('apply')}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <button
              type="button"
              aria-label={mobile ? t('menu_close') : t('menu_open')}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              onClick={() => setMobile((v) => !v)}
              className={cn(
                'lg:hidden inline-flex items-center justify-center size-11 rounded-full border-2 transition-colors shrink-0',
                mobile
                  ? 'bg-primary text-white border-primary'
                  : 'border-accent/50 bg-accent/10 text-[var(--color-fg)] hover:bg-accent/20'
              )}
            >
              {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label={t('menu_close')}
        tabIndex={mobile ? 0 : -1}
        onClick={() => setMobile(false)}
        className={cn(
          'lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-200',
          mobile ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobile}
        className={cn(
          'lg:hidden fixed inset-x-0 z-40 bg-[var(--color-bg)] border-b border-border shadow-xl overflow-auto transition-transform duration-300 ease-out',
          scrolled ? 'top-16' : 'top-16 md:top-24',
          mobile ? 'translate-y-0' : '-translate-y-[110%] pointer-events-none'
        )}
        style={{ maxHeight: 'calc(100dvh - 4rem)' }}
      >
        <div className="container-x py-4 flex flex-col">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobile(false)}
              className="py-3.5 text-base font-medium text-[var(--color-fg)] border-b border-border flex items-center justify-between hover:text-accent-dark"
            >
              <span>{item.label}</span>
              <ArrowRight className="size-4 text-muted-fg" />
            </Link>
          ))}
          <Link
            href="/quiz"
            onClick={() => setMobile(false)}
            className="py-3.5 text-base font-medium text-[var(--color-fg)] border-b border-border flex items-center justify-between hover:text-accent-dark"
          >
            <span>{t('quiz')}</span>
            <ArrowRight className="size-4 text-muted-fg" />
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobile(false)}
            className="mt-5 mb-2"
          >
            <Button variant="apply" size="lg" className="w-full">
              {t('apply')}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
