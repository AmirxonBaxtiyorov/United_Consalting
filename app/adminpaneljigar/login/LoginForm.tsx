'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from './actions';
import { Button } from '@/components/ui/button';
import { AlertCircle, LogIn } from 'lucide-react';

const initial: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="space-y-4">
      <label className="block">
        <div className="mb-1.5 text-sm font-medium">Login</div>
        <input
          type="text"
          name="login"
          required
          autoFocus
          className="input"
          placeholder="admin"
          autoComplete="username"
        />
      </label>
      <label className="block">
        <div className="mb-1.5 text-sm font-medium">Parol</div>
        <input
          type="password"
          name="password"
          required
          className="input"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </label>
      {state.error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl bg-error/10 border border-error/30 p-3 text-sm text-error">
          <AlertCircle className="size-4 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}
      <Button type="submit" size="md" className="w-full" disabled={pending}>
        <LogIn className="size-4" />
        {pending ? 'Tekshirilmoqda...' : 'Kirish'}
      </Button>
    </form>
  );
}
