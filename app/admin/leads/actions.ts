'use server';

import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/admin-auth';
import {
  deleteLead,
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
  if (!id || !STATUSES.includes(status)) return;
  await updateLeadStatus(id, status);
  revalidatePath('/admin/leads');
}

export async function setNotesAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const notes = String(formData.get('notes') ?? '');
  if (!id) return;
  await updateLeadNotes(id, notes);
  revalidatePath('/admin/leads');
}

export async function deleteLeadAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await deleteLead(id);
  revalidatePath('/admin/leads');
}
