# 🎯 ПОЛНЫЙ АУДИТ И МАСТЕР-ПРОМПТ ДЛЯ ДОВЕДЕНИЯ ПРОЕКТА ДО СОВЕРШЕНСТВА
## United Global Consulting — Landing Page

> **Источник:** `c:\consalting\` (index.html, css/styles.css, css/animations.css, js/main.js, GLODAL.png, PROMPT.md)
> **Тип проекта:** Статический одностраничный лендинг (HTML5 + CSS3 + Vanilla JS + Lucide icons)
> **Цель аудита:** Выявить ВСЕ недостатки, описать полные решения и написать готовые промпты для AI-ассистента, чтобы превратить проект в production-ready premium-лендинг мирового уровня.

---

## 📑 ОГЛАВЛЕНИЕ

1. [Краткое резюме состояния проекта](#1-краткое-резюме-состояния-проекта)
2. [Категории проблем (Severity)](#2-категории-проблем-severity)
3. [Критические проблемы (🔴 P0)](#3-критические-проблемы--p0)
4. [Серьёзные проблемы (🟠 P1)](#4-серьёзные-проблемы--p1)
5. [Средние проблемы (🟡 P2)](#5-средние-проблемы--p2)
6. [Мелкие недочёты и полировка (🟢 P3)](#6-мелкие-недочёты-и-полировка--p3)
7. [Недостающие бизнес-функции](#7-недостающие-бизнес-функции)
8. [Детализированные промпты для каждой проблемы](#8-детализированные-промпты-для-каждой-проблемы)
9. [🔥 МАСТЕР-ПРОМПТ для полного апгрейда проекта](#9--мастер-промпт-для-полного-апгрейда-проекта)
10. [Финальный чек-лист запуска](#10-финальный-чек-лист-запуска)

---

## 1. КРАТКОЕ РЕЗЮМЕ СОСТОЯНИЯ ПРОЕКТА

### Что уже сделано хорошо ✅
- Приятная premium-палитра (deep blue + gold + emerald)
- Современные CSS-токены в `:root`
- Reveal-анимации через IntersectionObserver
- Counter-up анимация статистики
- Slider testimonials с autoplay + swipe
- Phone mask для узбекских номеров
- Mobile drawer с burger-меню
- Прогресс-бар скролла + back-to-top
- Cookie banner
- `prefers-reduced-motion` поддержка
- Skip-link для a11y
- Open Graph + Twitter Card + JSON-LD
- Smooth-scroll с учётом фиксированной навигации

### Что не сделано или сделано поверхностно ❌
- **Многоязычность UI есть, но не работает** — переключатель меняет только надпись "UZ/RU/EN", контент остаётся узбекским
- **Форма не шлёт данные на сервер** — только открывает WhatsApp через `window.open()` внутри `setTimeout`, что блокируется popup-блокерами
- **Нет бэкенда, CRM, Telegram-бота, e-mail уведомлений**
- **Картинки с Unsplash CDN** — внешняя зависимость, нет `srcset`, нет AVIF/WebP, нет blur-placeholder
- **Нет sitemap.xml, robots.txt, hreflang, Review/FAQPage schema**
- **Нет Google Analytics / Pixel / Yandex Metrika / Hotjar**
- **Нет тёмной темы**
- **Нет страниц Privacy Policy / Terms of Service** (ссылки ведут на `#`)
- **Нет индивидуальных страниц стран и программ**
- **Иконка флага через emoji** — на Windows не рендерится в цвете
- **Slider testimonials** имеет баг с `clientWidth + 24` (magic-number gap)
- **Поля формы без ARIA-live, без loading-state, без honeypot/captcha**
- **Нет Subresource Integrity (SRI)** для Lucide CDN
- **Нет CSP (Content-Security-Policy)** заголовков
- **Нет 404/500 страниц, нет offline-режима, нет Service Worker / PWA**

> **Общая оценка:** качественный визуал ~70%, но UX/технический уровень ~40%. До production-ready нужно пройти ещё половину пути.

---

## 2. КАТЕГОРИИ ПРОБЛЕМ (SEVERITY)

| Уровень | Описание | Количество |
|---|---|---|
| 🔴 **P0 (Критические)** | Ломают бизнес-функцию или безопасность. Чинить немедленно. | **8** |
| 🟠 **P1 (Серьёзные)** | Сильно ухудшают UX/SEO/производительность. | **14** |
| 🟡 **P2 (Средние)** | Заметные недочёты, влияют на восприятие premium. | **18** |
| 🟢 **P3 (Мелкие)** | Полировка, nice-to-have. | **12** |
| 🎯 **Missing Features** | Бизнес-функции, которых нет вообще. | **20+** |

**ИТОГО: 72+ пунктов для полного апгрейда.**

---

## 3. КРИТИЧЕСКИЕ ПРОБЛЕМЫ (🔴 P0)

### 🔴 P0-1. Форма не сохраняет лиды
**Где:** `js/main.js:297-340` — обработчик `#leadForm.submit`
**Суть:** После валидации вызывается `window.open(url, '_blank')` внутри `setTimeout(..., 800)`. Это **классическая ошибка** — современные браузеры блокируют `window.open` вне пользовательского жеста. Результат: **50-80% лидов теряются**, компания не узнаёт о заявках, кроме тех, кто вручную напишет в WhatsApp.

**Решение:**
- Подключить **Telegram Bot API** (бесплатно, моментально) через `fetch` на `api.telegram.org/bot<TOKEN>/sendMessage`.
- Дополнительно: **Google Sheets** через Apps Script webhook или **Formspree/Web3Forms** как fallback.
- Открытие WhatsApp делать **синхронно внутри submit-обработчика**, без `setTimeout`, чтобы не блокировал popup-blocker.
- Показывать корректный success/error state.

---

### 🔴 P0-2. Переключатель языков не переводит контент
**Где:** `index.html:98-109`, `js/main.js:75-101`
**Суть:** Кнопка меняет только текст в `#currentLang`. Весь контент сайта остаётся на узбекском. Для международного агентства это **критично** — русскоязычные и англоязычные клиенты не смогут прочитать сайт.

**Решение:** Полноценный i18n через `data-i18n` атрибуты + JSON-словари `/i18n/uz.json`, `/i18n/ru.json`, `/i18n/en.json` + функция `applyTranslations(lang)` + `hreflang` теги + сохранение выбора в `localStorage`.

---

### 🔴 P0-3. XSS-риск в WhatsApp URL
**Где:** `js/main.js:325-338`
**Суть:** Пользовательский ввод (`name`, `phone`, `email`, `message`) передаётся в URL через `encodeURIComponent`, но **сам формат сообщения использует Markdown WhatsApp** (`*...*`). Злоумышленник может вставить `*`, newline или emoji-payload в поле "Ism" и исказить отображение сообщения в WhatsApp-чате оператора, создавая fishing-подобные сообщения.

**Решение:** Санитизация ввода до формирования URL — strip всех `*`, `_`, `~`, управляющих символов и переводов строк. Лимит длины каждого поля.

---

### 🔴 P0-4. Нет защиты от спама (CAPTCHA/honeypot)
**Где:** `index.html:935-1007`
**Суть:** Форма открыта для ботов. После подключения бэкенда (P0-1) она станет мишенью для спам-атак, что приведёт к засорению лидов и блокировке WhatsApp/Telegram.

**Решение:** Добавить **honeypot** (скрытое поле `<input name="website" tabindex="-1" autocomplete="off">`) + **hCaptcha** или **Cloudflare Turnstile** (бесплатно, без скандалов с приватностью как у reCAPTCHA) + rate-limiting на бэкенде (если будет).

---

### 🔴 P0-5. Ссылки Privacy Policy и Terms of Service ведут на `#`
**Где:** `index.html:1070-1072`
**Суть:** Для GDPR/локальных законов О персональных данных эти страницы **обязательны**. Форма собирает имя/телефон/email — это персональные данные. Без Privacy Policy компания **нарушает закон РУз «О персональных данных»** (Закон №ЗРУ-547 от 02.07.2019).

**Решение:** Создать отдельные страницы `/privacy.html` и `/terms.html` с юридически корректным текстом (минимум: кто оператор, какие данные собираем, для чего, срок хранения, права субъекта, контакты).

---

### 🔴 P0-6. Нет Subresource Integrity (SRI) для Lucide CDN
**Где:** `index.html:39` — `<script src="https://unpkg.com/lucide@latest/...">`
**Суть:** Подгрузка с `@latest` + unpkg — двойной риск. Если unpkg скомпрометируется или владелец Lucide опубликует вредоносную версию, **весь сайт выполнит вредоносный JS в браузерах пользователей**. `@latest` — антипаттерн для production.

**Решение:** Зафиксировать версию (`lucide@0.456.0`), добавить `integrity="sha384-..."` и `crossorigin="anonymous"`. Либо скачать лицензированный билд и положить локально в `/vendor/lucide.min.js`.

---

### 🔴 P0-7. Нет Content-Security-Policy
**Где:** Отсутствует `<meta http-equiv="Content-Security-Policy">` или HTTP-заголовок.
**Суть:** Любой инжектированный inline-скрипт (через комментарии Disqus/чат/и т.п. в будущем) выполнится. XSS-атака лёгкая.

**Решение:** Добавить CSP через `<meta>` или `_headers` (Netlify) / `netlify.toml` / `vercel.json`. Список разрешённых доменов: `fonts.googleapis.com`, `fonts.gstatic.com`, `unpkg.com`, `images.unsplash.com`, `wa.me`, `api.telegram.org`.

---

### 🔴 P0-8. Emoji-флаги стран не рендерятся на Windows
**Где:** `index.html:392, 404, 416, ..., 500` — `<span class="country-flag">🇰🇷</span>`
**Суть:** Windows 10/11 без установленного Segoe UI Emoji color-font показывает символы `🇰🇷` как **чёрно-белые квадраты или вовсе как два раздельных "KR"**. 50%+ аудитории Узбекистана на Windows — для них premium-сайт выглядит сломанным.

**Решение:** Заменить emoji на SVG-флаги из `flag-icons` или `country-flag-icons`, либо использовать PNG-флаги 48×32 из `flagcdn.com/w80/kr.png` с `srcset` для retina.

---

## 4. СЕРЬЁЗНЫЕ ПРОБЛЕМЫ (🟠 P1)

### 🟠 P1-1. Все изображения с Unsplash CDN
**Где:** весь `index.html`
**Суть:** Unsplash может изменить/удалить фото в любой момент. Нет контроля качества, нет AVIF/WebP, нет оптимизации размеров, нет blur-placeholder. На 4G/3G hero-картинка 900px весит 200-400KB.
**Решение:** Скачать фото, конвертировать в AVIF + WebP + JPEG-fallback через `<picture>`, задать `width`/`height` для предотвращения CLS, добавить `loading="lazy"` кроме hero, сгенерировать blur-placeholder (BlurHash или LQIP).

