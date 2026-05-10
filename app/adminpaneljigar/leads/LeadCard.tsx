'use client';

import { useState, useTransition } from 'react';
import { Phone, Mail, MessageCircle, Trash2, ChevronDown, ChevronUp, FileText, GraduationCap, Globe, Clock } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { setStatusAction, setNotesAction, deleteLeadAction } from './actions';
import type { LeadRow, LeadStatus } from '@/lib/supabase';

const STATUSES: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'Yangi' },
  { value: 'contacted', label: 'Bog\'lanildi' },
  { value: 'qualified', label: 'Tasdiqlandi' },
  { value: 'won', label: 'Yutuq' },
  { value: 'lost', label: 'Yutqazildi' },
];

function digitsOnly(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function LeadCard({ lead }: { lead: LeadRow }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [notes, setNotes] = useState(lead.notes ?? '');
  const phoneDigits = digitsOnly(lead.phone);

  return (
    <div className="rounded-2xl bg-[var(--color-surface)] border border-border shadow-[var(--shadow-card)] overflow-hidden">
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-[var(--color-fg)] truncate">{lead.name}</h3>
              <StatusBadge status={lead.status} />
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-fg">
              <Clock className="size-3.5" />
              <span>{formatDate(lead.created_at)}</span>
              {lead.source && <span>· {lead.source}</span>}
              {lead.locale && <span>· {lead.locale}</span>}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Yopish' : 'Ochish'}
            className="shrink-0 inline-flex size-8 items-center justify-center rounded-full hover:bg-muted"
          >
            {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        </div>

        <div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
          <a
            href={`tel:${phoneDigits}`}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-[var(--color-surface)] px-3 py-2 hover:border-accent/50 hover:text-accent-dark"
          >
            <Phone className="size-4 text-accent-dark" />
            <span className="truncate">{lead.phone}</span>
          </a>
          <a
            href={`https://wa.me/${phoneDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-[var(--color-surface)] px-3 py-2 hover:border-accent/50 hover:text-accent-dark"
          >
            <MessageCircle className="size-4 text-success" />
            <span>WhatsApp</span>
          </a>
        </div>

        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            className="mt-2 flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm hover:border-accent/50 hover:text-accent-dark"
          >
            <Mail className="size-4 text-accent-dark" />
            <span className="truncate">{lead.email}</span>
          </a>
        )}

        {(lead.country || lead.degree) && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-fg">
            {lead.country && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                <Globe className="size-3" /> {lead.country}
              </span>
            )}
            {lead.degree && (
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                <GraduationCap className="size-3" /> {lead.degree}
              </span>
            )}
          </div>
        )}

        {lead.message && (
          <div className="mt-3 rounded-xl bg-muted p-3 text-sm">
            <div className="flex items-center gap-1.5 text-xs text-muted-fg mb-1">
              <FileText className="size-3.5" /> Xabar
            </div>
            <p className="whitespace-pre-wrap text-[var(--color-fg)]">{lead.message}</p>
          </div>
        )}
      </div>

      {open && (
        <div className="border-t border-border bg-muted/40 p-4 md:p-5 space-y-4">
          <div>
            <div className="text-xs font-medium text-muted-fg mb-1.5">Holat</div>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <form
                  key={s.value}
                  action={(fd) =>
                    startTransition(() => {
                      setStatusAction(fd);
                    })
                  }
                >
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value={s.value} />
                  <input type="hidden" name="label" value={lead.name} />
                  <button
                    type="submit"
                    disabled={pending}
                    className={`text-xs rounded-full px-3 py-1 border transition ${
                      lead.status === s.value
                        ? 'bg-primary text-white border-primary'
                        : 'bg-[var(--color-surface)] text-[var(--color-fg)] border-border hover:border-accent/50'
                    }`}
                  >
                    {s.label}
                  </button>
                </form>
              ))}
            </div>
          </div>

          <form
            action={(fd) =>
              startTransition(() => {
                setNotesAction(fd);
              })
            }
          >
            <input type="hidden" name="id" value={lead.id} />
            <input type="hidden" name="label" value={lead.name} />
            <label className="block">
              <div className="text-xs font-medium text-muted-fg mb-1.5">Eslatma</div>
              <textarea
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="input"
                placeholder="Mijoz haqida eslatma..."
              />
            </label>
            <button
              type="submit"
              disabled={pending}
              className="mt-2 text-xs rounded-full bg-accent text-accent-foreground px-4 py-1.5 hover:bg-accent-dark"
            >
              {pending ? 'Saqlanmoqda...' : 'Eslatmani saqlash'}
            </button>
          </form>

          <form
            action={(fd) => {
              if (!confirm(`${lead.name} ni o'chirilsinmi?`)) return;
              startTransition(() => {
                deleteLeadAction(fd);
              });
            }}
            className="pt-2 border-t border-border"
          >
            <input type="hidden" name="id" value={lead.id} />
            <input type="hidden" name="label" value={lead.name} />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-1.5 text-xs text-error hover:underline"
            >
              <Trash2 className="size-3.5" />
              <span>O&apos;chirish</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
