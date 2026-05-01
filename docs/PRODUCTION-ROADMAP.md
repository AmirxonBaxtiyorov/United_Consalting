# Production Launch Roadmap — United Global Consulting

> Bu hujjat loyihani **production**ga to'liq tayyor qilish uchun barcha qolgan ishlarning to'liq ro'yxati. Har bir qadam mustaqil prompt sifatida ishlatilishi mumkin.

**Audit sanasi:** 2026-05-02
**Hozirgi holat:** Vercel'da ishlayapti — `https://global-consalting.vercel.app`
**Texnik tayyorlik:** ~90%
**Production tayyorligi:** ~60% (env vars, domain, content gaps)

---

## 🚨 PHASE 1 — BLOCKERS (Launch'dan oldin majburiy)

Bularsiz sayt to'liq ishlamaydi yoki xavfli (secrets, leadlar yo'qoladi, GDPR risk).

---

### 1.1 — Vercel'ga Environment Variables qo'shish

**Nima:** Lokal `.env.local` da turgan barcha sirlarni Vercel project sozlamalariga ko'chirish.

**Nega kerak:** Hozir Vercel'dagi build env vars'siz ishlayapti. Bu degani:
- Forma to'ldirilsa, lead Supabase'ga **saqlanmaydi**
- Telegram'ga **xabar bormaydi**
- Resend orqali email **yuborilmaydi**
- reCAPTCHA verifikatsiya **ishlamaydi**
- Analytics (GA4/Yandex) tracking ishlamaydi

**Qaerda:** Vercel Dashboard → `united-consalting` → **Settings → Environment Variables**

**Qadamlar:**
1. https://vercel.com/amrxonnbaxtiyorov-6047s-projects/united-consalting/settings/environment-variables ga kiring
2. Quyidagi 12 ta o'zgaruvchini **Production** muhitiga qo'shing (qiymatlarni `.env.local` dan oling):