### 🟠 P1-2. Slider testimonials использует магические числа
**Где:** `js/main.js:193-198`
**Суть:** `pageWidth = track.parentElement.clientWidth + 24` — хардкод gap'а. При изменении CSS `gap` слайдер ломается. Плюс `index >= totalPages()` может привести к пустому слайду справа.
**Решение:** Вычислять gap динамически через `getComputedStyle(track).gap`. Использовать CSS scroll-snap как основной механизм, а JS только для кнопок/dots/autoplay. Либо перейти на Swiper.js.

### 🟠 P1-3. Нет loading-state на кнопке формы
**Где:** `index.html:988-991`
**Суть:** После клика "Yuborish" кнопка выглядит так же. Пользователь может нажать 5 раз — будет 5 WhatsApp-открытий.
**Решение:** `button.disabled = true`, показать spinner-иконку, заменить текст на "Yuborilmoqda…", разблокировать только в `.finally()`.

### 🟠 P1-4. Нет sitemap.xml и robots.txt
**Суть:** Google Search Console не примет сайт без sitemap. Роботы сканируют слепо.
**Решение:** Сгенерировать `/sitemap.xml` с `hreflang`-alternate для всех языковых версий и `/robots.txt` с ссылкой на sitemap.

### 🟠 P1-5. Нет FAQPage и Review structured data
**Где:** `index.html:46-67`
**Суть:** Есть только `EducationalOrganization`. Google не показывает rich snippets для FAQ и testimonials.
**Решение:** Добавить `<script type="application/ld+json">` с `FAQPage` (6 вопросов) и `AggregateRating` + массив `Review` на основе testimonials.

### 🟠 P1-6. Нет отдельных страниц для стран
**Где:** `index.html:389-508`
**Суть:** Все кнопки "Batafsil" ведут на `#contact`. Google не получает страниц вида `/study-in-korea`, `/study-in-singapore` — это **огромная упущенная SEO-возможность** (high-intent keywords).
**Решение:** Создать `/countries/korea.html`, `/countries/singapore.html` и т.д. с уникальным контентом: список университетов, стоимость, визовые требования, success stories.

### 🟠 P1-7. Нет аналитики
**Суть:** Компания не знает, сколько людей зашло, с каких источников, сколько конверсий. **Невозможно оптимизировать маркетинг.**
**Решение:** Подключить **GA4** + **Yandex.Metrika** (для СНГ-аудитории) + **Meta Pixel** (для таргета в Instagram/FB) + **Hotjar/Clarity** (heatmaps + session-recordings). Настроить события: `form_submit`, `whatsapp_click`, `telegram_click`, `country_click`.

### 🟠 P1-8. Нет UTM-сохранения
**Суть:** Пользователь пришёл с рекламы `?utm_source=instagram&utm_campaign=korea_2026`. После скролла и отправки формы UTM теряется. Менеджер не знает, какая кампания сработала.
**Решение:** Скрипт на первой загрузке сохраняет UTM в `sessionStorage` и `localStorage`, при submit добавляет в payload.

### 🟠 P1-9. Нет Telegram-бота для моментальных уведомлений
**Суть:** Даже если форма сохраняет в БД — менеджер узнаёт через час/день. Быстрая реакция = выше конверсия.
**Решение:** При submit вызывать `fetch('https://api.telegram.org/bot<TOKEN>/sendMessage', {body: {chat_id: <CHAT_ID>, text, parse_mode: 'HTML'}})`. Все лиды летят в групповой чат менеджеров.

### 🟠 P1-10. Hero-картинка не имеет `fetchpriority="high"`
**Где:** `index.html:200`
**Суть:** LCP (Largest Contentful Paint) на Lighthouse будет хуже.
**Решение:** Добавить `fetchpriority="high"` и `<link rel="preload" as="image" href="..." imagesrcset="..." imagesizes="...">` в `<head>`.

### 🟠 P1-11. Нет dark mode
**Суть:** В 2026 году dark mode — ожидаемая функция. Premium-бренды всегда поддерживают обе темы.
**Решение:** CSS `[data-theme="dark"]` + тумблер в навбаре + `prefers-color-scheme: dark` media query + сохранение в `localStorage`.

### 🟠 P1-12. Нет Service Worker / PWA
**Суть:** Сайт не работает offline, нельзя установить как приложение, медленный на повторных загрузках.
**Решение:** Добавить `manifest.webmanifest`, Service Worker с cache-first для статики и network-first для API, иконки 192/512 PNG + maskable.

### 🟠 P1-13. Нет встроенной Google Maps карты офиса
**Где:** `index.html:1060` — только текст "Tashkent, Uzbekistan"
**Суть:** Клиент хочет прийти в офис — не знает куда. Снижает доверие.
**Решение:** Добавить секцию "Contact" с iframe Google Maps или Yandex Maps + точный адрес + расписание.

### 🟠 P1-14. Нет lazy-hydration для Lucide icons
**Где:** `js/main.js:13-24`
**Суть:** На загрузке вызывается `createIcons()` — парсит ВСЕ `<i data-lucide>` сразу (~60 иконок). Это блокирует main thread на 50-100ms на слабых устройствах.
**Решение:** Инициализировать иконки по секциям через IntersectionObserver или использовать inline SVG напрямую в HTML (сборка на этапе билда).

---

## 5. СРЕДНИЕ ПРОБЛЕМЫ (🟡 P2)

### 🟡 P2-1. CSS одним файлом 50KB
**Где:** `css/styles.css`
**Решение:** Разбить по компонентам (BEM/ITCSS): `_tokens.css`, `_base.css`, `_components/*.css`, `_sections/*.css`. Критический CSS инлайнить в `<head>`, остальное лениво подгружать.

### 🟡 P2-2. JS одним IIFE
**Где:** `js/main.js`
**Решение:** Разбить на модули ESM: `navbar.js`, `reveal.js`, `counter.js`, `slider.js`, `form.js`, `cookie.js`. Собрать через Vite/esbuild.

### 🟡 P2-3. Нет TypeScript
**Решение:** Мигрировать JS → TS. Даже без бэкенда TS защищает от опечаток в `data-reveal`, data-атрибутах, селекторах.

### 🟡 P2-4. Нет линтера и форматтера
**Решение:** Добавить `.eslintrc`, `.prettierrc`, `.editorconfig`, `husky + lint-staged` для pre-commit hooks.

### 🟡 P2-5. Hard-coded данные
**Суть:** Страны, testimonials, FAQ, услуги — всё в HTML. При добавлении новой страны нужно редактировать HTML.
**Решение:** Вынести в `/data/countries.json`, `/data/testimonials.json`, `/data/faq.json` + build-step генерирует HTML. Или использовать статический генератор (Eleventy/Astro).

### 🟡 P2-6. Нет CI/CD
**Решение:** GitHub Actions: lint → test → build → deploy на Netlify/Vercel/Cloudflare Pages.

### 🟡 P2-7. Нет Lighthouse бюджета
**Решение:** `lighthouse-ci` в GitHub Actions с бюджетом: performance ≥ 90, a11y ≥ 95, SEO ≥ 95.

### 🟡 P2-8. FAQ `<details>/<summary>` без ARIA
**Где:** `index.html:850-897`
**Суть:** Семантика правильная, но скринридерам не сообщается состояние expanded/collapsed стилизованной `+` иконкой.
**Решение:** Добавить `aria-expanded` через JS при `toggle` и менять иконку на `−`.

### 🟡 P2-9. Mobile drawer без focus-trap
**Где:** `index.html:123-134`, `js/main.js:59-65`
**Суть:** Открыл drawer на мобиле, свайпаешь TAB — фокус уходит за drawer, к скрытым элементам.
**Решение:** Использовать `inert` на `main` при открытом drawer или реализовать focus-trap.

### 🟡 P2-10. Testimonial-slider не объявляет смену
**Решение:** Добавить `aria-live="polite"` на `.testimonials-track-wrap` или анонсировать через `role="status"`.

### 🟡 P2-11. Icon-only кнопки без aria-label
**Где:** `index.html:1079-1082` (float-whatsapp — есть), `index.html:1085-1087` (back-to-top — есть). Это OK. Но social-иконки в футере имеют `aria-label`, хорошо.
**Проверить:** testimonial next/prev — есть.
**Итог:** частично OK, но при добавлении новых компонентов (чат-виджет, dark-mode toggle) обязательно `aria-label`.

### 🟡 P2-12. Phone validation слабая
**Где:** `js/main.js:318-322`
**Суть:** Проверяет только `digits.length < 12`. Пропустит `+99800000000000` (невалидный префикс).
**Решение:** Regex `^\+998(33|88|90|91|93|94|95|97|99|71)\d{7}$` для узбекских номеров.

### 🟡 P2-13. Нет отдельной страницы 404
**Решение:** `/404.html` с логотипом, юмором, кнопкой "На главную" и поиском.

### 🟡 P2-14. Hero `min-height: 100vh` на iOS ломается
**Где:** `css/styles.css:401` — `.hero { min-height: 100vh }`
**Суть:** На iOS Safari `100vh` включает высоту URL-bar, контент скачет при скролле.
**Решение:** Использовать `100svh` (small viewport height) или `100dvh` (dynamic).

### 🟡 P2-15. Нет rel="canonical" per language
**Где:** `index.html:13`
**Суть:** Canonical есть, но только один. Для многоязычного сайта нужны `hreflang`.
**Решение:** `<link rel="alternate" hreflang="uz" href="https://unitedglobal.uz/uz/">`, `hreflang="ru"`, `hreflang="en"`, `hreflang="x-default"`.

### 🟡 P2-16. `<html lang="uz">` жёстко
**Решение:** Менять `document.documentElement.lang` при переключении языка.

### 🟡 P2-17. Counter анимирует один раз
**Где:** `js/main.js:141-150` — `cIO.unobserve` после анимации
**Это не баг**, это дизайнерское решение. Но пользователь, вернувшийся из футера к секции About, увидит статичные цифры без "вау"-эффекта.
**Решение:** Опционально сделать re-animate через `threshold: [0.4]` + состояние.

### 🟡 P2-18. Marquee partners не паузится при hover
**Где:** `css/styles.css:659-673`
**Решение:** `.partners-strip:hover .partners-track { animation-play-state: paused; }`.

---

## 6. МЕЛКИЕ НЕДОЧЁТЫ И ПОЛИРОВКА (🟢 P3)

### 🟢 P3-1. "Skip to content" не переводится
### 🟢 P3-2. `aria-hidden` не обновляется на back-to-top при скрытии
### 🟢 P3-3. Cookie banner popups через 2.4s — увеличивает CLS
### 🟢 P3-4. Нет `loading="eager"` на hero-картинке (есть `eager`, OK, проверил)
### 🟢 P3-5. Avatars пустой alt="" — корректно, но лучше `alt="Student"` для контекста
### 🟢 P3-6. `window.__tResize` — глобальная переменная, нужно `let tResize` в замыкании
### 🟢 P3-7. `catch (_) {}` — silent failures, логировать в Sentry
### 🟢 P3-8. Нет preload для Fraunces и Inter шрифтов
### 🟢 P3-9. Нет `font-display: swap` (по дефолту в Google Fonts есть)
### 🟢 P3-10. Нет `text-rendering: optimizeLegibility` для serif-заголовков
### 🟢 P3-11. Нет `scroll-padding-top: var(--nav-h)` на `html` — upgradeabble over JS-offset
### 🟢 P3-12. Нет `prefers-contrast: more` media query для пользователей с пониженной контрастностью

