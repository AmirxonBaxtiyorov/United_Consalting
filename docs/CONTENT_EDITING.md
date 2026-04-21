# Content editing guide — United Global Consulting

_A non-developer guide for updating copy, countries, deadlines, testimonials,
and translations. Every change becomes live the moment you save and redeploy._

---

## Where to edit what

| What you want to change                | File                            |
|----------------------------------------|---------------------------------|
| Any visible text on the main page      | `i18n/uz.json`, `i18n/ru.json`, `i18n/en.json` |
| A country's tuition / living costs     | `data/countries.json`           |
| A country's deadlines                  | `data/countries.json` → `typical_deadlines` |
| Text on a country page                 | `scripts/gen-country-pages.js` (SEO paragraph) + rerun |
| Phone / WhatsApp number                | `index.html` → `window.UGC_CONFIG` + structured-data blocks |
| Backend endpoint or Turnstile key      | `index.html` → `window.UGC_CONFIG` |
| Privacy policy, terms                  | `privacy.html`, `terms.html`    |
| 404 / offline copy                     | `404.html`, `offline.html`      |
| Add a new country                      | see **Add a new country** below |

---

## Editing translations

All visible strings on the main page live in `i18n/*.json`. The three files
must stay in sync — same keys, different translations.

### Rules

- Never change a key name; editing a **value** is safe.
- HTML is only allowed in keys ending in `_html` or for `data-i18n-html`
  elements (currently only `form.consent`). Otherwise the translator treats
  everything as plain text.
- Keep strings short enough to fit a phone screen. The designers assumed ~18
  characters for nav links, ~60 for buttons, ~120 for subtitles.

### Checking your work

```bash
node -e "['uz','ru','en'].map(l => JSON.parse(require('fs').readFileSync('i18n/'+l+'.json','utf8')))"
```

If it prints no error, your JSON is valid.

---

## Editing countries (`data/countries.json`)

Each country has this shape:

```json
{
  "slug": "korea",
  "code": "kr",
  "name": { "uz": "…", "ru": "…", "en": "…" },
  "capital": "Seoul",
  "language": "Korean / English",
  "currency_local": "KRW",
  "image": "https://images.unsplash.com/…",
  "universities_count": 25,
  "tuition_year":  { "bachelor": 6500, "master": 9000, "phd": 8500, "language": 4200 },
  "living_year":   { "dorm": 3000, "shared": 4800, "rent": 7800 },
  "extra":         { "documents": 300, "visa": 200, "insurance": 450, "flight": 700 },
  "typical_deadlines": [
    { "id": "korea-fall", "label": "Fall intake", "date": "2026-06-15" }
  ],
  "quiz_weight": { "asia": 3, "affordable": 2, "prestige": 3, "english": 2,
                   "kpop": 3, "tech": 3, "warm": 0, "europe": 0, "scholarship_focus": 3 },
  "universities": [
    { "name": "Seoul National University", "chip": "QS Top 40",
      "desc": "Korea's most prestigious university, strong English programs." }
  ]
}
```

**Gotchas:**

- `date` must be `YYYY-MM-DD`. The countdown uses the browser's local
  midnight for that date. Put specific times in the `label` if relevant.
- All money values are in USD. The calculator is not a currency converter.
- `quiz_weight` values are 0–3. 0 = "doesn't match this tag at all". Increase
  when a tag genuinely describes the country.
- `universities` is rendered on the country page. 4–6 is a good number.

---

## Add a new country

1. **Append** a new entry to `data/countries.json` (respect the schema above).
2. **Add a flag** at `assets/flags/<code>.svg`. If you don't have one,
   you can temporarily use `https://flagcdn.com/w80/<code>.png` and patch
   later — CSP already allows that host.
3. **Add a card** to `index.html` in the `<section id="countries">` block.
   Copy any existing `<article class="country-card"…` and change
   `data-country`, `data-i18n`, the flag `src`, and the `data-ga-event`.
4. **Regenerate** the country page:
   ```bash
   node scripts/gen-country-pages.js
   node scripts/link-country-cards.js   # only needed if you added a new card
   ```
5. **Append** the new URL to `sitemap.xml`.
6. **Add** the country name to `i18n/*.json` under `country_names` (if your card
   uses a `data-i18n="country_names.<slug>"` attribute).
7. (Optional) Add an SEO paragraph for the country page in
   `scripts/gen-country-pages.js` → `seoText` map, then rerun generation.

---

## Replacing images

The homepage uses Unsplash CDN for hero/about/services/country photos. Two
options:

- **Replace the Unsplash URL** in `index.html` — quick, no other changes.
- **Self-host**: drop a file into `assets/images/<name>.jpg`, update the
  `<img src>`, and remove that URL from CSP `img-src`. Don't forget to
  provide width/height attributes to avoid CLS.

---

## Editing the lead form

- **Field labels/placeholders**: `i18n/*.json` → `form.*`.
- **Required fields**: the `required` attribute in `index.html` and the
  validation rules in `js/main.js` → `validateForm()`.
- **Submit destination**: `window.UGC_CONFIG.formEndpoint` in `index.html`.
- **Message template sent to WhatsApp**: `js/main.js` → `buildWaMessage()`.
- **Message template sent to Telegram**: `workers/form-proxy/src/worker.js`
  → `formatTelegram()`.

---

## Publishing a change

1. Edit the file(s).
2. If you edited JSON, run the quick check above.
3. Commit and push — Cloudflare Pages redeploys automatically.
4. Wait ~60 s, hard-refresh the browser (`Ctrl+Shift+R`) — Service Worker will
   serve the new HTML thanks to network-first strategy.

_When Service Worker misbehaves_: bump `CACHE = 'ugc-static-vN'` in `sw.js`
(increment the number). That forces all clients to reset their cache.