| Nomi | Maxfiymi? | Qiymati nimadan olinadi |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ❌ | `https://global-consalting.vercel.app` (yoki real domen) |
| `NEXT_PUBLIC_SUPABASE_URL` | ❌ | `.env.local` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ❌ | `.env.local` |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | `.env.local` (server-only!) |
| `RESEND_API_KEY` | ✅ | `.env.local` |
| `RESEND_FROM` | ❌ | `.env.local` (lekin domen verifikatsiyasidan keyin o'zgartirish kerak) |
| `MANAGER_EMAIL` | ❌ | `.env.local` |
| `TELEGRAM_BOT_TOKEN` | ✅ | `.env.local` |
| `TELEGRAM_CHAT_ID` | ❌ | `.env.local` |
| `RECAPTCHA_SECRET_KEY` | ✅ | `.env.local` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ❌ | `.env.local` |
| `NEXT_PUBLIC_GA_ID` | ❌ | `G-4N4E66TJQ1` |
| `NEXT_PUBLIC_YM_ID` | ❌ | `108705694` |

3. Saqlagandan keyin **Deployments → ⋯ → Redeploy** bosing (env vars yangi build'da yoziladi).

**Qabul kriteriyasi:** Forma to'ldirilganda Telegram'ga xabar tushadi va Supabase'da `leads` jadvalida yangi qator paydo bo'ladi.

---

### 1.2 — Supabase database schema'ni o'rnatish + RLS policies

**Nima:** `docs/supabase-schema.sql` faylidagi jadvallarni Supabase'da yaratish va Row-Level Security policy'larini qo'shish.

**Nega kerak:** Hozir `leads` jadvali yo'q bo'lsa, formada xato chiqadi. RLS bo'lmasa — ixtiyoriy odam Supabase URL orqali leadlarni o'qiy oladi.

**Qaerda:**
- Schema fayli: `docs/supabase-schema.sql`
- Supabase dashboard: https://supabase.com/dashboard → loyiha → **SQL Editor**

**Qadamlar:**
1. Supabase loyihangiz (`.env.local` dagi `NEXT_PUBLIC_SUPABASE_URL`) ga kiring.
2. **SQL Editor → New query** ochib, `docs/supabase-schema.sql` mazmunini joylashtirib **Run** qiling.
3. RLS policy'larini qo'shing (hozir schema'da faqat `ENABLE ROW LEVEL SECURITY` bor, lekin policy'lar yo'q):

```sql
-- leads — faqat service_role kira oladi (anon mumkin emas)
CREATE POLICY "service_role_all_leads"
  ON public.leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- newsletter_subscribers — anon yoza oladi (subscribe), service_role hammasi
CREATE POLICY "anon_insert_subscribers"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "service_role_all_subscribers"
  ON public.newsletter_subscribers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- updated_at uchun trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Qabul kriteriyasi:** Test forma yuboriladi → Supabase'da `leads` jadvalida yangi qator. Anon key bilan SELECT urinib ko'rsangiz — bo'sh natija (RLS bloklaydi).

---

### 1.3 — Telegram bot'ni guruhga qo'shish va `CHAT_ID` ni olish

**Nima:** Telegram bot'ni managerlar guruhiga qo'shib, to'g'ri `chat_id` ni `.env.local` (va Vercel) ga yozish.

**Nega kerak:** Hozir `.env.local` da bot token bor, lekin chat_id placeholder. Bot xabar yubora olmaydi.

**Qadamlar:**
1. Telegram'da **@BotFather** ga `/mybots` deb yozing → bot tanlang → API token tasdiqlang (mavjud token to'g'rimi).
2. Managerlar uchun **yangi guruh** yarating yoki mavjudini ishlating.
3. Bot'ni guruhga qo'shing → uni **administrator** qiling (yoki guruhda Privacy Mode'ni o'chiring).
4. Guruhga oddiy xabar yozing (masalan "/start" yoki shunchaki "test").
5. Brauzerda oching:
   ```
   https://api.telegram.org/bot<SIZNING_TOKEN>/getUpdates
   ```
6. JSON natijada `"chat":{"id":-1001234567890,...}` ni toping. Shu **manfiy son** — bu chat_id.
7. `.env.local` va Vercel env vars'da `TELEGRAM_CHAT_ID=-1001234567890` qiling.

**Qabul kriteriyasi:** Saytdagi formani to'ldirib yuboring → Telegram guruhga formatlangan xabar tushadi.

---

### 1.4 — Resend email domenini verifikatsiya qilish

**Nima:** `unitedglobal.uz` (yoki real domen) ni Resend'da DNS orqali tasdiqlash, `RESEND_FROM` ni o'zgartirish.

**Nega kerak:** Hozir `RESEND_FROM=onboarding@resend.dev` — bu Resend'ning test domeni va u faqat akkaunt egasining email'iga xat yubora oladi (boshqa odamlarga emas). Production'da auto-reply mijozga yuborilmaydi.

**Qadamlar:**
1. Real domen kerak — `unitedglobal.uz` (yoki shunga o'xshash). Agar yo'q bo'lsa — domain registrar (Namecheap, GoDaddy, .uz registratorlari) dan sotib oling.
2. https://resend.com/domains → **Add Domain** → `unitedglobal.uz`
3. Resend ko'rsatadigan **TXT** va **MX** yozuvlarni domen DNS sozlamalariga qo'shing (SPF, DKIM, optional DMARC).
4. DNS tarqalishini kuting (10-30 daqiqa) → Resend'da **Verify** bosing.
5. `.env.local` va Vercel'da:
   ```
   RESEND_FROM="United Global Consulting <noreply@unitedglobal.uz>"
   ```
6. `MANAGER_EMAIL` ni real manager email'iga o'zgartiring (hozir `amrxonn.baxtiyorov@gmail.com`).

**Qabul kriteriyasi:** Forma to'ldirilganda mijoz kiritgan email'iga auto-reply tushadi (spam'da emas).

---

### 1.5 — Custom domen ulash (`unitedglobal.uz`)

**Nima:** Vercel'da real domenni ulab, `NEXT_PUBLIC_SITE_URL` ni yangilash.

**Nega kerak:** `vercel.app` subdomen — bu test/preview URL. Production'da brand domen kerak (SEO, ishonch, professional ko'rinish).

**Qadamlar:**
1. Vercel Dashboard → `united-consalting` → **Settings → Domains** → **Add**
2. `unitedglobal.uz` va `www.unitedglobal.uz` ni qo'shing.
3. Vercel ko'rsatadigan **A record** (`76.76.21.21`) yoki **CNAME** ni domen DNS'ga qo'shing.
4. SSL sertifikati avtomatik chiqishini kuting (~5 daqiqa).
5. Vercel env var'da `NEXT_PUBLIC_SITE_URL=https://unitedglobal.uz` ga o'zgartiring.
6. **lib/config.ts:9** da default URL ham yangilanishi kerak (yoki shunchaki env'dan o'qiladi).
7. `app/sitemap.ts` ham avtomatik yangi URL bilan ishlaydi.

**Qabul kriteriyasi:** `https://unitedglobal.uz` ochiladi va u `https://www.unitedglobal.uz` ga (yoki teskari) redirect qilib turadi.

---

## ⚠️ PHASE 2 — IMPORTANT (Launch'dan oldin yaxshi bo'ladi)

Bularsiz sayt ishlaydi, lekin sifat past, GDPR risk, SEO zaif.

---

### 2.1 — Cookie consent banner + GDPR/conditional analytics

**Nima:** Foydalanuvchidan rozilik olmasdan GA4 va Yandex Metrika yuklanmasligi kerak.

**Nega kerak:** GDPR (Yevropa qonuni) va `Permissions-Policy` talab qilmoqda. Hozir `components/shared/Analytics.tsx` har doim yuklayapti, rozilik so'ramaydi.

**Hozirgi holat:**
- `messages/*.json` da `widgets.cookies_title/body/accept/decline` matnlari **bor**
- Lekin **hech qanday banner komponenti yo'q**
- `components/shared/Analytics.tsx:11-35` shartsiz yuklayapti

**Bajarilishi kerak:**
1. `components/shared/CookieConsent.tsx` yaratish — pastki/yon banner, **Accept** va **Decline** tugmalari, `localStorage.setItem('cookie-consent', 'accepted'|'declined')` saqlaydi.
2. `components/shared/Analytics.tsx` ni o'zgartirish — `useEffect` ichida `localStorage` ni o'qib, `accepted` bo'lsa kontekst orqali yuklash. Yo'q bo'lsa hech narsa qilmaslik.
3. **3 daraja** taklif qilish (essential, analytics, marketing) — yoki sodda 2-tugmali (yes/no).
4. Banner faqat birinchi sahifa ochilganda chiqadi, javob bergandan keyin yashiriladi.
5. Footer'da "Cookie Settings" linki qo'shish — qaytadan tanlash imkoni.

**Qabul kriteriyasi:** Yangi tab'da sayt ochilsa banner chiqadi. **Decline** bossa Network tab'da `googletagmanager.com` so'rovi yo'q.

---

### 2.2 — Favicon, apple-touch-icon, OG images

**Nima:** Brauzer tab'ida ikona, telefon home screen'da ikona, ijtimoiy tarmoqlarda baham ko'rilganda chiroyli oldindan ko'rish (preview).

**Nega kerak:** Hozir `public/` da faqat `next.svg`, `vercel.svg` va boshqa default Next.js ikonalari. Brauzer tab'ida `N` chiqib turadi. Telegram'da link baham ko'rilsa generic preview chiqadi.

**Hozirgi holat:**
- `public/` → `file.svg, globe.svg, next.svg, vercel.svg, window.svg` (default)
- `app/favicon.ico` → mavjud, lekin Next.js default

**Bajarilishi kerak:**
1. **Logotipdan favicon yasash** — https://realfavicongenerator.net ga logo (PNG, kamida 512×512) yuklang. U yaratadi:
   - `favicon.ico`
   - `apple-touch-icon.png` (180×180)
   - `icon-192.png`, `icon-512.png` (PWA uchun)
   - `manifest.webmanifest`
2. Bu fayllarni `public/` ga joylashtirish.
3. `app/layout.tsx` da metadata.icons ni yangilash:
   ```ts
   icons: {
     icon: '/favicon.ico',
     apple: '/apple-touch-icon.png',
   }
   ```
4. **OG image yasash** — har bir asosiy sahifa uchun (home, about, services, har bir country, har bir blog post). 2 variant:
   - **Statik:** Figma/Photoshop'da 1200×630 PNG yasab `public/og/` ga joylash, har sahifa metadata'siga ulash.
   - **Dynamic (yaxshiroq):** Vercel'ning `@vercel/og` (Satori) yordamida `app/og/[locale]/route.tsx` yaratib, sahifa nomi va sarlavhadan dynamic OG image generatsiya qilish.
5. Har sahifa `generateMetadata` da `openGraph.images` ulash.

**Logo kerak — User'dan:** PNG/SVG formatida high-res logo (transparent background, kamida 512×512).

**Qabul kriteriyasi:** Saytdagi link Telegram'ga yopishtirilsa chiroyli preview chiqadi (logo + sayt nomi + tavsif).

---

### 2.3 — JSON-LD structured data (Schema.org)

**Nima:** Google qidiruvga sayt mazmunini "tushuntirib" beradigan structured data — u natijada `rich snippets` (yulduzcha, FAQ accordion, breadcrumbs) ko'rinadi.

**Nega kerak:** SEO uchun katta ustunlik. Hozir hech qanday JSON-LD yo'q.

**Bajarilishi kerak:**
1. **`components/shared/SchemaOrg.tsx`** komponenti yaratish (yoki mavjudini boyitish — uning soni audit'da ko'rilgan).
2. **Organization schema** (`app/[locale]/layout.tsx` ga qo'shish):
   ```jsonld
   {
     "@context": "https://schema.org",
     "@type": "EducationalOrganization",
     "name": "United Global Consulting",
     "url": "https://unitedglobal.uz",
     "logo": "https://unitedglobal.uz/logo.png",
     "address": {...},
     "contactPoint": {...},
     "sameAs": ["https://t.me/...", "https://instagram.com/..."]
   }
   ```
3. **Article schema** har bir blog post uchun (`app/[locale]/blog/[slug]/page.tsx`):
   - `@type: Article`, `headline`, `datePublished`, `author`, `image`, `articleBody`
4. **FAQPage schema** FAQ sahifa uchun (`app/[locale]/faq/page.tsx`).
5. **BreadcrumbList** har sahifada (Home > Countries > Korea).
6. **Course schema** har bir country sahifasida (mavjud universitetlar).

**Test:** https://search.google.com/test/rich-results — har sahifada xato bo'lmasligi kerak.

**Qabul kriteriyasi:** Google Rich Results Test'da xato yo'q, kelajakda Search Console'da rich result'lar ko'rinadi.

---

### 2.4 — `.env.local` ni git tarixidan olib tashlash (agar commit bo'lgan bo'lsa)

**Nima:** Tekshirish — `.env.local` git tarixida bormi. Bo'lsa — barcha API kalitlarini yangilash + tarixni tozalash.

**Nega kerak:** `.env.local` da real Supabase service role key, Resend API key, Telegram token bor. Bular ommaviy bo'lib qolsa — leadlar o'g'irlanishi, SMS bombing, email spam jo'natish mumkin.

**Tekshirish:**
```bash
cd "c:/consalting/Global Consalting/"
git log --all --full-history -- .env.local
```

Agar **bo'sh bo'lsa** — tarixda yo'q, hammasi yaxshi.
Agar **commit'lar chiqsa** — kalitlar oshkor.

**Bajarilishi kerak (agar commit bo'lgan bo'lsa):**
1. **Barcha API kalitlarini yangilash** (rotatsiya):
   - Supabase: Settings → API → **Reset service_role key**
   - Resend: API Keys → **Revoke** + **Create new**
   - Telegram: BotFather → `/revoke` (eski token) → `/token` (yangi)
   - reCAPTCHA: https://www.google.com/recaptcha/admin → site qaytadan yarating
2. Yangi qiymatlarni `.env.local` ga yozing va Vercel env vars'ni yangilang.
3. Tarixni tozalash uchun `git filter-repo` ishlating:
   ```bash
   pip install git-filter-repo
   git filter-repo --path .env.local --invert-paths
   git push origin main --force
   ```
   ⚠️ Bu **destructive** — boshqa kim bilan ishlasangiz ogohlantirish kerak.

**Qabul kriteriyasi:** `git log --all -- .env.local` bo'sh natija qaytaradi.

---

### 2.5 — CSP (Content Security Policy) header

**Nima:** XSS hujumdan himoyalanish uchun brauzerga "qaysi domen'lardan script yuklash mumkin" ni aytib qo'yish.

**Nega kerak:** Ehtimol kichik xavf, lekin security audit'larda yo'qligi qaysi auditda kamchilik. OWASP rekomendatsiyasi.

**Hozirgi holat:**
- `vercel.json:6-15` — HSTS, X-Frame-Options bor, **CSP yo'q**.

**Bajarilishi kerak:**
`vercel.json` ga `Content-Security-Policy` qo'shish:

```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://mc.yandex.ru https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.unsplash.com https://plus.unsplash.com https://flagcdn.com https://logo.clearbit.com https://upload.wikimedia.org https://mc.yandex.ru; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://api.resend.com https://api.telegram.org https://www.google-analytics.com https://mc.yandex.ru; frame-src https://www.google.com https://challenges.cloudflare.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests"
}
```

**Test:** Saytni ochib brauzer Console'da xato yo'qligini tekshiring. https://csp-evaluator.withgoogle.com da CSP'ni baholang.

**Qabul kriteriyasi:** CSP fail bo'lmaydi, sayt to'g'ri yuklanadi.

---

### 2.6 — Tarjima bo'shlig'i (`scholarships` keylar)

**Nima:** `messages/ru.json` va `messages/uz.json` da `scholarships.t1_t`, `t2_t`, `t3_t`, `t4_t` qiymatlari ingliz tilida qolib ketgan ("Partial Scholarship", "Full Scholarship", ...).

**Nega kerak:** Foydalanuvchi rus/o'zbek tilida ingliz matn ko'radi — sifat past.

**Bajarilishi kerak:**
- `messages/ru.json` da:
  - `"t1_t": "Partial Scholarship"` → `"Частичная стипендия"`
  - `"t2_t": "Full Scholarship"` → `"Полная стипендия"`
  - `"t3_t": "Tuition Discount"` → `"Скидка на обучение"`
  - `"t4_t": "Merit-Based Grant"` → `"Грант за заслуги"`
- `messages/uz.json` da:
  - `"t1_t": "Qisman stipendiya"`
  - `"t2_t": "To'liq stipendiya"`
  - `"t3_t": "O'qish chegirmasi"`
  - `"t4_t": "Iqtidor stipendiyasi"`

Va `t1_d`, `t2_d` kabi description'lar ham tekshirib chiqilsin.

**Qabul kriteriyasi:** RU/UZ versiyada "Scholarship" so'zi yo'q.

---

## ✨ PHASE 3 — QUALITY (Launch'dan keyin yoki paralel)

Sayt ishlasa ham, sifati past — bu qadamlar foydalanuvchi tajribasini va konversiyani oshiradi.

---

### 3.1 — Lighthouse audit + Performance optimizatsiya

**Nima:** Google Lighthouse — Performance, Accessibility, Best Practices, SEO bo'yicha 0-100 ball beradi.

**Nega kerak:** 90+ ball bo'lmasa Google qidiruvda pastroq turadi. Mobile foydalanuvchilar sayt sekin yuklasa ketib qoladi.

**Qadamlar:**
1. Chrome DevTools → Lighthouse → Run audit (mobile + desktop, har biri uchun).
2. Asosiy sahifalarni test qiling: `/`, `/uz`, `/uz/countries/korea`, `/uz/blog/...`, `/uz/contact`.
3. Topilgan muammolarni tuzating:
   - **LCP (Largest Contentful Paint)** > 2.5s bo'lsa: Hero rasmni `priority` prop bilan yuklash, blur placeholder qo'shish.
   - **CLS (Cumulative Layout Shift)** > 0.1 bo'lsa: Rasm va shrift hajmlarini oldindan zaxiralash.
   - **TBT (Total Blocking Time)** yuqori bo'lsa: 3rd party script'larni `lazy` qilish.
   - Imagelarning `width`/`height` mavjudligini ta'minlash (`next/image` da bor, lekin remote URL'larda ehtiyot bo'lish).

**Qabul kriteriyasi:** Mobile Lighthouse'da har 4 kategoriya 90+.

---

### 3.2 — Accessibility (a11y)

**Nima:** Sayt ko'r/eshitmaydigan/keyboard-only foydalanuvchilar uchun ishlaydigan bo'lishi.

**Nega kerak:** Inklyuziya (10% odamlarda biror cheklov bor), qonun (Yevropa'da majburiy), SEO (Google a11y'ni qadrlaydi).

**Bajarilishi kerak:**
1. **Skip-link** qo'shish (`app/[locale]/layout.tsx`):
   ```tsx
   <a href="#main" className="sr-only focus:not-sr-only ...">Skip to content</a>
   <main id="main">...</main>
   ```
2. **ARIA labels** — har bir icon-only tugmaga (`<button aria-label="Open menu">`).
3. **Alt text** — har bir `next/image` da `alt` (hozir blog cover'da bor, country page'da yo'q).
4. **Keyboard navigation** — Tab bilan barcha interaktiv elementlarga yetib borish, focus ring ko'rinadigan.
5. **Color contrast** — Tailwind class'larini tekshirish (`text-gray-400 on bg-white` past, `text-gray-700` yaxshiroq). https://webaim.org/resources/contrastchecker/ ishlatish.
6. **Heading hierarchy** — har sahifada bitta `<h1>`, keyin `h2` → `h3` ketma-ket.
7. **Form errors** — `aria-invalid`, `aria-describedby` zod xatolarga.

**Test:** `npx @axe-core/cli http://localhost:3000/uz` yoki Chrome DevTools'ning "Accessibility" tab.

**Qabul kriteriyasi:** axe-core'da 0 critical/serious xato.

---

### 3.3 — Mobile responsive testlar

**Nima:** Telefonlarda har bir sahifani sinash.

**Nega kerak:** Trafikning 60-70% mobile. UI buzilsa konversiya nolga tushadi.

**Qadamlar:**
1. Chrome DevTools → Device toolbar (Ctrl+Shift+M).
2. Test qurilmalar: iPhone SE (kichik), iPhone 14 Pro, Galaxy S20, iPad.
3. Har bir asosiy sahifa: Hero, header menu, forma, calculator slider, quiz, country card.
4. Topilganlar:
   - Bosib bo'lmaydigan tugmalar (kichik tap target, < 44px)
   - Gorizontal scroll (overflow)
   - Hover-faqat o'zaro ta'sir (touch'da ishlamaydi)
   - Modallar/dropdownlar viewport tashqarisida.

**Qabul kriteriyasi:** Real telefonda ham har sahifa muammosiz ishlaydi.

---

### 3.4 — Sitemap va robots.txt verifikatsiya

**Nima:** Google Search Console'ga ulash.

**Nega kerak:** Aks holda Google sayt borligini bilmaydi yoki sekin indekslaydi.

**Qadamlar:**
1. https://search.google.com/search-console → **Add property** → `unitedglobal.uz` (yoki vercel URL).
2. DNS-record yoki HTML-meta orqali tasdiqlang.
3. **Sitemaps** bo'limida `https://unitedglobal.uz/sitemap.xml` qo'shing.
4. `/robots.txt` ni tekshiring: `User-agent: *\nAllow: /\nSitemap: ...`
5. Yandex Webmaster'ga ham qo'shing (https://webmaster.yandex.com).

**Qabul kriteriyasi:** Search Console'da 81 ta URL "Discovered" → "Indexed" bo'ladi (1-2 hafta).

---

## 🎁 PHASE 4 — NICE-TO-HAVE (Launch'dan keyin)

Bular bor bo'lsa yaxshi, lekin shoshilinch emas.

---

### 4.1 — PWA (Progressive Web App)

**Nima:** Saytni telefon home screen'ga "ilova" sifatida o'rnatish, offline ishlash.

**Nega:** Eski versiyada bor edi. Marketing'da plus.

**Bajarilishi kerak:**
1. `public/manifest.webmanifest` yaratish (standart format).
2. `public/sw.js` — service worker, asosiy sahifa va asset'larni cache'lash.
3. `app/layout.tsx` da SW'ni ro'yxatdan o'tkazish.
4. Offline page yaratish (`app/[locale]/offline/page.tsx`).

**Qabul kriteriyasi:** Chrome'da "Install app" tugmasi chiqadi.

---

### 4.2 — Tests + CI/CD

**Nima:** Avtomatlashtirilgan testlar + GitHub Actions.

**Nega:** Future commits sayt buzmasligini kafolatlaydi.

**Bajarilishi kerak:**
1. **Vitest + React Testing Library** o'rnatish.
2. Asosiy testlar:
   - `lib/recaptcha.test.ts` — verify funksiyasi to'g'ri ishlaydi.
   - `lib/email.test.ts` — escapeHtml ishlaydi.
   - `app/api/contact/route.test.ts` — POST handler integratsiya testi.
   - `components/sections/ContactForm.test.tsx` — formulalar to'g'ri validatsiya qilinadi.
3. `.github/workflows/ci.yml` yaratish:
   ```yaml
   name: CI
   on: [push, pull_request]
   jobs:
     check:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with: { node-version: 20 }
         - run: npm ci
         - run: npm run lint
         - run: npx tsc --noEmit
         - run: npm test
         - run: npm run build
   ```

**Qabul kriteriyasi:** Har push'da CI yashil, build muvaffaqiyatli.

---

### 4.3 — Yangi blog kontent

**Nima:** Qo'shimcha blog maqolalar.

**Nega:** SEO trafik blog'dan keladi. 3 ta maqola — boshlang'ich. Maqsad: oyiga 2-4 ta yangi.

**Mavzular tavsiya:**
- "Koreyada talaba viza: 2026 to'liq qo'llanma"
- "Italiyada bepul magistratura: DSU stipendiyasi"
- "TOPIK 3-darajagacha 6 oyda"
- "Yaponiyaning MEXT stipendiyasi"
- "USA vs Yevropa: qaysi biri arzonroq?"

Har biri 1500+ so'z, RU/UZ/EN tarjima, real ma'lumot, ichki linklar.

**Bajarilishi kerak:** `data/blog.ts` ga qo'shish.

---

### 4.4 — Hujjatlash (`docs/`)

**Nima:** README va docs'ni boyitish.

**Bajarilishi kerak:**
- `docs/DEPLOYMENT.md` — to'liq deployment qo'llanma.
- `docs/CONTENT-EDITING.md` — kontent yangilash uchun (qaysi faylda nima).
- `docs/API.md` — `/api/contact` endpoint'i.
- `CONTRIBUTING.md` — yangi developer uchun.

---

## 📋 LAUNCH CHECKLIST (Qisqacha)

Ushbu jadval to'liq bo'lganda — sayt **production**!

### 🚨 Blockers (majburiy)
- [ ] Vercel'ga 12 ta env vars qo'shilgan
- [ ] Supabase schema o'rnatilgan + RLS policy'lar
- [ ] Telegram bot guruhda + chat_id to'g'ri
- [ ] Resend domeni verifikatsiyalangan + `RESEND_FROM` real domen
- [ ] Custom domen (`unitedglobal.uz`) ulangan + SSL
- [ ] **Test:** Real forma to'ldirilib, lead Supabase + Telegram + email'ga keladi

### ⚠️ Important
- [ ] Cookie consent banner ishlayapti
- [ ] Favicon + apple-touch-icon + OG image
- [ ] JSON-LD structured data (Organization, Article, FAQ)
- [ ] `.env.local` git tarixida emasligi tasdiqlangan
- [ ] CSP header qo'shilgan
- [ ] Tarjima gap'lari yopilgan (scholarships)

### ✨ Quality
- [ ] Lighthouse 90+ (mobile + desktop)
- [ ] Accessibility audit o'tilgan
- [ ] Mobile testlar bajarilgan
- [ ] Search Console + Yandex Webmaster ulangan

### 🎁 Nice-to-have
- [ ] PWA (manifest, SW)
- [ ] CI/CD (GitHub Actions)
- [ ] Yangi blog maqolalari
- [ ] Hujjatlash kengaytirilgan

---

## 🔗 USER'DAN KERAKLI NARSALAR (jamlangan)

Bu phase'larni boshlash uchun siz tomondan kerak:

1. **Domen** — `unitedglobal.uz` (yoki shunga o'xshash) registratsiya/access.
2. **Logo** — yuqori sifat PNG/SVG, kamida 512×512 transparent fon.
3. **Manager email** — kim leadlarni qabul qilishi (real ish email).
4. **Telegram** — bot kim ulanadigan guruh + admin huquq.
5. **Real telefon raqami** — sayt header/footer'da ko'rsatish uchun.
6. **Real manzil** — agar ofis bor bo'lsa (Google Maps integratsiyasi uchun).
7. **Ijtimoiy tarmoqlar** — Instagram, Telegram channel, Facebook URL'lar.

---

## 📐 PRIORITET TAVSIYASI

Agar **vaqt cheklangan** bo'lsa, quyidagi tartibda boring:

**1-kun (kritik):** 1.1 → 1.2 → 1.3 → 1.4 → 1.5 (Phase 1 to'liq)
**2-kun (sayt yaxshilanadi):** 2.1 → 2.2 → 2.4
**3-kun (SEO):** 2.3 → 3.4
**4-kun (sifat):** 3.1 → 3.2 → 3.3
**5-kun va keyin (boyitish):** 2.5 → 2.6 → Phase 4

**Eng katta ROI:**
1. Phase 1 (forma ishlasin) — bu yo'q bo'lsa hech narsa yo'q.
2. 2.1 (Cookie consent) — qonun.
3. 2.2 (Favicon + OG) — birinchi taassurot.
4. 3.1 (Performance) — Google rank.
