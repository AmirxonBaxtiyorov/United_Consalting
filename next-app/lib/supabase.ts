import { createClient } from '@supabase/supabase-js';

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

export async function saveLead(lead: LeadInsert): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  try {
    const client = createClient(url, key, { auth: { persistSession: false } });
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
