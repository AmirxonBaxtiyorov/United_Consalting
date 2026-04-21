# United Global Consulting — Landing Page

Premium, static, multilingual landing page for an international education
consulting agency. One `index.html`, ten country pages, one Cloudflare Worker
backend, three languages (UZ/RU/EN), PWA-ready, Lighthouse-tuned.

## Quick start (local)

```bash
# Any static server works. Two easy options:
python -m http.server 8080
# → http://localhost:8080/

# or
npx serve .
```

## Quick start (production)

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — short version:

1. Deploy the Cloudflare Worker in `workers/form-proxy/` and put its URL in
   `UGC_CONFIG.formEndpoint` (inline `<script>` inside `index.html`).
2. Push the repo to Cloudflare Pages. It serves everything as-is.
3. Add domain, enable HSTS preload.

## Repo map

| Path                        | Purpose                                         |
|-----------------------------|-------------------------------------------------|
| `index.html`                | Main landing page                               |
| `countries/<slug>.html`     | 10 SEO-focused country pages                    |
| `thank-you.html`            | Post-submit conversion page                    |
| `privacy.html`, `terms.html`, `404.html`, `offline.html` | Static pages |
| `css/`                      | `styles.css` · `animations.css` · `enhancements.css` |
| `js/main.js`                | All behavior in one IIFE                        |
| `js/modules/i18n.js`        | DOM-binding translator                          |
| `i18n/{uz,ru,en}.json`      | Translations                                    |
| `data/countries.json`       | Drives calculator + quiz + deadlines + country pages |
| `assets/flags/*.svg`        | 10 offline SVG flags                            |
| `workers/form-proxy/`       | Cloudflare Worker — verifies, rate-limits, fans out |
| `scripts/gen-country-pages.js` | Node generator — 10 country pages from `countries.json` |
| `scripts/link-country-cards.js` | Node: rewires card anchors on index to country pages |
| `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `sw.js`, `_headers`, `_redirects` | Platform files |
| `docs/`                     | ARCHITECTURE, DEPLOYMENT, CONTENT_EDITING, SETUP |

## Features implemented

- Dark mode, Uzbek/Russian/English i18n with hreflang, skip-link, focus-trap,
  reduced-motion, high-contrast support.
- Lead form with honeypot, time-trap, Cloudflare Turnstile, UZ phone masking,
  synchronous WhatsApp fallback, Cloudflare Worker backend, Telegram + Google
  Sheets fan-out, UTM capture, loading/success/error states, GDPR consent.
- Tuition-cost calculator, country-fit quiz, live admission-deadline
  countdown — all driven by `data/countries.json`.
- 10 country landing pages with unique SEO copy, BreadcrumbList + Article
  schema, university lists, cost tables, cross-linking.
- PWA: installable, Service Worker precache of 35 assets + offline fallback,
  shortcuts for consultation + top two countries.
- Security: strict CSP, SRI-pinned Lucide, HSTS preload, X-Frame DENY,
  Permissions-Policy, referrer-policy. `security.txt` published.
- Cookie consent with granular categories (essential / analytics / marketing),
  gated GA4 loading.

## Known placeholders (fill before launch)

- `UGC_CONFIG.formEndpoint` — Worker URL
- `UGC_CONFIG.turnstileSiteKey` — from Cloudflare Turnstile dashboard
- `UGC_CONFIG.gaId` — GA4 Measurement ID
- All Worker secrets (Telegram token, chat id, Turnstile secret, optional Sheets URL)

## License

Proprietary. All rights reserved. © United Global Consulting.
