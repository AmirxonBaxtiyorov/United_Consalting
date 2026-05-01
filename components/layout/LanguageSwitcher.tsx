'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { useTransition, useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOCALE_LABEL: Record<Locale, { short: string; full: string }> = {
  ru: { short: 'RU', full: 'Русский' },
  uz: { short: 'UZ', full: "O'zbekcha" },
  en: { short: 'EN', full: 'English' },
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function change(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-[var(--color-surface)] px-3 h-10 text-sm font-medium text-[var(--color-fg)] hover:bg-[var(--color-muted)]"
      >
        <Globe className="size-4" />
        {LOCALE_LABEL[locale].short}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-border bg-[var(--color-surface)] p-1 shadow-[var(--shadow-card-hover)] z-50"
        >
          {routing.locales.map((loc) => (
            <li key={loc}>
              <button
                role="option"
                aria-selected={loc === locale}
                onClick={() => change(loc as Locale)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-[var(--color-fg)] hover:bg-[var(--color-muted)]"
              >
                <span>{LOCALE_LABEL[loc as Locale].full}</span>
                {loc === locale && <Check className="size-4 text-accent-dark" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
