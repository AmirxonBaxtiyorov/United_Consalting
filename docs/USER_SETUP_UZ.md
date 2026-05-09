# 📋 SIZ HALI QILISHINGIZ KERAK BO'LGAN ISHLAR

> **Status:** kalitlar olingan ✅ — saytni production rejimga o'tkazish qoldi.
> **Stack:** Next.js 16 + Vercel + Supabase + Resend + Telegram + reCAPTCHA + GA4 + Yandex Metrika.
> **Til:** o'zbekcha (latin).

Sayt allaqachon `https://global-consalting.vercel.app` da jonli, formani sinab ko'rdim — `200 OK` qaytaryapti. Lekin **hali bir nechta muhim qadam qolgan**, ularsiz forma haqiqiy lid qabul qilmaydi va sayt to'liq professional ko'rinishga ega bo'lmaydi.

---

## 🚦 PRIORITET XARITASI

| Daraja | Vazifalar | Vaqt | Ta'sir |
|---|---|---|---|
| 🔴 **DARHOL** (1 soat) | A1, A2, A3 | Forma jonli ishlasin |
| 🟠 **TEZ** (1–2 kun) | B1, B2 | Domen + brending |
| 🟡 **KEYIN** (1 hafta) | C1, C2, C3, C4 | SEO + email + monitoring |
| 🟢 **OXIRIDA** (2 hafta+) | D1, D2, D3 | Yuridik + xavfsizlik |

---

# 🔴 DARHOL QILISH KERAK (eng muhim)

## A1 — Telegram CHAT_ID ni TUZATISH

> ⚠️ **Muammo:** hozirgi `TELEGRAM_CHAT_ID=6295164527` — bu **sizning shaxsiy chat'ingiz** ID'si, guruh emas. Lid'lar **faqat sizga shaxsan** keladi, menejerlar bilan birga ishlash uchun **guruh chat_id** kerak.

### Qadamlar:

**Variant A — guruh ishlatmoqchi bo'lsangiz (tavsiya)**

