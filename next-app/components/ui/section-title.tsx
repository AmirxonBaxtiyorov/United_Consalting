import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  inverted?: boolean;
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  inverted = false,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'mb-3 text-xs font-semibold tracking-[0.2em]',
            inverted ? 'text-accent' : 'text-accent-dark'
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-bold',
          inverted ? 'text-white' : 'text-primary'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base md:text-lg',
            inverted ? 'text-white/80' : 'text-muted-fg'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