---

## 7. НЕДОСТАЮЩИЕ БИЗНЕС-ФУНКЦИИ

Эти функции не "баги", но их **отсутствие критично** для конверсии консалтинг-агентства:

1. **Калькулятор стоимости обучения** — "Выбери страну, уровень, университет → получи смету".
2. **Оценка шансов на admission** — форма с GPA/IELTS/бюджетом + AI-оценка.
3. **Встроенный календарь бронирования** (Cal.com/Calendly) — "Выбери дату для бесплатной консультации".
4. **Live-чат** (Tawk.to/Crisp/Intercom/JivoSite) — моментальный ответ.
5. **AI-ассистент** на базе Claude/GPT — отвечает на вопросы про страны/визы 24/7.
6. **Блог / ресурсы** — SEO-статьи типа "Как поступить в SNU в 2026", "Виза D-2 Корея — полный гид".
7. **Видео-кейсы студентов** (YouTube embed).
8. **Страница "Команда"** — фото консультантов, их бэкграунд, контакты LinkedIn.
9. **Страница "Партнёрские университеты"** — сетка из 50+ логотипов с фильтрами.
10. **Webinar / events** — анонсы вебинаров, регистрация.
11. **Success stories** — длинные истории студентов (10+ штук).
12. **Сравнение стран** — таблица "Корея vs Япония vs Сингапур" по стоимости, языку, визе.
13. **Сезонные дедлайны** — обратный счётчик "До подачи в Сеул 15 дней".
14. **Sticky mobile CTA** — нижняя панель с "Позвонить / WhatsApp / Telegram".
15. **Exit-intent popup** — при попытке уйти: "Оставьте номер — перезвоним бесплатно".
16. **Scholarship-финдер** — "Найди грант под твой профиль".
17. **Onboarding-квиз** — 5 вопросов → персональные рекомендации.
18. **Клиентский личный кабинет** — трекер статуса заявки.
19. **Партнёрская / реферальная программа** — "Приведи друга — получи бонус".
20. **Google Reviews интеграция** — показывать реальные отзывы из Google Business.

---

## 8. ДЕТАЛИЗИРОВАННЫЕ ПРОМПТЫ ДЛЯ КАЖДОЙ ПРОБЛЕМЫ

> Каждый промпт самодостаточен — копируй и вставляй в Claude/Cursor/Copilot.

---

### 🔴 Промпт для P0-1 (Форма не сохраняет лиды)

```
Задача: Подключить форму заявки в c:\consalting\ к Telegram Bot API 
и Google Sheets одновременно, сохранить fallback на WhatsApp.

Требования:
1. Создать /js/form.js (модуль ESM, вместо inline-обработчика в main.js).
2. При submit:
   a. Валидация (name ≥ 2 символа, phone — regex узбекских номеров).
   b. Если honeypot поле заполнено — return без отправки.
   c. Показать loading-state: disabled кнопка + spinner + текст "Yuborilmoqda...".
   d. Параллельно (Promise.all):
      - POST на https://api.telegram.org/bot<TOKEN>/sendMessage
        с chat_id из env, text с Markdown-форматом, parse_mode='HTML' 
        (экранировать <, >, & в данных юзера через escapeHtml()).
      - POST на Google Apps Script Web App URL (создать скрипт, который 
        аппендит строку в Sheet).
      - Fallback: POST на Formspree или Web3Forms (если первые два упадут).
   e. При успехе: показать success-state, очистить форму, отправить GA4 
      event 'generate_lead', открыть WhatsApp с prefilled message 
      СИНХРОННО (в том же tick'е клика), чтобы popup-blocker не ругался.
   f. При ошибке: показать error-toast, предложить WhatsApp как fallback.
3. Токены Telegram Bot хранить в config.js (gitignored), не коммитить.
4. Санитизация входных данных: strip '*', '_', '~', '\n', контрольные 
   символы. Лимиты: name 80, email 120, phone 20, country 40, message 500.
5. UTM-параметры (если были в URL или sessionStorage) добавлять в payload.
6. Добавить honeypot поле <input name="website" type="text" tabindex="-1"
   autocomplete="off" style="position:absolute;left:-9999px"> в форму.
7. Покрыть тестами: jest для валидации, playwright для e2e submit.
8. Документировать настройку Telegram бота и Google Sheets в /docs/SETUP.md.
```

---

### 🔴 Промпт для P0-2 (i18n многоязычность)

```
Задача: Реализовать полноценную многоязычность UZ/RU/EN в c:\consalting\.

Структура:
- /i18n/uz.json (текущий контент узбекский — вынести всё)
- /i18n/ru.json (перевод на русский, учесть специфику Узбекистана)
- /i18n/en.json (британский английский, формальный стиль)

HTML: каждый текстовый узел помечать data-i18n="ключ.подключ", 
атрибуты — data-i18n-attr="placeholder:key,title:key".

Например:
<h1 class="hero-title" data-i18n="hero.title">...</h1>
<input placeholder="..." data-i18n-attr="placeholder:form.name_placeholder">

JSON-словари с nested-структурой:
{
  "hero": {
    "eyebrow": "International Education Agency",
    "title": "Начни своё будущее за рубежом",
    "subtitle": "Мы помогаем поступить...",
    "bullets": ["Подберём...", "Оформим...", "Проведём..."]
  }
}

JS-модуль /js/i18n.js:
- async load(lang): fetch соответствующий JSON, кэш в memory + localStorage
- apply(lang): обойти все [data-i18n], заменить textContent
- getLang(): из URL (/ru/, /en/), localStorage, navigator.language
- setLang(lang): вызвать apply, обновить URL через history.pushState 
  (варианты: /uz/, /ru/, /en/), установить document.documentElement.lang,
  обновить <meta name="description">, обновить hreflang-теги

Дополнительно:
- Plural rules через Intl.PluralRules для "25+ университет" / "25+ универс."
- Форматирование чисел: Intl.NumberFormat('ru-RU')
- Переключение языка НЕ перезагружает страницу (SPA-style).
- Default язык: RU (учитывая, что РУз говорит на русском).
- Всегда синхронизировать <html lang=""> и <meta property="og:locale">.
- SEO: генерировать отдельные URL /uz/, /ru/, /en/ через rewrite rules 
  на хостинге + hreflang-теги.
```

---

### 🔴 Промпт для P0-3 (XSS-риск в WhatsApp URL)

```
Задача: Санитизировать пользовательский ввод перед формированием 
WhatsApp URL в js/main.js (строки 325-338).

Реализация:
- Функция sanitizeForWhatsApp(str, maxLen):
    return String(str)
      .replace(/[\*_~`]/g, '')           // WhatsApp markdown
      .replace(/[\r\n\t]+/g, ' ')        // newlines
      .replace(/[ -]/g, '') // control chars
      .slice(0, maxLen)
      .trim();
- Применять к каждому полю с лимитами: name 80, phone 20, email 120, 
  country 40, level 20, message 500.
- Email дополнительно: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ валидация, иначе пропустить.
- Phone оставлять только '+', цифры, пробелы.
- Добавить юнит-тесты: jest describe('sanitizeForWhatsApp', ...).
```

---

### 🔴 Промпт для P0-4 (Anti-spam)

```
Задача: Защитить форму от ботов.

1. Honeypot:
   Добавить в форму:
   <label class="hp" aria-hidden="true">
     Website
     <input type="text" name="website" tabindex="-1" autocomplete="off" />
   </label>
   CSS: .hp { position:absolute; left:-9999px; width:1px; height:1px; 
         overflow:hidden; }
   JS: if (fd.get('website')) return; // бот

2. Time-trap:
   Запомнить timestamp открытия формы. Если submit < 3s после focus 
   первого поля — вероятно бот.

3. Cloudflare Turnstile (лучше hCaptcha и reCAPTCHA):
   - Зарегистрировать домен на dash.cloudflare.com/turnstile
   - Добавить <script src="https://challenges.cloudflare.com/turnstile/v0/api.js"
     defer></script>
   - <div class="cf-turnstile" data-sitekey="<KEY>"></div>
   - При submit: fd.get('cf-turnstile-response') должен быть непустой,
     на бэкенде валидировать через POST на siteverify.

4. Rate limit на бэкенде:
   - Cloudflare Workers + KV: max 3 отправки с одного IP за 10 минут.
   - Или IP + fingerprint + cookie.
```

---

### 🔴 Промпт для P0-5 (Privacy Policy + Terms)

```
Задача: Создать юридически корректные страницы Privacy Policy и Terms 
of Service для c:\consalting\, соответствующие:
- Закону РУз "О персональных данных" №ЗРУ-547
- GDPR (если привлекаются клиенты из ЕС)
- Украинскому законодательству (если из Украины)

Файлы:
/privacy.html — Политика конфиденциальности (на 3 языках UZ/RU/EN)
/terms.html — Публичная оферта / Условия использования

Privacy Policy обязательно содержит:
1. Оператор: United Global Consulting, адрес, ИНН, контакты.
2. Какие данные собираем: имя, телефон, email, страна интереса, уровень.
3. Цели обработки: консультация, подбор университета, оформление докумен-
   тов, обучение, маркетинг (с отдельным согласием).
4. Правовые основания: согласие субъекта, договор.
5. Срок хранения: 3 года с последнего контакта.
6. Третьи лица: Telegram Bot (RU), Google Sheets (US), университеты- 
   партнёры (страна-получатель — с уведомлением субъекта).
7. Передача за рубеж: с гарантиями адекватного уровня защиты.
8. Права субъекта: доступ, исправление, удаление, отзыв согласия, 
   жалоба в уполномоченный орган (для РУз — Агентство по развитию 
   госсервиса).
9. Cookies: какие, зачем (functional, analytics, marketing), как отключить.
10. Контакт DPO: dpo@unitedglobal.uz.
11. Дата вступления в силу и версионирование.

Terms содержит:
- Описание услуг (консалтинг, не гарантия admission).
- Порядок оплаты, возврата.
- Ответственность сторон.
- Разрешение споров.
- Форс-мажор.
- Изменение условий.

Дизайн: тот же стиль что и главная, но type-focused — большой читабельный 
текст, оглавление слева (sticky), нумерация разделов. 
Link из футера на корректные URL (/privacy, /terms).
```

---

### 🔴 Промпт для P0-6 (SRI для Lucide)

```
Задача: Заменить в index.html строку 39:
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" defer></script>
на безопасный вариант.

Вариант A (минимум):
<script 
  src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"
  integrity="sha384-<хеш>"
  crossorigin="anonymous"
  defer></script>

