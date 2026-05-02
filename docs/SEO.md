# SEO qo'llanmasi — Search Console, Yandex Webmaster, sitemap

Bu fayl faqat saytni qidiruv tizimlariga to'g'ri ulash uchun. Texnik SEO asosi (sitemap, robots, JSON-LD, meta) kodda allaqachon bor.

---

## 1. Mavjud SEO infrastrukturasi (kodda)

| Element | Joyi | Holati |
|---|---|---|
| Sitemap | [app/sitemap.ts](../app/sitemap.ts) | ✅ Avtomatik. Barcha 3 til × statik sahifalar + countries + blog posts |
| robots.txt | [app/robots.ts](../app/robots.ts) | ✅ `Allow: /`, `Disallow: /api/, /admin/`, sitemap link |
| `<title>`, `<description>` | har bir sahifa `generateMetadata` | ✅ Localized |
| `<link rel="canonical">` | `metadata.alternates.canonical` | ✅ |
| `hreflang` | `metadata.alternates.languages` | ✅ Har 3 til uchun |
| OG image | [app/opengraph-image.tsx](../app/opengraph-image.tsx) (root + per-locale segments) | ✅ Dynamic |
| Twitter card | `metadata.twitter` | ✅ `summary_large_image` |
| JSON-LD Organization | [components/shared/SchemaOrg.tsx](../components/shared/SchemaOrg.tsx) | ✅ Har sahifada |
| JSON-LD Article | Blog post page | ✅ |
| JSON-LD FAQPage | FAQ page | ✅ |
| JSON-LD Breadcrumb | Country, Blog post, FAQ | ✅ |
| JSON-LD CollegeOrUniversity | Country page | ✅ |
| Manifest | [app/manifest.ts](../app/manifest.ts) | ✅ |

---

## 2. Google Search Console

### 2.1 Property qo'shish

1. https://search.google.com/search-console
2. **Add property** → **Domain** (DNS verification — afzal) yoki **URL prefix**.
3. **Domain** tanlasangiz: TXT record DNS provayder dashboard'iga qo'shing.
4. Verifikatsiya tugagach, sayt 24 soat ichida ro'yxatga olinadi.

### 2.2 Sitemap topshirish

1. Sidebar → **Sitemaps**.
2. URL kiritish: `sitemap.xml` (bosh sayt URL ga nisbatan).
3. **Submit** bosing.
4. Status `Success` bo'lishi kerak; "Discovered URLs" raqami sayt URL'lari soniga teng (3 til × ~12 statik + 30 country + 9 blog ≈ 117).

### 2.3 Indexlash tezligini tekshirish

- **Pages** → **Why pages aren't indexed** — xatolarni ko'rish.
- **URL Inspection** → bitta URL'ni qo'l bilan **Request indexing**.
- 1–4 hafta — barcha sahifalar indexlangan bo'ladi.

### 2.4 Rich Results test

- https://search.google.com/test/rich-results
- Test URL'lari:
  - `/uz/faq` — FAQPage
  - `/uz/blog/korea-without-korean` — Article + Breadcrumb
  - `/uz/countries/korea` — BreadcrumbList + ItemList(CollegeOrUniversity)
  - `/uz` — EducationalOrganization + WebSite

Har birida **valid items** ro'yxati chiqadi.

---

## 3. Yandex Webmaster

CIS bozor uchun majburiy. Yandex.Metrika allaqachon kodda — endi Webmaster ham qo'shamiz.

1. https://webmaster.yandex.com → **+ Add site**.
2. URL: `https://unitedglobal.uz`.
3. Verification — **HTML file** yoki **DNS TXT** orqali.
4. Sidebar → **Indexing → Sitemap** → URL: `https://unitedglobal.uz/sitemap.xml`.
5. **Geography**: **Tashkent, Uzbekistan**.
6. **Language**: 3 ta til qo'shing.

---

## 4. Bing Webmaster (ixtiyoriy)

1. https://www.bing.com/webmasters → **Add a site**.
2. **Import from Google Search Console** — eng tezi.
3. Sitemap avtomatik qabul qilinadi.

---

## 5. Tekshirish ro'yxati

- [ ] Google Search Console: domain verification ✓
- [ ] Sitemap "Success"
- [ ] Rich Results Test: 4 URL valid
- [ ] hreflang konfiguratsiya tekshirilgan: https://hreflang.org/check
- [ ] PageSpeed Insights ≥ 90 (mobile + desktop): https://pagespeed.web.dev
- [ ] Yandex Webmaster: domen verification ✓
- [ ] Yandex sitemap "Indexed: ✓"

---

## 6. Davom etgan optimizatsiya

### 6.1 Yangi blog post chiqqanda

Blog post ko'paytirgandan keyin sitemap avtomatik yangilanadi (build vaqtida `BLOG_POSTS` array dan o'qiladi). Lekin yangi post'ni qo'l bilan tezroq indexlatish uchun:
1. Search Console → **URL Inspection** → URL kiriting → **Request indexing**.

### 6.2 Yangi davlat qo'shganda

`data/countries.ts` ga yangi country qo'shsangiz, `app/sitemap.ts` avtomatik tarqatadi. Yangi build deploy bo'lganda Google qayta scan qiladi.

### 6.3 Search Console regulyar tekshiruv

- Haftalik: **Performance** → impressionlar va clicklar.
- Haftalik: **Coverage** → indexlash xatolari.
- Oylik: **Core Web Vitals** → LCP, INP, CLS green bo'lishi.
