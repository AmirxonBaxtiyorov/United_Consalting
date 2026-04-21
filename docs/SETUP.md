# United Global Consulting — Setup & Deployment Guide

This landing page is a **static site** (vanilla HTML + CSS + JS). No build step required. You can deploy it as-is to any static host: Cloudflare Pages, Netlify, GitHub Pages, Vercel, S3, nginx.

## Contents

- [Local preview](#local-preview)
- [Configuration](#configuration)
- [Telegram Bot setup](#telegram-bot-setup)
- [Google Sheets setup](#google-sheets-setup)
- [Cloudflare Worker proxy](#cloudflare-worker-proxy)
- [Google Analytics 4](#google-analytics-4)
- [Cloudflare Turnstile (anti-spam)](#cloudflare-turnstile-anti-spam)
- [Deployment](#deployment)
- [Post-launch checklist](#post-launch-checklist)

---

## Local preview

Any static server works. Simplest options:

```bash
# Python
python -m http.server 8080

# Node
npx serve .

# PHP
php -S localhost:8080
```

Open http://localhost:8080. Make sure to test from a real HTTP server — opening the `file://` directly will break the service worker, `fetch('/i18n/...')`, and other features that require proper origins.

---

## Configuration

All runtime config lives in `index.html` as `window.UGC_CONFIG`:

```js
window.UGC_CONFIG = {
  phone: '+998885263000',
  waNumber: '998885263000',
  gaId: '',                  // set to e.g. 'G-XXXXXXXXXX' to enable GA4
  formEndpoint: '',          // URL of your Cloudflare Worker / Apps Script / Formspree
  turnstileSiteKey: ''       // Cloudflare Turnstile site key
};
```

No secrets are stored in client code. Telegram bot tokens, Google Apps Script URLs and Turnstile secret keys live **on the server side** (Worker / Apps Script).

---

## Telegram Bot setup

1. Open [@BotFather](https://t.me/BotFather) in Telegram and send `/newbot`. Pick a name and username. You'll get a **token** like `1234567890:AAE...`.
2. Create a private group (or channel) where leads should arrive. Add the bot as an **administrator** so it can post messages.
3. Find your `chat_id`:
   - Invite `@getidsbot` to the group, or send any message and call
     `https://api.telegram.org/bot<TOKEN>/getUpdates`, then copy `chat.id` (groups start with `-100`).
4. Keep the token **secret**. Never paste it into `UGC_CONFIG` in the HTML — always proxy through a Cloudflare Worker.

---

## Google Sheets setup

1. Create a Google Sheet, e.g. "UGC Leads".
2. `Extensions → Apps Script` and paste the following:

   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.name, data.phone, data.email,
       data.country, data.level, data.message,
       JSON.stringify(data.utm || {}),
       data.referrer, data.page_lang, data.user_agent
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. `Deploy → New deployment → Web app`, set "Execute as: me", "Who has access: Anyone". Copy the Web App URL.
4. This URL is what your Cloudflare Worker calls server-side. Don't expose it directly in the browser.

---

## Cloudflare Worker proxy

A Worker holds your secrets and rate-limits, validates Turnstile, and fans out to Telegram + Google Sheets.

```js
export default {
  async fetch(req, env) {
    if (req.method !== 'POST') return new Response('Not allowed', { status: 405 });
    const data = await req.json();

    // Turnstile verification (if using)
    if (data['cf-turnstile-response']) {
      const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: data['cf-turnstile-response']
        })
      }).then(r => r.json());
      if (!v.success) return new Response('bot', { status: 400 });
    }

    // Rate limit via Workers KV (optional; create KV namespace + bind as RL)
    // ...

    // Send to Telegram
    const tg = `Новая заявка:\n👤 ${data.name}\n📞 ${data.phone}\n✉️ ${data.email || '-'}`
             + `\n🌍 ${data.country || '-'} / ${data.level || '-'}\n💬 ${(data.message || '').slice(0,500)}`
             + `\n🔗 ${data.referrer || '-'}\nUTM: ${JSON.stringify(data.utm || {})}`;
    await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text: tg, parse_mode: 'HTML' })
    });

    // Mirror to Google Sheets
    await fetch(env.SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {});

    return Response.json({ ok: true });
  }
};
```

Secrets (`TG_TOKEN`, `TG_CHAT_ID`, `SHEETS_URL`, `TURNSTILE_SECRET`) go into the Worker settings — **not** the HTML.

Then set in `UGC_CONFIG`:

```js
formEndpoint: 'https://ugc-form.yourname.workers.dev'
```

---

## Google Analytics 4

1. Create a property at [analytics.google.com](https://analytics.google.com) and note your measurement ID `G-XXXXXXXXXX`.
2. Set `UGC_CONFIG.gaId = 'G-XXXXXXXXXX'` in `index.html`.
3. GA is loaded **only after** the user accepts cookies (GDPR consent). Event keys already wired up: `generate_lead`, `cta_nav`, `cta_hero`, `whatsapp_*`, `telegram_*`, `country_*`, `form_*`, `exit_intent_*`, `consent_*`.

---

## Cloudflare Turnstile (anti-spam)

1. Register your site on [dash.cloudflare.com/?to=/:account/turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).
2. Put site key in `UGC_CONFIG.turnstileSiteKey`.
3. Add `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" defer></script>` and a `<div class="cf-turnstile" data-sitekey="...">` above the submit button. On submit, `main.js` can add `fd.get('cf-turnstile-response')` to the payload (Worker verifies it).

---

## Deployment

### Cloudflare Pages (recommended)

```
npm i -g wrangler
wrangler pages deploy .
```

Cloudflare Pages automatically reads `_headers` and `_redirects`.

### Netlify

Drag-and-drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop) or connect the repo. `_headers` and `_redirects` work identically.

### GitHub Pages

Push to `gh-pages` branch or use `main` with `/ (root)` in settings. `_headers` **is not honored on GitHub Pages** — add an in-HTML CSP (already present in `<head>`).

---

## Post-launch checklist

- [ ] Submit `https://unitedglobal.uz/sitemap.xml` in Google Search Console + Yandex Webmaster.
- [ ] Verify structured data at [validator.schema.org](https://validator.schema.org) and [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev), aim for ≥ 90 on mobile.
- [ ] Run [securityheaders.com](https://securityheaders.com) — target A+.
- [ ] Audit accessibility with axe DevTools (Chrome) and NVDA.
- [ ] Fill out `UGC_CONFIG.gaId` and `UGC_CONFIG.formEndpoint` before going live.
- [ ] Upload replacement images into `/assets/images/` if you want to stop depending on Unsplash CDN.
- [ ] Add higher-resolution brand icons (192x192 + 512x512 maskable) in `/assets/icons/`, update `manifest.webmanifest`.
