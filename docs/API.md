# API qo'llanmasi

Saytdagi yagona public API endpoint — `/api/contact`. Boshqa endpointlar yo'q (sayt asosan static + ISR).

---

## POST `/api/contact`

Lead yuborish. ContactForm va boshqa joylardan chaqiriladi.

### Request

**URL:** `https://unitedglobal.uz/api/contact`
**Method:** `POST`
**Content-Type:** `application/json`

```json
{
  "name": "Anvar Karimov",
  "phone": "+998 90 123 45 67",
  "email": "anvar@example.com",
  "country": "korea",
  "degree": "bachelor",
  "message": "I am interested in GKS scholarship",
  "consent": true,
  "locale": "uz",
  "source": "homepage",
  "recaptchaToken": "03AGdBq...",
  "website": ""
}
```

### Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✅ | 2–100 chars |
| `phone` | string | ✅ | regex `^[+()\d\s-]{7,}$` |
| `email` | string | ❌ | valid email format if provided |
| `country` | string | ❌ | one of `data/countries.ts` slugs |
| `degree` | string | ❌ | `bachelor` \| `master` \| `phd` \| `language` \| `undecided` |
| `message` | string | ❌ | up to 2000 chars |
| `consent` | boolean | ✅ | must be `true` |
| `locale` | string | ❌ | `ru` \| `uz` \| `en` (defaults to `ru`) |
| `source` | string | ❌ | `homepage` \| `country:korea` \| etc. |
| `recaptchaToken` | string | ❌ | reCAPTCHA v3 token (server validates against `RECAPTCHA_SECRET_KEY`) |
| `website` | string | ❌ | **Honeypot** — must be empty string. Non-empty = silent drop |

### Response

#### 200 OK — happy path

```json
{ "ok": true }
```

The endpoint **always returns 200** on a valid payload, even if some delivery channels (Supabase / Telegram / Resend) fail. Reason: never block the user because of a downstream issue.

#### 400 Bad Request

```json
{ "error": "Invalid JSON" }
```

or

```json
{
  "error": "Validation failed",
  "issues": {
    "fieldErrors": { "email": ["Invalid email"] }
  }
}
```

#### 403 Forbidden

```json
{ "error": "Captcha failed" }
```

reCAPTCHA score < 0.5, mismatched action, or invalid token.

#### 429 Too Many Requests

```json
{ "error": "Too many requests" }
```

Rate limit: 5 submissions / 10 minutes per IP. `Retry-After: 600` header included.

### What happens server-side

In parallel ([app/api/contact/route.ts:61](../app/api/contact/route.ts#L61)):

1. **Supabase** — `INSERT INTO leads ...` via `service_role` (RLS enforced for `anon`).
2. **Telegram** — formatted message to the manager group via Bot API.
3. **Resend (manager)** — HTML email to `MANAGER_EMAIL`.
4. **Resend (auto-reply)** — confirmation email to the client (only if `email` provided).

All four are wrapped in `Promise.allSettled` — a failure in one does not affect the others.

If env vars are missing, the corresponding channel quietly returns `false`. To check what's wired up, look at the `[contact] all delivery channels failed` warning in Vercel logs.

### Security

- **CSRF:** none needed — no cookies, no auth, just a public form. Origin checks would be added if we ever set cookies.
- **Honeypot:** `website` field. Bots fill all fields → silent drop with `200 OK`.
- **reCAPTCHA v3:** soft signal (score-based). If `RECAPTCHA_SECRET_KEY` not set, verification is bypassed (dev convenience).
- **Rate limit:** in-memory bucket, per-IP, 5/600s. Resets on cold start (acceptable for serverless lead form).
- **Input sanitization:** `escapeHtml()` is used inside email HTML rendering ([lib/email.ts](../lib/email.ts)).

### Calling from the client

```ts
const recaptchaToken = await getRecaptchaToken('contact_form');
const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...formData, locale, source, recaptchaToken }),
});
if (!res.ok) throw new Error('Failed');
```

---

## Generated routes (informational)

These are not user-callable APIs but they exist as routes:

- **`GET /sitemap.xml`** — generated from [app/sitemap.ts](../app/sitemap.ts). All locales × static pages + countries + blog posts.
- **`GET /robots.txt`** — generated from [app/robots.ts](../app/robots.ts).
- **`GET /manifest.webmanifest`** — generated from [app/manifest.ts](../app/manifest.ts).
- **`GET /icon`** — 32×32 PNG, [app/icon.tsx](../app/icon.tsx).
- **`GET /apple-icon`** — 180×180 PNG, [app/apple-icon.tsx](../app/apple-icon.tsx).
- **`GET /opengraph-image`** — 1200×630 PNG, [app/opengraph-image.tsx](../app/opengraph-image.tsx).
- **`GET /[locale]/blog/[slug]/opengraph-image`** — dynamic per-post OG image.
- **`GET /[locale]/countries/[slug]/opengraph-image`** — dynamic per-country OG image.
- **`GET /sw.js`** — [public/sw.js](../public/sw.js), service worker (cache-first static, network-first navigation, offline fallback).
- **`GET /offline`** — [app/offline/page.tsx](../app/offline/page.tsx), shown when navigation fails offline.
