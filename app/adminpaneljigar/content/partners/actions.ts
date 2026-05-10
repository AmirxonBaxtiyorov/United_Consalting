'use server';

import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/admin-auth';
import {
  createPartner,
  deletePartnerRow,
  logActivity,
  updatePartner,
  uploadPartnerLogo,
} from '@/lib/supabase';

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error('Unauthorized');
}

export type CreatePartnerState = { error?: string; ok?: boolean };

const MAX_LOGO_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
]);

export async function createPartnerAction(
  _: CreatePartnerState,
  formData: FormData,
): Promise<CreatePartnerState> {
  await requireAdmin();
  const name = String(formData.get('name') ?? '').trim();
  const url = String(formData.get('url') ?? '').trim();
  const sortOrderRaw = String(formData.get('sort_order') ?? '0');
  const file = formData.get('logo');

  if (!name) return { error: 'Nom kiriting.' };
  if (!(file instanceof File) || file.size === 0) return { error: 'Logotipni yuklang.' };
  if (file.size > MAX_LOGO_BYTES) return { error: 'Logotip 2 MB dan katta bo\'lmasin.' };
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: 'Faqat PNG / JPG / WEBP / SVG ruxsat etiladi.' };
  }

  const publicUrl = await uploadPartnerLogo(file);
  if (!publicUrl) return { error: 'Logotipni yuklab bo\'lmadi. partner-logos bucket\'ini Supabase\'da yarating.' };

  const row = await createPartner({
    name,
    logo_url: publicUrl,
    url: url || null,
    sort_order: Number.parseInt(sortOrderRaw, 10) || 0,
  });
  if (!row) return { error: 'Saqlab bo\'lmadi.' };

  await logActivity({
    action: 'partner.create',
    target_type: 'partner',
    target_id: row.id,
    target_label: name,
  });
  revalidatePath('/adminpaneljigar/content/partners');
  revalidatePath('/');
  return { ok: true };
}

export async function deletePartnerAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const label = String(formData.get('label') ?? '');
  if (!id) return;
  await deletePartnerRow(id);
  await logActivity({
    action: 'partner.delete',
    target_type: 'partner',
    target_id: id,
    target_label: label || undefined,
  });
  revalidatePath('/adminpaneljigar/content/partners');
  revalidatePath('/');
}

export async function toggleHiddenAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const hidden = formData.get('hidden') === '1';
  const label = String(formData.get('label') ?? '');
  if (!id) return;
  await updatePartner(id, { hidden });
  await logActivity({
    action: 'partner.update',
    target_type: 'partner',
    target_id: id,
    target_label: label || undefined,
    meta: { hidden },
  });
  revalidatePath('/adminpaneljigar/content/partners');
  revalidatePath('/');
}

export async function reorderPartnerAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const order = Number.parseInt(String(formData.get('sort_order') ?? '0'), 10);
  const label = String(formData.get('label') ?? '');
  if (!id) return;
  await updatePartner(id, { sort_order: Number.isFinite(order) ? order : 0 });
  await logActivity({
    action: 'partner.update',
    target_type: 'partner',
    target_id: id,
    target_label: label || undefined,
    meta: { sort_order: order },
  });
  revalidatePath('/adminpaneljigar/content/partners');
  revalidatePath('/');
}
