import type { LeadRow } from '@/lib/supabase';

function escape(value: string | null | undefined): string {
  if (value == null) return '';
  const s = String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function buildLeadsCsv(leads: LeadRow[]): string {
  const headers = [
    'created_at',
    'name',
    'phone',
    'email',
    'country',
    'degree',
    'status',
    'source',
    'locale',
    'message',
    'notes',
  ];
  const lines = [headers.join(',')];
  for (const l of leads) {
    lines.push([
      escape(l.created_at),
      escape(l.name),
      escape(l.phone),
      escape(l.email),
      escape(l.country),
      escape(l.degree),
      escape(l.status),
      escape(l.source),
      escape(l.locale),
      escape(l.message),
      escape(l.notes),
    ].join(','));
  }
  return lines.join('\r\n');
}

export function downloadLeadsCsv(leads: LeadRow[]): void {
  const csv = buildLeadsCsv(leads);
  // BOM so Excel reads UTF-8 properly
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `leads-${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
