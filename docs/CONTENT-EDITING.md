# Kontent yangilash qo'llanmasi

Bu hujjat — **kontent qaerda yashaydi va qanday o'zgartirilishi**. Developer bo'lmagan jamoa a'zosi ham ishlatishi mumkin.

---

## Tezkor jadval

| Nima | Qaerda | Kim o'zgartiradi |
|---|---|---|
| Til matnlari (sarlavha, tugmalar, navigatsiya) | [messages/uz.json](../messages/uz.json), [messages/ru.json](../messages/ru.json), [messages/en.json](../messages/en.json) | Kontent menejer |
| Davlat sahifa ma'lumotlari (universitetlar, narxlar) | [data/countries.ts](../data/countries.ts) | Editor |
| Blog maqolalar | [data/blog.ts](../data/blog.ts) | Kontent menejer |
| Xizmatlar ro'yxati | [data/services.ts](../data/services.ts) | Kontent menejer |
| Hamkorlar logolar | [data/partners.ts](../data/partners.ts) | Marketing |
| Kontakt ma'lumotlari, ijtimoiy tarmoqlar | [lib/config.ts](../lib/config.ts) | Admin |
| Hero rasm | [components/sections/HeroSection.tsx](../components/sections/HeroSection.tsx) (Image src) | Designer |

---

## 1. Tarjima matnlarini o'zgartirish

Sayt **3 til** qo'llab-quvvatlaydi: o'zbek (uz), rus (ru), inglizcha (en).

Har bir til uchun alohida fayl `messages/` papkasida. Tuzilish bir xil bo'lishi shart — agar `uz.json` da kalit bo'lsa, `ru.json` va `en.json` da ham bo'lishi kerak.

### Mavjud kalitni o'zgartirish

```jsonc
// messages/uz.json
{
  "hero": {
    "title_part1": "Kelajagingizni boshlang",  // <— shu yerda o'zgartiramiz
    ...
  }
}
```

3 ta tilda bir xil tuzilishni saqlang.

### Yangi kalit qo'shish

1. 3 ta `messages/*.json` fayliga bir xil yo'lda kalitni qo'shing.
2. Komponent ichida ishlatish:
   ```tsx
   const t = useTranslations('hero');
   <p>{t('new_key')}</p>
   ```
3. Type-safe — TS xatolik chiqarsa, kalit yo'q yoki noto'g'ri yo'lda.

---

## 2. Yangi blog maqola qo'shish

[data/blog.ts](../data/blog.ts) faylini oching va `BLOG_POSTS` arrayiga obyekt qo'shing:

```ts
{
  slug: 'my-new-post',  // URL: /uz/blog/my-new-post
  category: 'visa',     // 'scholarships' | 'countries' | 'visa' | 'tips'
  cover: 'https://images.unsplash.com/photo-XXX?auto=format&fit=crop&w=1600&q=80',
  reading_time: 7,      // taxminiy daqiqa
  published_at: '2026-05-15',
  title: {
    ru: 'Заголовок на русском',
    uz: 'Sarlavha o\'zbekcha',
    en: 'Title in English',
  },
  excerpt: {
    ru: 'Кратко 1-2 предложения о посте',
    uz: '1-2 jumla post haqida',
    en: 'Brief 1-2 sentence summary',
  },
  body: {
    ru: `## Заголовок секции

Параграф текста.

### Подзаголовок

- Список 1
- Список 2

**Жирный текст**.`,
    uz: `## Bo'lim sarlavhasi
...`,
    en: `## Section heading
...`,
  },
}
```

### Markdown qo'llab-quvvatlash

Blog post body cheklangan markdown ([app/[locale]/blog/[slug]/page.tsx:111](../app/[locale]/blog/[slug]/page.tsx#L111) `mdToHtml` funksiyasi):

- `## h2` va `### h3` sarlavhalar
- `- item` yoki `* item` — bulletli ro'yxat
- `1. item` — raqamli ro'yxat
- `**bold**`, `*italic*`, `` `code` ``
- `[link](https://...)` — havolalar (target=_blank)
- Bo'sh qator — paragrap orasi

> ❌ Quvvatlanmagan: jadvallar, rasmlar matn ichida, bloklar, footnotes.

### Cover rasm

Hozir Unsplash ishlatamiz. Format:
```
https://images.unsplash.com/photo-XXX?auto=format&fit=crop&w=1600&q=80
```

`next.config.ts` da `images.remotePatterns` ga `images.unsplash.com` qo'shilgan, mansurdek ishlaydi.

Boshqa CDN ishlatish uchun [next.config.ts](../next.config.ts) ga hostname qo'shing.

---

## 3. Yangi davlat qo'shish

[data/countries.ts](../data/countries.ts) faylida `COUNTRIES` arrayiga qo'shing. Mavjud davlatdan namuna oling — barcha required maydonlar:

- `slug` — URL'ga aylantiriladi: `/uz/countries/germany`
- `code` — flag CDN uchun (`de`, `kr`, `it`)
- `name` — 3 til uchun
- `tuition_year`, `living_year`, `extra` — kalkulyator uchun raqamlar
- `quiz_weight` — quiz natijasi uchun
- `universities` — top universitetlar

[lib/config.ts](../lib/config.ts) `COUNTRY_OPTIONS` ham yangilang:
```ts
export const COUNTRY_OPTIONS = [
  'korea', 'singapore', /* ... */, 'germany'  // <—
] as const;
```

`messages/*.json`'da yangi kalit kerak emas, davlat nomi `name` dan keladi.

---

## 4. Logo va brand ranglar

- **Logo:** [components/layout/Header.tsx](../components/layout/Header.tsx) va Footer'da `<GraduationCap />` (lucide-react). Real logo PNG/SVG kelganda — bu ikonkalarni `<Image src="/logo.png" />` bilan almashtiring.
- **Brand ranglar:** [app/globals.css](../app/globals.css) `@theme` blokida:
  - `--color-primary: #0a2540` — to'q ko'k
  - `--color-accent: #00d4aa` — neon yashil
  - `--color-gold: #ffb800` — oltin

Ranglarni o'zgartirsangiz, `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` da hard-coded ranglarni ham yangilang.

---

## 5. Kontakt ma'lumotlari (telefon, manzil, ijtimoiy)

[lib/config.ts](../lib/config.ts):

```ts
export const SITE = {
  phone: '+998 88 526 30 00',
  email: 'info@unitedglobal.uz',
  social: {
    whatsapp: 'https://wa.me/998885263000',
    telegram: 'https://t.me/unitedglobal',
    instagram: 'https://instagram.com/unitedglobal.uz',
  },
};
```

Bir joyda o'zgartirsangiz — Header, Footer, ContactForm, JSON-LD hammasi avtomatik yangilanadi.

---

## 6. Deploy

`main` branchga push qilsangiz Vercel avtomatik deploy qiladi. Build odatda 1–2 daqiqa.

> Eslatma: yangi blog post yoki yangi davlat qo'shish — sitemap'ga avtomatik qo'shiladi (build'da `app/sitemap.ts` ishlaydi).