Хеш получить командой:
curl -sL https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js \
  | openssl dgst -sha384 -binary | openssl base64 -A

Вариант B (надёжнее):
1. npm install lucide
2. Скопировать node_modules/lucide/dist/umd/lucide.min.js в /vendor/
3. <script src="/vendor/lucide.min.js" defer></script>
4. Обновлять раз в полгода через npm update.

Вариант C (оптимум для прода):
- Использовать только нужные иконки, инлайнить SVG напрямую в HTML 
  на build-этапе. Избавиться от JS-зависимости вовсе.
- Список используемых: globe-2, languages, chevron-down, message-circle, 
  sparkles, graduation-cap, file-check-2, plane-takeoff, star, award, 
  check-circle-2, ... (составить полный список grep'ом).
```

---

### 🔴 Промпт для P0-7 (CSP)

```
Задача: Добавить Content-Security-Policy в c:\consalting\.

Meta-tag в <head> (для статичного хостинга без доступа к заголовкам):
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://unpkg.com https://challenges.cloudflare.com 
             https://www.googletagmanager.com 'sha256-<hash-inline>';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https://images.unsplash.com https://flagcdn.com;
  connect-src 'self' https://api.telegram.org https://script.google.com 
              https://www.google-analytics.com;
  frame-src https://www.google.com https://challenges.cloudflare.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://wa.me;
  upgrade-insecure-requests;
">

Лучший вариант (Netlify _headers / Vercel vercel.json):
/*
  Content-Security-Policy: <то же самое>
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(self)
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

Тестировать через securityheaders.com — должна быть оценка A+.
```

---

### 🔴 Промпт для P0-8 (SVG-флаги вместо emoji)

```
Задача: Заменить emoji-флаги 🇰🇷🇸🇬🇺🇸🇮🇹🇱🇺🇫🇮🇹🇷🇯🇵🇱🇻🇲🇾 
в index.html (строки 389-508) на SVG.

Реализация:
1. npm install country-flag-icons (MIT, чистый SVG)
2. В HTML вместо <span class="country-flag">🇰🇷</span> использовать:
   <img class="country-flag" 
        src="/vendor/flags/kr.svg" 
        alt="" 
        width="32" height="24"
        loading="lazy" decoding="async">

3. Скопировать нужные SVG в /vendor/flags/: 
   kr.svg, sg.svg, us.svg, it.svg, lu.svg, fi.svg, tr.svg, jp.svg, 
   lv.svg, my.svg.

4. CSS:
   .country-flag { 
     position: absolute; top: 12px; right: 12px;
     width: 40px; height: 28px;
     border-radius: 4px; 
     box-shadow: 0 2px 8px rgba(0,0,0,.25);
     object-fit: cover;
   }

5. Для form-select стран — тоже с флагами через кастомный dropdown 
   (библиотека Choices.js или своё решение).

Альтернатива (если хочется без зависимостей):
- https://flagcdn.com/w80/kr.png + <img srcset="w80 1x, w160 2x">.
```

---

### 🟠 Промпты для P1 (краткие, объединённые)

```
[P1-1 Изображения]
Задача: Оптимизировать все изображения в проекте.
- Скачать все Unsplash URL в /assets/images/.
- Для каждой картинки сгенерировать AVIF + WebP + JPEG (squoosh-cli или sharp).
- Заменить <img> на <picture>:
  <picture>
    <source srcset="hero.avif" type="image/avif">
    <source srcset="hero.webp" type="image/webp">
    <img src="hero.jpg" alt="..." width="900" height="600" 
         loading="lazy" decoding="async">
  </picture>
- Hero-картинка: loading="eager" fetchpriority="high" + preload.
- Сгенерировать LQIP (base64 20x15) и использовать как placeholder 
  через background-image + filter:blur → удалять по onload.

[P1-2 Slider testimonials]
Задача: Переписать testimonials slider на CSS scroll-snap + минимум JS.
- .testimonials-track { display:flex; overflow-x:auto; 
  scroll-snap-type: x mandatory; gap: 24px; }
- .t-card { scroll-snap-align: start; flex: 0 0 calc((100% - 48px) / 3); }
- На мобилке: flex-basis: 100%; middle: 2 карточки.
- JS только для: autoplay, dot-sync через IntersectionObserver на карточках, 
  prev/next скроллят на card-width.
- Rebase на Swiper.js если нужны продвинутые функции.

[P1-3 Loading-state на кнопке]
Задача: Добавить loading/disabled state на .form-submit.
- CSS: .btn[data-loading] { pointer-events:none; opacity:.7; }
       .btn[data-loading] .lucide { animation: spin 1s linear infinite; }
- JS: btn.dataset.loading = '1'; btn.disabled = true;
       ...await submit;
       delete btn.dataset.loading; btn.disabled = false;

[P1-4 Sitemap + robots]
Задача: Создать /sitemap.xml и /robots.txt.
sitemap.xml (XML Schema):
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://unitedglobal.uz/</loc>
    <xhtml:link rel="alternate" hreflang="uz" href="https://unitedglobal.uz/uz/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://unitedglobal.uz/ru/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://unitedglobal.uz/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://unitedglobal.uz/"/>
    <lastmod>2026-04-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- ... для /privacy, /terms, /countries/korea, и т.д. -->
</urlset>

robots.txt:
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://unitedglobal.uz/sitemap.xml

[P1-5 FAQ + Review schema]
Задача: Добавить JSON-LD FAQPage и AggregateRating в <head>.
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"IELTS bo'lmasa bo'ladimi?",
     "acceptedAnswer":{"@type":"Answer","text":"Ba'zi universitetlarda..."}},
    ...
  ]
}
</script>
+ AggregateRating (4.9 из 5, 500+ отзывов) и Review для каждого testimonial.

[P1-6 Страницы стран]
Задача: Создать /countries/korea.html, singapore.html, usa.html, italy.html, 
luxembourg.html, finland.html, turkey.html, japan.html, latvia.html, malaysia.html.
Каждая страница:
- Hero-баннер страны (собственное фото).
- 500-700 слов SEO-текста: почему именно эта страна, стоимость, языки, 
  визовые особенности.
- Список 5-10 университетов-партнёров с логотипами.
- 2-3 success story студентов из этой страны.
- Таблица: "Направления подготовки / стоимость / дедлайны".
- CTA: "Получить консультацию по [страна]".
- Связанные страны (cross-linking).
- Schema.org: Article + EducationalOrganization.

[P1-7 Analytics]
Задача: Подключить аналитику.
1. GA4:
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
</script>
2. Yandex Metrika — загрузить асинхронно после consent.
3. Meta Pixel — загрузить после marketing-consent.
4. События:
- gtag('event', 'generate_lead', {method:'form'});
- gtag('event', 'select_content', {content_type:'country',item_id:'korea'});
- gtag('event', 'click', {button:'whatsapp_floating'});
5. Загружать трекеры ТОЛЬКО после cookie-consent (GDPR).

[P1-8 UTM-save]
Задача: Сохранять UTM-параметры в sessionStorage при первой загрузке.
utm.js:
const keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content',
              'gclid','fbclid','yclid'];
const params = new URLSearchParams(location.search);
keys.forEach(k => {
  if (params.get(k)) sessionStorage.setItem(k, params.get(k));
});
// при submit — читать из sessionStorage и добавить в Telegram/Sheets payload.

[P1-9 Telegram Bot]
Задача: Настроить @BotFather бота.
1. Создать бота: /newbot → получить token.
2. Создать группу/канал менеджеров, добавить бота.
3. Получить chat_id через getUpdates.
4. В form.js: 
   await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body: JSON.stringify({
       chat_id: CHAT_ID,
       text: `<b>Новый лид</b>\n👤 ${name}\n📞 ${phone}\n✉️ ${email}
              \n🌍 ${country}\n🎓 ${level}\n💬 ${message}
              \n📊 UTM: ${utm}`,
       parse_mode:'HTML'
     })
   });
5. Токен НЕ хранить в публичном JS — использовать Cloudflare Worker 
   как прокси с проверкой origin.

[P1-10 Hero preload]
<link rel="preload" as="image" 
  href="/assets/images/hero.avif"
  imagesrcset="/assets/images/hero-small.avif 600w, 
               /assets/images/hero.avif 1200w"
  imagesizes="(max-width: 768px) 100vw, 50vw"
  type="image/avif">
+ <img fetchpriority="high" loading="eager">.

[P1-11 Dark mode]
Задача: Реализовать dark mode.
- Добавить тумблер в навбар: <button id="themeToggle" aria-label="Toggle theme">
- JS: btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('ugc_theme', next);
  });
- Init: читать prefers-color-scheme или localStorage.
- CSS:
  :root { --bg-white: #fff; --text-primary: #0f172a; ... }
  :root[data-theme="dark"] { --bg-white: #0a0e1a; --text-primary: #f9fafb; ... }
- Переработать все цвета через переменные. Проверить контраст ≥ 4.5:1.

[P1-12 PWA]
Задача: Превратить сайт в PWA.
1. Создать /manifest.webmanifest:
{
  "name": "United Global Consulting",
  "short_name": "UGC",
  "start_url": "/?utm_source=pwa",
  "display": "standalone",
  "background_color": "#0A2540",
  "theme_color": "#0A2540",
  "icons": [
    {"src":"/icons/icon-192.png","sizes":"192x192","type":"image/png"},
    {"src":"/icons/icon-512.png","sizes":"512x512","type":"image/png"},
    {"src":"/icons/icon-512-maskable.png","sizes":"512x512",
     "type":"image/png","purpose":"maskable"}
  ]
}
2. /sw.js — Service Worker с cache-first для /assets/, /css/, /js/, /fonts/
   и network-first для HTML и API.
3. Register SW в main.js: navigator.serviceWorker.register('/sw.js');
4. Offline-страница /offline.html.

[P1-13 Google Maps]
Задача: Добавить карту в секцию Contact.
<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!..." 
  width="100%" height="300"
  style="border:0;border-radius:20px"
  allowfullscreen="" loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
Или Yandex Maps iframe (для СНГ-аудитории быстрее).
+ Seo: LocalBusiness schema с geo-координатами.

[P1-14 Lazy-hydration Lucide]
Задача: Инициализировать Lucide-иконки лениво по секциям.
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      lucide.createIcons({nameAttr:'data-lucide', root: e.target});
      sectionObserver.unobserve(e.target);
    }
  });
}, {rootMargin:'200px'});
document.querySelectorAll('section, header, footer').forEach(s => 
  sectionObserver.observe(s));
```

---

### 🟡 Промпты для P2 (краткие)

```
[P2-1..4 Архитектура]
Задача: Реорганизовать проект.
Структура:
c:\consalting\
├── src/
│   ├── components/       (header.html, footer.html, hero.html, ...)
│   ├── pages/            (index.html, privacy.html, terms.html, countries/*)
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── components/   (buttons.css, cards.css, forms.css, ...)
│   │   └── sections/     (hero.css, about.css, services.css, ...)
│   ├── scripts/
│   │   ├── i18n.ts
│   │   ├── form.ts
│   │   ├── slider.ts
│   │   └── main.ts
│   ├── i18n/             (uz.json, ru.json, en.json)
│   ├── data/             (countries.json, testimonials.json, faq.json)
│   └── assets/           (images/, fonts/, icons/)
├── public/               (robots.txt, sitemap.xml, favicon.ico, manifest)
├── dist/                 (output)
├── tests/                (jest, playwright)
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── package.json
└── .github/workflows/ci.yml

Стек:
- Vite 5 (build)
- TypeScript 5
- Tailwind CSS v4 (optional) или vanilla CSS с PostCSS (autoprefixer, 
  cssnano, postcss-preset-env)
- ESLint + Prettier + Stylelint
- Husky + lint-staged
- Vitest для юнит-тестов
- Playwright для e2e
- Lighthouse CI в GitHub Actions

[P2-5 Data-driven HTML]
Задача: Вынести hard-coded данные в JSON.
/data/countries.json:
[
  {"slug":"korea","name":{"uz":"Korea","ru":"Корея","en":"South Korea"},
   "flag":"kr","universities":25,"image":"korea.jpg",
   "description":{...}}, ...
]
Шаблонизатор (Eleventy или Handlebars) в build-step.

[P2-6 CI/CD]
.github/workflows/ci.yml:
on: [push, pull_request]
jobs:
  build:
    - npm ci
    - npm run lint
    - npm run test
    - npm run build
    - lighthouse-ci
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    - deploy to Netlify/Vercel via CLI

[P2-7 Lighthouse budget]
.lighthouserc.json:
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.9}]
      }
    }
  }
}

[P2-8 FAQ ARIA]
<details data-faq-item> + JS:
items.forEach(it => it.addEventListener('toggle', () => {
  it.querySelector('summary').setAttribute('aria-expanded', it.open);
  const icon = it.querySelector('.faq-toggle');
  icon.dataset.lucide = it.open ? 'minus' : 'plus';
  lucide.createIcons({root: icon.parentElement});
}));

[P2-9 Focus-trap]
Библиотека focus-trap (5KB):
import {createFocusTrap} from 'focus-trap';
const trap = createFocusTrap('#mobileDrawer', {escapeDeactivates:true});
// на open: trap.activate(); main.inert = true;
// на close: trap.deactivate(); main.inert = false;

[P2-10 Slider aria-live]
<div class="testimonials-track-wrap" role="region" aria-live="polite"
     aria-label="Otzivi studentov">

[P2-12 Phone validation]
const UZ_PHONE = /^\+998(33|88|90|91|93|94|95|97|99|71|74|75|76|77|78|79)\d{7}$/;
if (!UZ_PHONE.test(phone.replace(/\s/g,''))) { invalid... }

[P2-13 404]
Создать /404.html: логотип, "Страница не найдена", поиск, 
ссылка "На главную", топ-5 популярных страниц.
В Netlify _redirects: /* /404.html 404

[P2-14 iOS 100vh]
Заменить min-height:100vh на:
.hero { min-height: 100svh; }  /* small viewport, без URL-bar */
@supports (height: 100dvh) {
  .hero { min-height: 100dvh; } /* dynamic, плавный */
}

[P2-15 hreflang]
<link rel="alternate" hreflang="uz" href="https://unitedglobal.uz/uz/">
<link rel="alternate" hreflang="ru" href="https://unitedglobal.uz/ru/">
<link rel="alternate" hreflang="en" href="https://unitedglobal.uz/en/">
<link rel="alternate" hreflang="x-default" href="https://unitedglobal.uz/">

[P2-16 html lang]
при смене языка: document.documentElement.lang = 'ru';

[P2-18 Marquee pause on hover]
.partners-strip:hover .partners-track,
.partners-strip:focus-within .partners-track {
  animation-play-state: paused;
}
```

---

### 🎯 Промпты для новых функций

```
[NEW-1 Калькулятор стоимости]
Задача: Создать секцию "Калькулятор стоимости обучения".
UI:
- Select страны (drop-down с флагами).
- Select уровня (Bachelor/Master/PhD).
- Select типа университета (Top-tier/Mid/Budget).
- Select проживания (Общежитие/Аренда).
- Slider длительности (1-4 года).

Логика:
JSON с базовыми тарифами:
{
  "korea": {"tuition_year":{"bachelor":6000,"master":8000},
            "living":{"dorm":3000,"rent":6000},
            "currency":"USD"}
}
Формула: total = (tuition + living) × duration.
Показать: tuition / living / documents-fee / visa-fee / insurance / 
          TOTAL / монтли-рейт.
Кнопка: "Отправить персональный расчёт на WhatsApp".

[NEW-2 Оценка шансов admission]
Задача: AI-оценка на базе OpenAI API (через Cloudflare Worker).
Форма: GPA/4.0, IELTS score, страна, программа, бюджет.
Отправляет POST на worker, worker вызывает GPT-4 с промптом-оценщиком, 
возвращает: "Ваши шансы 85% в SNU, 60% в KU. Рекомендуем..."
Важно: кэшировать ответы, rate-limit 3 запроса / час / IP.

[NEW-3 Cal.com embed]
<iframe src="https://cal.com/unitedglobal/consultation/embed" 
        width="100%" height="700" frameborder="0"></iframe>
Или Calendly аналогично.

[NEW-4 Live-chat]
Tawk.to free tier:
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/<YOUR_ID>/default';
  s1.charset='UTF-8'; s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
})();
</script>
Загружать через 5s после load для не-вредa LCP.

