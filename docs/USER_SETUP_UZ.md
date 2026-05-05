# 📋 SIZ QILISHINGIZ KERAK BO'LGAN ISHLAR — TO'LIQ QO'LLANMA

> **Maqsad:** loyihani 100% production-ready holatga keltirish.
> **Stack:** Next.js 16 + Vercel + Supabase + Resend + Telegram + reCAPTCHA + GA4.
> **Til:** o'zbekcha (latin).
> **Vaqt:** to'liq sozlash uchun jami **~3–5 soat** (DNS kutish vaqtisiz).

Hamma vazifalar **ketma-ket** bajariladi — birini tugatmasdan keyingisiga o'tmang. Har bir qadamda **sizdan menga nima yuborish kerakligi** alohida ko'rsatilgan (men o'sha qiymatlarni `.env.local` va Vercel'ga joylashtiraman).

---

## 📑 OG'ZAKI XARITA

| # | Vazifa | Vaqt | Narx | Majburiy? |
|---|---|---|---|---|
| 1 | Supabase loyiha yaratish | ~20 daq | bepul | ✅ ha |
| 2 | Telegram bot yaratish | ~10 daq | bepul | ✅ ha |
| 3 | Resend pochta xizmati | ~30 daq | bepul (3000/oy) | ✅ ha |
| 4 | reCAPTCHA v3 ro'yxatdan o'tish | ~5 daq | bepul | ✅ ha |
| 5 | Google Analytics 4 | ~10 daq | bepul | ⚠️ tavsiya |
| 6 | Yandex Metrika | ~10 daq | bepul | ⚠️ tavsiya |
| 7 | Vercel env variables qo'shish | ~15 daq | bepul | ✅ ha |
| 8 | Domen `unitedglobal.uz` ulash | ~30 daq + DNS | ~$30/yil | ⚠️ tavsiya |
| 9 | Korporativ pochta sozlash | ~15 daq | bepul/ $6/oy | ⚠️ tavsiya |
| 10 | Search Console + Yandex Webmaster | ~20 daq | bepul | ⚠️ tavsiya |
| 11 | UptimeRobot monitoring | ~10 daq | bepul | 🟡 ixtiyoriy |
| 12 | Yuridik hujjatlarni yangilash | ~30 daq | — | ⚠️ tavsiya |

---

# 1️⃣ SUPABASE LOYIHASINI YARATISH

> **Nima uchun?** Saytdan kelgan har bir lead (kontakt formasi) Supabase'ning `leads` jadvaliga yoziladi. Bu sizning asosiy mijozlar bazangiz.

## 1.1. Ro'yxatdan o'tish

