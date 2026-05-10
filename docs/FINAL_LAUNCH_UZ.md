# 🚀 LOYIHANI 100% TUGATISH — TO'LIQ QADAMA-QADAM YO'RIQNOMA

> **Sayt:** [https://unitedglobalconsulting.uz](https://unitedglobalconsulting.uz)
> **Status:** sayt jonli, forma ishlayapti, domen ulangan ✅
> **Qoldi:** Resend domen, pochta, SEO, yuridik, monitoring va xavfsizlik

Bu fayl **15 qism**dan iborat. **Ketma-ket** bajaring — birini tugatmasdan keyingisiga o'tmang. Har bir qadam **qaysi sayt → qaysi tugma → nima yozish**ni aniq ko'rsatadi.

---

## 📑 TARKIB

| # | Qism | Vaqt | Daraja |
|---|---|---|---|
| 1 | Vercel'da ENV o'zgaruvchilarni tekshirish | 15 daq | 🔴 Majburiy |
| 2 | Resend'da domen verifikatsiyasi | 30 daq + DNS | 🔴 Majburiy |
| 3 | `info@unitedglobalconsulting.uz` pochta sozlash | 20 daq | 🔴 Majburiy |
| 4 | reCAPTCHA admin'ga yangi domen qo'shish | 5 daq | 🔴 Majburiy |
| 5 | GA4 stream URL'ni yangilash | 5 daq | 🟠 Tavsiya |
| 6 | Yandex Metrika — counter address | 5 daq | 🟠 Tavsiya |
| 7 | Google Search Console | 15 daq | 🟠 Tavsiya |
| 8 | Yandex Webmaster | 15 daq | 🟠 Tavsiya |
| 9 | Bing Webmaster | 5 daq | 🟢 Ixtiyoriy |
| 10 | Telegram CHAT_ID (guruh) | 10 daq | 🟢 Ixtiyoriy |
| 11 | Yuridik ma'lumotlar | 30 daq | 🟠 Tavsiya |
| 12 | UptimeRobot monitoring | 10 daq | 🟢 Ixtiyoriy |
| 13 | 2FA + parol menejer | 30 daq | 🔴 Majburiy |
| 14 | HSTS Preload (3 oy keyin) | 5 daq | 🟢 Ixtiyoriy |
| 15 | Yakuniy smoke-test | 15 daq | 🔴 Majburiy |

**Jami vaqt:** ~3.5 soat (DNS kutish vaqtisiz)

---

## 🗝 API VA KEY'LARNI QAYERGA JOYLASH — UMUMIY SXEMA

Sizda **3 ta joy** mavjud, har bir kalit aniq joyga boradi:

| Joy | Maqsad | Kim ko'radi? |
|---|---|---|
| **`.env.local`** (sizning kompyuteringiz) | Faqat `npm run dev` uchun | Faqat siz |
| **Vercel → Settings → Environment Variables** | Production sayt uchun | Vercel server |
| **Cloudflare/aHost DNS yozuvlari** | Domen verifikatsiya uchun | Tashqi servislar |

**Qoida:**
- Maxfiy kalitlar (`*_SECRET`, `SERVICE_ROLE`) — **faqat** `.env.local` va Vercel'da
- Public kalitlar (`NEXT_PUBLIC_*`) — `.env.local`, Vercel'da, va ham brauzerda ko'rinadi (bu normal)
- DNS yozuvlari — aHost.uz panelida

---

# 1️⃣ VERCEL'DA ENV O'ZGARUVCHILARNI TEKSHIRISH

> **Maqsad:** sayt jonli ishlayotgan, lekin barcha 13 ta o'zgaruvchi to'g'ri qo'yilganligini tasdiqlash.

## 1.1. Vercel'ga kiring

1. [https://vercel.com](https://vercel.com) — kiring
2. Loyiha ro'yxatidan **`united-consalting`** ni tanlang
3. Yuqori menyu: **Settings**
4. Chap menyu: **Environment Variables**

## 1.2. 13 ta o'zgaruvchini tekshiring

Quyidagi har bir qator mavjudligini ko'ring. Agar **yo'q** bo'lsa — yashil **Add New** tugmasini bosib qo'shing.

| # | Key (nom) | Value (qiymat) | Maxfiymi? |
|---|---|---|---|
| 1 | `NEXT_PUBLIC_SITE_URL` | `https://unitedglobalconsulting.uz` | ❌ Ochiq |
| 2 | `NEXT_PUBLIC_SUPABASE_URL` | Supabase loyihangiz URL'i | ❌ Ochiq |
| 3 | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ❌ Ochiq |
| 4 | `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key | ✅ MAXFIY |
| 5 | `RESEND_API_KEY` | `re_8BSXcAJN...` | ✅ MAXFIY |
| 6 | `RESEND_FROM` | `United Consulting <onboarding@resend.dev>` (hozircha) | ❌ Ochiq |
| 7 | `MANAGER_EMAIL` | `amrxonn.baxtiyorov@gmail.com` | ❌ Ochiq |
| 8 | `TELEGRAM_BOT_TOKEN` | `8652158623:AAH...` | ✅ MAXFIY |
| 9 | `TELEGRAM_CHAT_ID` | `6295164527` (yoki guruh ID) | ❌ Ochiq |
| 10 | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | `6LeVbsMs...` | ❌ Ochiq |
| 11 | `RECAPTCHA_SECRET_KEY` | `6LeVbsMs...` | ✅ MAXFIY |
| 12 | `NEXT_PUBLIC_GA_ID` | `G-4N4E66TJQ1` | ❌ Ochiq |
| 13 | `NEXT_PUBLIC_YM_ID` | `108705694` | ❌ Ochiq |

## 1.3. Har bir o'zgaruvchini qo'shganingizda

**Environments** bo'limida **hammasi belgilangan** bo'lsin:
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

So'ng **Save** tugmasini bosing.

## 1.4. Qayta deploy

1. Yuqori menyu: **Deployments**
2. So'nggi deploy yonida **`⋯`** (uchta nuqta)
3. **Redeploy** ni tanlang
4. **"Use existing Build Cache"** belgilanmasin (yoqing)
5. **Redeploy** tugmasini bosing
6. 1–2 daqiqa kuting

✅ **Tekshirish:** [https://unitedglobalconsulting.uz/uz](https://unitedglobalconsulting.uz/uz) ochiladi.

---

# 2️⃣ RESEND'DA DOMEN VERIFIKATSIYASI

> **Hozir:** `RESEND_FROM=United Consulting <onboarding@resend.dev>` — sandbox.
> Faqat **sizning gmail'ingizga** xat boradi.
> **Maqsad:** `noreply@unitedglobalconsulting.uz` dan istalgan mijozga xat yuborish.

## 2.1. Resend'ga kiring

1. [https://resend.com/domains](https://resend.com/domains) — kiring
2. Yashil **+ Add Domain** tugmasini bosing

## 2.2. Domen qo'shish

1. **Domain** maydoniga: `unitedglobalconsulting.uz`
2. **Region**: `Frankfurt (eu-central-1)` (Toshkentdan yaqin)
3. Yashil **Add** tugmasini bosing

## 2.3. Resend sizga 3 ta DNS yozuv beradi

Ekranda quyidagiga o'xshash jadval ko'rinadi:

| Type | Name | Value (qisqartirilgan) |
|---|---|---|
| `MX` | `send` | `feedback-smtp.eu-west-1.amazonses.com` (priority 10) |
| `TXT` | `send` | `v=spf1 include:amazonses.com ~all` |
| `TXT` | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN...` (uzun) |

⚠️ **Diqqat:** har bir Name'ni nusxa olganda **`unitedglobalconsulting.uz` qismini olib tashlang**. Masalan, agar Resend ko'rsatadi `send.unitedglobalconsulting.uz` — aHost'ga faqat `send` kiritasiz. aHost o'zi domen qo'shadi.

## 2.4. aHost.uz panelida 3 ta yozuvni qo'shing

aHost'ga kiring → **Мои домены** → `unitedglobalconsulting.uz` → **DNS-хостинг** → **DNS-менеджер** → **Редактор зон**.

### Yozuv #1 — MX `send`

Yashil **Добавить запись** tugmasini bosing:
- **Название:** `send`
- **Тип:** `MX`
- **TTL:** `14400`
- **Приоритет:** `10`
- **Значение:** Resend bergan qiymat (masalan `feedback-smtp.eu-west-1.amazonses.com`)

### Yozuv #2 — TXT `send` (SPF)

**Добавить запись**:
- **Название:** `send`
- **Тип:** `TXT`
- **TTL:** `14400`
- **Значение:** `v=spf1 include:amazonses.com ~all`

### Yozuv #3 — TXT `resend._domainkey` (DKIM)

**Добавить запись**:
- **Название:** `resend._domainkey`
- **Тип:** `TXT`
- **TTL:** `14400`
- **Значение:** Resend bergan uzun qator (`p=MIGfMA0...` bilan boshlanadi)

⚠️ DKIM qiymati **juda uzun** (200+ belgi). Hammasini bir martada nusxa olib joylashtiring.

## 2.5. Saqlang

Pastdagi yashil **Сохранить изменения** tugmasini bosing.

## 2.6. Resend'da Verify

1. Resend domains sahifasiga qayting
2. `unitedglobalconsulting.uz` qatori yonidagi **Verify** tugmasini bosing
3. **5–60 daqiqa** kutib turing — DNS tarqalishi
4. Status **`Verified`** ✅ ga o'zgaradi

## 2.7. Yangi API kalit yarating (Production uchun)

1. Resend → **API Keys** → **+ Create API Key**
2. **Name:** `production`
3. **Permission:** `Sending access`
4. **Domain:** `unitedglobalconsulting.uz` ni tanlang
5. **Add** ni bosing
6. **`re_xxxxxxxxxxxxxxxx`** ni nusxa oling — **bir martagina ko'rinadi!**

## 2.8. Vercel'da `RESEND_FROM` va `RESEND_API_KEY` ni yangilang

Vercel → Settings → Environment Variables:

| Key | Yangi qiymat |
|---|---|
| `RESEND_API_KEY` | yangi `re_xxx...` (yoki eskini qoldiring) |
| `RESEND_FROM` | `United Consulting <noreply@unitedglobalconsulting.uz>` |

So'ng **Deployments → Redeploy**.

✅ **Tekshirish:** istalgan email manzildan saytdagi formani to'ldiring → siz mijozning email'iga **avtojavob** kelishi kerak (`from: noreply@unitedglobalconsulting.uz`).

---

# 3️⃣ `info@unitedglobalconsulting.uz` POCHTA SOZLASH

> **Maqsad:** sayt footer'ida `info@unitedglobalconsulting.uz` ko'rsatilgan — u haqiqiy ishlashi kerak.

Sizda **2 variant** mavjud:

## VARIANT A — aHost'ning pochta xizmati (eng oson, allaqachon DNS sozlangan)

aHost'da MX/SPF/DKIM yozuvlari allaqachon sozlangan. Faqat pochta qutisi yaratish kerak.

### A.1. aHost panelida pochta yaratish

1. aHost.uz → **Мои домены** → `unitedglobalconsulting.uz`
2. Yuqori tabs: **Пересылка почты** (yoki **Почтовые ящики**)
3. **+ Добавить ящик** (yoki shunga o'xshash):
   - **Email:** `info@unitedglobalconsulting.uz`
   - **Parol:** kuchli parol (saqlang!)
   - **Quota:** 1 GB (yetadi)
4. **Сохранить**

### A.2. Forward'ni sozlang

aHost panelida pochta qutisi sozlamalarida forward (perenapravlenie) imkoniyati bo'lishi mumkin:
- `info@unitedglobalconsulting.uz` → **Forward to** → `amrxonn.baxtiyorov@gmail.com`

Yoki to'g'ridan-to'g'ri webmail orqali xatlarni o'qiysiz: `https://mail.unitedglobalconsulting.uz` (aHost CNAME'da `mail` allaqachon sozlangan).

### A.3. Sinab ko'ring

Boshqa pochta'dan `info@unitedglobalconsulting.uz` ga xat yuboring → keladimi?

### A.4. `MANAGER_EMAIL` ni yangilang

Vercel → Environment Variables:
- `MANAGER_EMAIL` = `info@unitedglobalconsulting.uz` (yoki `manager@unitedglobalconsulting.uz`)

---

## VARIANT B — Cloudflare Email Routing (bepul, ammo DNS Cloudflare'ga ko'chirish kerak)

Bu variantda aHost DNS sozlamalarini olib tashlab, Cloudflare'ga ko'chirasiz. Murakkabroq, lekin bepul va ishonchli.

> ⚠️ **Tavsiya:** agar aHost pochtasi ishlasa — **Variant A**'ni qoldiring. Cloudflare'ga ko'chish faqat aHost pochtasi yomon ishlasa kerak.

Variant A'ni tanlasangiz, 4-qismga o'ting.

---

# 4️⃣ reCAPTCHA ADMIN'GA YANGI DOMEN QO'SHISH

> **Muammo:** reCAPTCHA hozir faqat `global-consalting.vercel.app` uchun ishlaydi. `unitedglobalconsulting.uz` da forma ishlayapti, lekin reCAPTCHA score past bo'lishi mumkin.

## 4.1. reCAPTCHA admin'ga kiring

1. [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin) — Google akkaunt orqali
2. **`United Global Consulting`** site'ni tanlang
3. Yuqori-o'ngda **⚙️ Settings** (sozlash ikonasi) ni bosing

## 4.2. Domen ro'yxatini yangilang

**Domains** maydoniga (har birini alohida qatorda) qo'shing:

```
unitedglobalconsulting.uz
www.unitedglobalconsulting.uz
global-consalting.vercel.app
localhost
```

## 4.3. Saqlang

Pastdagi ko'k **Save** tugmasini bosing.

✅ **Tekshirish:** sayt formasini to'ldirib yuboring → reCAPTCHA verify muvaffaqiyatli o'tishi kerak (server log'da `score: 0.7+` bo'ladi).

---

# 5️⃣ GA4 STREAM URL'NI YANGILASH

> **Muammo:** GA4 hozir `global-consalting.vercel.app` ga sozlangan. `unitedglobalconsulting.uz` ham hisoblanishi uchun yangilash kerak.

## 5.1. Google Analytics'ga kiring

1. [https://analytics.google.com](https://analytics.google.com)
2. Pastki-chap burchakda **⚙️ Admin** (sozlash ikonasi)
3. **Property** ustunida → **Data streams**
4. Mavjud streamni (`UGC Web` yoki shunga o'xshash) bosing

## 5.2. URL'ni yangilang

1. **Stream details** ekrani → o'ng-yuqorida **Edit** (qalam ikonasi)
2. **Stream URL** ni `https://unitedglobalconsulting.uz` ga o'zgartiring
3. **Save** tugmasini bosing

## 5.3. Konversiya tekshirish

1. Admin → **Events** → `generate_lead` ni toping
2. Yonidagi **"Mark as conversion"** togglini yoqing (agar yoqilmagan bo'lsa)

✅ **Tekshirish:** GA4 → **Reports** → **Realtime** ga kiring. Brauzeringizda saytni oching → "1 user" ko'rinishi kerak.

---

# 6️⃣ YANDEX METRIKA — COUNTER ADDRESS

## 6.1. Yandex Metrika'ga kiring

1. [https://metrika.yandex.com](https://metrika.yandex.com) — Yandex akkaunt
2. Counter ro'yxatidan `108705694` (sizning UGC Web) ni tanlang

## 6.2. Manzilni yangilang

1. Yuqori-o'ng menyu: **Settings (Настройки)**
2. **Counter address (Адрес сайта)** maydonini toping
3. Hozirgi: `global-consalting.vercel.app` → o'zgartiring: `unitedglobalconsulting.uz`
4. **Additional addresses (Дополнительные адреса)** ga ham qo'shing:
   - `www.unitedglobalconsulting.uz`
   - `global-consalting.vercel.app` (eski URL'lar uchun)
5. Pastdagi yashil **Save (Сохранить)** tugmasini bosing

✅ **Tekshirish:** Reports → **Real-time** → saytni ochsangiz, statistika ko'rinishi kerak.

---

# 7️⃣ GOOGLE SEARCH CONSOLE

> **Maqsad:** Google saytingizni indekslay boshlasin va qaysi so'rov bo'yicha topayotganini ko'rsating.

## 7.1. Search Console'ga kiring

1. [https://search.google.com/search-console](https://search.google.com/search-console)
2. Google akkauntingiz orqali kiring (Gmail bilan)
3. Yashil **+ Add property** (yoki **Добавить ресурс**) tugmasini bosing

## 7.2. Property turi tanlang

Modal'da 2 variant chiqadi:

- **Domain** — DNS verification kerak (tavsiya, butun domen va subdomen'lar uchun)
- **URL prefix** — HTML fayl yoki meta tag

**Domain** ni tanlang.

## 7.3. Domen kiriting

`unitedglobalconsulting.uz` (https:// **yozmasdan**) → **Continue**

## 7.4. Google sizga TXT yozuv beradi

Modal'da quyidagi formada TXT chiqadi:
```
google-site-verification=AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**Copy** tugmasini bosib, qiymatni nusxa oling.

## 7.5. aHost'da TXT yozuvni qo'shing

aHost.uz → **DNS-менеджер** → **+ Добавить запись**:
- **Название:** `@` (yoki bo'sh, asosiy domen uchun)
- **Тип:** `TXT`
- **TTL:** `14400`
- **Значение:** `google-site-verification=AbCdEf...` (Google bergan to'liq qiymat)

**Сохранить изменения**.

## 7.6. Tasdiqlang

1. Search Console modaliga qayting
2. **Verify** tugmasini bosing
3. ✅ "Ownership verified" chiqadi

⚠️ Agar **failed** chiqsa — 5–10 daqiqa kuting (DNS tarqalishi), keyin qaytadan urinib ko'ring.

## 7.7. Sitemap yuboring

1. Chap menyu: **Sitemaps**
2. **Add a new sitemap** maydoniga: `sitemap.xml`
3. **Submit** tugmasini bosing

✅ "Success" chiqadi. Google bir necha kun ichida saytingizni indekslab boshlaydi.

---

# 8️⃣ YANDEX WEBMASTER

## 8.1. Yandex Webmaster'ga kiring

1. [https://webmaster.yandex.ru](https://webmaster.yandex.ru) — Yandex akkaunt
2. Yashil **+ Добавить сайт** tugmasini bosing

## 8.2. Sayt qo'shing

1. **Адрес сайта:** `https://unitedglobalconsulting.uz`
2. **Добавить** tugmasini bosing

## 8.3. Tasdiqlash usuli

3 ta variant chiqadi:
- **Мета-тег** (eng oson) — meta tag'ni HTML head'ga qo'shasiz
- **HTML-файл** — fayl yuklash
- **DNS-запись** — TXT yozuv

**Мета-тег** ni tanlang.

## 8.4. Meta tag qiymatini nusxa oling

Yandex sizga shunga o'xshash kod beradi:
```html
<meta name="yandex-verification" content="abc123def456..." />
```

**`content="..."`** ichidagi qiymatni (`abc123def456...`) nusxa oling.

## 8.5. Menga yuboring (yoki o'zingiz qo'shing)

📤 Menga yuboring shu formatda:
```
yandex-verification: abc123def456...
```

Men [app/[locale]/layout.tsx](../app/[locale]/layout.tsx) faylga `metadata.verification.yandex` qo'shaman.

Yoki **alternativa:** Yandex'da **DNS-запись** ni tanlab, aHost'ga TXT yozuv qo'shing — bu kodga tegmaydi.

## 8.6. Tasdiqlang

Yandex modaliga qayting → **Проверить** tugmasini bosing → ✅ tasdiqlanadi.

## 8.7. Sitemap yuboring

1. Chap menyu: **Indexing → Sitemap files**
2. **+ Добавить файл Sitemap**
3. URL: `https://unitedglobalconsulting.uz/sitemap.xml`
4. **Добавить**

---

# 9️⃣ BING WEBMASTER (ixtiyoriy)

## 9.1. Bing'ga kiring

1. [https://www.bing.com/webmasters](https://www.bing.com/webmasters)
2. Microsoft akkaunt yoki Google bilan kiring

## 9.2. Saytni import qiling (eng oson)

1. **Add Site** tugmasi yonidagi **Import** tugmasini bosing
2. **Import from Google Search Console** ni tanlang
3. Google akkauntini ulashga rozilik bering
4. Bing avtomatik sayt va sitemap'ni oladi

✅ Bir necha kun ichida Bing index'ga tushadi.

---

# 🔟 TELEGRAM CHAT_ID — GURUH (ixtiyoriy)

> **Hozirgi muammo:** `TELEGRAM_CHAT_ID=6295164527` — bu **shaxsiy chat**. Lid'lar faqat sizga keladi.
> Agar **menejerlar bilan birga ishlamoqchi bo'lsangiz** — guruh kerak.

## 10.1. Yangi guruh yarating

1. Telegram'da yangi guruh oching: **`UGC Leads`**
2. Menejerlaringizni qo'shing
3. Botingizni (`@your_bot_name`) qo'shing
4. Botni **administrator** qiling:
   - Guruh sozlamalari → **Administrators** → **Add Admin**
   - Botni tanlang
   - Faqat **"Send Messages"** ruxsatini bering

## 10.2. Guruh chat_id ni oling

1. Guruhga istalgan xabar yozing: `test`
2. Brauzerda oching (`<TOKEN>` — sizning `TELEGRAM_BOT_TOKEN` qiymatingiz):
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
3. JSON natijada `"chat":{"id":-100xxxxxxxxxx,"title":"UGC Leads",...}` qatorni toping
4. **`-100xxxxxxxxxx`** raqamni nusxa oling (manfiy belgi bilan)

## 10.3. Vercel'da yangilang

Vercel → Environment Variables:
- `TELEGRAM_CHAT_ID` = `-100xxxxxxxxxx`

So'ng **Deployments → Redeploy**.

✅ **Tekshirish:** saytdan formani to'ldirib yuboring → guruhga lid xabari kelishi kerak.

---

# 1️⃣1️⃣ YURIDIK MA'LUMOTLAR (privacy + terms uchun)

> **Muammo:** sayt footer'ida `Privacy Policy` va `Terms of Service` linklari bor, lekin sahifalarda **shablon ma'lumotlar** ishlatilgan. O'zbekiston qonunlariga ko'ra ular yangilanishi kerak.

## 11.1. Quyidagi ma'lumotlarni to'plang

```
1. Yuridik shakl: MChJ / YaTT / Boshqa
   Misol: "MChJ «United Global Consulting»"

2. Yuridik nom (to'liq):
   _______________________________________

3. STIR (INN) raqami:
   _______________________________________

4. Yuridik manzil (to'liq):
   Toshkent shahar, _______________ tumani,
   _______________ ko'chasi, _______ uy

5. DPO email (Data Protection Officer):
   info@unitedglobalconsulting.uz (yoki boshqa)

6. Faoliyat boshlangan sana:
   _______________

7. Bank rekvizitlari (ixtiyoriy):
   Bank nomi: _____________________________
   Hisob raqami: __________________________
   MFO: ___________________________________

8. Faoliyat litsenziyasi (agar bor):
   Litsenziya №: __________________________
   Berilgan sana: _________________________
```

## 11.2. Menga yuboring

📤 Yuqoridagi ma'lumotlarni to'plab menga yuboring. Men:
- [messages/uz.json](../messages/uz.json), [ru.json](../messages/ru.json), [en.json](../messages/en.json)'da privacy va terms tarjimalarini yangilayman
- [app/[locale]/privacy/page.tsx](../app/[locale]/privacy/page.tsx) va [terms/page.tsx](../app/[locale]/terms/page.tsx)'da real ma'lumotlarni qo'yaman

---

# 1️⃣2️⃣ UPTIMEROBOT MONITORING (ixtiyoriy)

> **Maqsad:** sayt tushib qolsa, 5 daqiqada Telegram'da xabar olish.

## 12.1. UptimeRobot'ga ro'yxatdan o'ting

1. [https://uptimerobot.com](https://uptimerobot.com)
2. **Sign Up Free** → email + parol
3. Email tasdiqlang

## 12.2. Monitor qo'shing

1. Dashboard → yashil **+ Add New Monitor** tugmasini bosing
2. Quyidagilarni to'ldiring:
   - **Monitor Type:** `HTTP(s)`
   - **Friendly Name:** `UGC Production`
   - **URL:** `https://unitedglobalconsulting.uz`
   - **Monitoring Interval:** `5 minutes`
3. **Create Monitor** tugmasini bosing

## 12.3. Telegram alert ulang

1. Chap menyu: **My Settings** → **Add Alert Contact**
2. **Alert Contact Type:** `Telegram`
3. **Friendly Name:** `My Telegram`
4. UptimeRobot'ning bot orqali ulanish ko'rsatmalarini bajaring (link bosib chat_id avtomatik olinadi)
5. **Save Changes**

## 12.4. Alert'ni monitorga biriktiring

1. Monitor sahifasiga qayting
2. Yaratilgan monitor → **Edit** (qalam ikonasi)
3. **Alert Contacts to Notify** bo'limida sizning Telegram kontakt'ingizni belgilang
4. **Save Changes**

✅ **Sinov:** monitor'ni "Pause" qilib ko'ring → Telegram'ga `DOWN` xabari kelishi kerak.

---

# 1️⃣3️⃣ 2FA + PAROL MENEJER (juda muhim)

> ⚠️ Sizning barcha kalitlaringiz `.env.local` faylda va bu akkauntlar orqali boshqariladi. Akkauntdan oqsa — hammasi yo'qoladi.

## 13.1. 2FA hamma joyda yoqing

Quyidagi 7 ta xizmatda 2FA (Two-Factor Authentication) yoqing:

### A. GitHub
1. [https://github.com/settings/security](https://github.com/settings/security)
2. **Two-factor authentication** → **Enable 2FA**
3. **Authenticator app** ni tanlang (Google Authenticator yoki Authy)
4. QR kodni skanerlang
5. Backup kodlarni saqlang

### B. Vercel
1. [https://vercel.com/account](https://vercel.com/account) → **Authentication**
2. **Two-Factor Authentication** → **Add**
3. Authenticator app QR'ni skanerlang

### C. Cloudflare (agar bor bo'lsa)
1. [https://dash.cloudflare.com/profile/authentication](https://dash.cloudflare.com/profile/authentication)
2. **Two-Factor Authentication** → **Enable**

### D. Google (Gmail / GA4 / GSC akkaunt)
1. [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. **2-Step Verification** → **Get started**
3. Telefon raqam + Authenticator

### E. Resend
1. [https://resend.com/settings](https://resend.com/settings)
2. **Two-Factor Authentication** → **Enable**

### F. Supabase
1. [https://supabase.com/dashboard/account/security](https://supabase.com/dashboard/account/security)
2. **MFA** → **Add factor**

### G. Telegram
1. Telegram Settings → **Privacy and Security**
2. **Two-Step Verification** → **Set Password**

⚠️ **Backup kodlarni** har bir xizmat uchun bosma chiqaring va kassada saqlang!

## 13.2. Parol menejer o'rnating

Bittasini tanlang:

| Menejer | Bepulmi? | Tavsiya |
|---|---|---|
| **Bitwarden** | ✅ Ha (open-source) | 🥇 Eng yaxshi tanlov |
| **1Password** | ❌ $3/oy | Premium |
| **Apple Passwords** | ✅ Ha | Faqat Apple uchun |

### Bitwarden o'rnatish:
1. [https://bitwarden.com](https://bitwarden.com) → **Get started**
2. Email + master parol (uni unutmang!)
3. Brauzer extension o'rnating: Chrome / Firefox / Edge
4. Mobil app: iOS / Android

### Saqlang:
- Barcha 7 ta yuqoridagi akkauntlarni
- `.env.local` ichidagi har bir kalit qiymatini ham
- 2FA backup kodlarni
- aHost.uz akkauntini

---

# 1️⃣4️⃣ HSTS PRELOAD (3 oydan keyin)

> **Maqsad:** brauzerlar saytingizni majburan HTTPS'ga yo'naltiradi. Xavfsizlik darajasi yuqoriroq.
> **Shart:** domen kamida 90 kun ishlagan bo'lishi kerak.

Bugun emas, **3 oydan keyin** (2026-yil avgust atrofi):

1. [https://hstspreload.org](https://hstspreload.org) — kiring
2. **Domain:** `unitedglobalconsulting.uz`
3. **Check eligibility** tugmasini bosing
4. Agar ✅ "Status: Eligible" chiqsa:
   - **Submit `unitedglobalconsulting.uz` to the HSTS preload list**
5. 6–12 hafta ichida Chrome, Firefox, Safari preload list'iga kiradi

---

# 1️⃣5️⃣ YAKUNIY SMOKE-TEST

Hammasi tugagach, quyidagilarni tekshiring.

## 15.1. Sayt funksional sinov

| # | Tekshiruv | URL / Joy | OK? |
|---|---|---|---|
| 1 | Asosiy sahifa ochiladi | `https://unitedglobalconsulting.uz` | ☐ |
| 2 | UZ → RU → EN tillar almashinadi | yuqori header | ☐ |
| 3 | Davlatlar sahifasi 13 ta davlat ko'rsatadi | `/uz/countries` | ☐ |
| 4 | Universitetlar sahifasi 36 ta uni | `/uz/universities` | ☐ |
| 5 | Quiz 5 savol → 3 tavsiya | `/uz/quiz` | ☐ |
| 6 | Blog 3 maqola | `/uz/blog` | ☐ |
| 7 | Kontakt formasi to'g'ri | `/uz/contact` | ☐ |
| 8 | Privacy va Terms | `/uz/privacy`, `/uz/terms` | ☐ |
| 9 | "So'rovnoma to'ldirish" qizil tugma | yuqori-o'ngda | ☐ |
| 10 | Mobil ko'rinishda barcha sahifalar | telefonda sinov | ☐ |
| 11 | PWA o'rnatish (Chrome address bar install) | brauzer | ☐ |
| 12 | Tungi rejim (dark mode) | header'dagi oy ikonasi | ☐ |

## 15.2. Forma sinovi (eng muhim)

1. Saytni **incognito brauzer**da oching
2. Pastdagi **Aloqa** formasini to'ldiring:
   - Ism: `Smoke Test`
   - Telefon: `+998 90 123 45 67`
   - Email: o'zingizniki
   - Davlat: Italiya
   - Xabar: "Yakuniy sinov"
3. ✅ Roziman → **Yuborish**
4. Tekshiring:
   - ✅ "Rahmat!" sahifasi chiqdimi?
   - ✅ Telegram (yoki guruh) ga lid keldimi?
   - ✅ Email manzilingizga **avtojavob** keldimi (`from: noreply@unitedglobalconsulting.uz`)?
   - ✅ Menejer email manziliga **bildirishnoma** keldimi?
   - ✅ Supabase → Table Editor → `leads` jadvalida yangi qator paydo bo'ldimi?

## 15.3. SEO va xavfsizlik tekshiruvlari

Quyidagilarni teshiring (har biri yashil/A+ bo'lsa, ajoyib):

| Tekshiruv | URL | Maqsadli natija |
|---|---|---|
| Security headers | [securityheaders.com/?q=https://unitedglobalconsulting.uz](https://securityheaders.com/?q=https://unitedglobalconsulting.uz) | A+ |
| SSL Labs | [ssllabs.com/ssltest/analyze.html?d=unitedglobalconsulting.uz](https://www.ssllabs.com/ssltest/analyze.html?d=unitedglobalconsulting.uz) | A+ |
| Mozilla Observatory | [observatory.mozilla.org/analyze/unitedglobalconsulting.uz](https://observatory.mozilla.org/analyze/unitedglobalconsulting.uz) | A+ |
| Schema.org | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) | Valid |
| Sitemap | [https://unitedglobalconsulting.uz/sitemap.xml](https://unitedglobalconsulting.uz/sitemap.xml) | XML chiqadi |
| Robots | [https://unitedglobalconsulting.uz/robots.txt](https://unitedglobalconsulting.uz/robots.txt) | Text chiqadi |
| OpenGraph | [opengraph.dev](https://www.opengraph.dev/) | Rasm va matn |

## 15.4. Lighthouse (Chrome DevTools)

1. Chrome'da [https://unitedglobalconsulting.uz](https://unitedglobalconsulting.uz) ni oching
2. F12 → **Lighthouse** tab
3. **Categories:** Performance, Accessibility, Best Practices, SEO, PWA — hammasini belgilang
4. **Mode:** Navigation
5. **Device:** Mobile
6. **Analyze page load**

Maqsadli natija:
- Performance ≥ **95**
- Accessibility ≥ **95**
- Best Practices ≥ **95**
- SEO = **100**
- PWA: **installable**

---

# 📊 TUGAGAN VAZIFALAR (siz qilgansiz)

✅ Supabase loyiha + 3 ta API kalit
✅ Telegram bot (token + chat_id)
✅ Resend akkaunt + API kalit
✅ reCAPTCHA v3 (site + secret)
✅ Google Analytics 4 (G-4N4E66TJQ1)
✅ Yandex Metrika (108705694)
✅ Domen `unitedglobalconsulting.uz` sotib olish
✅ DNS sozlash (A, CNAME `www`, MX, SPF, DKIM, DMARC)
✅ Vercel'ga domen ulash + SSL
✅ www.unitedglobalconsulting.uz → 308 redirect

---

# 🎯 TARTIB BO'YICHA QADAMLAR

Agar 1 kunda hammasini qilolmaysizgi — shunday tartibda:

## **Bugun (1.5 soat)**
- [x] 1-qism: Vercel ENV tekshiruv
- [x] 4-qism: reCAPTCHA domen
- [x] 5-qism: GA4 stream URL
- [x] 6-qism: Yandex Metrika
- [x] 13-qism: 2FA hamma joyda

## **Ertaga (2 soat)**
- [x] 2-qism: Resend domen verifikatsiyasi
- [x] 3-qism: `info@` pochta
- [x] 7-qism: Google Search Console
- [x] 8-qism: Yandex Webmaster
- [x] 9-qism: Bing Webmaster

## **Bu hafta (1 soat)**
- [x] 10-qism: Telegram guruh (agar kerak bo'lsa)
- [x] 11-qism: Yuridik ma'lumotlar (menga yuboring)
- [x] 12-qism: UptimeRobot
- [x] 15-qism: Yakuniy smoke-test

## **3 oydan keyin**
- [x] 14-qism: HSTS Preload

---

# 📞 MENGA YUBORISH KERAK BO'LGAN MA'LUMOTLAR

Quyidagi qadamlar **mendan kod o'zgarishi talab qiladi**. Tugatganingizdan keyin menga yuboring:

| Qism | Menga nima yuborasiz |
|---|---|
| 2-qism (Resend) | "Resend domen verified ✅" → men `RESEND_FROM` ni `noreply@unitedglobalconsulting.uz` ga yangilayman |
| 8-qism (Yandex) | Yandex meta-tag content qiymati → men HTML head'ga qo'shaman |
| 10-qism (Telegram) | Agar guruh chat_id olsangiz: `-100xxxxxx` |
| 11-qism (Yuridik) | Yuridik nom, STIR, manzil, DPO email — men privacy/terms'ni yangilayman |

---

# ⚡ TEZ KO'RSATKICH

Agar shu **bugun** vaqt bo'lsa, **bu 4 qadam**ni qiling:

1. ✅ **Qism 1** — Vercel'da 13 ta env'ni tekshiring (15 daq)
2. ✅ **Qism 4** — reCAPTCHA admin'da `unitedglobalconsulting.uz` qo'shing (5 daq)
3. ✅ **Qism 13** — GitHub, Vercel, Google'da 2FA yoqing (15 daq)
4. ✅ **Qism 15.2** — formani sinab ko'ring (5 daq)

**Jami 40 daqiqa** — sayt 90% production tayyor bo'ladi.

Qolganlari (Resend domen, Search Console, va h.k.) — keyingi kunlarda asta-sekin.

---

**Boshlaganingizda menga ayting** — har qadamda yordam beraman, qaysi joyda muammo bo'lsa darhol tuzatib beraman. 🚀
