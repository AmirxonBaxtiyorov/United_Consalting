import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-accent-foreground hover:bg-accent-dark shadow-[0_6px_24px_rgba(0,212,170,0.35)] hover:-translate-y-0.5',
        secondary:
          'bg-primary text-primary-foreground hover:bg-primary-light',
        outline:
          'bg-[var(--color-surface)] border border-border text-[var(--color-fg)] hover:bg-muted',
        ghost:
          'bg-transparent text-[var(--color-fg)] hover:bg-muted',
        gold:
          'bg-gold text-[var(--color-fg)] hover:bg-gold-dark',
      },
      size: {
        sm: 'text-sm h-9 px-4',
        md: 'text-base h-11 px-6',
        lg: 'text-base h-12 px-7',
        xl: 'text-lg h-14 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export { buttonVariants };