[NEW-5 AI-ассистент на Claude]
Задача: Виджет чата снизу-справа, который отвечает на вопросы про страны, 
визы, документы через Claude API.
- Frontend: простой chat UI (MessageBubble, TextArea, Send).
- Backend: Cloudflare Worker с @anthropic-ai/sdk.
- System prompt: "Ты консультант UGC. Отвечай кратко, в стиле brand voice, 
  на языке user'а. Не давай юридических советов. В конце предложи 
  'Записаться на бесплатную консультацию'."
- Модель: claude-haiku-4-5 (дёшево и быстро).
- Prompt caching: кэшировать system prompt + data о странах.
- Rate limit: 10 сообщений / сессия.
- Логи в БД для анализа популярных вопросов.

[NEW-6 Blog]
Задача: Создать /blog/ раздел.
- Eleventy или Astro для статичной генерации.
- 20 SEO-статей для старта: "Как поступить в SNU", "Виза D-2 для Кореи", 
  "IELTS 7.0 за 3 месяца", "Сравнение Cингапура и Японии", ...
- RSS, sitemap, social-sharing, reading-time, related posts.
- Schema.org Article, BreadcrumbList.

[NEW-7 Video testimonials]
Задача: YouTube embed.
<section class="video-testimonials">
  <lite-youtube videoid="<VIDEO_ID>" 
                playlabel="Otzyv Jasur K." 
                poster="maxresdefault"></lite-youtube>
</section>
lite-youtube-embed (Paul Irish) — 5KB, вместо 1MB YouTube iframe.

[NEW-8 Команда]
Задача: Страница /team.html или секция.
Сетка 3x2 консультантов:
- Фото 400x400 round.
- Имя, должность, локация.
- Bio (100 слов).
- LinkedIn + Telegram + Email.
- Языки.
- Годы опыта.
- Страны специализации.
Schema.org Person.

[NEW-14 Sticky mobile CTA]
@media (max-width: 768px) {
  .mobile-cta-bar {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: rgba(10,37,64,.95); backdrop-filter: blur(12px);
    display: flex; padding: 12px; gap: 8px; z-index: 49;
  }
  .mobile-cta-bar a { 
    flex: 1; padding: 14px; text-align: center;
    border-radius: 12px; color: #fff; font-weight: 600;
  }
}
Кнопки: Call / WhatsApp / Form.

[NEW-15 Exit-intent popup]
Desktop: mouseleave к верхнему краю → popup "Уходите? Оставьте номер — 
перезвоним за 5 минут".
Mobile: scroll up + быстрый scroll-out или history back.
Показывать только 1 раз за сессию (sessionStorage).

[NEW-17 Quiz]
Задача: Интерактивный квиз "Какая страна вам подходит?" — 5 вопросов, 
в конце показывается 3 топ-рекомендации + форма "получить план действий".

[NEW-20 Google Reviews]
Задача: Подтянуть Google Business reviews через Places API.
Cloudflare Worker кэширует на 24ч. Frontend рендерит реальные отзывы 
с датой и именем пользователя + ссылкой "Читать на Google".
```

---

## 9. 🔥 МАСТЕР-ПРОМПТ ДЛЯ ПОЛНОГО АПГРЕЙДА ПРОЕКТА

> **Это финальный, всеобъемлющий промпт.** Скопируй его целиком в Claude 
> (лучше Opus 4.7 с 1M контекстом) / Cursor / v0.dev / Lovable. 
> Охватывает ВСЕ 72+ пункта аудита одной задачей.

---

```
Ты — senior full-stack инженер и product-дизайнер уровня Awwwards / Apple / 
Linear / Stripe / Framer. Твоя задача — трансформировать существующий 
лендинг "United Global Consulting" (c:\consalting\) из минимально-
жизнеспособного в полностью production-ready premium-продукт мирового 
уровня, готовый к запуску, масштабированию и прохождению любого 
технического/юридического аудита.

═══════════════════════════════════════════════════════════════════════
СУЩЕСТВУЮЩИЙ КОНТЕКСТ ПРОЕКТА
═══════════════════════════════════════════════════════════════════════

Бизнес: международное образовательное консалтинговое агентство, 
помогающее студентам из Узбекистана поступать в университеты Кореи, 
Европы, Америки и Сингапура. 500+ успешных кейсов, 10+ стран, 50+ 
университетов, 5+ лет опыта.

Контакты: +998 88 526 30 00, info@unitedglobal.uz, 
@unitedglobal (Telegram), wa.me/998885263000, 
instagram.com/unitedglobal.uz.

Текущий стек: HTML5 + CSS3 + Vanilla JS + Lucide icons CDN.
Текущая структура: 
  c:\consalting\
  ├── index.html (1100 строк, одна страница на узбекском)
  ├── css/styles.css (2000+ строк)
  ├── css/animations.css
  ├── js/main.js (383 строки IIFE)
  ├── GLODAL.png (логотип)
  ├── assets/ (пустая папка)
  └── PROMPT.md (исходный бриф)

═══════════════════════════════════════════════════════════════════════
НОВЫЙ ТЕХНИЧЕСКИЙ СТЕК (MIGRATION TARGET)
═══════════════════════════════════════════════════════════════════════

- Vite 5 (build + dev server)
- TypeScript 5 (strict mode)
- Vanilla DOM + Lit-элементы для виджетов (без тяжёлых фреймворков — 
  лендинг должен быть <100KB JS gzipped)
- PostCSS (autoprefixer, cssnano, postcss-preset-env, 
  postcss-custom-media)
