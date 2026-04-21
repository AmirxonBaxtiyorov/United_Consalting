# United Global Consulting — Next.js 16 site

Marketing site and lead pipeline for United Global Consulting (Tashkent) — international-education agency.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components-ready)
- **React 19.2** · **TypeScript 5**
- **Tailwind CSS 4**
- **next-intl 4** for RU / UZ / EN localization (URL-prefixed, `/ru`, `/uz`, `/en`)
- **React Hook Form + Zod** for form validation
- **Framer Motion** + custom IntersectionObserver hooks for animations
- **Supabase** (leads, newsletter) — Postgres + service-role key on the server
- **Resend** (manager email + client auto-reply)
- **Telegram Bot API** (instant lead alerts in managers' chat)
- **lucide-react** icons

## What's inside

| Page | Route |
|---|---|
| Home (Hero, TrustBar, About, Services, Countries, Calculator, Quiz, Process, Stats, Scholarships, Testimonials, FAQ, CTA, Contact) | `/[locale]` |
| About | `/[locale]/about` |
| Services | `/[locale]/services` |
| Countries list | `/[locale]/countries` |
| Country detail (10 countries with real data) | `/[locale]/countries/[slug]` |
| Blog list | `/[locale]/blog` |
| Blog post (3 seed articles, markdown body) | `/[locale]/blog/[slug]` |
| Cases (placeholder — new agency) | `/[locale]/cases` |
| Contact | `/[locale]/contact` |
| Calculator | `/[locale]/calculator` |
| Quiz | `/[locale]/quiz` |
| FAQ | `/[locale]/faq` |
| Privacy / Terms | `/[locale]/privacy`, `/[locale]/terms` |
| 404 | localised `/[locale]/not-found` |
| Contact API | `POST /api/contact` |
| Sitemap | `/sitemap.xml` (81+ URLs w/ hreflang) |
| robots | `/robots.txt` |

**All 10 countries** (Korea, Singapore, USA, Italy, Luxembourg, Finland, Turkey, Japan, Latvia, Malaysia) have real tuition ranges, living costs, real university lists with QS rankings, upcoming intake deadlines, and quiz-scoring weights.

## Getting started

```bash
npm install
cp .env.example .env.local
# fill env vars (see below)
npm run dev
```

## Environment variables

See [`.env.example`](./.env.example). Only `NEXT_PUBLIC_SITE_URL` is required for local dev; all others gate their integration off gracefully when absent.

### Supabase

Run [`docs/supabase-schema.sql`](./docs/supabase-schema.sql) once in your Supabase project SQL editor. Tables:
- `leads`
- `newsletter_subscribers`

### Telegram bot

1. Message `@BotFather` → `/newbot` → copy token.
2. Add the bot to your managers' group chat.
3. Fetch chat id: `curl https://api.telegram.org/bot<TOKEN>/getUpdates`.
4. Put both in `.env.local`.

### Resend

1. Register at https://resend.com, verify a domain (e.g. `unitedglobal.uz`).
2. Copy the API key.
3. `RESEND_FROM` must be on a verified domain.

## Deployment

This folder is ready to deploy as its own Vercel project. Either:

- **Option A (recommended while static site is still the primary):** create a new Vercel project with **Root Directory = `next-app`** pointed at the same repo.
- **Option B:** once ready to cut over, delete the static HTML from the repo root and move `next-app/*` to the root.

On Vercel:
- Build command: `next build`
- Output: `.next` (automatic)
- Node.js: 20.x

## Notes on data

- All statistics on the site are framed around *what the agency offers* (partner university count, countries, languages, response time) — not success rates, since the agency is just starting. Lines like "500+ successful students" were intentionally **removed** from the copy.
- Blog has 3 long-form articles (RU/UZ/EN) seeded in `data/blog.ts`. Move to Supabase when admin UI lands.
- Team and Cases pages are deliberate placeholders ("will be populated after first enrolment cycle").
