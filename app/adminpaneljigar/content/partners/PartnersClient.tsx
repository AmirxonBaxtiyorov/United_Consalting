'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { Eye, EyeOff, Trash2, Upload, Plus, AlertCircle } from 'lucide-react';
import type { PartnerRow } from '@/lib/supabase';
import {
  createPartnerAction,
  deletePartnerAction,
  reorderPartnerAction,
  toggleHiddenAction,
  type CreatePartnerState,
} from './actions';

const initial: CreatePartnerState = {};

export function PartnersClient({ partners }: { partners: PartnerRow[] }) {
  const [state, formAction, pending] = useActionState(createPartnerAction, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && formRef.current) formRef.current.reset();
  }, [state.ok]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold">Hamkor universitetlar</h1>
        <p className="text-sm text-muted-fg mt-1">
          Bosh sahifadagi &quot;Hamkor universitetlarimiz&quot; bo&apos;limidagi logotiplarni boshqarish.
        </p>
      </header>

      <section className="rounded-2xl bg-[var(--color-surface)] border border-border p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-dark">
            <Plus className="size-4" />
          </span>
          <h2 className="font-semibold">Yangi hamkor qo&apos;shish</h2>
        </div>

        <form ref={formRef} action={formAction} className="grid md:grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs font-medium text-muted-fg mb-1.5">Universitet nomi *</div>
            <input
              name="name"
              required
              maxLength={120}
              className="input"
              placeholder="Misol: Marmara Üniversitesi"
            />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-muted-fg mb-1.5">Veb-sayt (ixtiyoriy)</div>
            <input
              name="url"
              type="url"
              maxLength={200}
              className="input"
              placeholder="https://..."
            />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-muted-fg mb-1.5">
              Logotip * (PNG/JPG/WEBP/SVG, ≤2 MB)
            </div>
            <input
              name="logo"
              type="file"
              required
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="input"
            />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-muted-fg mb-1.5">Tartib raqami</div>
            <input
              name="sort_order"
              type="number"
              defaultValue={0}
              className="input"
            />
          </label>

          {state.error && (
            <div className="md:col-span-2 flex items-start gap-2 rounded-xl bg-error/10 border border-error/30 p-3 text-sm text-error">
              <AlertCircle className="size-4 mt-0.5" />
              <span>{state.error}</span>
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              <Upload className="size-4" />
              {pending ? 'Yuklanmoqda...' : 'Qo\'shish'}
            </button>
          </div>
        </form>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Mavjud hamkorlar ({partners.length})</h2>
        </div>

        {partners.length === 0 ? (
          <div className="rounded-2xl bg-[var(--color-surface)] border border-border p-10 text-center">
            <p className="text-sm text-muted-fg">Hozircha bazaga hamkor qo&apos;shilmagan.</p>
            <p className="text-xs text-muted-fg mt-1">
              Static partnerlar (Marmara, Istanbul Kent, ...) <code>data/partners.ts</code> da turibdi.
              Bu yerdan qo&apos;shganlar ularga qo&apos;shimcha bo&apos;ladi.
            </p>
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {partners.map((p) => (
              <PartnerCard key={p.id} partner={p} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PartnerCard({ partner }: { partner: PartnerRow }) {
  const [pending, startTransition] = useTransition();
  const [order, setOrder] = useState(partner.sort_order);

  return (
    <li className="rounded-2xl bg-[var(--color-surface)] border border-border overflow-hidden shadow-[var(--shadow-card)]">
      <div className="relative aspect-[16/9] bg-white">
        {/* Use plain img — external Supabase URL we don't preconfigure */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={partner.logo_url}
          alt={partner.name}
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
        {partner.hidden && (
          <span className="absolute top-2 right-2 rounded-full bg-error text-white text-[10px] font-semibold px-2 py-0.5">
            Yashirilgan
          </span>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <div className="font-semibold truncate">{partner.name}</div>
          {partner.url && (
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent-dark truncate block hover:underline"
            >
              {partner.url}
            </a>
          )}
        </div>

        <form
          action={(fd) =>
            startTransition(() => {
              reorderPartnerAction(fd);
            })
          }
          className="flex items-center gap-2"
        >
          <input type="hidden" name="id" value={partner.id} />
          <input type="hidden" name="label" value={partner.name} />
          <label className="text-xs text-muted-fg">Tartib:</label>
          <input
            type="number"
            name="sort_order"
            value={order}
            onChange={(e) => setOrder(Number.parseInt(e.target.value, 10) || 0)}
            className="input h-8 text-xs w-20"
          />
          <button
            type="submit"
            disabled={pending || order === partner.sort_order}
            className="text-xs rounded-full bg-accent text-accent-foreground px-3 py-1 disabled:opacity-40"
          >
            Saqlash
          </button>
        </form>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <form
            action={(fd) =>
              startTransition(() => {
                toggleHiddenAction(fd);
              })
            }
          >
            <input type="hidden" name="id" value={partner.id} />
            <input type="hidden" name="label" value={partner.name} />
            <input type="hidden" name="hidden" value={partner.hidden ? '0' : '1'} />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-1.5 text-xs text-muted-fg hover:text-[var(--color-fg)]"
            >
              {partner.hidden ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
              {partner.hidden ? "Ko'rsatish" : 'Yashirish'}
            </button>
          </form>
          <form
            action={(fd) => {
              if (!confirm(`${partner.name} ni o'chirilsinmi?`)) return;
              startTransition(() => {
                deletePartnerAction(fd);
              });
            }}
          >
            <input type="hidden" name="id" value={partner.id} />
            <input type="hidden" name="label" value={partner.name} />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-1.5 text-xs text-error hover:underline"
            >
              <Trash2 className="size-3.5" />
              O&apos;chirish
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}
