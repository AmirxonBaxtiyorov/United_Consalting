'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap } from 'lucide-react';
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
  }, [mobile]);

  const NAV = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/countries', label: t('countries') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all',
        scrolled
          ? 'bg-white/90 backdrop-blur border-b border-border h-16'
          : 'bg-transparent h-20'
      )}
    >
      <div className="container-x h-full flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-lg text-primary"
        >
          <span className="inline-flex items-center justify-center size-9 rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-5" />
          </span>
          <span className="hidden sm:inline">United Global</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-primary/80">
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

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/contact" className="hidden md:inline-flex">
            <Button size="sm">{t('cta')}</Button>
          </Link>
          <button
            aria-label={mobile ? t('menu_close') : t('menu_open')}
            onClick={() => setMobile((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-full border border-border bg-white text-primary"
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobile && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-30 overflow-auto">
          <div className="container-x py-6 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobile(false)}
                className="py-3 text-lg font-medium text-primary border-b border-border"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/calculator"
              onClick={() => setMobile(false)}
              className="py-3 text-lg font-medium text-primary border-b border-border"
            >
              {t('calculator')}
            </Link>
            <Link
              href="/quiz"
              onClick={() => setMobile(false)}
              className="py-3 text-lg font-medium text-primary border-b border-border"
            >
              {t('quiz')}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobile(false)}
              className="mt-4"
            >
              <Button size="lg" className="w-full">
                {t('cta')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