1. [https://supabase.com](https://supabase.com) — saytga kiring.
2. **"Start your project"** tugmasini bosing.
3. GitHub yoki Google orqali ro'yxatdan o'ting (siz uchun GitHub tavsiya qilinadi, chunki repo o'sha yerda).

## 1.2. Yangi loyiha yaratish

1. Dashboard'da **"New project"** tugmasini bosing.
2. Maydonlarni to'ldiring:
   - **Organization:** `United Global Consulting` (yoki shaxsiy)
   - **Name:** `united-global-consulting`
   - **Database password:** **kuchli parol** yarating va menejerda saqlang (1Password / Bitwarden). Ushbu parolni hech kimga ko'rsatmang.
   - **Region:** **Frankfurt (eu-central-1)** — Toshkentdan eng yaqini.
   - **Pricing plan:** **Free** (boshlash uchun yetarli).
3. **"Create new project"** — 2 daqiqa kuting.

## 1.3. Database schema'ni ishga tushirish

1. Loyiha ochilgach, chap menyudan **SQL Editor**'ni tanlang.
2. **"+ New query"** tugmasini bosing.
3. Loyihadagi [docs/supabase-schema.sql](./supabase-schema.sql) faylining **butun tarkibini** nusxa oling va SQL editor'ga joylashtiring.
4. **"Run"** tugmasini bosing (yoki `Ctrl+Enter`).
5. Pastda yashil **"Success. No rows returned"** xabari chiqishi kerak.

✅ Bu yerda 2 ta jadval yaratiladi: `leads` (lid'lar) va `newsletter_subscribers` (obuna).

## 1.4. API kalitlarini olish

1. Chap menyu pastida **⚙️ Project Settings** → **API**.
2. Quyidagi 3 ta qiymatni nusxa oling:

| Qiymat | Qaerda topiladi | Maxfiymi? |
|---|---|---|
| **Project URL** | `https://xxx.supabase.co` | ❌ ochiq (NEXT_PUBLIC_) |
| **anon / public key** | `eyJhbGciOi...` (uzun) | ❌ ochiq (NEXT_PUBLIC_) |
| **service_role secret** | `eyJhbGciOi...` (boshqa, **maxfiy!**) | ✅ MAXFIY! |

⚠️ **Diqqat:** `service_role` kalit RLS'ni chetlab o'tadi va to'liq huquqqa ega. **Hech qachon brauzerga, repo'ga, screenshot'ga chiqarmang.**

## 📤 Menga yuborishingiz kerak (1-qadam):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

# 2️⃣ TELEGRAM BOT YARATISH

> **Nima uchun?** Saytdan har lead kelganda menejerlar guruhiga **darhol** xabar keladi. Bu — eng tezkor reaksiya kanali.

## 2.1. Bot yaratish

1. Telegram'da [@BotFather](https://t.me/BotFather) ni qidiring va ochib bering.
2. `/newbot` buyrug'ini yuboring.
3. Bot uchun **ko'rinadigan ism** kiriting: `United Global Leads`
4. **Username** kiriting (oxirida `bot` bo'lishi kerak): `ugc_leads_bot` yoki `ugc_united_bot` (band bo'lsa, boshqasini tanlang).
5. BotFather sizga **token** beradi:
   ```
   Use this token to access the HTTP API:
   123456789:AAH-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
6. ⚠️ Tokenni **menejerga saqlang**, hech kimga ko'rsatmang.

## 2.2. Menejerlar guruhini yaratish

1. Telegram'da yangi **maxfiy guruh** yarating: `UGC Leads`.
2. Kerakli menejerlarni qo'shing.
3. Yuqorida yaratgan botingizni guruhga qo'shing.
4. Botni **administrator** qiling: guruh sozlamalari → Administrators → Add → botni tanlang → "Send messages" huquqini bering.

## 2.3. chat_id ni olish

1. Guruhga **istalgan xabar** yozing (masalan: "test").
2. Brauzerda quyidagi URL'ni oching (TOKEN'ni o'zingiznikiga almashtiring):
   ```
   https://api.telegram.org/bot123456789:AAH-xxxxx/getUpdates
   ```
3. JSON natijada `"chat":{"id":-1001234567890,...}` qatorni toping.
4. **`-1001234567890`** kabi raqam — bu sizning `chat_id`. Manfiy belgi (`-`) bilan birga oling.

⚠️ **Eslatma:** agar `getUpdates` bo'sh JSON qaytarsa, guruhga yana bir xabar yozing va sahifani yangilang.

## 📤 Menga yuborishingiz kerak (2-qadam):

```
TELEGRAM_BOT_TOKEN=123456789:AAH-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHAT_ID=-1001234567890
```

---

# 3️⃣ RESEND POCHTA XIZMATI

> **Nima uchun?** Lead kelganda 2 ta email ketadi: (1) menejerga **bildirishnoma**, (2) mijozga **avtomatik javob** ("biz aloqaga chiqamiz").

## 3.1. Ro'yxatdan o'tish

1. [https://resend.com](https://resend.com) — saytga kiring.
2. **"Sign up"** → GitHub yoki email orqali ro'yxatdan o'ting.
3. Email tasdiqlang.

## 3.2. Domen qo'shish

> ⚠️ Bu qadam uchun sizda `unitedglobal.uz` domeni **bo'lishi kerak**. Agar hali sotib olmagan bo'lsangiz — avval **8-qadam**ni bajaring, keyin shu yerga qayting.
> Domen yo'q bo'lsa, vaqtinchalik Resend'ning sandbox rejimida `onboarding@resend.dev` dan yuborish mumkin (sinov uchun).

1. Resend dashboard → **Domains** → **"Add Domain"**.
2. `unitedglobal.uz` — domeningizni kiriting.
3. Resend sizga **3 ta DNS yozuv** beradi (SPF, DKIM, DMARC):
   - `TXT` yozuv `send` subdomain uchun (SPF)
   - `TXT` yozuv `resend._domainkey` uchun (DKIM)
   - `TXT` yozuv `_dmarc` uchun (DMARC)
4. Domen registratoringiz panelida (uznic.uz / Cloudflare DNS / Vercel) shu yozuvlarni qo'shing.
5. Resend'da **"Verify"** tugmasini bosing — taxminan 5–60 daqiqa.
6. Status **"Verified"** ga aylanganda — domen tayyor.

## 3.3. API kalitini olish

1. Resend dashboard → **API Keys** → **"Create API Key"**.
2. Nom: `production`, **Permission: Full access**, **Domain: unitedglobal.uz** (yoki `All domains`).
3. **"Create"** — sizga **bir martagina ko'rinadigan kalit** beriladi: `re_xxxxxxxxxxxx`.
4. ⚠️ Darhol nusxa oling va menejerga saqlang.

## 3.4. Menejer pochtasi

1. Sizga lead bildirishnomalari qaysi pochta manziliga kelishini hal qiling: masalan `manager@unitedglobal.uz` yoki shaxsiy gmail.
2. Bu pochta **mavjud va ishlaydigan** bo'lishi kerak.

## 📤 Menga yuborishingiz kerak (3-qadam):

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
RESEND_FROM="United Global Consulting <noreply@unitedglobal.uz>"
MANAGER_EMAIL=manager@unitedglobal.uz
```

> ℹ️ Agar domen hali tasdiqlanmagan bo'lsa, vaqtincha `RESEND_FROM="UGC <onboarding@resend.dev>"` qo'ying.

---

# 4️⃣ reCAPTCHA v3 RO'YXATDAN O'TISH

> **Nima uchun?** Spam-bot'lar formani avtomatik to'ldirmasligi uchun. Saytda **ko'rinmaydigan** v3 versiyasi ishlatiladi (foydalanuvchi hech narsa bosmaydi).

## 4.1. Kalitlarni olish

1. [https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create) — saytga kiring (Google akkaunt orqali).
2. Forma to'ldiring:
   - **Label:** `United Global Consulting`
   - **Type:** ⚠️ **reCAPTCHA v3** ni tanlang (v2 emas!)
   - **Domains:** quyidagilarni qo'shing (har birini alohida qatorda):
     ```
     global-consalting.vercel.app
     unitedglobal.uz
     www.unitedglobal.uz
     localhost
     ```
   - **Owners:** sizning emailingiz
   - **Accept terms** — ✅ belgilang.
3. **"Submit"** — sizga 2 ta kalit beriladi:
   - **Site Key** — ochiq, brauzerda ishlatiladi (`6Lc...`)
   - **Secret Key** — maxfiy, server tomonida ishlatiladi (`6Lc...`)

## 📤 Menga yuborishingiz kerak (4-qadam):

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=6LcXXXXXXXXXXXX
```

---

# 5️⃣ GOOGLE ANALYTICS 4 (GA4)

> **Nima uchun?** Saytga kim, qaysi davlatdan, qaysi sahifa orqali kirayapti — barchasini ko'rasiz. Lid yuborish (`generate_lead`) konversiyasi bilan.

## 5.1. Resurs yaratish

1. [https://analytics.google.com](https://analytics.google.com) — kiring.
2. **Admin** (chap-pastda tishli ikona) → **+ Create** → **Account**.
3. Forma:
   - **Account name:** `United Global Consulting`
   - Davom eting → **Property name:** `Website` → Country: `Uzbekistan`, Currency: `UZS` yoki `USD`.
4. Industry: `Education`. Business size: `Small`.
5. **"Create"** → shartlarni qabul qiling.

## 5.2. Web stream qo'shish

1. **Set up a data stream** → **Web** ni tanlang.
2. **Website URL:** `https://global-consalting.vercel.app` (keyin `unitedglobal.uz` ga o'zgartiramiz).
3. **Stream name:** `UGC Web`.
4. **Enhanced measurement: ON** (avtomatik scrolls, clicks, downloads).
5. **"Create stream"**.
6. Tepada **Measurement ID**'ni ko'rasiz: `G-XXXXXXXXXX` — nusxa oling.

## 5.3. Konversiyani sozlash

1. **Admin** → **Events** → **Create event** (yoki shu sahifada `generate_lead` chiqsa).
2. Event name: `generate_lead` ni **Mark as conversion** qiling.

## 📤 Menga yuborishingiz kerak (5-qadam):

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

# 6️⃣ YANDEX METRIKA (UZ-RU bozor uchun)

> **Nima uchun?** O'zbekistonda Yandex GA4'dan yaxshiroq xulq dashboard, **Webvisor** (sessiya yozuvi), **issiqlik xaritasi** beradi.

## 6.1. Hisoblagich yaratish

1. [https://metrika.yandex.com](https://metrika.yandex.com) — Yandex akkaunt bilan kiring.
2. **+ Add counter** → forma:
   - **Counter name:** `UGC Web`
   - **Site URL:** `https://global-consalting.vercel.app`
   - **Webvisor: ON** ✅
   - **Click map: ON** ✅
   - **Track hash: ON** ✅
3. Foydalanuvchi shartnomasini qabul qiling → **"Create counter"**.
4. Counter raqamini nusxa oling (masalan `12345678`).

## 📤 Menga yuborishingiz kerak (6-qadam):

```
NEXT_PUBLIC_YM_ID=12345678
```

---

# 7️⃣ VERCEL ENV VARIABLES QO'SHISH

> **Nima uchun?** Yuqoridagi barcha kalitlarni Vercel deploy serverida xavfsiz saqlash.

## 7.1. Vercel'ga kirish

1. [https://vercel.com](https://vercel.com) — GitHub akkaunt orqali kiring.
2. **`global-consalting`** loyihasini toping.

## 7.2. Environment Variables qo'shish

1. Loyiha → **Settings** → **Environment Variables**.
2. Quyidagi 13 ta o'zgaruvchini bittadan qo'shing.

> ⚠️ Har bir o'zgaruvchi uchun **Production**, **Preview**, **Development** — uchchalasini ham belgilang (faqat `localhost` da test qilsangiz, faqat Development).

| Key | Value (siz menga yuboradiganingiz) | Maxfiymi? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://global-consalting.vercel.app` (yoki domen) | ❌ |
| `NEXT_PUBLIC_SUPABASE_URL` | 1-qadamdagi URL | ❌ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 1-qadamdagi anon key | ❌ |
| `SUPABASE_SERVICE_ROLE_KEY` | 1-qadamdagi service_role | ✅ |
| `RESEND_API_KEY` | 3-qadamdagi `re_...` | ✅ |
| `RESEND_FROM` | `United Global Consulting <noreply@unitedglobal.uz>` | ❌ |
| `MANAGER_EMAIL` | 3-qadamdagi pochta | ❌ |
| `TELEGRAM_BOT_TOKEN` | 2-qadamdagi token | ✅ |
| `TELEGRAM_CHAT_ID` | 2-qadamdagi chat_id | ❌ |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | 4-qadamdagi site key | ❌ |
| `RECAPTCHA_SECRET_KEY` | 4-qadamdagi secret key | ✅ |
| `NEXT_PUBLIC_GA_ID` | 5-qadamdagi `G-XXX...` | ❌ |
| `NEXT_PUBLIC_YM_ID` | 6-qadamdagi raqam | ❌ |

## 7.3. Qayta deploy

1. Env'larni qo'shgach, **Deployments** sahifasiga o'ting.
2. So'nggi deployment yonidagi `⋯` (three dots) → **Redeploy** ni bosing.
3. 1–2 daqiqa kuting — yangi env'lar bilan jonli holatga keladi.

✅ **Tekshirish:** [https://global-consalting.vercel.app/uz](https://global-consalting.vercel.app/uz) ga kirib, formani to'ldiring va yuboring. Telegram guruhingizga lead kelishi va menejerga email kelishi kerak.

---

# 8️⃣ DOMEN `unitedglobal.uz` ULASH

> **Nima uchun?** `global-consalting.vercel.app` — bepul subdomen, ishonchsiz ko'rinadi. **`unitedglobal.uz`** — sizning brendingiz, SEO uchun ham yaxshi.

## 8.1. Domenni sotib olish

1. [https://uznic.uz](https://uznic.uz) (yoki [https://my.tashhost.uz](https://my.tashhost.uz)) — `.uz` zonasi uchun rasmiy registrator.
2. `unitedglobal.uz` mavjudligini tekshiring (taxminan **300 000–400 000 so'm/yil**).
3. Sotib oling — yuridik shaxs uchun STIR (INN) kerak bo'lishi mumkin.

## 8.2. Vercel'ga ulash

1. Vercel → loyiha → **Settings** → **Domains**.
2. **Add** → `unitedglobal.uz` kiriting → **Add**.
3. Vercel sizga 2 ta variant beradi:
   - **Variant A (tavsiya):** Cloudflare orqali (DNS Cloudflare'ga, keyin Vercel'ga ko'rsatiladi).
   - **Variant B (oddiy):** `A` yozuv → `76.76.21.21`.
4. **`www.unitedglobal.uz`** ni ham qo'shing → Redirect to `unitedglobal.uz`.

## 8.3. Domen registratoringizda DNS sozlash (oddiy variant)

uznic.uz panelida DNS bo'limiga o'ting va quyidagilarni qo'shing:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

DNS yangilanishi: **15 daqiqa – 24 soat**.

## 8.4. SSL sertifikati

Vercel **avtomatik** Let's Encrypt SSL sertifikatini chiqaradi (5–60 daqiqa). Hech narsa qilmang, kuting.

## 8.5. Domen ulanganidan keyin

📤 **Menga ayting:** "Domen ulandi, `https://unitedglobal.uz` ishlayapti." Men quyidagilarni yangilayman:
- `NEXT_PUBLIC_SITE_URL` → `https://unitedglobal.uz`
- `vercel.json` da redirect (`global-consalting.vercel.app` → `unitedglobal.uz`)
- `lib/config.ts` da `SITE.url`
- reCAPTCHA va Resend domen ro'yxatiga qo'shish (siz)
- Sitemap qayta yaratish

---

# 9️⃣ KORPORATIV POCHTA `info@unitedglobal.uz`

> **Nima uchun?** Mijozlar `info@unitedglobal.uz` ga yozadi, sayt footer'ida bu pochta ko'rsatilgan.

Ikki variant:

## 9.A. **Bepul** — Cloudflare Email Routing (tavsiya)

> Bu variant: domen Cloudflare'da bo'lishi kerak (8.2 da Variant A'ni tanlasangiz).

1. Cloudflare dashboard → loyiha → **Email** → **Email Routing**.
2. **Get started** → **"Enable Email Routing"** — Cloudflare avtomatik MX yozuvlarini qo'shadi.
3. **Routing rules** → **Custom address**:
   - `info@unitedglobal.uz` → forward to → `sizning@gmail.com` (yoki menejer pochtasi).
   - `manager@unitedglobal.uz` → forward to → menejer pochtasi.
   - `noreply@unitedglobal.uz` → forward to → sizning pochtangiz (Resend faqat yuborish uchun).
4. **Saqlash** — 5 daqiqada faollashadi.

✅ **Sinov:** istalgan pochta'dan `info@unitedglobal.uz` ga email yozing. Sizning gmail'ingizga kelishi kerak.

## 9.B. **Pullik** — Google Workspace ($6/foydalanuvchi/oy)

1. [https://workspace.google.com](https://workspace.google.com) — ro'yxatdan o'ting.
2. Domen tasdiqlang → MX yozuvlarini DNS'ga qo'shing.
3. `info@unitedglobal.uz` foydalanuvchisini yarating.
4. Gmail interfeysida ishlaysiz, lekin korporativ domen bilan.

## 📤 Menga yuborishingiz kerak (9-qadam):

Hech narsa — bu siz uchun. Lekin bajarganingizdan keyin **menga ayting**, men `MANAGER_EMAIL` env'ini yangilab qo'yaman.

---

# 🔟 SEARCH CONSOLE + YANDEX WEBMASTER

> **Nima uchun?** Google va Yandex saytingizni tezroq topadi, sitemap'ni indekslaydi, qanday so'rov bo'yicha kim topayotganini ko'rasiz.

## 10.1. Google Search Console

1. [https://search.google.com/search-console](https://search.google.com/search-console).
2. **Add property** → **Domain** turini tanlang → `unitedglobal.uz` kiriting.
3. Google sizga **TXT yozuv** beradi (`google-site-verification=...`).
4. Domen DNS panelida TXT yozuvni qo'shing.
5. **Verify** — bir necha daqiqada tasdiqlanadi.
6. So'ng: **Sitemaps** → `sitemap.xml` ni qo'shing → **Submit**.

## 10.2. Yandex Webmaster

1. [https://webmaster.yandex.ru](https://webmaster.yandex.ru) — Yandex akkaunt bilan kiring.
2. **+ Add site** → `https://unitedglobal.uz`.
3. Tasdiqlash usuli: **Meta tag** yoki **DNS TXT**.
4. Tasdiqlash kodini menga yuboring (men `app/[locale]/layout.tsx` ga qo'shaman) yoki DNS'ga o'zingiz qo'shing.
5. Tasdiqlangach: **Indexing** → **Sitemap files** → `https://unitedglobal.uz/sitemap.xml` qo'shing.

## 10.3. Bing Webmaster (ixtiyoriy)

1. [https://www.bing.com/webmasters](https://www.bing.com/webmasters) — Microsoft akkaunt bilan.
2. **Import from Google Search Console** — eng oson yo'l (avtomatik o'tkazadi).

## 📤 Menga yuborishingiz kerak (10-qadam):

Agar Yandex/Google meta-tag tasdiqlash usulini tanlasangiz — **`<meta name="..." content="..." />`** qatorini yuboring, men HTML head'ga qo'shaman.

---

# 1️⃣1️⃣ UPTIMEROBOT — APTAYM MONITORING (ixtiyoriy)

> **Nima uchun?** Sayt ishlamay qolsa, **30 sekund** ichida Telegram'da xabar olasiz.

1. [https://uptimerobot.com](https://uptimerobot.com) — bepul ro'yxatdan o'ting.
2. **+ Add New Monitor**:
   - **Type:** HTTP(s)
   - **Friendly Name:** UGC Production
   - **URL:** `https://unitedglobal.uz`
   - **Monitoring Interval:** 5 minutes
3. **Alert Contacts** → **Add Alert Contact** → **Telegram** → bot orqali ulanishni amalga oshiring.
4. Yangi monitor'ga shu Telegram alert'ni biriktiring.

✅ Endi sayt 5 daqiqada bir tekshiriladi, agar tushib qolsa — Telegram'ga xabar.

---

# 1️⃣2️⃣ YURIDIK HUJJATLARNI YANGILASH

> **Nima uchun?** O'zbekiston qonunlariga ko'ra, shaxsiy ma'lumot to'plagan har qanday sayt **maxfiylik siyosatiga** ega bo'lishi kerak. Hozir shablon ma'lumotlar ishlatilgan.

## 12.1. Qaysi joylarda yangilash kerak?

`messages/uz.json`, `messages/ru.json`, `messages/en.json` fayllarda:

- **Yuridik nom:** masalan, `MChJ "United Global Consulting"` yoki `YaTT Karimberdiyev Sh.`
- **STIR (INN):** sizning soliq raqamingiz
- **Yuridik manzil:** ofis manzili (Toshkent shahar, ko'cha, uy raqami)
- **Email yuridik so'rovlar uchun:** `legal@unitedglobal.uz` yoki `info@unitedglobal.uz`
- **Telefon:** `+998 88 526 30 00` (allaqachon to'g'ri)
- **Faoliyat boshlangan sana:** `2026-yil`

## 12.2. Privacy va Terms sahifalarida ko'rsatilishi kerak

- Qanday shaxsiy ma'lumot to'playdi (ism, telefon, email).
- Qanday ishlatiladi (faqat konsultatsiya uchun).
- Kim bilan ulashiladi (hech kim — yoki Supabase/Resend/Telegram tashqi xizmatlari).
- Saqlash muddati (lid sifatida 5 yil).
- Foydalanuvchi huquqlari (o'chirishni so'rash).
- DPO email (`info@unitedglobal.uz`).

## 📤 Menga yuborishingiz kerak (12-qadam):

```
Yuridik nom: ____________________
STIR (INN):  ____________________
Manzil:      ____________________
DPO email:   ____________________
Faoliyat boshlanish sanasi: __________
```

Men shu ma'lumotlarni `privacy` va `terms` sahifalarini uchchala tilda yangilab beraman.

---

# 🟢 YAKUNIY TEKSHIRUV (smoke-test)

Hamma qadamlar bajarilgach, **siz** quyidagilarni tekshiring:

## Sayt funksional sinov

1. [https://unitedglobal.uz](https://unitedglobal.uz) ochiladimi? ✅
2. Tilni almashtiring: UZ → RU → EN — har biri ishlaydimi?
3. Kontakt formasini to'ldiring va yuboring:
   - Telegram guruhga **bildirishnoma** keldimi?
   - Menejer pochtasiga **email** keldimi?
   - Sizning pochtangizga **avtojavob** keldimi (agar email kiritsangiz)?
   - Supabase'da `leads` jadvalida **yangi qator** paydo bo'ldimi?
4. WhatsApp tugmasini bosing — to'g'ri raqamga ochiladimi?
5. Kalkulyatorni ishlating — narx hisoblanadimi?
6. Quiz'ni o'ynang — natija beriladimi?
7. Davlat sahifasiga kiring (masalan, Koreya) — to'liq ma'lumot ko'rinadimi?
8. Mobil telefonda sayt yaxshi ko'rinadimi?
9. PWA o'rnatish (Chrome address bar dagi install ikonasi) ishlaydimi?
10. GA4 → **Realtime** ga kirib, sayt ochsangiz, sizni "1 user" deb ko'rsatadimi?

## SEO/xavfsizlik tekshiruvlari

- [https://securityheaders.com/?q=https://unitedglobal.uz](https://securityheaders.com/?q=https://unitedglobal.uz) → **A+** olishi kerak.
- [https://www.ssllabs.com/ssltest/analyze.html?d=unitedglobal.uz](https://www.ssllabs.com/ssltest/analyze.html?d=unitedglobal.uz) → **A+**.
- [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results) — JSON-LD strukturasi to'g'rimi?
- Lighthouse (Chrome DevTools): Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO = 100.

## Agar biron narsa ishlamasa

📤 **Menga aniq xabar yuboring:**
- Qaysi qadamda turibman?
- Ekran ko'rinishi (screenshot)
- Xato xabari (agar bor bo'lsa)
- Brauzer DevTools → Console'dagi qizil xatolar

Men diagnostika qilib, tuzataman.

---

# 📞 TEZ KO'RSATKICH (qisqa qabul qog'ozi)

Hamma narsani bajarganingizdan keyin menga **bitta xabar** orqali yuboring (qulaylik uchun):

```
=== UGC PRODUCTION SOZLAMALARI ===

[1] SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

[2] TELEGRAM
TELEGRAM_BOT_TOKEN=123456789:AAH-...
TELEGRAM_CHAT_ID=-1001234567890

[3] RESEND
RESEND_API_KEY=re_...
RESEND_FROM=United Global Consulting <noreply@unitedglobal.uz>
MANAGER_EMAIL=manager@unitedglobal.uz

[4] reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...

[5] GOOGLE ANALYTICS
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

[6] YANDEX METRIKA
NEXT_PUBLIC_YM_ID=12345678

[7] DOMEN STATUSI
unitedglobal.uz: ulandi / ulanmadi
www.unitedglobal.uz: redirect / ?

[8] YURIDIK
Yuridik nom: ...
STIR: ...
Manzil: ...
DPO email: ...
```

Shundan keyin men hammani bir vaqtda Vercel env'larga, kodga, va deploy'ga joylashtiraman. **Production tayyor bo'ladi.**

---

# 🎯 PRIORITETLAR (agar vaqt cheklangan bo'lsa)

Agar hammasini bir kunda qila olmasangiz, **shu tartibda** boring:

| Daraja | Qadamlar | Ta'sir |
|---|---|---|
| 🔴 **Bugun (1 soat)** | 1, 2, 4, 7 | Forma ishlaydi, lid keladi |
| 🟡 **Ertaga (1 soat)** | 3, 5, 6 | Pochta + analitika |
| 🟢 **1 hafta ichida** | 8, 9, 10 | Domen + SEO |
| 🔵 **Keyin** | 11, 12 | Monitoring + huquqiy |

---

**Tayyor bo'lganingizda menga yozing — boshlaymiz.** 🚀
