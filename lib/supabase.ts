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
