import Image from 'next/image';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import { LoginForm } from './LoginForm';

export default async function LoginPage() {
  if (await isAdmin()) redirect('/adminpaneljigar/leads');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-hero-grad">
      <div className="w-full max-w-sm rounded-3xl bg-[var(--color-surface)] border border-border p-7 shadow-[var(--shadow-card)]">
        <div className="flex flex-col items-center text-center mb-6">
          <Image src="/logo.png" alt="United Global Consulting" width={240} height={240} className="h-auto w-44 object-contain" priority />
          <h1 className="mt-3 text-xl font-bold">Admin Panel</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
