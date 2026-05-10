'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { LayoutDashboard, Inbox, Users2, Activity, Menu, X } from 'lucide-react';
import { LogoutButton } from './LogoutButton';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/adminpaneljigar/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { href: '/adminpaneljigar/leads', label: "So'rovnomalar", Icon: Inbox },
  { href: '/adminpaneljigar/content/partners', label: 'Hamkorlar', Icon: Users2 },
  { href: '/adminpaneljigar/activity', label: 'Faollik tarixi', Icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 bg-[var(--color-surface)] border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/adminpaneljigar/dashboard" className="flex items-center gap-2 font-bold">
            <Image src="/logo-mark.png" alt="" width={36} height={36} className="size-9 object-contain" />
            <span>Admin</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Yopish' : 'Ochish'}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <nav className="px-3 pb-3 space-y-1 border-t border-border bg-[var(--color-surface)]">
            {NAV.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
                  pathname.startsWith(href)
                    ? 'bg-primary text-white'
                    : 'text-[var(--color-fg)] hover:bg-muted',
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border">
              <LogoutButton />
            </div>
          </nav>
        )}
      </header>

      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-[var(--color-surface)] border-r border-border">
        <Link
          href="/adminpaneljigar/dashboard"
          className="flex items-center gap-3 h-20 px-5 border-b border-border font-display font-bold"
        >
          <Image src="/logo-mark.png" alt="" width={48} height={48} className="size-12 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm">United Global</span>
            <span className="text-xs text-muted-fg">Admin</span>
          </div>
        </Link>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition',
                  active
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-[var(--color-fg)] hover:bg-muted',
                )}
              >
                <Icon className={cn('size-4', active ? '' : 'text-muted-fg')} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
