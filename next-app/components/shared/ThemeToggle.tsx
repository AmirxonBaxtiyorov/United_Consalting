'use client';

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const subscribeNoop = () => () => {};
const getClient = () => true;
const getServer = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, getClient, getServer);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={cn(
          'inline-flex items-center justify-center size-10 rounded-full border border-border bg-[var(--color-surface)]',
          className
        )}
      />
    );
  }

  const cycle = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const label =
    theme === 'system'
      ? `System (${resolvedTheme})`
      : theme === 'dark'
        ? 'Dark'
        : 'Light';

  const Icon = theme === 'system' ? Monitor : theme === 'dark' ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to change.`}
      title={label}
      className={cn(
        'inline-flex items-center justify-center size-10 rounded-full border border-border bg-[var(--color-surface)] text-[var(--color-fg)] hover:bg-[var(--color-muted)]',
        className
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
