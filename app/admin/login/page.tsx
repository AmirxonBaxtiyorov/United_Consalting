import Image from 'next/image';
import { redirect } from 'next/navigation';
import { isAdmin, isAdminConfigured } from '@/lib/admin-auth';
import { LoginForm } from './LoginForm';

export default async function LoginPage() {
  if (await isAdmin()) redirect('/admin/leads');
  const configured = isAdminConfigured();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-hero-grad">
      <div className="w-full max-w-sm rounded-3xl bg-[var(--color-surface)] border border-border p-7 shadow-[var(--shadow-card)]">
        <div className="flex flex-col items-center text-center mb-6">
          <Image src="/logo.png" alt="United Global Consulting" width={240} height={240} className="h-auto w-44 object-contain" priority />
          <h1 className="mt-3 text-xl font-bold">Admin Panel</h1>
        </div>
        {!configured && (
          <div className="mb-4 rounded-xl bg-warning/10 border border-warning/30 p-3 text-xs text-[var(--color-fg)]">
            <strong>Diqqat:</strong> Vercel da <code>ADMIN_PASSWORD</code> env-i qo&apos;shilmagan.
            Loyiha sozlamalariga kiring va <code>ADMIN_PASSWORD</code> qiymatini belgilang.
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
