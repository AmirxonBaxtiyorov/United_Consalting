import { Database } from 'lucide-react';

export function SupabaseDownNotice() {
  return (
    <div className="max-w-2xl mx-auto py-10 text-center">
      <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-warning/15 text-warning mb-4">
        <Database className="size-7" />
      </div>
      <h1 className="text-2xl font-bold">Supabase ulanmagan</h1>
      <p className="mt-2 text-muted-fg">
        Vercel loyiha sozlamalarida quyidagi env-larni qo&apos;shing:
      </p>
      <pre className="mt-4 text-left text-xs bg-muted rounded-xl p-4 overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...`}
      </pre>
      <p className="mt-3 text-xs text-muted-fg">
        Supabase Dashboard → Project Settings → API bo&apos;limidan oling.
      </p>
    </div>
  );
}
