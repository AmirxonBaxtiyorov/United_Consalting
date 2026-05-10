import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type LeadInsert = {
  name: string;
  phone: string;
  email: string | null;
  country: string | null;
  degree: string | null;
  message: string | null;
  source: string | null;
  locale: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  country: string | null;
  degree: string | null;
  message: string | null;
  source: string | null;
  locale: string | null;
  status: LeadStatus | string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

function getServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export async function saveLead(lead: LeadInsert): Promise<boolean> {
  const client = getServerClient();
  if (!client) return false;
  try {
    const { error } = await client.from('leads').insert([{ ...lead, status: 'new' }]);
    if (error) {
      console.error('[supabase] insert error', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error('[supabase] exception', e);
    return false;
  }
}

export async function getLeads(): Promise<LeadRow[]> {
  const client = getServerClient();
  if (!client) return [];
  const { data, error } = await client
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);
  if (error) {
    console.error('[supabase] select leads', error.message);
    return [];
  }
  return (data ?? []) as LeadRow[];
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<boolean> {
  const client = getServerClient();
  if (!client) return false;
  const { error } = await client.from('leads').update({ status }).eq('id', id);
  if (error) {
    console.error('[supabase] update lead', error.message);
    return false;
  }
  return true;
}

export async function updateLeadNotes(id: string, notes: string): Promise<boolean> {
  const client = getServerClient();
  if (!client) return false;
  const { error } = await client.from('leads').update({ notes }).eq('id', id);
  if (error) {
    console.error('[supabase] update lead notes', error.message);
    return false;
  }
  return true;
}

export async function deleteLead(id: string): Promise<boolean> {
  const client = getServerClient();
  if (!client) return false;
  const { error } = await client.from('leads').delete().eq('id', id);
  if (error) {
    console.error('[supabase] delete lead', error.message);
    return false;
  }
  return true;
}

// =========================================================
// Admin activity log
// =========================================================

export type ActivityRow = {
  id: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  target_label: string | null;
  meta: Record<string, unknown> | null;
  created_at: string;
};

export async function logActivity(entry: {
  action: string;
  target_type?: string;
  target_id?: string;
  target_label?: string;
  meta?: Record<string, unknown>;
}): Promise<void> {
  const client = getServerClient();
  if (!client) return;
  try {
    await client.from('admin_activity').insert([
      {
        action: entry.action,
        target_type: entry.target_type ?? null,
        target_id: entry.target_id ?? null,
        target_label: entry.target_label ?? null,
        meta: entry.meta ?? null,
      },
    ]);
  } catch (e) {
    console.error('[supabase] log activity', e);
  }
}

export async function getActivity(limit = 200): Promise<ActivityRow[]> {
  const client = getServerClient();
  if (!client) return [];
  const { data, error } = await client
    .from('admin_activity')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error('[supabase] select activity', error.message);
    return [];
  }
  return (data ?? []) as ActivityRow[];
}

// =========================================================
// CMS: partner universities
// =========================================================

export type PartnerRow = {
  id: string;
  name: string;
  logo_url: string;
  url: string | null;
  sort_order: number;
  hidden: boolean;
  created_at: string;
  updated_at: string;
};

export async function getPartners(includeHidden = false): Promise<PartnerRow[]> {
  const client = getServerClient();
  if (!client) return [];
  let q = client.from('cms_partners').select('*').order('sort_order').order('created_at');
  if (!includeHidden) q = q.eq('hidden', false);
  const { data, error } = await q;
  if (error) {
    console.error('[supabase] select partners', error.message);
    return [];
  }
  return (data ?? []) as PartnerRow[];
}

export async function createPartner(input: {
  name: string;
  logo_url: string;
  url?: string | null;
  sort_order?: number;
}): Promise<PartnerRow | null> {
  const client = getServerClient();
  if (!client) return null;
  const { data, error } = await client
    .from('cms_partners')
    .insert([{ ...input, hidden: false }])
    .select()
    .single();
  if (error) {
    console.error('[supabase] insert partner', error.message);
    return null;
  }
  return data as PartnerRow;
}

export async function updatePartner(
  id: string,
  patch: Partial<Pick<PartnerRow, 'name' | 'logo_url' | 'url' | 'sort_order' | 'hidden'>>,
): Promise<boolean> {
  const client = getServerClient();
  if (!client) return false;
  const { error } = await client.from('cms_partners').update(patch).eq('id', id);
  if (error) {
    console.error('[supabase] update partner', error.message);
    return false;
  }
  return true;
}

export async function deletePartnerRow(id: string): Promise<boolean> {
  const client = getServerClient();
  if (!client) return false;
  const { error } = await client.from('cms_partners').delete().eq('id', id);
  if (error) {
    console.error('[supabase] delete partner', error.message);
    return false;
  }
  return true;
}

// =========================================================
// Supabase Storage: upload partner logo
// =========================================================

const PARTNER_BUCKET = 'partner-logos';

export async function uploadPartnerLogo(file: File): Promise<string | null> {
  const client = getServerClient();
  if (!client) return null;
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await client.storage
    .from(PARTNER_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) {
    console.error('[supabase] storage upload', error.message);
    return null;
  }
  const { data } = client.storage.from(PARTNER_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
