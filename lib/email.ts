import { Resend } from 'resend';
import { SITE } from './config';

type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  country?: string;
  degree?: string;
  message?: string;
  locale?: string;
};

export async function sendManagerEmail(lead: LeadPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.MANAGER_EMAIL;
  const from = process.env.RESEND_FROM ?? `${SITE.name} <noreply@unitedglobal.uz>`;
  if (!apiKey || !to) return false;

  try {
    const resend = new Resend(apiKey);
    const subject = `🔔 New lead — ${lead.name}`;
    const html = `
      <h2>New lead from United Global Consulting website</h2>
      <table style="border-collapse:collapse;font-family:Inter,Arial,sans-serif;font-size:14px;">
        <tr><td style="padding:6px 12px;color:#6b7280">Name</td><td style="padding:6px 12px"><b>${escapeHtml(lead.name)}</b></td></tr>
        <tr><td style="padding:6px 12px;color:#6b7280">Phone</td><td style="padding:6px 12px">${escapeHtml(lead.phone)}</td></tr>
        ${lead.email ? `<tr><td style="padding:6px 12px;color:#6b7280">Email</td><td style="padding:6px 12px">${escapeHtml(lead.email)}</td></tr>` : ''}
        ${lead.country ? `<tr><td style="padding:6px 12px;color:#6b7280">Country</td><td style="padding:6px 12px">${escapeHtml(lead.country)}</td></tr>` : ''}
        ${lead.degree ? `<tr><td style="padding:6px 12px;color:#6b7280">Degree</td><td style="padding:6px 12px">${escapeHtml(lead.degree)}</td></tr>` : ''}
        ${lead.message ? `<tr><td style="padding:6px 12px;color:#6b7280">Message</td><td style="padding:6px 12px">${escapeHtml(lead.message)}</td></tr>` : ''}
        <tr><td style="padding:6px 12px;color:#6b7280">Locale</td><td style="padding:6px 12px">${escapeHtml(lead.locale ?? 'ru')}</td></tr>
      </table>
    `;
    const { error } = await resend.emails.send({ from, to, subject, html });
    if (error) {
      console.error('[resend] error', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('[resend] exception', e);
    return false;
  }
}

export async function sendClientAutoReply(lead: LeadPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? `${SITE.name} <noreply@unitedglobal.uz>`;
  if (!apiKey || !lead.email) return false;
  try {
    const resend = new Resend(apiKey);
    const greeting: Record<string, { subject: string; hello: string; body: string; sign: string }> = {
      ru: {
        subject: 'Мы получили вашу заявку — United Global Consulting',
        hello: `Здравствуйте, ${escapeHtml(lead.name)}!`,
        body: 'Спасибо за заявку. Мы свяжемся с вами в течение 30 минут в рабочее время (Пн–Сб, 9:00–20:00 по Ташкенту).',
        sign: 'Команда United Global Consulting',
      },
      uz: {
        subject: 'Arizangizni oldik — United Global Consulting',
        hello: `Assalomu alaykum, ${escapeHtml(lead.name)}!`,
        body: "Ariza uchun rahmat. Biz siz bilan ish vaqtida (Du–Sha, 9:00–20:00 Toshkent vaqti) 30 daqiqa ichida bog'lanamiz.",
        sign: 'United Global Consulting jamoasi',
      },
      en: {
        subject: 'We received your request — United Global Consulting',
        hello: `Hello, ${escapeHtml(lead.name)}!`,
        body: 'Thank you for reaching out. We will contact you within 30 minutes during business hours (Mon–Sat, 9:00–20:00 Tashkent time).',
        sign: 'United Global Consulting team',
      },
    };
    const g = greeting[lead.locale ?? 'ru'] ?? greeting.ru;
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;">
        <h2 style="color:#0a2540;margin:0 0 12px">${g.hello}</h2>
        <p style="color:#333;line-height:1.6">${g.body}</p>
        <p style="color:#333;line-height:1.6">${SITE.phone} · ${SITE.email}</p>
        <p style="color:#6b7280;font-size:13px;margin-top:28px">— ${g.sign}</p>
      </div>
    `;
    const { error } = await resend.emails.send({ from, to: lead.email, subject: g.subject, html });
    if (error) {
      console.error('[resend] client error', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('[resend] client exception', e);
    return false;
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
