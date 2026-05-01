type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  country?: string;
  degree?: string;
  message?: string;
  source?: string;
  locale?: string;
};

export async function sendTelegramNotification(lead: LeadPayload): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const lines = [
    '🔔 <b>New lead — United Global Consulting</b>',
    '',
    `👤 <b>Name:</b> ${escape(lead.name)}`,
    `📱 <b>Phone:</b> ${escape(lead.phone)}`,
    lead.email ? `📧 <b>Email:</b> ${escape(lead.email)}` : '',
    lead.country ? `🌍 <b>Country:</b> ${escape(lead.country)}` : '',
    lead.degree ? `🎓 <b>Degree:</b> ${escape(lead.degree)}` : '',
    lead.message ? `💬 <b>Message:</b> ${escape(lead.message)}` : '',
    '',
    `📍 <b>Source:</b> ${escape(lead.source ?? 'website')} · <b>Locale:</b> ${escape(lead.locale ?? 'ru')}`,
    `⏰ ${new Date().toISOString()}`,
  ].filter(Boolean);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function escape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