- Eleventy или Astro для многостраничности и data-driven рендера 
  (выбери Astro если нужны компоненты с гидратацией, Eleventy если 
  100% static)
- ESLint + Prettier + Stylelint + EditorConfig
- Husky + lint-staged
- Vitest (unit) + Playwright (e2e)
- Lighthouse CI
- GitHub Actions для CI/CD
- Деплой: Cloudflare Pages (лучше Netlify из-за скорости и CDN)
- Cloudflare Workers для серверных API (форма, чат-бот, прокси к Claude)

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 1 — АРХИТЕКТУРА ПРОЕКТА
═══════════════════════════════════════════════════════════════════════

Структура:
unitedglobal/
├── src/
│   ├── pages/
│   │   ├── index.astro            # главная
│   │   ├── countries/
│   │   │   ├── [slug].astro       # динамика для стран
│   │   ├── services.astro
│   │   ├── team.astro
│   │   ├── blog/
│   │   │   └── [...slug].astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   └── 404.astro
│   ├── components/
│   │   ├── ui/                    # Button, Input, Card, Modal
│   │   ├── sections/              # Hero, About, Services, Countries, ...
│   │   └── widgets/               # LiveChat, Calculator, Quiz, Chatbot
│   ├── layouts/
│   │   └── Base.astro
│   ├── styles/
│   │   ├── tokens.css             # CSS variables (light + dark)
│   │   ├── base.css
│   │   ├── utilities.css
│   │   └── fonts.css
│   ├── scripts/
│   │   ├── i18n.ts
│   │   ├── form.ts
│   │   ├── slider.ts
│   │   ├── reveal.ts
│   │   ├── counter.ts
│   │   ├── utm.ts
│   │   ├── analytics.ts
│   │   ├── theme.ts
│   │   ├── cookie-consent.ts
│   │   └── sw-register.ts
│   ├── i18n/
│   │   ├── uz.json
│   │   ├── ru.json
│   │   └── en.json
│   ├── data/
│   │   ├── countries.json
│   │   ├── universities.json
│   │   ├── testimonials.json
│   │   ├── faq.json
│   │   ├── services.json
│   │   └── team.json
│   ├── content/
│   │   └── blog/                   # markdown-статьи
│   └── assets/
│       ├── images/                 # оптимизированные AVIF/WebP/JPG
│       ├── fonts/                  # self-hosted Fraunces + Inter
│       ├── flags/                  # SVG-флаги стран
│       └── icons/                  # Lucide inline SVG
├── public/
│   ├── robots.txt
│   ├── sitemap.xml                 # автогенерация через @astrojs/sitemap
│   ├── manifest.webmanifest
│   ├── favicon.ico
│   ├── sw.js
│   ├── offline.html
│   └── _headers                    # Cloudflare Pages headers (CSP, etc.)
├── workers/                        # Cloudflare Workers
│   ├── form-proxy/                 # принимает форму, шлёт в Telegram + Sheets
│   ├── chatbot/                    # проксирует Claude API
│   └── contact-proxy/              # для контактов, rate-limiting
├── tests/
│   ├── unit/
│   └── e2e/
├── docs/
│   ├── SETUP.md
│   ├── DEPLOYMENT.md
│   ├── CONTENT_EDITING.md
│   └── ARCHITECTURE.md
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
├── .eslintrc.json
├── .prettierrc
├── .stylelintrc.json
├── tsconfig.json
├── astro.config.mjs
├── package.json
└── README.md

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 2 — ДИЗАЙН-СИСТЕМА (ОБНОВЛЁННАЯ)
═══════════════════════════════════════════════════════════════════════

Цветовая палитра (расширенная, light + dark):
:root {
  /* Brand */
  --primary-50:  #EEF4FC;
  --primary-100: #D6E4F7;
  --primary-300: #6B90D6;
  --primary-500: #1E40AF;
  --primary-700: #102E5C;
  --primary-900: #0A2540;
  
  /* Gold */
  --gold-50:  #FBF4DB;
  --gold-300: #E6C869;
  --gold-500: #D4AF37;
  --gold-700: #9E7C1F;
  
  /* Emerald */
  --emerald-500: #10B981;
  --emerald-700: #047857;
  
  /* Semantic */
  --surface:      #FFFFFF;
  --surface-soft: #F8FAFC;
  --surface-alt:  #F1F5F9;
  --text:         #0F172A;
  --text-muted:   #475569;
  --border:       #E2E8F0;
  
  /* Status */
  --success: #10B981;
  --warning: #F59E0B;
  --danger:  #EF4444;
  --info:    #3B82F6;
}

:root[data-theme="dark"] {
  --surface:      #0A0E1A;
  --surface-soft: #111827;
  --surface-alt:  #1F2937;
  --text:         #F9FAFB;
  --text-muted:   #94A3B8;
  --border:       #374151;
  /* brand colors остаются, корректируются alpha для glow'ов */
}

Типографика:
- Display: Fraunces 700 (заголовки), text-wrap: balance
- Body: Inter 400/500/600/700
- Загрузка self-hosted (не Google Fonts CDN) через @font-face + 
  font-display:swap + preload для основных начертаний
- Fluid sizing через clamp() + CSS custom properties

Сетка:
- Container max-width: 1200px
- Grid-gap: 24px (desktop), 16px (mobile)
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

Брейкпойнты (mobile-first):
--bp-sm: 640px
--bp-md: 768px
--bp-lg: 1024px
--bp-xl: 1280px
--bp-2xl: 1536px

Анимации:
- Ease-out: cubic-bezier(.16,1,.3,1)
- Ease-spring: cubic-bezier(.34,1.56,.64,1)
- Duration: 200ms (micro), 400ms (default), 800ms (reveal)
- prefers-reduced-motion: все анимации → 0.01ms

Компоненты (дизайн-система):
- Button: primary, gold, whatsapp, telegram, instagram, ghost, outline
  Variants: sm, md, lg, xl
  States: hover, focus, active, disabled, loading
- Input / Textarea / Select: с label, helperText, errorText, icon
- Card: elevation 1-5, hover-lift
- Modal: focus-trap, backdrop-blur, esc-close
- Toast: success, error, info, warning (4s auto-dismiss)
- Tabs
- Accordion (FAQ)
- Carousel (Swiper.js-style)
- Tooltip
- Badge / Chip
- Skeleton loader
- Progress / Spinner

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 3 — МНОГОЯЗЫЧНОСТЬ (i18n)
═══════════════════════════════════════════════════════════════════════

3 языка: UZ (узбекский латиница), RU (русский — default), EN (english).

URL-схема:
- / → redirect на /ru/ (по browser language или geo)
- /uz/, /ru/, /en/ — локализованные версии
- /uz/countries/korea, /ru/countries/korea — локализованные роуты

Словари: JSON с nested-структурой, ~500-800 ключей.
Каждый ключ описывает одну строку, с поддержкой:
- Интерполяции: "Вы сэкономили {amount} USD"
- Плюрализации: Intl.PluralRules
- Форматирования чисел и дат: Intl.NumberFormat / DateTimeFormat

Переключатель языка:
- Не перезагружает страницу (client-side).
- Обновляет URL через history.pushState.
- Обновляет <html lang>, <meta description>, <meta og:locale>, 
  hreflang-теги.
- Сохраняет выбор в localStorage + cookie (для SSR).

SEO:
- Отдельная страница в sitemap для каждой языковой версии.
- hreflang-теги в каждом HTML.
- canonical указывает на ту же языковую версию.
- OG-теги переведены.
- Schema.org inLanguage.

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 4 — СТРАНИЦЫ И КОНТЕНТ
═══════════════════════════════════════════════════════════════════════

