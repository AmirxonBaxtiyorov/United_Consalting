# Deployment qo'llanmasi — United Global Consulting

Bu hujjat saytni nol holatdan production'ga chiqarish uchun barcha qadamlarni o'z ichiga oladi. Barchasini ketma-ket bajaring.

---

## 1. Vercel — Environment Variables

`https://vercel.com/<sizning-team>/united-consalting/settings/environment-variables`

Quyidagi 13 ta o'zgaruvchini **Production**, **Preview** va **Development** muhitlariga qo'shing (qiymatlar `.env.local` faylidan olinadi).

| Nomi | Maxfiymi? | Qiymati |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ❌ | `https://unitedglobal.uz` (yoki `https://global-consalting.vercel.app`) |
| `NEXT_PUBLIC_SUPABASE_URL` | ❌ | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ❌ | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role secret (server-only) |
| `RESEND_API_KEY` | ✅ | Resend API kalitlari |
| `RESEND_FROM` | ❌ | `"United Global Consulting <noreply@unitedglobal.uz>"` |
| `MANAGER_EMAIL` | ❌ | Real manager email manzili |
| `TELEGRAM_BOT_TOKEN` | ✅ | BotFather'dan olingan token |
| `TELEGRAM_CHAT_ID` | ❌ | Manfiy son: `-1001234567890` |
| `RECAPTCHA_SECRET_KEY` | ✅ | reCAPTCHA secret |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ❌ | reCAPTCHA site key |
| `NEXT_PUBLIC_GA_ID` | ❌ | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_YM_ID` | ❌ | Yandex Metrika ID |

Saqlagandan keyin **Deployments → ⋯ → Redeploy** bosing.

---

## 2. Supabase — schema va RLS

1. https://supabase.com/dashboard → loyihangiz → **SQL Editor → New query**.
2. `docs/supabase-schema.sql` ni to'liq nusxalab joylashtiring va **Run** bosing.
3. Skript shularni qiladi:
   - `leads` va `newsletter_subscribers` jadvallarini yaratadi
   - `update_updated_at_column()` triggerini yaratadi
   - RLS yoqib, ikkita kalit policy qo'shadi:
     - `service_role` ham `leads`, ham `newsletter_subscribers` ga to'liq kira oladi
     - `anon` faqat `newsletter_subscribers` ga `INSERT` qila oladi

### Tekshirish

```sql
-- 1. Smoke test (schema oxiridagi blokni faollashtiring)
insert into public.leads (name, phone, source) values ('Test', '+998000000000', 'sql-test');
select count(*) from public.leads;  -- 1 chiqishi kerak
update public.leads set status = 'contacted' where source = 'sql-test';
select updated_at <> created_at as trigger_works from public.leads where source = 'sql-test';
-- trigger_works = true bo'lishi kerak
delete from public.leads where source = 'sql-test';
```

Anon kalit bilan `select * from leads` urinib ko'ring — RLS bloklashi kerak (`permission denied`).

---

## 3. Telegram — bot va guruh

1. **@BotFather** → `/mybots` → bot tanlang → API token tasdiqlang.
2. Managerlar uchun **yangi guruh** yarating yoki mavjudini ishlating.
3. Botni guruhga qo'shing va **administrator** qiling (yoki Privacy Mode'ni o'chiring).
4. Guruhga xabar yozing (masalan, `/start`).
5. Brauzerda oching:
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
6. JSON natijada `"chat":{"id":-1001234567890,...}` ni toping.
7. `TELEGRAM_CHAT_ID` ni `.env.local` va Vercel'ga qo'shing (manfiy son bilan).

**Qabul kriteriyasi:** Saytdagi formani to'ldirib yuboring → guruhga formatlangan xabar tushadi.

---

## 4. Resend — domen verifikatsiya

1. `unitedglobal.uz` domenini Resend'ga qo'shing: https://resend.com/domains → **Add Domain**.
2. Resend bergan **TXT**, **MX**, **DKIM**, **SPF** yozuvlarini DNS'ga qo'shing.
3. Yashil "Verified" statusini kuting (10–30 daqiqa).
4. `.env.local` va Vercel'da:
   ```
   RESEND_FROM="United Global Consulting <noreply@unitedglobal.uz>"
   MANAGER_EMAIL=manager@unitedglobal.uz
   ```

**Qabul kriteriyasi:** Forma to'ldirilganda mijoz email'iga auto-reply tushadi (spam'da emas).

---

## 5. Custom domain — `unitedglobal.uz`

1. Vercel Dashboard → `united-consalting` → **Settings → Domains → Add**.
2. `unitedglobal.uz` va `www.unitedglobal.uz` ni qo'shing.
3. DNS'da:
   - A record: `@ → 76.76.21.21`
   - CNAME: `www → cname.vercel-dns.com`
4. SSL avtomatik chiqishini kuting.
5. Vercel env'da `NEXT_PUBLIC_SITE_URL=https://unitedglobal.uz`.

