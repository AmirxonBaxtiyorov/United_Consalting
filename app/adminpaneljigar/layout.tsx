import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { isAdmin } from '@/lib/admin-auth';
import { LogoutButton } from './LogoutButton';

export const metadata: Metadata = {
  title: 'Admin · United Global Consulting',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdmin();

  if (!authed) {
    return <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <header className="sticky top-0 z-30 bg-[var(--color-surface)] border-b border-border">
        <div className="container-x h-16 flex items-center justify-between gap-4">
          <Link href="/adminpaneljigar/leads" className="flex items-center gap-3 font-display font-bold">
            <Image src="/logo-mark.png" alt="" width={120} height={120} className="size-12 object-contain" />
            <span>Admin</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/adminpaneljigar/leads" className="hover:text-accent-dark">Leads</Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="container-x py-6">{children}</main>
    </div>
  );
}
