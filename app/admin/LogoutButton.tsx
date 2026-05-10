'use client';

import { logoutAction } from './actions';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 text-sm text-muted-fg hover:text-error"
      >
        <LogOut className="size-4" />
        <span>Chiqish</span>
      </button>
    </form>
  );
}
