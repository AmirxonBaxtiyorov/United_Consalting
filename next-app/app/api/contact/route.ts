import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { saveLead } from '@/lib/supabase';
import { sendTelegramNotification } from '@/lib/telegram';
import { sendManagerEmail, sendClientAutoReply } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '600' } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: data.name,
    phone: data.phone,
    email: data.email || null,
    country: data.country || null,
    degree: data.degree || null,
    message: data.message || null,
    source: data.source ?? 'website',
    locale: data.locale ?? 'ru',
  };

  const results = await Promise.allSettled([
    saveLead({
      ...lead,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    }),
    sendTelegramNotification({
      name: lead.name,
      phone: lead.phone,
      email: lead.email ?? undefined,
      country: lead.country ?? undefined,
      degree: lead.degree ?? undefined,
      message: lead.message ?? undefined,
      source: lead.source,
      locale: lead.locale,
    }),
    sendManagerEmail({
      name: lead.name,
      phone: lead.phone,
      email: lead.email ?? undefined,
      country: lead.country ?? undefined,
      degree: lead.degree ?? undefined,
      message: lead.message ?? undefined,
      locale: lead.locale,
    }),
    sendClientAutoReply({
      name: lead.name,
      phone: lead.phone,
      email: lead.email ?? undefined,
      locale: lead.locale,
    }),
  ]);

  const anyDelivery = results.some(
    (r) => r.status === 'fulfilled' && r.value === true
  );
  if (!anyDelivery) {
    console.warn('[contact] all delivery channels failed, env probably not configured', {
      hasSupabase: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      hasTelegram: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      hasResend: Boolean(process.env.RESEND_API_KEY),
    });
  }

  return NextResponse.json({ ok: true });
}