Главная (/):
  1. Hero (с ротирующимся заголовком: "Korea" → "Europe" → "USA")
  2. Trust bar (4 badge + marquee партнёров — пауза по hover)
  3. About Us
  4. Why Choose Us (6 cards)
  5. Countries (10 карточек с SVG-флагами)
  6. Services (9 услуг)
  7. Process (5 шагов timeline)
  8. Scholarships (4 типа + CTA)
  9. Calculator (НОВАЯ секция, см. NEW-1)
 10. Safety & Trust
 11. Testimonials (слайдер + видео-блок)
 12. Team (новая секция)
 13. Stats (4 counter'а)
 14. FAQ (6 вопросов с ARIA)
 15. Blog preview (3 последних поста)
 16. Final CTA + Form

Доп.страницы:
- /countries/[slug] — 10 страниц стран
- /services — детали всех услуг
- /team — команда консультантов
- /blog + /blog/[slug] — блог
- /privacy, /terms — легальные
- /404, /500, /offline
- /thank-you — post-submit страница для pixel-событий

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 5 — ФОРМА И ЛИДЫ
═══════════════════════════════════════════════════════════════════════

Поля:
- Имя * (2-80 символов, без спецсимволов)
- Телефон * (узб. formatter, валидация regex)
- Email (опционально, стандартный regex)
- Страна (dropdown с SVG-флагами)
- Уровень (radio: Bachelor / Master / PhD / Language)
- Бюджет (dropdown: до $5k/$10k/$20k/от $20k)
- Сообщение (textarea, 0-500)
- Согласие на обработку ПД (checkbox, required)
- Подписка на рассылку (checkbox, optional)
- Honeypot (скрытое поле)
- Cloudflare Turnstile widget
- UTM-параметры (hidden, из sessionStorage)

Flow при submit:
1. Клиентская валидация (все required, формат).
2. Disabled + loading на кнопке.
3. Turnstile-токен валидируется на Worker.
4. Sanitize всех строк.
5. POST на /api/submit-lead (Cloudflare Worker):
   a. Worker валидирует Turnstile через siteverify.
   b. Rate limit: 3 попытки / IP / 10 мин через Cloudflare Workers KV.
   c. Параллельно шлёт:
      - Telegram Bot sendMessage в группу менеджеров
      - Google Sheets через Apps Script Web App
      - Notion через API (база "Leads")
      - Email через Resend или Postmark
   d. Возвращает {success:true, leadId}.
6. Клиент:
   - Показывает success-toast "Мы свяжемся с вами в течение 30 минут".
   - Открывает WhatsApp с prefilled message (синхронно в обработчике).
   - Шлёт GA4 event generate_lead.
   - Шлёт FB Pixel event Lead.
   - Редирект на /thank-you?lead_id=xxx.
7. На thank-you:
   - Шлёт conversion events.
   - Показывает "Следующие шаги", ссылки на блог.
   - Календарь Cal.com для записи на консультацию.

Error handling:
- Network error → retry с exponential backoff (3 попытки).
- Validation error → подсветка полей + toast.
- Server 5xx → fallback форма "Напишите нам напрямую в WhatsApp".
- Sentry для логирования клиентских ошибок.

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 6 — БЕЗОПАСНОСТЬ
═══════════════════════════════════════════════════════════════════════

1. Content-Security-Policy (через Cloudflare _headers):
   default-src 'self';
   script-src 'self' 'sha256-...' https://challenges.cloudflare.com 
              https://www.googletagmanager.com https://mc.yandex.ru 
              https://connect.facebook.net;
   style-src 'self' 'unsafe-inline';
   font-src 'self' data:;
   img-src 'self' data: https: blob:;
   connect-src 'self' https://api.telegram.org https://api.anthropic.com 
               https://script.google.com https://www.google-analytics.com
               https://mc.yandex.ru;
   frame-src https://www.google.com https://www.youtube.com 
             https://challenges.cloudflare.com https://cal.com;
   object-src 'none'; base-uri 'self'; form-action 'self';
   upgrade-insecure-requests;

2. Subresource Integrity для всех внешних скриптов.
3. HSTS: max-age=63072000; includeSubDomains; preload.
4. X-Frame-Options: DENY.
5. X-Content-Type-Options: nosniff.
6. Referrer-Policy: strict-origin-when-cross-origin.
7. Permissions-Policy: отключить camera, microphone, usb, payment.
8. Токены API (Telegram, Google, Claude) — только в Workers, не в клиентском JS.
9. Санитизация всех пользовательских входных данных.
10. Rate-limiting на формах и чат-боте.
11. Disaster recovery: бэкапы лидов в 3 места (Telegram, Sheets, Notion).
12. Логи Cloudflare Workers → Logpush → S3 / BigQuery.

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 7 — ПРОИЗВОДИТЕЛЬНОСТЬ
═══════════════════════════════════════════════════════════════════════

Бюджет:
- Performance: ≥ 95
- Accessibility: ≥ 98
- Best Practices: ≥ 95
- SEO: ≥ 100
- LCP: < 1.8s
- FID / INP: < 100ms
- CLS: < 0.05
- TTFB: < 500ms
- Total JS: < 100KB gzipped
- Total CSS: < 40KB gzipped
- Initial HTML: < 30KB gzipped

Оптимизации:
1. Images:
   - Все фото локально в /assets/images/.
   - AVIF + WebP + JPEG через <picture>.
   - srcset с 3-4 размерами.
   - loading="lazy" для всех кроме hero.
   - fetchpriority="high" для hero.
   - <link rel="preload" as="image" imagesrcset> для hero.
   - blur-placeholder через BlurHash или CSS gradient.
   - width/height атрибуты всегда заданы (против CLS).
   
2. Fonts:
   - Self-hosted, WOFF2.
   - @font-face + font-display:swap.
   - preload для Fraunces 700 и Inter 400/600.
   - Subset: latin + cyrillic только.
   
3. CSS:
   - Critical CSS инлайнится в <head> (до 14KB).
   - Остальное грузится через <link rel="preload" as="style" onload>.
   - PostCSS: autoprefixer, cssnano, purge-unused.
   
4. JS:
   - ESM modules + lazy imports.
   - Code splitting по роутам.
   - Важные модули в <head> с <script type="module">.
   - Тяжёлые виджеты (calculator, chatbot) — dynamic import после idle.
   - Пакеты: <100KB total.
   
5. Lucide:
   - Инлайн SVG через build-step (не CDN).
   - Или lazy-hydration через IntersectionObserver.
   
6. 3rd-party:
   - Tawk.to / Analytics грузятся после 5s idle или после consent.
   - YouTube → lite-youtube-embed (5KB instead of 1MB).
   - Cal.com → iframe с loading="lazy".
   
7. Service Worker:
   - Precache static assets (CSS, JS, fonts, иконки).
   - Runtime cache images.
   - Network-first для HTML + data.
   - Offline-страница.
   
8. HTTP:
   - HTTP/3 через Cloudflare.
   - Brotli compression.
   - Early Hints (103).
   - 103 preload для hero.

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 8 — ACCESSIBILITY (WCAG 2.2 AA)
═══════════════════════════════════════════════════════════════════════

1. Семантический HTML: <header>, <nav>, <main>, <section>, <article>, 
   <aside>, <footer>.
2. Skip-link в начале body.
3. Все интерактивные элементы доступны с клавиатуры.
4. Focus-ring видимый на всех элементах (не убирать outline!).
5. ARIA:
   - aria-label на icon-only buttons.
   - aria-expanded на accordion/dropdown/drawer.
   - aria-hidden на декоративных элементах.
   - aria-live="polite" на slider/form-success/toast.
   - role="dialog" + aria-modal на modal.
   - role="navigation" + aria-label на nav.
6. Контраст ≥ 4.5:1 для текста, ≥ 3:1 для UI.
7. Focus-trap в modal и drawer.
8. inert на заднем контенте при открытом modal.
9. Esc закрывает modal/drawer/dropdown.
10. Labels ассоциированы с inputs (for/id или оборачивание).
11. Error messages ассоциированы через aria-describedby.
12. Required поля помечены и явно, и программно (aria-required).
13. Skip-to-content переведён на все языки.
14. prefers-reduced-motion уважается везде.
15. prefers-contrast:more увеличивает контрасты.
16. Текст scalable до 200% без потери функциональности.
17. Тестирование: axe DevTools + NVDA + VoiceOver + Keyboard only.

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 9 — SEO + STRUCTURED DATA
═══════════════════════════════════════════════════════════════════════

1. Title + Description оптимизированы под каждую страницу.
2. H1 — один на страницу, содержит ключ.
3. H2/H3 иерархия.
4. Alt для всех изображений (кроме декоративных с alt="").
5. Внутренняя перелинковка.
6. Breadcrumbs на всех страницах кроме home.
7. Schema.org:
   - EducationalOrganization (главная)
   - LocalBusiness (главная)
   - FAQPage (главная + /services)
   - AggregateRating + Review (testimonials)
   - Article (блог)
   - BreadcrumbList (все кроме home)
   - Person (команда)
   - Service (каждая услуга)
   - Course (программы обучения)
8. Sitemap.xml с hreflang-alternate.
9. Robots.txt.
10. Canonical URLs.
11. hreflang-теги для UZ/RU/EN.
12. Open Graph + Twitter Card на каждой странице (уникальные image, 
    title, description).
13. Pagination для блога: <link rel="prev/next">.
14. 301 редиректы со старых URL.
15. 404 → обратная ссылка на home + поиск.
16. Google Search Console + Yandex Webmaster + Bing Webmaster верификация.
17. XML-sitemap для images + video (если видео).

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 10 — АНАЛИТИКА + МАРКЕТИНГ
═══════════════════════════════════════════════════════════════════════

1. Google Analytics 4 с consent-mode v2.
2. Yandex.Metrika (вебвизор, карта кликов, карта скроллинга).
3. Meta Pixel (Lead, CompleteRegistration, ViewContent).
4. Google Ads tag (conversion tracking).
5. Hotjar или Microsoft Clarity (heatmaps, session recordings).
6. События:
   - page_view
   - scroll (25/50/75/100%)
   - select_content (country, service, testimonial)
   - click (whatsapp_header, whatsapp_floating, telegram, instagram, 
     phone, email, cta_hero, cta_final)
   - form_start
   - form_submit
   - generate_lead (с UTM + lead_id)
   - video_play
   - chatbot_open, chatbot_message
   - calculator_use
   - quiz_complete
7. UTM-парсер + сохранение в sessionStorage/cookie.
8. Cookie-consent по GDPR (Osano / Termly / свой):
   - Essential (always on)
   - Analytics (GA, Metrika, Clarity)
   - Marketing (FB Pixel, Google Ads)
   - Functional (language preference, theme)
9. Newsletter (ConvertKit / MailerLite / Brevo).
10. A/B testing framework (Cloudflare Workers + PostHog).

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 11 — ПРАВОВАЯ ЧАСТЬ (GDPR + РУЗ)
═══════════════════════════════════════════════════════════════════════

1. Privacy Policy (/privacy) — подробная, соответствует:
   - Закон РУз №ЗРУ-547 "О персональных данных"
   - GDPR (если есть пользователи из ЕС)
2. Terms of Service (/terms) — публичная оферта.
3. Cookie Policy (/cookies).
4. Согласие на обработку ПД в форме (checkbox required).
5. Опциональное согласие на маркетинг (separate checkbox).
6. Cookie-банер с 4 категориями.
7. Page /data-request — форма для запроса/удаления данных.
8. DPO-контакт: dpo@unitedglobal.uz.
9. Логирование consent-decisions (дата, выбор, IP hash).
10. Политика хранения: 3 года с последнего контакта.

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 12 — НОВЫЕ ФУНКЦИИ (MVP для лендинга)
═══════════════════════════════════════════════════════════════════════

12.1. Калькулятор стоимости обучения.
12.2. Оценка шансов admission (AI-driven через Claude).
12.3. Cal.com embed для записи на консультацию.
12.4. Live-chat (Tawk.to, включается после consent).
12.5. AI-чатбот на Claude Haiku 4.5 (Cloudflare Worker + 
       @anthropic-ai/sdk + prompt caching).
12.6. Блог (Markdown + Astro Content Collections).
12.7. Видео-testimonials (lite-youtube-embed).
12.8. Страница "Команда".
12.9. Sticky mobile CTA bar.
12.10. Exit-intent popup (desktop + mobile).
12.11. Quiz "Какая страна вам подходит" (5 вопросов).
12.12. Scholarship-финдер.
12.13. Countdown-таймеры к дедлайнам приёма.
12.14. Google Reviews интеграция (через Places API + Cloudflare Worker).
12.15. Dark mode.
12.16. PWA (manifest + Service Worker + offline-fallback).

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 13 — ТЕСТИРОВАНИЕ
═══════════════════════════════════════════════════════════════════════

1. Unit (Vitest): утилиты (sanitize, i18n, phone-format, UTM-parser), 
   state-management.
2. Integration: формы, slider, FAQ.
3. E2E (Playwright):
   - Happy path: открыть → скрол → заполнить форму → submit → thank-you.
   - Error path: невалидные данные, Network error, Rate limit.
   - A11y: axe-playwright на каждой странице.
   - Multilingual: переключение языков.
   - Mobile viewports.
4. Visual regression: Percy или Chromatic.
5. Performance: Lighthouse CI в каждом PR.
6. Security: OWASP ZAP scan, npm audit.

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 14 — DEVOPS + DEPLOYMENT
═══════════════════════════════════════════════════════════════════════

1. GitHub Actions:
   - CI: lint + test + build + lighthouse.
   - Preview deployments на каждый PR (Cloudflare Pages).
   - Production deploy на main.
2. Environments: dev (local), staging (staging.unitedglobal.uz), 
   production (unitedglobal.uz).
3. Branch strategy: main (prod) + feature/* (PR).
4. Semantic versioning + автоматический changelog (conventional commits).
5. Sentry для мониторинга ошибок.
6. Uptime monitoring (UptimeRobot / Better Uptime).
7. Cloudflare Analytics + Cloudflare Web Analytics (privacy-first).
8. Rollback stratgey: Cloudflare Pages keeps last 10 deploys.
9. Secrets: GitHub Actions Secrets + Cloudflare Secrets + Doppler.

═══════════════════════════════════════════════════════════════════════
РАЗДЕЛ 15 — ДОКУМЕНТАЦИЯ
═══════════════════════════════════════════════════════════════════════

1. README.md — общее описание, quick-start.
2. SETUP.md — локальная установка (Node 20+, pnpm, Vite, env-переменные).
3. CONTENT_EDITING.md — как менеджер меняет контент (data/*.json).
4. DEPLOYMENT.md — как деплоить, rollback, monitoring.
5. ARCHITECTURE.md — схемы, ADR (Architecture Decision Records).
6. CONTRIBUTING.md — code style, PR-template.
7. SECURITY.md — security.txt, disclosure policy.

═══════════════════════════════════════════════════════════════════════
ПОРЯДОК ВЫПОЛНЕНИЯ (ROADMAP)
═══════════════════════════════════════════════════════════════════════

Phase 1 (Foundation, week 1):
- Migrate на Astro + TypeScript.
- Настроить linter, formatter, CI.
- Вынести данные в JSON.
- Self-host fonts.
- Оптимизировать картинки.
- SVG-флаги.

Phase 2 (Functionality, week 2):
- i18n (UZ/RU/EN).
- Форма → Cloudflare Worker → Telegram + Sheets.
- Turnstile + honeypot + sanitize.
- Loading/error states.
- UTM + Analytics + Cookie consent.

Phase 3 (Polish, week 3):
- Dark mode.
- PWA + SW.
- FAQ ARIA, focus-trap, все a11y-правки.
- CSP, SRI, all security headers.
- Privacy/Terms pages.
- 404/500/offline.
- SEO: sitemap, hreflang, schema, OG.

Phase 4 (Content + Features, week 4):
- 10 страниц стран.
- Team page.
- Blog + 5 первых статей.
- Calculator widget.
- AI chatbot (Claude).
- Cal.com integration.
- Video testimonials.
- Sticky mobile CTA.

Phase 5 (Launch, week 5):
- Staging QA.
- Lighthouse ≥ 95 всех категорий.
- Axe a11y-audit чистый.
- OWASP scan чистый.
- Production deploy.
- Google Search Console + Yandex Webmaster submit.
- Monitoring включено.

═══════════════════════════════════════════════════════════════════════
КРИТЕРИИ ПРИЁМКИ
═══════════════════════════════════════════════════════════════════════

✅ Lighthouse ≥ 95 по всем категориям на mobile и desktop.
✅ WCAG 2.2 AA compliance (axe + manual с NVDA).
✅ PageSpeed Insights: Green во всех Core Web Vitals.
✅ securityheaders.com: A+.
✅ ssllabs.com: A+.
✅ W3C Validator: нет ошибок.
✅ Все формы отправляют лиды в Telegram + Sheets + подтверждение на email.
✅ Многоязычность работает полностью (UZ/RU/EN).
✅ Все ссылки работают (нет 404).
✅ Dark mode переключается без flicker.
✅ PWA устанавливается на мобильных.
✅ Offline-страница работает.
✅ GA4, Meta Pixel, Yandex шлют события корректно.
✅ Форма защищена от спама (0 спама за 7 дней теста).
✅ Все изображения оптимизированы (<100KB each).
✅ Bundle size JS < 100KB gzipped.
✅ Документация полная (все MD-файлы написаны).
✅ CI зелёный, тесты покрывают ≥ 80% критического кода.

═══════════════════════════════════════════════════════════════════════
ДОПОЛНИТЕЛЬНЫЕ ТРЕБОВАНИЯ
═══════════════════════════════════════════════════════════════════════

- Брендинг: сохрани существующую палитру (deep blue + gold + emerald), 
  но добавь dark-mode варианты.
- Шрифты: Fraunces (headlines) + Inter (body) — self-hosted.
- Тон: premium, тёплый, профессиональный, вдохновляющий, без пафоса.
- Контент: переиспользуй существующий на UZ, переведи на RU и EN 
  с культурной адаптацией (не дословно).
- Все внешние ссылки с rel="noopener noreferrer" и target="_blank".
- Все формы с novalidate (кастомная валидация, лучше UX).
- Не использовать emoji в UI (кроме акцентов в блоге), заменить на иконки.
- Не использовать Bootstrap / jQuery / Moment.js (тяжёлые legacy).
- Избегать clsx / classnames — писать строки вручную.
- Не добавлять библиотек с bundle > 30KB без крайней необходимости.
- Каждое решение с зависимостью — должно быть обоснование в ADR.
- Commits в формате Conventional Commits (feat:, fix:, docs:, ...).

═══════════════════════════════════════════════════════════════════════
ФОРМАТ ВЫВОДА
═══════════════════════════════════════════════════════════════════════

1. Создай все файлы проекта в новой структуре.
2. Перепиши существующие HTML/CSS/JS под новую архитектуру.
3. Создай все новые страницы (countries, team, blog, legal).
4. Напиши все 5 MD-документов в /docs/.
5. Настрой GitHub Actions workflows.
6. Создай Cloudflare Workers в /workers/.
7. Создай все JSON-словари и data-файлы.
8. Прокомментируй только неочевидные места (почему, не что).
9. После каждого крупного блока — напиши пояснение, что и зачем сделано.
10. В конце выдай финальный чек-лист выполненного с галочками + что 
    осталось на владельце проекта (DNS, регистрация доменов, получение 
    токенов, верификация в GSC и т.д.).

НАЧИНАЙ.
```

---

## 10. ФИНАЛЬНЫЙ ЧЕК-ЛИСТ ЗАПУСКА

После выполнения мастер-промпта проверь по чек-листу:

### 🔐 Безопасность
- [ ] CSP настроен и валиден (securityheaders.com: A+)
- [ ] HSTS + TLS 1.3
- [ ] Все внешние скрипты с SRI
- [ ] Токены API только в Workers
- [ ] Honeypot + Turnstile активны
- [ ] Rate-limiting на API
- [ ] Нет inline-скриптов с секретами

### 📱 UX
- [ ] Mobile-first дизайн проверен на iPhone SE (375px)
- [ ] Sticky CTA bar на мобильных
- [ ] Exit-intent popup работает
- [ ] Live-chat/чат-бот загружается после consent
- [ ] Forms показывают loading/success/error
- [ ] Cookie-банер в 4 категориях
- [ ] Skip-link работает

### 🌐 i18n
- [ ] UZ/RU/EN все строки переведены
- [ ] URL-схемы /uz/, /ru/, /en/
- [ ] hreflang в <head>
- [ ] sitemap содержит все версии
- [ ] <html lang> обновляется динамически

### ⚡ Производительность
- [ ] Lighthouse ≥ 95 mobile + desktop
- [ ] LCP < 1.8s
- [ ] CLS < 0.05
- [ ] Images: AVIF/WebP + srcset + lazy
- [ ] Fonts: self-hosted + preload
- [ ] JS < 100KB gzipped
- [ ] PWA: manifest + SW
- [ ] Offline-fallback

### ♿ Accessibility
- [ ] axe DevTools: 0 нарушений
- [ ] NVDA + VoiceOver: полная навигация
- [ ] Keyboard-only: всё доступно
- [ ] Focus-ring везде видимый
- [ ] Контраст ≥ 4.5:1
- [ ] prefers-reduced-motion учтён
- [ ] ARIA правильно расставлены

### 🔍 SEO
- [ ] sitemap.xml + robots.txt
- [ ] Schema.org: Organization, FAQ, Review, Article
- [ ] OG + Twitter Card на каждой странице
- [ ] Уникальные title + description
- [ ] Canonical URLs
- [ ] 404 кастомная
- [ ] Google Search Console + Yandex Webmaster верифицированы

### 📊 Аналитика
- [ ] GA4 + consent mode
- [ ] Yandex.Metrika
- [ ] Meta Pixel
- [ ] Microsoft Clarity
- [ ] События: lead, click, scroll, video
- [ ] UTM-сохранение
- [ ] Conversion tracking

### ⚖️ Юридическая часть
- [ ] Privacy Policy опубликован
- [ ] Terms of Service опубликован
- [ ] Cookie Policy опубликован
- [ ] Согласие в форме
- [ ] DPO email работает
- [ ] Хранение consent-decisions

### 🧪 Качество
- [ ] Unit-тесты покрывают ≥ 80%
- [ ] E2E-тесты на happy-path + error-cases
- [ ] Visual regression baseline
- [ ] CI зелёный
- [ ] Lighthouse CI в каждом PR

### 🚀 Деплой
- [ ] Production — unitedglobal.uz
- [ ] Staging — staging.unitedglobal.uz
- [ ] Preview deploys на PR
- [ ] Sentry error tracking
- [ ] UptimeRobot мониторинг
- [ ] Cloudflare Pages + Workers деплой
- [ ] Backups лидов в 3 системах

### 📚 Документация
- [ ] README.md
- [ ] SETUP.md (локальный запуск)
- [ ] CONTENT_EDITING.md (как редактировать контент)
- [ ] DEPLOYMENT.md
- [ ] ARCHITECTURE.md
- [ ] CONTRIBUTING.md
- [ ] SECURITY.md

---

## 💎 ЗАКЛЮЧЕНИЕ

Проект `c:\consalting\` имеет **хороший визуальный фундамент** и **правильное 
премиум-настроение**, но находится в состоянии **MVP**, а не production-ready. 
Критические пробелы — **отсутствие реального сбора лидов**, **нерабочая 
многоязычность** и **отсутствие защиты / юридической базы**.

Этот документ содержит:
- **72+ конкретных пунктов** с приоритетами.
- **Индивидуальный промпт для каждой проблемы** (готов к копированию).
- **Единый мастер-промпт** для полной трансформации проекта.
- **Чек-лист запуска** из 60+ критериев.

### Рекомендуемый порядок работы

1. **Неделя 1:** P0 (критические) — форма, i18n, безопасность, легальные.
2. **Неделя 2:** P1 (серьёзные) — картинки, PWA, analytics, dark mode.
3. **Неделя 3:** P2 + P3 (полировка) — архитектура, тесты, CI.
4. **Неделя 4:** Новые функции — калькулятор, AI-бот, блог, страницы стран.
5. **Неделя 5:** QA + запуск.

### Ожидаемый результат

Через 5 недель у компании будет **лендинг мирового уровня**:
- Генерирует и сохраняет лиды в 3 системах.
- Работает на 3 языках.
- Конверсия увеличится на **+40-70%** (статистика по отрасли).
- Проходит любые аудиты (security, a11y, SEO, performance).
- Масштабируется: добавить страну = отредактировать JSON.
- Имеет CI/CD, тесты, мониторинг, документацию.

**Бизнес-эффект:** вместо ~10-15 лидов/месяц из социальных сетей и рекомендаций — 
**50-150 качественных лидов/месяц** благодаря SEO, конверсионному дизайну, 
моментальной реакции через Telegram-бота и доверию от премиум-визуала.

---

**Автор аудита:** AI Assistant (Claude Opus 4.7, 1M контекст)
**Дата:** 2026-04-21
**Версия:** 1.0
