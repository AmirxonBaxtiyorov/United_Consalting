/* =========================================================
   United Global Consulting — form-proxy Worker
   Accepts JSON from the landing form, verifies Turnstile,
   rate-limits, then fans out to Telegram + Google Sheets.

   Deploy: wrangler deploy
   Secrets (wrangler secret put):
     TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
     TURNSTILE_SECRET, SHEETS_URL (optional)

   Env vars (wrangler.toml `[vars]`):
     ALLOWED_ORIGINS="https://unitedglobal.uz,https://..."
   ========================================================= */

const TEXT = 'text/plain;charset=utf-8';
const JSON_CT = 'application/json;charset=utf-8';

const corsHeaders = (origin) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
  'Vary': 'Origin'
});

const jsonResponse = (status, body, origin) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': JSON_CT, ...(origin ? corsHeaders(origin) : {}) }
  });

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const stripCtl = (s) => String(s ?? '').replace(/[\x00-\x1F\x7F]/g, '').slice(0, 1000).trim();

const clientIP = (req) =>
  req.headers.get('CF-Connecting-IP') || req.headers.get('X-Forwarded-For') || 'unknown';

async function verifyTurnstile(secret, token, ip) {
  if (!secret) return { ok: true, skipped: true };
  if (!token) return { ok: false, reason: 'missing-token' };
  const fd = new FormData();
  fd.append('secret', secret);
  fd.append('response', token);
  if (ip) fd.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: fd
  });
  const data = await res.json().catch(() => ({}));
  return { ok: !!data.success, raw: data };
}

async function rateLimit(kv, ip, limit = 5, windowSec = 600) {
  if (!kv) return { ok: true, skipped: true };
  const key = `rl:${ip}`;
  const now = Math.floor(Date.now() / 1000);
  const entry = await kv.get(key, 'json');
  if (entry && entry.ts + windowSec > now && entry.count >= limit) {
    return { ok: false, retryAfter: entry.ts + windowSec - now };
  }
  const next = entry && entry.ts + windowSec > now
    ? { ts: entry.ts, count: entry.count + 1 }
    : { ts: now, count: 1 };
  await kv.put(key, JSON.stringify(next), { expirationTtl: windowSec + 60 });
  return { ok: true };
}

function formatTelegram(payload) {
  const fields = [
    ['Name', payload.name],
    ['Phone', payload.phone],
    ['Email', payload.email],
    ['Country', payload.country],
    ['Level', payload.level],
    ['Message', payload.message],
    ['Lang', payload.page_lang],
    ['Referrer', payload.referrer]
  ].filter(([, v]) => v);

  const lines = [`<b>🎓 New lead — United Global Consulting</b>`, ''];
  for (const [k, v] of fields) {
    lines.push(`<b>${escapeHtml(k)}:</b> ${escapeHtml(stripCtl(v))}`);
  }
  if (payload.utm && typeof payload.utm === 'object' && Object.keys(payload.utm).length) {
    lines.push('');
    lines.push('<b>UTM</b>');
    for (const [k, v] of Object.entries(payload.utm)) {
      lines.push(`${escapeHtml(k)}: ${escapeHtml(String(v).slice(0, 80))}`);
    }
  }
  lines.push('');
  lines.push(`<i>${escapeHtml(payload.submitted_at || new Date().toISOString())}</i>`);
  return lines.join('\n');
}

async function sendTelegram(env, payload) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return { ok: true, skipped: true };
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': JSON_CT },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: formatTelegram(payload),
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });
  return { ok: res.ok, status: res.status };
}

async function sendSheets(env, payload) {
  if (!env.SHEETS_URL) return { ok: true, skipped: true };
  const res = await fetch(env.SHEETS_URL, {
    method: 'POST',
    headers: { 'Content-Type': JSON_CT },
    body: JSON.stringify(payload)
  });
  return { ok: res.ok, status: res.status };
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allow = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    const allowedOrigin = allow.includes(origin) ? origin : (allow[0] || '');

    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) });
    }
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: { 'Content-Type': TEXT } });
    }
    if (allow.length && !allow.includes(origin)) {
      return jsonResponse(403, { error: 'origin-not-allowed' }, allowedOrigin);
    }

    let body;
    try { body = await req.json(); }
    catch { return jsonResponse(400, { error: 'invalid-json' }, allowedOrigin); }

    // Honeypot — silently drop
    if (body.website) return jsonResponse(200, { ok: true, skipped: 'honeypot' }, allowedOrigin);

    const ip = clientIP(req);

    // Rate-limit (opt-in via KV binding)
    const rl = await rateLimit(env.RATE_LIMIT, ip);
    if (!rl.ok) {
      return new Response(JSON.stringify({ error: 'rate-limited', retryAfter: rl.retryAfter }), {
        status: 429,
        headers: { 'Content-Type': JSON_CT, 'Retry-After': String(rl.retryAfter || 60), ...corsHeaders(allowedOrigin) }
      });
    }

    // Turnstile (opt-in via TURNSTILE_SECRET)
    const t = await verifyTurnstile(env.TURNSTILE_SECRET, body.turnstile_token, ip);
    if (!t.ok) return jsonResponse(400, { error: 'turnstile-failed', reason: t.reason || 'invalid' }, allowedOrigin);

    // Basic validation
    const name  = stripCtl(body.name);
    const phone = stripCtl(body.phone);
    if (name.length < 2 || phone.length < 8) {
      return jsonResponse(400, { error: 'invalid-input' }, allowedOrigin);
    }

    const payload = {
      name,
      phone,
      email: stripCtl(body.email),
      country: stripCtl(body.country),
      level: stripCtl(body.level),
      message: stripCtl(body.message),
      page_lang: stripCtl(body.page_lang),
      referrer: stripCtl(body.referrer),
      utm: body.utm && typeof body.utm === 'object' ? body.utm : {},
      submitted_at: body.submitted_at || new Date().toISOString(),
      user_agent: stripCtl(body.user_agent),
      ip
    };

    const [tg, sh] = await Promise.allSettled([sendTelegram(env, payload), sendSheets(env, payload)]);
    const tgOk = tg.status === 'fulfilled' && tg.value.ok;
    const shOk = sh.status === 'fulfilled' && sh.value.ok;

    // Succeed even if only one downstream succeeded — we don't want to lose leads.
    if (!tgOk && !shOk) return jsonResponse(502, { error: 'downstream-all-failed' }, allowedOrigin);

    return jsonResponse(200, {
      ok: true,
      lead_id: crypto.randomUUID(),
      delivery: { telegram: tgOk, sheets: shOk }
    }, allowedOrigin);
  }
};
