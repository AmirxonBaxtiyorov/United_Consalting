import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Accent = 'primary' | 'info' | 'accent' | 'gold' | 'success' | 'error';

const ACCENT_BG: Record<Accent, string> = {
  primary: 'bg-primary/10 text-primary',
  info: 'bg-info/10 text-info',
  accent: 'bg-accent/15 text-accent-dark',
  gold: 'bg-gold/15 text-[#a06a00]',
  success: 'bg-success/10 text-success',
  error: 'bg-error/10 text-error',
};

export function StatCard({
  label,
  value,
  Icon,
  accent = 'primary',
  size = 'md',
}: {
  label: string;
  value: number | string;
  Icon: LucideIcon;
  accent?: Accent;
  size?: 'md' | 'lg';
}) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-[var(--color-surface)] border border-border shadow-[var(--shadow-card)] p-4 transition hover:shadow-[var(--shadow-card-hover)]',
        size === 'lg' && 'p-5',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wider text-muted-fg truncate">{label}</div>
          <div className={cn('font-bold mt-1', size === 'lg' ? 'text-3xl' : 'text-2xl')}>{value}</div>
        </div>
        <span className={cn('inline-flex items-center justify-center size-10 rounded-xl shrink-0', ACCENT_BG[accent])}>
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  );
}
