'use client';

import { clearConsent } from '@/lib/consent';

export function CookieSettingsButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => clearConsent()}
    >
      {children}
    </button>
  );
}
