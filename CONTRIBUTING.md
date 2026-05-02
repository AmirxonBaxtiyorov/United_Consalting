# Contributing — United Global Consulting

Welcome! This document is a quickstart for new developers.

---

## Tech stack

- **Next.js 16** (App Router) — `node_modules/next/dist/docs/` has the bundled docs that match the installed version. **Always read those before writing code** — your training data may be outdated. See [AGENTS.md](./AGENTS.md).
- **React 19**
- **TypeScript 5** (strict mode)
- **Tailwind CSS v4** — see [app/globals.css](./app/globals.css) for the `@theme` block
- **next-intl** for i18n (uz / ru / en)
- **Supabase** — Postgres + service-role server-side inserts; RLS for `anon`
- **Resend** — transactional email
- **Telegram Bot API** — manager notifications
- **reCAPTCHA v3** — bot protection on the contact form
- **Vitest** — unit tests for `lib/`
- **Vercel** — hosting + edge headers

---

## Project structure

```
app/
  [locale]/           — i18n-aware routes
    page.tsx          — homepage
    about/            — /about
    services/         — /services
    countries/        — /countries + /countries/[slug]
    blog/             — /blog + /blog/[slug]
    faq/              — /faq
    contact/          — /contact
    calculator/       — /calculator
    quiz/             — /quiz
    cases/            — /cases
    privacy/          — /privacy
    terms/            — /terms
    layout.tsx        — root locale layout (header, footer, schema, analytics)
  api/contact/        — POST /api/contact (the only API)
  icon.tsx            — generated 32x32 favicon
  apple-icon.tsx      — generated 180x180 apple touch icon
  opengraph-image.tsx — generated 1200x630 OG image
  manifest.ts         — PWA manifest
  sitemap.ts          — sitemap.xml
  robots.ts           — robots.txt
  offline/            — offline fallback page (hit when SW catches a navigation failure)
components/
  layout/             — Header, Footer, LanguageSwitcher
  sections/           — page-level sections (HeroSection, ContactForm, ...)
  shared/             — Analytics, ThemeProvider, SchemaOrg, ServiceWorkerRegister
  widgets/            — CookieConsent, FloatingWidgets
  ui/                 — primitive components (Button, etc.)
lib/                  — server-side helpers (supabase, telegram, email, rate-limit, recaptcha, validations, consent)
data/                 — static content (countries, blog, services, partners)
i18n/                 — next-intl routing + request config
messages/             — uz.json, ru.json, en.json — all UI strings
public/               — favicon.ico, sw.js (service worker)
docs/                 — DEPLOYMENT.md, API.md, SEO.md, CONTENT-EDITING.md, supabase-schema.sql
proxy.ts              — Next.js i18n middleware
next.config.ts        — image config, compress, format
vercel.json           — security headers (HSTS, CSP, X-Frame-Options, etc.)
```

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/AmirxonBaxtiyorov/United_Consalting
cd United_Consalting
npm install
cp .env.example .env.local   # if exists; otherwise see docs/DEPLOYMENT.md
npm run dev
```

Open http://localhost:3000.

### Environment variables

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) §1 for the full list. For local dev, the contact form silently no-ops if env vars are missing — that's by design.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest (single run) |
| `npm run test:watch` | Vitest in watch mode |

CI runs all of these on every push and PR — see [.github/workflows/ci.yml](./.github/workflows/ci.yml).

---

## Conventions

### Server vs. Client components

- Default to **Server Components** (the file has no `'use client'`).
- Use `'use client'` only when you need state, effects, browser APIs, or event handlers.
- Sections in `components/sections/` are mostly Server. Things in `components/widgets/` and `components/shared/Analytics.tsx` are `'use client'`.

### i18n

- Never hard-code user-facing strings. Always go through `messages/*.json` + `useTranslations(...)`.
- For server-side metadata: `getTranslations({ locale, namespace })`.
- Add the same key to all three message files. CI will fail if one is missing.

### Routing

- Use the typed router from `@/i18n/navigation` (`Link`, `useRouter`, `redirect`) — it auto-prefixes the locale.
- Never `<a href="/about">` — use `<Link href="/about">` from `@/i18n/navigation`.

### Images

- All remote images must have their hostname listed in [next.config.ts](./next.config.ts) → `images.remotePatterns`.
- Always provide `alt` (empty `alt=""` only when the image is purely decorative and the surrounding text covers the meaning).
- Above-the-fold hero images get `priority`. Everything else lazy-loads automatically.

### Forms

- All form schemas live in [lib/validations.ts](./lib/validations.ts) (zod).
- Server validates again with the same schema in `app/api/contact/route.ts`.

### Adding a new page

1. Create `app/[locale]/<your-page>/page.tsx`.
2. Export `generateMetadata` for SEO (title, description, alternates).
3. Add the path to `app/sitemap.ts` `staticPaths`.
4. Add a nav entry in `components/layout/Header.tsx` if user-visible.
5. Add translations to all 3 `messages/*.json`.

### Style

- Tailwind utility classes for layout/spacing/typography.
- Brand colors live in `app/globals.css` `@theme` — never use raw hex in components when a token exists.
- Use `cn()` from `lib/utils.ts` for conditional classes.

---

## Testing

```bash
npm test
```

Tests live next to the code (`lib/recaptcha.test.ts`, `lib/email.test.ts`, `lib/consent.test.ts`). They are excluded from the Next.js build via `tsconfig.json` → `exclude`.

When fixing a bug, **add a regression test first** if practical — proves the bug + prevents repeats.

---

## Deploy

- Push to `main` → Vercel auto-deploy.
- Preview deployments on every PR.
- Full deployment instructions: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

---

## Security

- Never commit `.env.local`. `.gitignore` blocks it.
- All secrets go through Vercel env vars (Production / Preview / Development).
- Forms are protected by reCAPTCHA + honeypot + rate limit.
- Server-only Supabase access uses `SUPABASE_SERVICE_ROLE_KEY` (never expose to the client).
- See [vercel.json](./vercel.json) for HTTP security headers (HSTS, CSP, X-Frame-Options, Permissions-Policy).

---

## Questions?

Telegram: t.me/unitedglobal · Email: info@unitedglobal.uz
