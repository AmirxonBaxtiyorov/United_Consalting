import type { Metadata } from 'next';
import { isAdmin } from '@/lib/admin-auth';
import { Sidebar } from './Sidebar';

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
      <Sidebar />
      <main className="lg:ml-64">
        <div className="px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
