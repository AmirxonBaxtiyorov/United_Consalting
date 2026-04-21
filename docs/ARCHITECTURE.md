# Architecture — United Global Consulting

_A static, zero-build-step landing page designed to stay under 120 KB gzipped while delivering a premium experience._

---

## Technology overview

| Layer          | Choice                                | Why |
|----------------|---------------------------------------|-----|
| HTML           | Plain HTML5, one file per page        | Zero build step, instant TTFB, trivially hostable anywhere |
| CSS            | Hand-written, 3 files (tokens, main, enhancements) | Predictable, small, no framework churn |
| JavaScript     | Vanilla ES2023, one IIFE              | ~29 KB before gzip, no framework tax |
| Icons          | Lucide UMD CDN, **SRI-pinned** 0.456  | One shared sprite; hashing protects against CDN compromise |
| Typography     | Google Fonts `Fraunces` + `Inter`     | Free, high-contrast, preloaded |
| Backend        | Cloudflare Worker (`/workers/form-proxy`) | Serverless, secrets safe, free tier fits |
| Form plumbing  | Telegram Bot API + Google Sheets + optional Notion | Zero-infrastructure lead inbox |
| Anti-spam      | Honeypot + time-trap + Cloudflare Turnstile + KV rate-limit | Works without breaking UX |
| Observability  | Cloudflare Web Analytics, GA4 (consent-gated) | Privacy-respecting + conversion tracking |
| PWA            | Service Worker + `manifest.webmanifest` | Installable, offline-resilient |

---

## File tree

```
c:\consalting\
├── index.html                 # main landing (all sections + widgets)
├── thank-you.html             # post-submit conversion page
├── privacy.html               # GDPR + RUz compliant privacy policy
├── terms.html                 # terms of service / public offer
├── 404.html                   # branded 404
├── offline.html               # shown when SW sees fetch fail
│
├── countries/                 # 10 SEO-focused country landing pages
│   ├── korea.html
│   ├── singapore.html
│   ├── usa.html
│   ├── italy.html
│   ├── luxembourg.html
│   ├── finland.html
│   ├── turkey.html
│   ├── japan.html
│   ├── latvia.html
│   └── malaysia.html
│
├── css/
│   ├── styles.css             # base design system + all page sections
│   ├── animations.css         # keyframes only
│   └── enhancements.css       # dark mode, new widgets, a11y polish
│
├── js/
│   ├── main.js                # single IIFE: all behaviors
│   └── modules/
│       └── i18n.js            # tiny DOM-binding translator
│
├── i18n/
│   ├── uz.json                # Uzbek (Latin)
│   ├── ru.json                # Russian (default in UZ)
│   └── en.json                # English
│
├── data/
│   └── countries.json         # country data — drives calc + quiz + deadlines + country pages
│
├── assets/
│   ├── flags/                 # 10 inline SVG flags (offline-safe)
│   └── icons/                 # reserved for future inline-SVG replacements of Lucide
│
├── workers/
│   └── form-proxy/            # Cloudflare Worker — receives form, verifies Turnstile, fans out
│       ├── src/worker.js
│       ├── wrangler.toml
│       └── README.md
│
├── scripts/                   # one-shot Node generators (not shipped)
│   ├── gen-country-pages.js
│   └── link-country-cards.js
│
├── .well-known/
│   └── security.txt           # RFC 9116
│
├── humans.txt
├── sitemap.xml                # 14 URLs with hreflang alternates
├── robots.txt
├── manifest.webmanifest
├── sw.js
├── favicon.svg
├── GLODAL.png                 # logo / PWA icon source
├── _headers                   # Cloudflare Pages edge headers (CSP, HSTS, caching)
├── _redirects
└── docs/
    ├── SETUP.md               # local run + Worker deploy
    ├── DEPLOYMENT.md          # production deploy recipe
    ├── ARCHITECTURE.md        # this file
    └── CONTENT_EDITING.md     # non-dev guide for editing data/i18n
```

---

## Data flow: lead form

```
  Browser (index.html form)
      │   - validates fields
      │   - honeypot check
      │   - time-trap (>2s since focus)
      │   - requests Turnstile token
      │
      │   POST JSON → /workers/form-proxy (Cloudflare Worker)
      │                     │
      │                     │   verifyTurnstile()    ← siteverify
      │                     │   rateLimit() via KV   ← 5 req / IP / 10 min
      │                     │
      │                     │   Promise.allSettled:
      │                     │     • Telegram Bot sendMessage (HTML)
      │                     │     • Google Apps Script webhook (Sheets)
      │                     │
      │                     └→ { ok, lead_id, delivery: {...} }
      │
      └→ window.open(wa.me/... prefilled)  (opened SYNCHRONOUSLY in click)
         formSuccess shown, form.reset(), UTM repopulated
         gtag('generate_lead')
         (optional redirect to /thank-you.html)
```