1. Telegram'da yangi maxfiy guruh oching: `UGC Leads`
2. O'z menejerlaringizni qo'shing
3. Botingizni (`@your_bot_name`) guruhga qo'shing
4. Botni **administrator** qiling:
   - Guruh sozlamalari → Administrators → Add Admin → botingizni tanlang
   - Faqat **"Send Messages"** ruxsatini bering (boshqalarni o'chiring)
5. Guruhga **istalgan xabar** yozing: "test"
6. Brauzerda oching (`<TOKEN>` o'rniga `.env.local` dagi `TELEGRAM_BOT_TOKEN` qiymatini qo'ying):
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
7. JSON natijada `"chat":{"id":-100xxxxxxxxxx, ...}` ni toping. **Manfiy belgi bilan** qatorni nusxa oling.
8. **Variant B'ga o'ting yoki menga aniq raqamni yuboring** (men `.env.local` va Vercel'da yangilayman).

**Variant B — shaxsiy chat'ni qoldirish**

Agar lid'lar faqat sizga kelishi yetarli bo'lsa, hech nima qilmang. Hozirgi `6295164527` ishlaydi. Lekin keyin menejer qo'shish qiyin bo'ladi.

### 📤 Menga yuborish:

```
TELEGRAM_CHAT_ID=-1001234567890
```

(yoki "shaxsiyni qoldiraman" deb ayting)

---

## A2 — Vercel'da Environment Variables borligini TEKSHIRISH

> ⚠️ **Nima uchun?** `.env.local` faqat sizning kompyuteringizda. Vercel'da (jonli sayt) bu o'zgaruvchilarni alohida qo'shish kerak. Agar yo'q bo'lsa — Supabase'ga lid yozilmaydi, email yuborilmaydi, Telegram xabarsiz qoladi.

### Qadamlar:

1. [https://vercel.com](https://vercel.com) — kiring
2. **`global-consalting`** loyihasini oching
3. **Settings** → **Environment Variables**
4. Quyidagi 13 ta o'zgaruvchi **mavjudligini** tekshiring:

| # | Key | Sizning qiymatingiz qayerdan? |
|---|---|---|
| 1 | `NEXT_PUBLIC_SITE_URL` | `https://global-consalting.vercel.app` |
| 2 | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| 3 | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → API → anon |
| 4 | `SUPABASE_SERVICE_ROLE_KEY` | Supabase → API → service_role |
| 5 | `RESEND_API_KEY` | Resend → API Keys |
| 6 | `RESEND_FROM` | `United Consulting <onboarding@resend.dev>` (vaqtinchalik) |
| 7 | `MANAGER_EMAIL` | sizning gmail (vaqtincha amrxonn.baxtiyorov@gmail.com) |
| 8 | `TELEGRAM_BOT_TOKEN` | BotFather token |
| 9 | `TELEGRAM_CHAT_ID` | A1 dan to'g'rilangan |
| 10 | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA admin |
| 11 | `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA admin |
| 12 | `NEXT_PUBLIC_GA_ID` | `G-4N4E66TJQ1` |
| 13 | `NEXT_PUBLIC_YM_ID` | `108705694` |

5. Har bir o'zgaruvchini qo'shganda **3 ta katakcha** ham belgilangan bo'lsin:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. **Agar biror o'zgaruvchi yo'q bo'lsa** — **+ Add Variable** orqali qo'shing va menga **qaysi yo'q ekanini ayting**, men `.env.local` va Vercel uchun aniq qiymatlarni tayyorlay olaman.

7. Qo'shgandan so'ng: **Deployments** → so'nggi deploy yonida `⋯` → **Redeploy**.

### 📤 Menga yuborish:

```
Vercel env vars: hammasi sozlangan / [Y, X, Z] yo'q
Redeploy bajarildi: ha / yo'q
```

---

## A3 — Lid sinab ko'rish (smoke-test)

> Vercel deploy va env'lar to'liq bo'lganini tekshirish uchun.

### Qadamlar:

1. [https://global-consalting.vercel.app/uz](https://global-consalting.vercel.app/uz) ni telefonda yoki incognito brauzerda oching
2. Pastki **Aloqa** formasini to'ldiring:
   - Ism: `Test User`
   - Telefon: `+998 90 123 45 67`
   - Email: o'zingizniki
   - Davlat: Koreya
   - Xabar: "Smoke test"
   - ✅ Roziman katakcha
3. **Yuborish** ni bosing
4. Tekshiring:
   - ✅ "Rahmat" xabari ko'rinadimi?
   - ✅ Telegram'ga lid keldimi (sizga shaxsan yoki guruhga)?
   - ✅ Email manzilingizga **avtojavob** keldimi?
   - ✅ Menejer email manziliga **bildirishnoma** keldimi?
   - ✅ Supabase → Table Editor → `leads` jadvalida yangi qator paydo bo'ldimi?

### 📤 Menga yuborish:

```
Sinov natijalari:
- Telegram: ✅/❌
- Email avtojavob: ✅/❌  
- Menejer email: ✅/❌
- Supabase qator: ✅/❌
```

---

# 🟠 TEZ QILISH (1–2 kun)

## B1 — Domen `unitedglobalconsulting.uz` sotib olish

> **Nima uchun?** `global-consalting.vercel.app` — vaqtinchalik subdomen. Mijozlar `unitedglobalconsulting.uz` ni ko'rsa, ishonchliroq bo'ladi. SEO uchun ham asosiy.

### Qadamlar:

1. [https://uznic.uz](https://uznic.uz) (yoki [https://my.tashhost.uz](https://my.tashhost.uz)) ga kiring
2. **`unitedglobalconsulting.uz`** mavjudligini tekshiring (~300 000–400 000 so'm/yil)
3. Sotib oling — `.uz` zonasi uchun **STIR (INN)** kerak bo'ladi (yuridik shaxs uchun) yoki shaxsiy passport
4. Pul to'lash → domen ro'yxatdan o'tkazish (1–24 soat ichida faollashadi)

### 📤 Menga yuborish:

```
Domen sotib olindi: ha / yo'q
unitedglobalconsulting.uz registratoringiz: uznic.uz / boshqa
```

---

## B2 — Domenni Vercel'ga ULASH

> Domen sotib olingandan keyin.

### Qadamlar:

1. **Vercel:**
   - Loyiha → **Settings** → **Domains** → **Add**
   - `unitedglobalconsulting.uz` kiriting → **Add**
   - Vercel sizga ikki variant beradi — quyidagisini tanlang:
   - **`A` yozuv** variant (oddiyroq):
     - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Yoki **`CNAME`** variant (Cloudflare orqali ulashda)

2. **uznic.uz panelida DNS sozlash:**
   - Login qiling → domen → **DNS Management** (yoki shunga o'xshash)
   - Quyidagi yozuvlarni qo'shing:

   | Type | Name | Value | TTL |
   |---|---|---|---|
   | `A` | `@` | `76.76.21.21` | 3600 |
   | `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

3. **Vercel'da `www`'ni redirect qiling:**
   - Settings → Domains → `www.unitedglobalconsulting.uz` qo'shing
   - Redirect to: `unitedglobalconsulting.uz` (status 308)

4. **DNS yangilanishini kuting** — 15 daqiqa – 24 soat. Tekshirish:
   ```
   nslookup unitedglobalconsulting.uz
   ```
   Vercel IP'si (`76.76.21.21`) ko'rinishi kerak.

5. **SSL sertifikatini kuting** — Vercel avtomatik Let's Encrypt chiqaradi (5–60 daqiqa).
6. `https://unitedglobalconsulting.uz` ochiladimi tekshiring.

### 📤 Menga yuborish:

```
Domen ulandi: ha / yo'q
https://unitedglobalconsulting.uz ochiladi: ha / yo'q
```

Men shundan keyin quyidagilarni avtomat yangilayman:
- `NEXT_PUBLIC_SITE_URL` → `https://unitedglobalconsulting.uz` (Vercel + lib/config)
- `vercel.json` da redirect (`global-consalting.vercel.app` → `unitedglobalconsulting.uz`)
- Sitemap qayta yaratiladi
- OpenGraph, hreflang yangilanadi

---

# 🟡 KEYINGI HAFTA (domen ulangach)

## C1 — Resend'da `unitedglobalconsulting.uz` ni VERIFY qilish

> **Hozir:** `RESEND_FROM=onboarding@resend.dev` — sandbox rejimda **faqat sizning gmail'ingizga** xat boradi. Boshqa mijozlar avtojavob ololmaydi.
> **Maqsad:** `noreply@unitedglobalconsulting.uz` dan istalgan mijozga xat yuborish.

### Qadamlar:

1. [https://resend.com/domains](https://resend.com/domains) ga kiring
2. **+ Add Domain** → `unitedglobalconsulting.uz` → **Add**
3. Resend sizga **3 ta DNS yozuv** beradi:
   - `TXT` `send` subdomain uchun (SPF — `v=spf1 ...`)
   - `TXT` `resend._domainkey` uchun (DKIM — `p=MIGfMA0GCSqGSIb...`)
   - `TXT` `_dmarc` uchun (DMARC — `v=DMARC1; p=none; ...`)
4. uznic.uz panelida **shu 3 ta TXT yozuvni** qo'shing (har biri alohida).
5. Resend'da **"Verify"** ni bosing — 5–60 daqiqa.
6. Status **"Verified"** ✅ ga o'tganini ko'rasiz.

### 📤 Menga yuborish:

```
Resend domen verified: ha / yo'q
```

Shundan keyin men `RESEND_FROM=United Consulting <noreply@unitedglobalconsulting.uz>` ga yangilayman.

---

## C2 — `info@unitedglobalconsulting.uz` korporativ pochta (Cloudflare Email Routing — BEPUL)

> Saytda `info@unitedglobalconsulting.uz` ko'rsatilgan, lekin u hali mavjud emas. Bepul Cloudflare Email Routing orqali sozlaymiz.

### Qadamlar:

1. **Cloudflare'da sayt qo'shish (agar yo'q bo'lsa):**
   - [https://dash.cloudflare.com](https://dash.cloudflare.com) → ro'yxatdan o'ting (bepul)
   - **+ Add a Site** → `unitedglobalconsulting.uz` → **Free plan**
   - Cloudflare sizga **2 ta nameserver** beradi (masalan `dana.ns.cloudflare.com`)
   - uznic.uz panelida nameserver'larni Cloudflare'ga o'zgartiring (yoki uznic'da MX yozuvini to'g'ridan-to'g'ri qo'shing — keyingi qadam)

2. **Cloudflare Email Routing yoqish:**
   - Loyiha → **Email** → **Email Routing** → **Get started**
   - Cloudflare avtomatik MX + TXT yozuvlarini qo'shadi (agar nameserver'lar Cloudflare'da bo'lsa).
   - Agar uznic'da qoldirsangiz — Cloudflare bergan MX yozuvlarini qo'lda qo'shing:

| Type | Name | Value | Priority |
|---|---|---|---|
| `MX` | `@` | `route1.mx.cloudflare.net` | 10 |
| `MX` | `@` | `route2.mx.cloudflare.net` | 20 |
| `MX` | `@` | `route3.mx.cloudflare.net` | 30 |
| `TXT` | `@` | `v=spf1 include:_spf.mx.cloudflare.net ~all` | — |

3. **Custom address yaratish:**
   - **Routing rules** → **Create address**:
     - `info@unitedglobalconsulting.uz` → forward to → sizning gmail (`amrxonn.baxtiyorov@gmail.com`)
     - `manager@unitedglobalconsulting.uz` → forward to → menejer gmail
     - `noreply@unitedglobalconsulting.uz` → forward to → sizning gmail (Resend yuborgan, javob shu yerga keladi)

4. Forward'ni **gmail'ingizda tasdiqlang** (Cloudflare confirm xatini yuboradi).

5. **Sinab ko'ring:** istalgan pochtadan `info@unitedglobalconsulting.uz` ga xat yozing → gmail'ingizga kelishi kerak.

### 📤 Menga yuborish:

```
info@unitedglobalconsulting.uz: ishlaydi / yo'q
manager@unitedglobalconsulting.uz: ishlaydi / yo'q
```

Men shundan keyin `MANAGER_EMAIL` ni `manager@unitedglobalconsulting.uz` ga yangilayman.

---

## C3 — reCAPTCHA va GA4'da yangi domen qo'shish

> Domen ulangach, reCAPTCHA "this domain is not in your whitelist" xatosini bermasligi va GA4 to'g'ri sayt URL'ini ko'rsatishi uchun.

### Qadamlar:

**reCAPTCHA admin:**

1. [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin) → United Consulting site'ni oching
2. **⚙️ Settings** → **Domains** ro'yxatiga qo'shing:
   ```
   unitedglobalconsulting.uz
   www.unitedglobalconsulting.uz
   ```
3. **Save**.

**Google Analytics 4:**

1. [https://analytics.google.com](https://analytics.google.com) → loyiha
2. **Admin** → **Data Streams** → mavjud stream'ni oching
3. **Stream URL** ni `https://unitedglobalconsulting.uz` ga o'zgartiring
4. **Save**.

**Yandex Metrika:**

1. [https://metrika.yandex.com](https://metrika.yandex.com) → counter
2. **Settings** → **Counter address** → `unitedglobalconsulting.uz`, `www.unitedglobalconsulting.uz` qo'shing
3. **Save**.

### 📤 Menga yuborish:

```
reCAPTCHA domen qo'shildi: ✅
GA4 stream URL yangilandi: ✅
YM counter address yangilandi: ✅
```

---

## C4 — Search Console + Yandex Webmaster + Bing

> SEO uchun birinchi va eng muhim qadam.

### C4.1 Google Search Console

1. [https://search.google.com/search-console](https://search.google.com/search-console)
2. **+ Add property** → **Domain** turini tanlang → `unitedglobalconsulting.uz`
3. Google sizga **TXT yozuv** beradi: `google-site-verification=AbCdEf...`
4. uznic / Cloudflare DNS panelida bu TXT'ni qo'shing
5. **Verify** → bir necha daqiqa
6. **Sitemaps** → `https://unitedglobalconsulting.uz/sitemap.xml` qo'shing → **Submit**
7. Bir hafta kuting — Google sahifalarni indekslay boshlaydi

### C4.2 Yandex Webmaster

1. [https://webmaster.yandex.ru](https://webmaster.yandex.ru)
2. **+ Add site** → `https://unitedglobalconsulting.uz`
3. Tasdiqlash usuli: **Meta tag** (oson) yoki **DNS TXT** (xavfsizroq)
4. **Meta tag** tanlasangiz — kodni menga yuboring (`<meta name="yandex-verification" content="..." />`), men HTML head'ga qo'shaman
5. Tasdiqlangach: **Indexing** → **Sitemap files** → `https://unitedglobalconsulting.uz/sitemap.xml` qo'shing

### C4.3 Bing Webmaster (ixtiyoriy)

1. [https://www.bing.com/webmasters](https://www.bing.com/webmasters) → Microsoft akkaunt
2. **Import from Google Search Console** — eng oson
3. Avtomatik o'zi sitemap'ni oladi

### 📤 Menga yuborish:

```
Google Search Console verify TXT (yoki ✅ tugagani)
Yandex Webmaster meta tag (agar ishlatsangiz)
Sitemap submitted: GSC ✅, YW ✅
```

---

## C5 — GA4'da `generate_lead` konversiyasi

> Sayt allaqachon shu eventni yuboryapti (kontakt formasi), faqat GA4'da uni "konversiya" deb belgilash kerak.

### Qadamlar:

1. [https://analytics.google.com](https://analytics.google.com) → loyiha
2. **Admin** → **Events**
3. `generate_lead` event'ini toping (1–2 kun ichida ko'rinadi, agar lid yuborilgan bo'lsa)
4. **"Mark as conversion"** togglini yoqing

Endi GA4'da: **Reports → Engagement → Conversions** sahifasida har bir lid hisobga olinadi.

---

# 🟢 KEYIN (2 hafta ichida)

## D1 — UptimeRobot monitoring (10 daqiqa, BEPUL)

> Sayt tushib qolsa, **5 daqiqada** Telegram'da xabar olasiz.

### Qadamlar:

1. [https://uptimerobot.com](https://uptimerobot.com) → ro'yxatdan o'ting
2. **+ Add New Monitor:**
   - Type: `HTTP(s)`
   - Name: `UGC Production`
   - URL: `https://unitedglobalconsulting.uz` (yoki hozircha `https://global-consalting.vercel.app`)
   - Interval: `5 minutes`
3. **Alert Contacts** → **+ Add Alert Contact** → **Telegram**:
   - Bot orqali ulang (UptimeRobot bot)
   - O'zingizning shaxsiy chat'ingizni tanlang
4. Yangi monitor'ga shu Telegram alert'ni biriktiring.
5. Sinov: monitor'ni "Pause" qilib ko'ring → Telegram'ga "DOWN" xabari kelishi kerak.

### 📤 Menga yuborish: hech narsa, faqat o'zingiz uchun.

---

## D2 — Yuridik ma'lumotlarni TO'PLASH

> `privacy.html` va `terms.html` sahifalari hozir umumiy shablon. Real ma'lumotlar bilan to'ldirilishi kerak.

### Sizdan kerakli ma'lumotlar:

```
Yuridik shakl: MChJ / YaTT / Boshqa: ___________
Yuridik nom:   _________________________________
STIR (INN):    _________________________________
Yuridik manzil: ________________________________
                _________________________________
Faoliyat boshlangan sana: ______________________
Bank rekvizitlari (ixtiyoriy): _________________

DPO (Data Protection Officer) email: ___________
   (kim shaxsiy ma'lumotlar bo'yicha javob beradi)

Faoliyat litsenziyasi (agar bor):  _____________
```

### 📤 Menga yuborish: yuqoridagi forma to'ldirilgan holda.

Men shundan keyin `messages/uz.json`, `ru.json`, `en.json` va privacy/terms sahifalarini uchchala tilda yangilayman.

---

## D3 — XAVFSIZLIK: 2FA + parol menejer

> ⚠️ **Juda muhim:** sizning barcha kalitlaringiz `.env.local` fayl + bu akkauntlar orqali boshqariladi. Akkauntdan oqsa — hammasi yo'qoladi.

### 2FA yoqing (har birida):

| Servis | Sozlama joyi |
|---|---|
| **GitHub** | Settings → Password and authentication → Two-factor authentication |
| **Vercel** | Account Settings → Security → 2FA |
| **Cloudflare** | My Profile → Authentication → Two-Factor Authentication |
| **Google** (GA4 / Analytics akkaunt) | myaccount.google.com → Security → 2-Step Verification |
| **Resend** | Settings → Two-Factor Authentication |
| **Supabase** | Account → Security → MFA |
| **Telegram** | Settings → Privacy and Security → Two-Step Verification |

**Backup kodlarni** (recovery codes) bosma chiqarib, kassada/seyfda saqlang.

### Parol menejer:

- **Bitwarden** (bepul, ochiq kod) — tavsiya
- **1Password** ($3/oy)
- **Apple Passwords** (faqat Apple)

Yuqoridagi barcha akkauntlar va `.env.local` ichidagi tokenlar — **hammasini menejerga ko'chiring**. `.env.local` faylini hech qachon git/email/chat'da yubormang (gitignore'da ham bor).

### 📤 Menga yuborish: hech narsa, faqat o'zingiz uchun.

---

# 🔵 KEYINGI 3 OYDA

## E1 — HSTS Preload submission

> Brauzerlar (Chrome, Firefox, Safari) sizning saytingizni **majburan HTTPS**'ga yo'naltiradi. Bu xavfsizlik darajasini oshiradi.

> Shart: domen Vercel'da kamida 90 kun bo'lishi va HSTS header `max-age ≥ 31536000` (allaqachon shunday — `vercel.json`'da `63072000`).

1. [https://hstspreload.org](https://hstspreload.org)
2. `unitedglobalconsulting.uz` kiriting
3. Tekshirgich avtomatik test qiladi
4. ✅ "Status: Eligible" bo'lsa — **Submit**
5. 6–12 hafta ichida brauzerlarning preload list'iga kiradi

---

## E2 — Backup'lar

### Oylik:

- **Supabase:** Dashboard → Database → Backups → Download (CSV/SQL)
  - yoki: SQL editor → `select * from leads` → CSV export
- **Telegram chat:** Telegram Desktop → guruh sozlamalari → **Export chat history** → JSON
- **GitHub:** allaqachon tarmoqda saqlanadi (push'lar)

### Yiliga:

- Cloudflare Email Routing log: dashboard → Email → Activity log → Export
- Resend logs: dashboard → Logs → Export
- GA4: Admin → Account → Data Settings → Data Retention → 14 oy (max)

---

# 📞 YAKUNIY TEZ KO'RSATKICH

Hamma narsa tugagach, men quyidagilarni jonli holatda tekshiraman:

| # | Tekshiruv | Qayerda |
|---|---|---|
| 1 | Sayt 200 OK | curl https://unitedglobalconsulting.uz |
| 2 | SSL A+ | ssllabs.com/ssltest |
| 3 | Security headers A+ | securityheaders.com |
| 4 | Mozilla Observatory A+ | observatory.mozilla.org |
| 5 | Schema.org valid | search.google.com/test/rich-results |
| 6 | Lighthouse 95+/95+/95+/100 | DevTools → Lighthouse |
| 7 | GA4 Realtime ko'rinadi | analytics.google.com → Realtime |
| 8 | Yandex Metrika ko'rinadi | metrika.yandex.com → Reports |
| 9 | reCAPTCHA score 0.7+ | Reports → Site verifications |
| 10 | Forma → Telegram + Email + Supabase | jonli sinov |

---

# ⚡ BIRINCHI SOATDA QILINADIGAN ISH

Agar **bugun** faqat 1 soat vaqtingiz bo'lsa, shuni qiling:

1. **A1** — Telegram CHAT_ID muammosi (10 daqiqa)
2. **A2** — Vercel env vars tekshirish (15 daqiqa)
3. **A3** — Lid sinab ko'rish (5 daqiqa)
4. **B1** — Domenni sotib olish (15 daqiqa, qolgan kutish — DNS)
5. **D3** — 2FA hamma joyda (15 daqiqa)

Shuning natijasi: bugun saytingiz **haqiqiy lid yig'a boshlaydi**, ertaga domen faollashadi, ertaga keyingi haftaga to'liq production tayyor bo'ladi.

---

**Boshlaganingizda menga ayting** — har bir qadamda yordam beraman, kalitlarni `.env.local` va Vercel'ga joylashtiraman, kod tomondan barcha keyingi sozlamalarni o'zim qilaman. 🚀
