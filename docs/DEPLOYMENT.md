# Deployment — United Global Consulting

Recommended host: **Cloudflare Pages** (free tier, HTTP/3, Brotli, global edge).
Everything below also works on Netlify, Vercel, GitHub Pages, and any static
hoster that honours `_headers` or an equivalent.

---

## 1. One-time setup

### Prerequisites

- A Cloudflare account with the custom domain added to DNS.
- A Telegram bot (from [@BotFather](https://t.me/BotFather)) and a channel/group
  where leads will land.
- (Optional) Google account for the Sheets webhook.

### Secrets and keys

Get these ready — each goes to a different place:

| Value                        | Goes to                                       |
|------------------------------|-----------------------------------------------|
| `TELEGRAM_BOT_TOKEN`         | Worker secret (`wrangler secret put`)         |
| `TELEGRAM_CHAT_ID`           | Worker secret                                 |
| `TURNSTILE_SECRET`           | Worker secret                                 |
| `SHEETS_URL` (Apps Script)   | Worker secret (optional)                      |
| Turnstile **site** key       | `index.html` → `UGC_CONFIG.turnstileSiteKey`  |
| GA4 Measurement ID (`G-…`)   | `index.html` → `UGC_CONFIG.gaId`              |
| Deployed Worker URL          | `index.html` → `UGC_CONFIG.formEndpoint`      |

---

## 2. Deploy the Worker (backend)

```bash
cd workers/form-proxy
npm install
npx wrangler login

# KV namespace for rate-limiting
npx wrangler kv:namespace create "RATE_LIMIT"
# → paste returned id into wrangler.toml under [[kv_namespaces]]

# Secrets (stored encrypted)
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler secret put TURNSTILE_SECRET
npx wrangler secret put SHEETS_URL      # optional

# Edit wrangler.toml — set ALLOWED_ORIGINS to "https://unitedglobal.uz"
npm run deploy
```

Copy the deploy URL (`https://ugc-form-proxy.<you>.workers.dev` or your
custom route) — it becomes `UGC_CONFIG.formEndpoint`.

---

## 3. Deploy the site (frontend)

### Option A — Cloudflare Pages via Git (recommended)

1. Push the repo to GitHub / GitLab.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build command: leave empty. Output directory: `/` (root).
4. After the first build, hit **Custom domains → Set up** with `unitedglobal.uz`.
5. Cloudflare will auto-honour `_headers` and `_redirects`.

### Option B — Direct upload

```bash
npx wrangler pages deploy . --project-name unitedglobal
```

### Option C — Netlify

`_headers` and `_redirects` are Netlify-compatible — no change needed.

```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### Option D — GitHub Pages

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Pages
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/upload-pages-artifact@v3
        with: { path: . }
      - uses: actions/deploy-pages@v4
```

Note: GitHub Pages ignores `_headers`; you lose the CSP + HSTS hardening. Only
use for staging.

---

## 4. Post-deploy checklist

- [ ] `https://unitedglobal.uz/` loads — HTTP/3, TLS A+ (ssllabs.com).
- [ ] `securityheaders.com` scan returns **A+** (CSP, HSTS, XFO, Referrer,
      Permissions-Policy all present).
- [ ] Lighthouse mobile: Perf ≥ 95, A11y ≥ 95, BP ≥ 95, SEO ≥ 95.
- [ ] Form submit lands in Telegram group **and** Google Sheet.
- [ ] Form submit without Turnstile token returns 400.
- [ ] 6th submit from same IP in 10 min returns 429.
- [ ] `/sitemap.xml` visible to `https://search.google.com/search-console`
      (Add property → verify via DNS or HTML).
- [ ] Yandex Webmaster verified.
- [ ] `/.well-known/security.txt` reachable, parses without error.
- [ ] `manifest.webmanifest` validates (`chrome://manifest` or
      <https://webmanifest.org/>).
- [ ] Install PWA on iOS/Android; confirm offline fallback loads when throttled.
- [ ] All ten `/countries/<slug>.html` pages reachable and indexed.
- [ ] GA4 Real-time shows events on page load + form submit.

---

## 5. Rollback

Cloudflare Pages keeps the last 10 deployments. Dashboard → **Deployments**
→ hover the good one → **Rollback**. Downtime is under 5 s.

Worker rollback: `wrangler rollback <deployment-id>` — lists previous
deployments and lets you pick.

---

## 6. Monitoring

Minimum viable stack:

- **UptimeRobot** or **Better Stack** — 1-minute pings on `/` and
  `/workers/form-proxy` root.
- **Cloudflare Analytics** — built-in, privacy-friendly, free.
- **Sentry** (browser SDK) — paste init into `index.html` when you start
  getting real traffic; gate loading behind the analytics consent category.
- **GA4 + Yandex.Metrika** — funnel analysis + session replay (Yandex).

---

## 7. Emergency contacts

All are placeholders; fill with real people before launch:

- **DPO / data protection**: `dpo@unitedglobal.uz`
- **Security reports**: `security@unitedglobal.uz` (see
  `/.well-known/security.txt`).
- **Hosting**: Cloudflare support ticket (dashboard).