---

## 6. Analytics

### Google Analytics 4

1. https://analytics.google.com → **Admin → Create property**.
2. Web stream qo'shing → Measurement ID (`G-...`) ni `NEXT_PUBLIC_GA_ID` ga.

### Yandex Metrika

1. https://metrika.yandex.com → **+ Add tag**.
2. ID raqamini `NEXT_PUBLIC_YM_ID` ga.

> Eslatma: Saytda **cookie consent** bor — analytics faqat foydalanuvchi `Принять` (yoki `Qabul qilish`) bossagina yuklanadi.

---

## 7. reCAPTCHA v3

1. https://www.google.com/recaptcha/admin → **+ Register a new site**.
2. **reCAPTCHA v3** tanlang.
3. Domains: `unitedglobal.uz`, `global-consalting.vercel.app`, `localhost`.
4. Site Key → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`.
5. Secret Key → `RECAPTCHA_SECRET_KEY`.

---

## 8. Search Console + Yandex Webmaster

### Google Search Console

1. https://search.google.com/search-console → **Add property** → `unitedglobal.uz`.
2. DNS TXT record yoki HTML-meta orqali tasdiqlang.
3. **Sitemaps** bo'limida qo'shing: `https://unitedglobal.uz/sitemap.xml`.

### Yandex Webmaster

1. https://webmaster.yandex.com → **Add site**.
2. Tasdiqlang.
3. Sitemap: `https://unitedglobal.uz/sitemap.xml`.

---

## 9. To'liq launch checklist

### 🚨 Blockers
- [ ] Vercel'da 13 ta env var
- [ ] Supabase schema ishga tushirilgan + RLS faol
- [ ] Telegram bot guruhda + chat_id to'g'ri
- [ ] Resend domeni "Verified"
- [ ] Custom domain ulangan + SSL active
- [ ] **Test:** Real forma → lead Supabase'da, Telegram'da, email'da

### ⚠️ Important
- [x] Cookie consent banner ishlayapti
- [ ] Favicon + apple-touch-icon + OG image (logo bilan almashtiring)
- [x] JSON-LD structured data (Organization, Article, FAQ, Breadcrumb)
- [ ] `.env.local` git tarixida emas (tekshirish: `git log --all -- .env.local`)
- [x] CSP header qo'shilgan
- [x] Tarjima gap'lari yopilgan

### ✨ Quality
- [ ] Lighthouse 90+ (mobile + desktop)
- [ ] Accessibility audit o'tilgan
- [ ] Mobile testlar bajarilgan
- [ ] Search Console + Yandex Webmaster ulangan

---

## 10. Troubleshooting

**"Forma yuborildi" lekin Supabase'da lead yo'q:**
- Vercel logs → `/api/contact` endpointni ko'ring
- `SUPABASE_SERVICE_ROLE_KEY` to'g'ri qo'yilganini tekshiring
- RLS policy'lar mavjudligini tekshiring

**Telegram'ga xabar tushmayapti:**
- Bot guruh administratormi? (yoki Privacy Mode o'chgan)
- `TELEGRAM_CHAT_ID` manfiy son emasmi?
- `https://api.telegram.org/bot<TOKEN>/getMe` da bot statusini ko'ring

**Email tushmayapti:**
- Resend dashboard → Logs → reject sababini ko'ring
- `RESEND_FROM` da domen Resend'da "Verified" emasmi
- DKIM/SPF DNS yozuvlari tarqalganmi?
