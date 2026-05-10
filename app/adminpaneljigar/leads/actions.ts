'use server';

import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/admin-auth';
import {
  deleteLead,
  logActivity,
  updateLeadNotes,
  updateLeadStatus,
  type LeadStatus,
} from '@/lib/supabase';

const STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'won', 'lost'];

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Unauthorized');
}

export async function setStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '') as LeadStatus;
  const label = String(formData.get('label') ?? '');
  if (!id || !STATUSES.includes(status)) return;
  await updateLeadStatus(id, status);
  await logActivity({
    action: 'lead.status_change',
    target_type: 'lead',
    target_id: id,
    target_label: label || undefined,
    meta: { status },
  });
  revalidatePath('/adminpaneljigar/leads');
  revalidatePath('/adminpaneljigar/dashboard');
}

export async function setNotesAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const notes = String(formData.get('notes') ?? '');
  const label = String(formData.get('label') ?? '');
  if (!id) return;
  await updateLeadNotes(id, notes);
  await logActivity({
    action: 'lead.notes_update',
    target_type: 'lead',
    target_id: id,
    target_label: label || undefined,
  });
  revalidatePath('/adminpaneljigar/leads');
}

export async function deleteLeadAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const label = String(formData.get('label') ?? '');
  if (!id) return;
  await deleteLead(id);
  await logActivity({
    action: 'lead.delete',
    target_type: 'lead',
    target_id: id,
    target_label: label || undefined,
  });
  revalidatePath('/adminpaneljigar/leads');
  revalidatePath('/adminpaneljigar/dashboard');
}
