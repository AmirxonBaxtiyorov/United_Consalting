# 🎨 ПОЛНЫЙ PREMIUM ПРОМПТ ДЛЯ СОЗДАНИЯ ЛЕНДИНГА
## United Global Consulting — Education Agency Landing Page

---

## 📋 ИНСТРУКЦИЯ ПО ИСПОЛЬЗОВАНИЮ

Скопируй весь блок ниже и вставь в AI-инструмент (Claude, Cursor, v0.dev, Bolt.new, Lovable, ChatGPT и т.д.). Этот промпт охватывает 100% процесса создания сайта — от архитектуры до финального деплоя.

---

## 🚀 САМ ПРОМПТ (копировать целиком)

```
Ты — senior full-stack разработчик и UI/UX дизайнер премиум-уровня 
с опытом создания проектов уровня Awwwards, Dribbble и Behance. 
Твоя задача — создать полностью готовый, production-ready одностраничный 
лендинг (landing page) для международной образовательной консалтинговой 
компании "United Global Consulting". Компания помогает студентам из 
Узбекистана поступать в университеты Кореи, Европы, Америки и Сингапура.

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 1 — ОБЩАЯ ФИЛОСОФИЯ ДИЗАЙНА
═══════════════════════════════════════════════════════════════════

Дизайн должен вызывать у пользователя ощущение:
- ДОВЕРИЯ (официальный международный консалтинг)
- ПРЕСТИЖА (премиум уровень, как у топовых агентств)
- МЕЧТЫ (чувство, что учёба за рубежом — реальна)
- ПРОФЕССИОНАЛИЗМА (чёткая структура, без хаоса)

Стилистика: Modern Premium / Corporate-Luxury / Glassmorphism + 
Soft Neumorphism + субтильная анимация. Вдохновение — сайты Apple, 
Linear, Stripe, Superhuman, Framer, Vercel.

КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО:
❌ Дешёвые шаблоны в стиле Bootstrap 2015
❌ Яркие "кислотные" градиенты
❌ Низкокачественные стоковые фото
❌ Clip-art иконки
❌ Comic Sans и подобные шрифты
❌ Слишком большие блоки текста без воздуха

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 2 — ТЕХНИЧЕСКИЙ СТЕК
═══════════════════════════════════════════════════════════════════

Обязательный стек:
- Next.js 14+ (App Router) ИЛИ чистый HTML5 + CSS3 + Vanilla JS 
  (на выбор, но с одинаковым качеством)
- TypeScript (если Next.js)
- TailwindCSS 3.4+
- Framer Motion (для анимаций)
- Lucide React (иконки) или Heroicons
- Shadcn/ui компоненты (если Next.js)
- next/font для оптимизации шрифтов
- next/image для оптимизации картинок

Дополнительно:
- AOS.js или Framer Motion для scroll-анимаций
- Swiper.js для слайдеров (testimonials, countries)
- Lottie для микроанимаций (опционально)

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 3 — ЦВЕТОВАЯ ПАЛИТРА (PREMIUM)
═══════════════════════════════════════════════════════════════════

Основные цвета:
--primary-deep-blue:     #0A2540    (главный, корпоративный)
--primary-royal:         #1E40AF    (акцент кнопок)
--accent-gold:           #D4AF37    (премиум акцент, звёзды)
--accent-emerald:        #10B981    (WhatsApp, успех)

Нейтральные:
--bg-white:              #FFFFFF
--bg-soft:               #F8FAFC
--bg-section:            #F1F5F9
--text-primary:          #0F172A
--text-secondary:        #475569
--text-muted:            #94A3B8
--border-light:          #E2E8F0

Градиенты (использовать дозировано):
--gradient-hero:         linear-gradient(135deg, #0A2540 0%, #1E40AF 100%)
--gradient-gold:         linear-gradient(135deg, #D4AF37 0%, #F4E5A1 100%)
--gradient-glass:        rgba(255,255,255,0.1) с backdrop-filter: blur(20px)

Тёмный режим (опционально, но желательно):
--dark-bg:               #0A0E1A
--dark-surface:          #111827
--dark-text:             #F9FAFB

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 4 — ТИПОГРАФИКА
═══════════════════════════════════════════════════════════════════

Заголовки (H1, H2):
- Шрифт: "Playfair Display" или "Fraunces" (премиум serif)
- Альтернатива: "Inter" 700-800 weight

Основной текст:
- Шрифт: "Inter" или "Manrope" (400, 500, 600)

Размеры (desktop):
- H1: 64-72px, line-height 1.1, letter-spacing -0.02em
- H2: 48-56px, line-height 1.15
- H3: 32-36px, line-height 1.2
- H4: 24px
- Body: 18px, line-height 1.6
- Small: 14-16px

Mobile:
- H1: 40-48px
- H2: 32-36px
- Body: 16px

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 5 — СТРУКТУРА СТРАНИЦЫ (полный порядок секций)
═══════════════════════════════════════════════════════════════════

1.  NAVBAR (sticky, glassmorphism)
2.  HERO SECTION
3.  TRUST BAR
4.  ABOUT US
5.  WHY CHOOSE US
6.  COUNTRIES (страны для учёбы)
7.  SERVICES
8.  SCHOLARSHIP / GRANT
9.  PROCESS (как мы работаем — 5 шагов)
10. TRUST / SAFETY
11. TESTIMONIALS (слайдер)
12. STATS (цифры: студенты, страны, годы)
13. FAQ (аккордеон)
14. FINAL CTA
15. FOOTER

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 6 — ДЕТАЛЬНОЕ ОПИСАНИЕ КАЖДОЙ СЕКЦИИ
═══════════════════════════════════════════════════════════════════

─────────────────────────────────────────────
🔹 1. NAVBAR
─────────────────────────────────────────────
- Sticky, fixed top, z-index 50
- Фон: белый с прозрачностью + backdrop-blur(20px)
- При скролле — появляется лёгкая тень
- Логотип слева: "United Global Consulting" + маленькая иконка глобуса
- Меню по центру/справа: Home, About, Services, Countries, 
  Scholarships, Testimonials, Contact
- Кнопка справа: "Bepul konsultatsiya" (синяя, премиум)
- Переключатель языка: UZ / RU / EN (dropdown)
- Mobile: бургер-меню с плавным slide-in справа

─────────────────────────────────────────────
🔹 2. HERO SECTION
─────────────────────────────────────────────
Размер: min-height 100vh
Фон: 
  - Большое видео или анимированный фон (студенты, университеты, 
    самолёт, глобус)
  - ИЛИ статичный градиент deep-blue → royal-blue с частицами 
    (particles.js)
  - Overlay: rgba(10, 37, 64, 0.7)

Левая колонка (60%):
  Заголовок H1:
  "Kelajagingizni chet elda boshlang"
  (крупно, белым, с золотым подчёркиванием слова "kelajagingizni")
  
  Подзаголовок:
  "Korea, Yevropa, Amerika va Singapur universitetlariga hujjat 
  topshirish, qabul va viza jarayonlarida professional yordam beramiz."
  
  Три bullet-пункта с иконками:
  🎓 Sizga mos universitet tanlaymiz
  📄 Hujjatlarni to'g'ri tayyorlaymiz
  ✈️ Vizagacha to'liq kuzatib boramiz
  
  Две кнопки (flex, gap 16px):
  - Primary: "Bepul konsultatsiya olish" 
    (синий градиент, shadow, hover scale 1.05)
  - Secondary: "WhatsApp orqali bog'lanish" 
    (зелёный, иконка WhatsApp)

Правая колонка (40%):
  - 3D illustration студента с рюкзаком и паспортом
  - ИЛИ коллаж из флагов стран в стеклянных карточках
  - ИЛИ изометрическая сцена университета
  - Парящие элементы с лёгкой анимацией (float)

Снизу hero — scroll indicator (анимированная стрелка вниз)

─────────────────────────────────────────────
🔹 3. TRUST BAR
─────────────────────────────────────────────
- Горизонтальная полоса прямо под hero
- Фон: белый с лёгкой тенью
- 4 колонки с иконками:
  ✔ Rasmiy hamkor universitetlar
  ✔ Ochiq va halol xizmat
  ✔ Tezkor aloqa va support
  ✔ Individual yondashuv
- Ниже — логотипы университетов-партнёров (grayscale, 
  при hover становятся цветными)

─────────────────────────────────────────────
🔹 4. ABOUT US
─────────────────────────────────────────────
- Двухколоночная секция
- Слева: большое изображение команды / офиса (rounded-3xl, shadow-2xl)
- Справа:
  Маленький заголовок (gold): "ABOUT US"
  H2: "Nega aynan United Global Consulting?"
  Текст (2 параграфа):
  "Bugungi kunda ko'plab studentlar noto'g'ri ma'lumot, xato hujjatlar 
  yoki ishonchsiz consulting sabab o'z imkoniyatini yo'qotmoqda."
  "Bizning maqsadimiz — har bir studentga to'g'ri yo'l ko'rsatish va 
  xalqaro universitetlarga muvaffaqiyatli qabul qilinishiga yordam 
  berish. Biz siz bilan boshidan oxirigacha birga ishlaymiz."
  
  Три маленькие карточки со статистикой:
  [500+] Muvaffaqiyatli studentlar
  [10+]  Davlatlar
  [5+]   Yillik tajriba

─────────────────────────────────────────────
🔹 5. WHY CHOOSE US
─────────────────────────────────────────────
Заголовок: "Bizning afzalliklarimiz"
Подзаголовок: "Sizning muvaffaqiyatingiz — bizning asosiy maqsadimiz"

Grid 3x2 (на desktop), 1 колонка на mobile
6 карточек с эффектом glassmorphism:
- Border 1px, rounded-2xl
- При hover: lift up 8px + glow shadow
- Иконка сверху (64x64, с градиентным фоном)

Карточки:
1. 🎓 Rasmiy hamkor universitetlar
   "Korea, Singapore, Yevropa va boshqa davlatlardagi universitetlar 
   bilan ishlaymiz."

2. 📄 Professional hujjat tayyorlash
   "Har bir hujjat sinchkovlik bilan tekshiriladi va xatosiz 
   topshiriladi."

3. ✈️ Vizagacha to'liq yordam
   "Ariza topshirishdan tortib elchixona bosqichigacha siz bilan 
   birgamiz."

4. 💬 Doimiy support
   "Savollaringizga 24/7 tezkor javob beramiz."

5. 🌐 Ko'p davlat variantlari
   "Bitta emas, sizga mos eng yaxshi variant tanlanadi."

6. 🎯 Natijaga yo'naltirilgan yondashuv
   "Maqsadimiz — sizni chet elda o'qishga chiqarish."

─────────────────────────────────────────────
🔹 6. COUNTRIES SECTION
─────────────────────────────────────────────
Фон: градиент от soft-blue к white
Заголовок: "Biz yuboradigan davlatlar"
Подзаголовок: "10+ mamlakatda yuzlab universitetlar"

Grid из карточек стран (5x2 или slider):
Каждая карточка:
- Размер: 280x360px
- Верх: большое фото достопримечательности страны (Eiffel Tower, 
  Gangnam, NYC, etc.)
- Флаг в углу (размытый glass circle)
- Название страны (H3, белым)
- Число университетов-партнёров
- Кнопка "Batafsil →"
- Hover: parallax эффект на изображение + подъём карточки

Страны:
🇰🇷 Korea — 25+ universitet
🇸🇬 Singapore — 12+
🇺🇸 America — 30+
🇮🇹 Italy — 15+
🇱🇺 Luxembourg — 5+
🇫🇮 Finland — 10+
🇹🇷 Turkey — 20+
🇯🇵 Japan — 18+
🇱🇻 Latvia — 6+
🇲🇾 Malaysia — 8+

Под карточками — CTA:
"📩 O'zingizga mos davlatni tanlash uchun bizga yozing"

─────────────────────────────────────────────
🔹 7. SERVICES SECTION
─────────────────────────────────────────────
Фон: белый с тонким pattern (dots или grid)
Заголовок: "Bizning xizmatlarimiz"

Layout: 2 колонки — слева изображение/иллюстрация, справа список 
услуг с чекбоксами:

Услуги (9 штук, по 3 в колонке или flowing list):
✔ Universitet tanlash
✔ Admission ariza topshirish
✔ Motivatsion xat tayyorlash
✔ CV tayyorlash
✔ Tarjima va apostil xizmatlari
✔ Scholarship bo'yicha maslahat
✔ Interview tayyorlash
✔ Visa guidance
✔ Safarga tayyorlash

Каждый пункт:
- Чекбокс-иконка (gold gradient)
- Название услуги (bold)
- Краткое описание 1 строка (muted)
- Hover: лёгкое смещение вправо + подсветка

─────────────────────────────────────────────
🔹 8. SCHOLARSHIP SECTION
─────────────────────────────────────────────
Фон: тёмный (deep-blue) с паттерном/звёздами
Текст белый + gold акценты

Заголовок: "Grant va Scholarship imkoniyatlari"
Подзаголовок: "Kontrakt narxidan qo'rqmang — yechim bor"

Основной текст:
"Ko'plab studentlar kontrakt narxidan qo'rqadi. Aslida esa ko'plab 
universitetlarda:"

Grid 2x2 премиум карточек (glassmorphism):
🎓 Partial scholarship     — qisman to'lov qoplanadi
🎓 Full scholarship        — to'liq bepul o'qish
🎓 Tuition discount        — o'qish narxida chegirma
🎓 Merit-based grant       — bilimga qarab grant

Внизу — выделенный блок:
"Biz sizga mos grant variantlarini topishda yordam beramiz"
+ кнопка "Grant imkoniyatlarimni tekshirish →"

─────────────────────────────────────────────
🔹 9. PROCESS SECTION (Как мы работаем)
─────────────────────────────────────────────
Заголовок: "Biz qanday ishlaymiz"
Подзаголовок: "5 oddiy qadam orqali orzuingizga"

Horizontal timeline (desktop) / vertical (mobile):
5 шагов, соединённых пунктирной линией:

01 — Bepul konsultatsiya
     "Sizning maqsad va imkoniyatlaringizni aniqlaymiz"

02 — Universitet tanlash  
     "Profilingizga mos variantlar taklif qilinadi"

03 — Hujjatlarni tayyorlash
     "Barcha kerakli hujjatlar professional tayyorlanadi"

04 — Qabul va viza
     "Admission va visa bosqichida to'liq yordam"

05 — Safar va kuzatuv
     "Chet elga jo'nab ketgandan keyin ham support"

Каждый шаг:
- Большой номер (64px, gold gradient)
- Иконка
- Заголовок (H4)
- Описание

─────────────────────────────────────────────
🔹 10. TRUST / SAFETY SECTION
─────────────────────────────────────────────
Заголовок: "Biz bilan ishlash xavfsiz"
Layout: 2 колонки

Слева — изображение (рукопожатие / документы / печать)
Справа — список с иконками-щитами:

🛡 Rasmiy shartnoma asosida ishlaymiz
🛡 Ochiq narx siyosati  
🛡 Har bosqich bo'yicha ma'lumot beramiz
🛡 Hujjatlarda xatolarga yo'l qo'ymaymiz
🛡 Maxfiylikka rioya qilamiz

─────────────────────────────────────────────
🔹 11. TESTIMONIALS SECTION
─────────────────────────────────────────────
Заголовок: "Studentlar biz haqimizda"
Подзаголовок: "500+ muvaffaqiyatli student"

Swiper slider, 3 карточки видны одновременно (desktop), 
1 на mobile. Autoplay 5sec, pagination dots.

Карточка отзыва (rounded-3xl, shadow-xl, padding 32px):
- 5 звёзд (gold)
- Текст отзыва (italic, 18px)
- Внизу: круглое фото студента + имя + университет + страна

Примеры:
⭐⭐⭐⭐⭐
"Hujjatlarim tez va professional tayyorlandi. Koreadagi Sungkyunkwan 
University'ga qabul oldim!"
— Jasur K., Seoul, Korea

⭐⭐⭐⭐⭐
"Juda minnatdorman. Jarayon davomida doimiy yordam berishdi."
— Malika R., Milan, Italy

⭐⭐⭐⭐⭐
"Full scholarship oldim. United Global rahmat!"
— Sardor A., Singapore

(добавить минимум 6 отзывов для разнообразия)

─────────────────────────────────────────────
🔹 12. STATS SECTION
─────────────────────────────────────────────
Фон: gradient hero style (deep-blue → royal)
4 большие цифры с counter-up анимацией при scroll:

[500+]   Muvaffaqiyatli studentlar
[10+]    Hamkor davlatlar
[50+]    Universitet
[98%]    Qabul foizi

─────────────────────────────────────────────
🔹 13. FAQ SECTION
─────────────────────────────────────────────
Заголовок: "Ko'p beriladigan savollar"
Layout: 2 колонки (на desktop) — слева заголовок + CTA, 
справа аккордеон

Аккордеон (Framer Motion, плавное раскрытие):

❓ IELTS bo'lmasa bo'ladimi?
   Ba'zi universitetlarda IELTS talab qilinmaydi yoki alternativ 
   variantlar mavjud (Duolingo, Internal test, etc.). Biz sizga 
   aynan shu imkoniyatlarni topishda yordam beramiz.

❓ Darajam past bo'lsa imkoniyat bormi?
   Ha, albatta. Har bir studentga individual yondashuv. Sizning 
   darajangizga mos universitetlar topiladi.

❓ Viza olish qiyinmi?
   To'g'ri va to'liq hujjat bilan imkoniyat juda yuqori. Biz har 
   bir bosqichda siz bilan ishlaymiz.

❓ To'lovni bo'lib to'lasa bo'ladimi?
   Ko'p holatda ha. Har bir student uchun qulay to'lov sxemasi 
   tuziladi.

❓ Qancha vaqt oladi jarayon?
   O'rtacha 3-6 oy. Ba'zi tezkor dasturlar 1-2 oyda ham mumkin.

❓ Yoshim qancha bo'lishi kerak?
   Bachelor uchun 17+, Master uchun 21+. Yoshga chegara yo'q 
   hisoblanadi.

─────────────────────────────────────────────
🔹 14. FINAL CTA SECTION
─────────────────────────────────────────────
Фон: dramatic gradient (deep-blue → royal → gold accent)
Или большое фоновое фото (самолёт в небе / студент с дипломом)
Overlay: rgba(10, 37, 64, 0.85)

По центру:
H2: "Bugunoq birinchi qadamni tashlang"
Подзаголовок: "Chet elda o'qish orzusi kutib turmaydi. Bugun 
boshlagan odam ertaga natija ko'radi."

3 кнопки в ряд (или grid):
🟢 WhatsApp    (зелёный, иконка WA)
🔵 Telegram    (синий, иконка TG)
📸 Instagram   (gradient розово-оранжевый)

Каждая кнопка: большая, с иконкой 32px, padding 20px 40px, 
hover scale 1.05 + glow.

─────────────────────────────────────────────
🔹 15. FOOTER
─────────────────────────────────────────────
Фон: очень тёмный (#0A0E1A)
Текст белый/приглушённый

4 колонки:

Колонка 1 (Brand):
- Логотип "United Global Consulting"
- Слоган: "🌍 Your Future Starts Here"
- Короткое описание (2 строки)
- Соцсети (иконки)

Колонка 2 (Quick Links):
- Home
- About Us
- Services
- Countries
- Contact

Колонка 3 (Services):
- University Selection
- Visa Guidance
- Scholarship
- Document Translation

Колонка 4 (Contact):
📞 +998 88 526 30 00
📩 info@unitedglobal.uz
📍 Tashkent, Uzbekistan
🕐 Mon-Sat: 9:00 - 19:00

Внизу футера (border-top):
© 2026 United Global Consulting. All rights reserved.
Privacy Policy | Terms of Service

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 7 — АНИМАЦИИ И ИНТЕРАКТИВНОСТЬ
═══════════════════════════════════════════════════════════════════

Обязательные анимации:

1. Scroll-triggered:
   - Fade in + slide up для всех секций (stagger 0.1s)
   - Counter-up для статистики
   - Parallax для hero и stats

2. Hover effects:
   - Кнопки: scale 1.05 + shadow glow
   - Карточки: lift 8px + shadow
   - Ссылки: underline slide

3. Микроанимации:
   - Плавающие элементы в hero (float up-down)
   - Пульсация CTA кнопок
   - Иконки вращаются/меняют цвет при hover

4. Page transitions:
   - Smooth scroll между якорями
   - Прогресс-бар вверху (показывает scroll progress)

5. Loading:
   - Skeleton loading для изображений
   - Preloader с логотипом (опционально)

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 8 — RESPONSIVE DESIGN (обязательно)
═══════════════════════════════════════════════════════════════════

Breakpoints:
- Mobile:  320px — 640px   (sm)
- Tablet:  641px — 1024px  (md/lg)
- Desktop: 1025px — 1440px (xl)
- Wide:    1441px+         (2xl)

Правила:
- Mobile-first подход
- Все grid превращаются в 1 колонку на mobile
- Шрифты уменьшаются пропорционально
- Кнопки становятся full-width на mobile
- Навигация → бургер-меню
- Hero — уменьшенная версия с вертикальным layout
- Тестировать на iPhone SE (375px) и iPad (768px)

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 9 — ОПТИМИЗАЦИЯ И SEO
═══════════════════════════════════════════════════════════════════

Performance:
- Lighthouse score: 90+ по всем метрикам
- Lazy loading для всех изображений
- WebP/AVIF формат изображений
- Critical CSS inline
- Font-display: swap
- Preload ключевых ресурсов

SEO:
- Meta tags (title, description, keywords)
- Open Graph для соцсетей
- Twitter Card
- Schema.org разметка (Organization, LocalBusiness)
- Sitemap.xml
- Robots.txt
- Canonical URL
- Alt text для всех изображений
- Semantic HTML5 (header, main, section, article, footer)

Accessibility (WCAG 2.1 AA):
- Контраст текста минимум 4.5:1
- Keyboard navigation
- ARIA labels для интерактивных элементов
- Focus states видимые
- Alt text для изображений
- Skip to content ссылка

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 10 — КОНТАКТНАЯ ФОРМА / ЛИД-ФОРМА
═══════════════════════════════════════════════════════════════════

Встроить форму в секцию Final CTA или отдельной модалкой:

Поля:
- Ism (Имя) — required
- Telefon raqam — required, маска +998 __ ___ __ __
- Email — optional
- Qaysi davlat? — dropdown со списком стран
- Qaysi bosqich? (Bachelor/Master/PhD) — radio
- Qo'shimcha ma'lumot — textarea, optional

Валидация в реальном времени.
После отправки — красивый thank-you экран + редирект на WhatsApp.

Интеграция:
- Telegram Bot API (отправка лида в чат)
- Google Sheets (backup)
- Email via Resend/EmailJS

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 11 — ДОПОЛНИТЕЛЬНЫЕ ФИШКИ (PREMIUM)
═══════════════════════════════════════════════════════════════════

1. Floating WhatsApp кнопка (правый нижний угол, пульсация)
2. Back to top кнопка (появляется после 500px скролла)
3. Cookie banner (GDPR compliant)
4. Переключатель языка (UZ/RU/EN) — i18n
5. Dark mode toggle (опционально)
6. Live chat виджет (Tawk.to или Crisp)
7. Video background в hero (с fallback на static image)
8. Instagram feed секция (последние 6 постов)
9. Blog/News teaser (3 последние статьи)
10. Map с офисом (Google Maps / Yandex Maps embed)

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 12 — ФАЙЛОВАЯ СТРУКТУРА
═══════════════════════════════════════════════════════════════════

Если Next.js:

/app
  /layout.tsx
  /page.tsx
  /globals.css
/components
  /layout
    Navbar.tsx
    Footer.tsx
  /sections
    Hero.tsx
    TrustBar.tsx
    About.tsx
    WhyChooseUs.tsx
    Countries.tsx
    Services.tsx
    Scholarship.tsx
    Process.tsx
    Trust.tsx
    Testimonials.tsx
    Stats.tsx
    FAQ.tsx
    FinalCTA.tsx
  /ui
    Button.tsx
    Card.tsx
    Input.tsx
    Accordion.tsx
  /shared
    FloatingWhatsApp.tsx
    BackToTop.tsx
    LanguageSwitcher.tsx
/lib
  /data
    countries.ts
    services.ts
    testimonials.ts
    faq.ts
  utils.ts
/public
  /images
  /icons
  /videos
/styles
  animations.css

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 13 — ДАННЫЕ И КОНТЕНТ
═══════════════════════════════════════════════════════════════════

Все тексты — на узбекском (латиница) как указано выше.
Все данные вынести в отдельные файлы (countries.ts, services.ts и т.д.)
для удобства редактирования.

Контактная информация:
- Телефон: +998 88 526 30 00
- Email: info@unitedglobal.uz (placeholder)
- Адрес: Tashkent, Uzbekistan
- WhatsApp: https://wa.me/998885263000
- Telegram: @unitedglobal
- Instagram: @unitedglobal.uz

═══════════════════════════════════════════════════════════════════
РАЗДЕЛ 14 — ФИНАЛЬНЫЕ ТРЕБОВАНИЯ К КАЧЕСТВУ
═══════════════════════════════════════════════════════════════════

Проект считается готовым на 100%, если:

✅ Все 15 секций реализованы полностью
✅ Дизайн выглядит на уровне Awwwards (премиум)
✅ Responsive работает на всех устройствах (320px — 2560px)
✅ Все анимации плавные (60fps)
✅ Lighthouse Performance 90+
✅ Lighthouse Accessibility 95+
✅ Lighthouse SEO 100
✅ Работает без JS ошибок в консоли
✅ Все ссылки и кнопки функциональны
✅ Форма отправляет данные
✅ Быстрая загрузка (< 2 сек)
✅ Красивая типографика с правильной иерархией
✅ Цветовая палитра соблюдена везде
✅ Нет "дыр" в дизайне (всё выровнено, консистентно)
✅ Кросс-браузерность (Chrome, Safari, Firefox, Edge)

═══════════════════════════════════════════════════════════════════
ИТОГОВАЯ ИНСТРУКЦИЯ
═══════════════════════════════════════════════════════════════════

Приступай к работе последовательно:

ШАГ 1: Создай структуру проекта (все файлы/папки)
ШАГ 2: Настрой Tailwind config с кастомными цветами/шрифтами
ШАГ 3: Создай базовый layout (Navbar + Footer)
ШАГ 4: Реализуй Hero секцию (самая важная)
ШАГ 5: По очереди создай все остальные секции сверху вниз
ШАГ 6: Добавь анимации (Framer Motion)
ШАГ 7: Сделай responsive для mobile/tablet
ШАГ 8: Оптимизируй (images, SEO, performance)
ШАГ 9: Протестируй всё
ШАГ 10: Подготовь к деплою на Vercel/Netlify

НЕ останавливайся до полного завершения всех 15 секций. 
Не пиши "и так далее" — пиши код полностью для каждой секции. 
Если секция большая — разбей на несколько сообщений, но доведи 
до конца. Цель — 100% готовый сайт, который можно сразу 
деплоить в продакшн.

Если чего-то не хватает (например, реальных изображений) — 
используй placeholder от Unsplash с точными URL 
(https://images.unsplash.com/...) и префиксом related keywords.

Используй premium иллюстрации и качественные фото. 
Пиши чистый, читаемый, хорошо структурированный код с 
комментариями где нужно.

НАЧНИ С СОЗДАНИЯ ПРОЕКТА ПРЯМО СЕЙЧАС.
```

---

## 💡 СОВЕТЫ ПО ИСПОЛЬЗОВАНИЮ ПРОМПТА

1. **Для v0.dev / Bolt.new / Lovable** — вставь целиком, они создадут проект сразу.

2. **Для Cursor / Claude Code** — вставь и попроси начать с Шага 1. Потом постепенно проси реализовать каждую секцию.

3. **Для ChatGPT** — разбей на части: сначала структуру, потом каждую секцию отдельно.

4. **Замени placeholder данные** — свои реальные контакты, отзывы, фото.

5. **После генерации** — протестируй на реальном устройстве, запусти Lighthouse, проверь формы.

---

## 📦 ЧТО ПОЛУЧИШЬ В РЕЗУЛЬТАТЕ

- ✅ Production-ready одностраничный сайт
- ✅ Полностью responsive (mobile/tablet/desktop)
- ✅ Premium дизайн уровня топ-агентств
- ✅ Все 15 секций с контентом на узбекском
- ✅ Плавные анимации и интерактивность
- ✅ SEO-оптимизация
- ✅ Готов к деплою на Vercel/Netlify за 1 клик