**Zero-loss guarantee.** If Worker fails or isn't configured, WhatsApp still
opens with a prefilled message. If Telegram and Sheets both fail we return 502
so the client shows the error + keeps the WhatsApp tab. Leads cannot be silently
lost.

---

## Data flow: i18n

1. `js/modules/i18n.js` detects the language (URL `?lang=`, `localStorage`, `navigator.language`).
2. Loads `/i18n/<lang>.json` (fetched once, cached).
3. For every element with `data-i18n="key.path"` — replaces `textContent`.
4. For `data-i18n-attr="attr:key,attr2:key2"` — sets attributes.
5. For `data-i18n-html` — sets `innerHTML` (only used on the consent label).
6. Fires `i18n:changed` event → `main.js` re-renders Lucide icons (because
   translations replace text nodes).
7. `document.documentElement.lang` is updated synchronously so screen readers
   and SEO crawlers pick up the new language.

---

## Data flow: calculator + quiz + deadlines

All three widgets consume `/data/countries.json`.

- **Calculator** sums `tuition_year[level]` + `living_year[housing]` +
  `extra.*` for the selected country. Year-2+ adds recurring tuition and
  living only (one-shot fees stay flat).
- **Quiz** has 5 questions. Each answer option increments `score[tag]`. The
  final page ranks countries by `sum(quiz_weight[tag] * score[tag])` and shows
  the top 3. Links lead to the country pages.
- **Deadlines** flattens `typical_deadlines[]` from every country, sorts
  ascending, keeps the next 6 future dates, renders a live `setInterval(tick, 1000)`
  countdown per card. Past deadlines get `.deadline-passed` styling.

To add a country: append to `data/countries.json`, add an SVG flag to
`/assets/flags/<code>.svg`, run `node scripts/gen-country-pages.js` (and
optionally `node scripts/link-country-cards.js` if you added a card in
`index.html`).

---

## Performance budget

| Metric                  | Budget          | Current (local) |
|-------------------------|-----------------|-----------------|
| LCP                     | < 1.8 s         | ~1.1 s with preload + CDN |
| CLS                     | < 0.05          | 0 (all images have width/height) |
| Initial HTML            | < 30 KB gzipped | ~18 KB gzipped |
| Total JS                | < 100 KB gz     | ~30 KB gz (main + i18n + Lucide runtime) |
| Total CSS               | < 40 KB gz      | ~13 KB gz |

Levers if you blow the budget:

- Split `enhancements.css` into `critical.css` (inline) + `rest.css` (lazy).
- Swap Lucide UMD for inline SVGs on the main viewport.
- Self-host Inter+Fraunces WOFF2 (removes Google Fonts third-party hops).

---

## Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`).
- Skip-link to `#main`.
- Focus-trap in mobile drawer + exit-modal; `inert` on `<main>` while drawer open.
- All interactive icon-only buttons carry `aria-label`.
- FAQ `<details>/<summary>` has `aria-expanded` kept in sync.
- Testimonials slider has `aria-live="polite"` on the track wrapper.
- Counters animate only when visible via IntersectionObserver.
- `prefers-reduced-motion` kills hero particles + marquee + pulse.
- `prefers-contrast: more` bumps text/border contrast.
- Light/dark themes both keep WCAG AA contrast ratios.

---

## Security

- **CSP**: strict, allow-list only; no `unsafe-eval`, inline script only where
  hashable (the theme-bootstrap IIFE in `<head>`).
- **SRI**: Lucide is pinned to 0.456.0 with SHA-384 integrity.
- **HSTS**: 2-year `max-age`, `includeSubDomains; preload` via `_headers`.
- **Referrer-Policy**: `strict-origin-when-cross-origin`.
- **Permissions-Policy**: camera/microphone disabled, geolocation=self.
- **X-Frame-Options**: `DENY` — no embed.
- **Turnstile + honeypot + time-trap** shield the form.
- **Worker** holds the Telegram token as an encrypted secret; the browser
  never sees it.
- **No user-supplied HTML is rendered** anywhere; `i18n` uses `textContent`
  except for a single whitelisted `data-i18n-html` key (the consent label).
