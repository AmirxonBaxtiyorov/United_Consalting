# ugc-form-proxy

Cloudflare Worker that receives lead form submissions from the landing page,
verifies Cloudflare Turnstile, enforces per-IP rate limits, and fans out to
Telegram + Google Sheets.

## Quick start

```bash
npm install
npx wrangler login
npx wrangler kv:namespace create "RATE_LIMIT"
# paste the returned id into wrangler.toml [[kv_namespaces]] block

# Secrets — stored encrypted, never committed
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put TURNSTILE_SECRET
npx wrangler secret put SHEETS_URL   # optional

# Edit wrangler.toml: set ALLOWED_ORIGINS to your production domain
npm run deploy
```

After deploy, paste the Worker URL into `index.html` `UGC_CONFIG.formEndpoint`
and the Turnstile site key into `UGC_CONFIG.turnstileSiteKey`.

## Endpoints

`POST /` — JSON body matching the lead-form payload. Responses:

- `200 { ok: true, lead_id, delivery: {...} }` — at least one downstream succeeded
- `400 { error: "turnstile-failed" | "invalid-input" }`
- `403 { error: "origin-not-allowed" }`
- `429 { error: "rate-limited", retryAfter }`
- `502 { error: "downstream-all-failed" }`

## Rate limit

Default: 5 submissions per IP / 10-min window, backed by Workers KV. Drop
`RATE_LIMIT` binding from `wrangler.toml` to disable.
