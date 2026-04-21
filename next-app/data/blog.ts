import type { Locale } from '@/i18n/routing';

export type BlogPost = {
  slug: string;
  category: 'scholarships' | 'countries' | 'visa' | 'tips';
  cover: string;
  reading_time: number;
  published_at: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'korea-without-korean',
    category: 'countries',
    cover: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1600&q=80',
    reading_time: 8,
    published_at: '2026-04-10',
    title: {
      ru: 'Как поступить в университет Кореи без знания корейского',
      uz: "Koreys tilini bilmasdan Koreya universitetiga qanday kirish mumkin",
      en: 'How to get into a Korean university without knowing Korean',
    },
    excerpt: {
      ru: 'Полный гайд по English-taught программам: какие вузы, требования IELTS, сроки, стипендии. На 2026–2027 учебный год.',
      uz: 'Ingliz tilida dasturlar bo\'yicha to\'liq qo\'llanma: universitetlar, IELTS talablari, muddatlar, stipendiyalar.',
      en: 'Complete guide to English-taught programs: universities, IELTS requirements, deadlines, scholarships for 2026–2027.',
    },
    body: {
      ru: `## English-taught программы в Корее

Миф о том, что для учёбы в Корее нужен TOPIK, больше не соответствует реальности. Десятки университетов предлагают полноценные программы бакалавриата и магистратуры **полностью на английском**, и для поступления достаточно **IELTS 6.0–6.5**.

### Топ-7 университетов с английскими программами

1. **Seoul National University (SNU)** — College of Liberal Studies, English-taught bachelor в гуманитарных и социальных науках.
2. **Sungkyunkwan University (SKKU)** — Global Leader Program, Business + Economics + Engineering на английском.
3. **Yonsei University (UIC)** — Underwood International College, 15+ майоров на английском.
4. **Korea University** — International Studies, Economics, Business на английском.
5. **KAIST** — все магистерские программы только на английском.
6. **Hanyang University (ERICA)** — Global BBA, инженерия на английском.
7. **Ewha Womans University** — Scranton College для иностранных студенток.

### Что нужно для поступления

- **IELTS 6.0–6.5** (TOEFL iBT 80–90) — основной критерий
- **Школьный аттестат** с GPA 3.0+ (по 4-балльной) или 85%+ (по 100-балльной)
- **Мотивационное письмо** — 600–1000 слов
- **2 рекомендательных письма** от преподавателей
- **Финансовые документы** — выписка со счёта ($20,000+)

### Дедлайны 2026/27

- **Fall intake** (сентябрь 2026): подача до **15 июня 2026** (SNU, SKKU, Yonsei)
- **Spring intake** (март 2027): подача до **30 октября 2026**

### Стипендии

- **GKS (Global Korea Scholarship)** — полная стипендия от правительства: покрывает обучение + $1,000/мес + перелёт. Заявки до 28 февраля.
- **University Merit Scholarship** — 30–100% скидка на обучение по итогам GPA.
- **Samsung, Hyundai scholarships** — частные фонды для иностранцев.

### Стоимость

Обучение: **$5,500–$8,000 в семестр** (частные), **$2,000–$3,500** (государственные, ограниченное количество мест для иностранцев).
Общежитие: **$200–$400/месяц**. Еда: **$300–$500/месяц**.

**Итого первый год:** около **$14,000–$18,000** без стипендии. Со стипендией GKS — **$0 обучение + $12,000/год на жизнь**.

### Что делать сейчас

1. Проверить IELTS — если нет 6.0, записаться на курс.
2. Определиться с 3 вузами: один "dream", два "safe".
3. Заказать апостиль аттестата — занимает 2–3 недели.
4. Начать черновик мотивационного письма за 2 месяца до дедлайна.`,
      uz: `## Koreyada ingliz tilida o'qish dasturlari

Koreyada o'qish uchun TOPIK kerakligi haqidagi afsona endi haqiqatga mos kelmaydi. O'nlab universitetlar to'liq **ingliz tilida** bakalavr va magistr dasturlarini taklif qilishadi, va kirish uchun **IELTS 6.0–6.5** yetarli.

### Ingliz dasturlari bo'lgan top-7 universitet

1. **Seoul National University (SNU)** — College of Liberal Studies
2. **Sungkyunkwan University (SKKU)** — Global Leader Program
3. **Yonsei University (UIC)** — Underwood International College
4. **Korea University** — International Studies, Economics, Business
5. **KAIST** — barcha magistr dasturlari faqat ingliz tilida
6. **Hanyang University (ERICA)** — Global BBA
7. **Ewha Womans University** — Scranton College

### Kirish uchun nima kerak

- **IELTS 6.0–6.5** (TOEFL iBT 80–90)
- **Maktab attestati** GPA 3.0+ (4 balli) yoki 85%+
- **Motivatsion xat** — 600–1000 so'z
- **2 tavsiya xati** o'qituvchilardan
- **Moliyaviy hujjatlar** — hisobdan ko'chirma ($20,000+)

### 2026/27 muddatlari

- **Kuzgi qabul** (sentyabr 2026): **15-iyun 2026** gacha
- **Bahorgi qabul** (mart 2027): **30-oktyabr 2026** gacha

### Stipendiyalar

- **GKS (Global Korea Scholarship)** — hukumat to'liq stipendiyasi: o'qish + $1,000/oy + parvoz
- **University Merit Scholarship** — GPA natijalariga ko'ra 30–100% chegirma
- **Samsung, Hyundai scholarships** — xususiy jamg'armalar

### Narx

O'qish: **semestrda $5,500–$8,000** (xususiy), **$2,000–$3,500** (davlat).
Yotoqxona: **oyiga $200–$400**. Oziq-ovqat: **$300–$500**.

**Birinchi yil jami:** stipendiyasiz **$14,000–$18,000**. GKS bilan — **$0 o'qish + yiliga $12,000 yashashga**.

### Hozir nima qilish kerak

1. IELTS'ni tekshirish — 6.0 bo'lmasa, kursga yozilish.
2. 3 ta universitetni aniqlash: bittasi "dream", ikkitasi "safe".
3. Attestat apostilini buyurtma qilish — 2–3 hafta.
4. Motivatsion xatning qoralamasini muddatdan 2 oy oldin boshlash.`,
      en: `## English-taught programs in Korea

The myth that you need TOPIK to study in Korea no longer matches reality. Dozens of universities offer full bachelor's and master's programs **entirely in English**, and **IELTS 6.0–6.5** is enough to get in.

### Top 7 universities with English programs

1. **Seoul National University (SNU)** — College of Liberal Studies
2. **Sungkyunkwan University (SKKU)** — Global Leader Program
3. **Yonsei University (UIC)** — Underwood International College
4. **Korea University** — International Studies, Economics, Business
5. **KAIST** — all master's programs in English only
6. **Hanyang University (ERICA)** — Global BBA
7. **Ewha Womans University** — Scranton College

### What you need

- **IELTS 6.0–6.5** (TOEFL iBT 80–90)
- **High school diploma** with GPA 3.0+ or 85%+
- **Motivation letter** — 600–1000 words
- **2 recommendation letters** from teachers
- **Financial documents** — bank statement ($20,000+)

### Deadlines 2026/27

- **Fall intake** (September 2026): apply by **June 15, 2026**
- **Spring intake** (March 2027): apply by **October 30, 2026**

### Scholarships

- **GKS (Global Korea Scholarship)** — full government scholarship: tuition + $1,000/mo + flight
- **University Merit Scholarship** — 30–100% tuition discount based on GPA
- **Samsung, Hyundai** — private foundations for international students

### Cost

Tuition: **$5,500–$8,000 per semester** (private), **$2,000–$3,500** (state, limited seats).
Dorm: **$200–$400/month**. Food: **$300–$500/month**.

**First year total:** around **$14,000–$18,000** without a scholarship. With GKS — **$0 tuition + $12,000/year for living**.

### What to do now

1. Check your IELTS — if below 6.0, sign up for a course.
2. Pick 3 universities: one "dream", two "safe".
3. Order apostille for your diploma — takes 2–3 weeks.
4. Start draft of motivation letter 2 months before deadline.`,
    },
  },
  {
    slug: 'top-europe-scholarships-2026',
    category: 'scholarships',
    cover: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    reading_time: 10,
    published_at: '2026-04-05',
    title: {
      ru: 'Топ-10 стипендий для учёбы в Европе в 2026 году',
      uz: "2026 yilda Yevropada o'qish uchun top-10 stipendiya",
      en: 'Top 10 scholarships to study in Europe in 2026',
    },
    excerpt: {
      ru: 'Полное покрытие обучения, проживания и билетов. Реальные программы с актуальными дедлайнами и размером финансирования.',
      uz: "O'qish, yashash va chiptalarni to'liq qoplash. Haqiqiy dasturlar, muddatlar va miqdor.",
      en: 'Full coverage of tuition, living and flights. Real programs with current deadlines and funding amounts.',
    },
    body: {
      ru: `## 10 европейских стипендий с реальными шансами для узбекских студентов

### 1. Erasmus Mundus Joint Master
**Покрытие:** полное (€49,000–€57,000 на 2 года)
**Дедлайны:** октябрь 2026 – февраль 2027
**Страны:** 2–3 страны за 1 программу (обязательная мобильность)
**Требования:** диплом бакалавра, IELTS 6.5+, мотивация
**Где смотреть:** erasmus-plus.ec.europa.eu/opportunities

### 2. DAAD Scholarships (Германия)
**Покрытие:** €934/мес + перелёт + страховка + обучение (€0 в большинстве вузов Германии)
**Дедлайны:** октябрь 2026 для Wintersemester 2027
**Требования:** GPA 3.0+, мотивация, 2 года опыта (для некоторых треков)
**Где смотреть:** funding-guide.de

### 3. Chevening (Великобритания)
**Покрытие:** £30,000+ (обучение + проживание + перелёт)
**Дедлайны:** ноябрь 2026
**Требования:** 2 года работы, 3 оффера от UK-вузов, лидерские качества
**Где смотреть:** chevening.org

### 4. Swiss Government Excellence (Швейцария)
**Покрытие:** CHF 1,920/мес + обучение + страховка
**Дедлайны:** ноябрь 2026
**Требования:** PhD или постдок, отличный академический профиль

### 5. Vanier Canada Graduate Scholarship (для тех, кто едет через Европу в Канаду)
Пропустим — это Канада. Вместо неё:

### 5. Italian Government Scholarship (MAECI)
**Покрытие:** €900/мес + обучение + страховка
**Дедлайны:** июнь 2026
**Требования:** IELTS 6.0 или итальянский B2, мотивация

### 6. Hungary Stipendium Hungaricum
**Покрытие:** полное + HUF 43,700/мес
**Дедлайны:** январь 2027
**Требования:** номинация от Узбекистана (подача через Министерство), IELTS 5.5+
**Особенность:** программа активно берёт узбеков. 100+ мест ежегодно.

### 7. Czech Government Scholarship
**Покрытие:** CZK 11,500/мес + обучение
**Дедлайны:** сентябрь 2026
**Требования:** бакалавриат/магистратура, знание английского или чешского

### 8. Visegrad Scholarship (Чехия/Венгрия/Польша/Словакия)
**Покрытие:** €2,300/семестр
**Дедлайны:** январь 2027
**Требования:** обмен или полная программа в странах V4

### 9. Holland Scholarship (Нидерланды)
**Покрытие:** €5,000 единоразово
**Дедлайны:** май 2026
**Требования:** новый студент в голландском вузе

### 10. Finnish Government Scholarship Pool
**Покрытие:** €1,500/мес
**Дедлайны:** октябрь 2026
**Требования:** PhD-кандидаты с принятием от финского вуза

## Как подавать на несколько сразу

- **Приоритет — Erasmus Mundus и DAAD.** Самые предсказуемые для СНГ.
- **Дублируйте подачу.** Один мотивационный костяк + 2 параграфа специфичные для вуза.
- **Начинайте за 12 месяцев** до дедлайна — апостиль, переводы, IELTS.
- **Рекомендательные письма — заранее.** Профессорам нужно минимум 4 недели.`,
      uz: `## O'zbek talabalar uchun haqiqiy imkoniyatli 10 Yevropa stipendiyasi

### 1. Erasmus Mundus Joint Master
**Qoplash:** to'liq (2 yil uchun €49,000–€57,000)
**Muddat:** oktyabr 2026 – fevral 2027
**Davlatlar:** 1 dasturda 2–3 davlat

### 2. DAAD (Germaniya)
**Qoplash:** €934/oy + parvoz + sug'urta + o'qish (ko'p universitetlarda €0)
**Muddat:** Wintersemester 2027 uchun oktyabr 2026

### 3. Chevening (Buyuk Britaniya)
**Qoplash:** £30,000+
**Muddat:** noyabr 2026
**Talablar:** 2 yil ish tajribasi, UK universitetlaridan 3 taklif

### 4. Swiss Government Excellence
**Qoplash:** CHF 1,920/oy + o'qish + sug'urta

### 5. Italian Government (MAECI)
**Qoplash:** €900/oy + o'qish + sug'urta
**Muddat:** iyun 2026

### 6. Stipendium Hungaricum (Vengriya)
**Qoplash:** to'liq + HUF 43,700/oy
**Muddat:** yanvar 2027
**Xususiyat:** O'zbekistondan nominatsiya orqali topshiriladi. Yiliga 100+ joy.

### 7. Czech Government Scholarship
**Qoplash:** CZK 11,500/oy + o'qish

### 8. Visegrad (Chexiya/Vengriya/Polsha/Slovakiya)
**Qoplash:** semestrda €2,300

### 9. Holland Scholarship (Niderlandiya)
**Qoplash:** €5,000 bir martalik
**Muddat:** may 2026

### 10. Finnish Government Scholarship Pool
**Qoplash:** €1,500/oy
**Talablar:** PhD nomzodlar

## Bir nechta dasturga qanday topshirish

- **Prioritet — Erasmus Mundus va DAAD.**
- **Toshpshirishni dublyaj qiling.** Bir motivatsion skelet + 2 maxsus paragraf.
- **12 oy oldin boshlang** — apostil, tarjima, IELTS.
- **Tavsiya xatlari — oldindan.** Professorlarga kamida 4 hafta kerak.`,
      en: `## 10 European scholarships with real chances for students from Uzbekistan

### 1. Erasmus Mundus Joint Master
**Coverage:** full (€49,000–€57,000 over 2 years)
**Deadlines:** October 2026 – February 2027
**Countries:** 2–3 countries per program (mandatory mobility)

### 2. DAAD (Germany)
**Coverage:** €934/mo + flight + insurance + tuition (€0 at most German unis)
**Deadlines:** October 2026 for Wintersemester 2027

### 3. Chevening (UK)
**Coverage:** £30,000+ (tuition + living + flight)
**Deadlines:** November 2026
**Requirements:** 2 years work experience, 3 UK-uni offers

### 4. Swiss Government Excellence
**Coverage:** CHF 1,920/mo + tuition + insurance

### 5. Italian Government (MAECI)
**Coverage:** €900/mo + tuition + insurance
**Deadlines:** June 2026

### 6. Stipendium Hungaricum
**Coverage:** full + HUF 43,700/mo
**Deadlines:** January 2027
**Note:** applied through Uzbek ministry nomination. 100+ seats yearly.

### 7. Czech Government Scholarship
**Coverage:** CZK 11,500/mo + tuition

### 8. Visegrad (Czech/Hungary/Poland/Slovakia)
**Coverage:** €2,300/semester

### 9. Holland Scholarship
**Coverage:** €5,000 one-time
**Deadlines:** May 2026

### 10. Finnish Government Scholarship Pool
**Coverage:** €1,500/mo
**Requirements:** PhD candidates

## Applying to multiple at once

- **Priority — Erasmus Mundus and DAAD.** Most predictable for CIS.
- **Duplicate the application.** One motivation skeleton + 2 uni-specific paragraphs.
- **Start 12 months before deadline** — apostille, translations, IELTS.
- **Recommendation letters — early.** Professors need at least 4 weeks.`,
    },
  },
  {
    slug: 'ielts-65-in-3-months',
    category: 'tips',
    cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1600&q=80',
    reading_time: 7,
    published_at: '2026-03-28',
    title: {
      ru: 'IELTS 6.5 за 3 месяца — реально ли? Пошаговый план',
      uz: "IELTS 6.5 3 oyda — imkoniyatmi? Bosqichma-bosqich reja",
      en: 'IELTS 6.5 in 3 months — is it possible? A step-by-step plan',
    },
    excerpt: {
      ru: 'Если у вас уровень B1 и 2 часа в день — 6.5 достижимо. Разбор по секциям: Listening, Reading, Writing, Speaking.',
      uz: 'Agar sizda B1 darajasi va kuniga 2 soat bo\'lsa — 6.5 ga erishish mumkin. Bo\'limlar bo\'yicha tahlil.',
      en: 'With a B1 level and 2 hours a day, 6.5 is achievable. Section-by-section breakdown.',
    },
    body: {
      ru: `## Кому реально добиться 6.5 за 3 месяца

- **Starting point:** уверенный B1 (или слабый B2). Если ваш уровень A2 — нужно 6 месяцев.
- **Time commitment:** 2 часа в день × 6 дней в неделю = 144 часа за 3 месяца.

## Распределение по месяцам

### Месяц 1: Диагностика и Listening + Reading

- **Неделя 1:** пробный тест Cambridge IELTS 17, определите стартовый балл.
- **Недели 2–4:** Listening 1 час/день + Reading 1 час/день.
  - Listening: официальные записи Cambridge, затем BBC 6 Minute English.
  - Reading: техники skimming и scanning. Цель — делать 40 вопросов за 55 минут.

### Месяц 2: Writing

- **Task 1:** графики, диаграммы — вам нужно 3 параграфа, 150 слов, 20 минут. Тренируйте 2 эссе в день.
- **Task 2:** эссе на 250 слов, 40 минут. Изучите 10 типов вопросов: opinion, discussion, problem/solution, advantage/disadvantage.
- **Грамматика:** conditionals, passive voice, cleft sentences — это даёт band 6.5 автоматически.

### Месяц 3: Speaking + повторение

- **Speaking:** записывайте себя на 2-минутные монологи по Part 2 темам. Используйте ChatGPT или репетитора для обратной связи.
- **Part 1:** готовые ответы на 50 типичных тем (family, hometown, work, hobbies).
- **Part 3:** тренируйте "opinion + reason + example" структуру.
- **Неделя 12:** 3 полных mock-теста.

## Инструменты

- **Cambridge IELTS books 15–19** — must-have
- **IELTS Liz (YouTube)** — стратегии
- **Magoosh IELTS** — приложение с ежедневной практикой
- **Speaking partner** — носитель через italki ($15/час) или друг с таким же уровнем

## Самые частые ошибки

1. **Писать сложными словами, которые вы не знаете.** Band 7 — за точность, не за "wow-factor".
2. **Не читать инструкцию в Writing.** Если вопрос "to what extent", а вы пишете "discuss both sides" — получите band 5.
3. **Говорить медленно от страха ошибиться.** Fluency важнее точности — пауза > 3 сек снижает балл.
4. **Экономить на Speaking.** Это единственная секция, где нельзя подготовиться в ночь перед экзаменом.

## Что делать, если получили 6.0 вместо 6.5

- Re-mark (пересмотр) для Writing и Speaking — стоит $90, но шансы повышения около 30%.
- Через 1 месяц — второй экзамен с фокусом на слабую секцию.
- Для подачи в большинство вузов по стипендиям: 6.0 overall + 5.5 по секциям часто достаточно.`,
      uz: `## 3 oyda 6.5 ga kimga erishish mumkin

- **Starting point:** ishonchli B1 (yoki zaif B2). Agar A2 bo'lsangiz — 6 oy kerak.
- **Time commitment:** kuniga 2 soat × haftada 6 kun = 3 oyda 144 soat.

## Oylar bo'yicha reja

### 1-oy: Diagnostika va Listening + Reading

- **1-hafta:** sinov testi Cambridge IELTS 17.
- **2–4-haftalar:** kuniga Listening 1 soat + Reading 1 soat.
  - Listening: rasmiy Cambridge yozuvlari, keyin BBC 6 Minute English.
  - Reading: skimming va scanning. Maqsad — 55 daqiqada 40 savol.

### 2-oy: Writing

- **Task 1:** grafiklar, diagrammalar — 3 paragraf, 150 so'z, 20 daqiqa. Kuniga 2 essay.
- **Task 2:** 250 so'z essay, 40 daqiqa. 10 xil savol turini o'rganing.
- **Grammatika:** conditionals, passive voice, cleft sentences — bu avtomatik band 6.5 beradi.

### 3-oy: Speaking + takrorlash

- **Speaking:** Part 2 mavzular bo'yicha 2 daqiqali monologlarni yozib oling.
- **Part 1:** 50 ta tipik mavzu bo'yicha tayyor javoblar.
- **Part 3:** "opinion + reason + example" tuzilmasi.
- **12-hafta:** 3 ta to'liq mock-test.

## Vositalar

- **Cambridge IELTS 15–19** — shart
- **IELTS Liz (YouTube)** — strategiyalar
- **Magoosh IELTS** — kundalik amaliyot ilova
- **Speaking partner** — italki orqali ($15/soat) yoki teng darajadagi do'st

## Eng tez-tez xatolar

1. **Bilmagan so'zlaringiz bilan yozish.** Band 7 — aniqlik uchun.
2. **Writing'da ko'rsatmani o'qimaslik.**
3. **Qo'rquvdan sekin gapirish.** Fluency aniqlikdan muhimroq.
4. **Speaking'ga vaqt ajratmaslik.**`,
      en: `## Who can realistically hit 6.5 in 3 months

- **Starting point:** solid B1 (or weak B2). If you're at A2 — you need 6 months.
- **Time commitment:** 2 hours a day × 6 days a week = 144 hours in 3 months.

## Monthly breakdown

### Month 1: Diagnostic + Listening + Reading

- **Week 1:** mock test Cambridge IELTS 17.
- **Weeks 2–4:** 1 hour Listening + 1 hour Reading per day.
  - Listening: official Cambridge recordings, then BBC 6 Minute English.
  - Reading: skimming + scanning. Goal: 40 questions in 55 minutes.

### Month 2: Writing

- **Task 1:** graphs, charts — 3 paragraphs, 150 words, 20 minutes. 2 essays a day.
- **Task 2:** 250-word essay, 40 minutes. Learn 10 question types.
- **Grammar:** conditionals, passive voice, cleft sentences — these give band 6.5 automatically.

### Month 3: Speaking + review

- **Speaking:** record 2-minute monologues on Part 2 topics.
- **Part 1:** prepare answers for 50 typical topics.
- **Part 3:** practice "opinion + reason + example" structure.
- **Week 12:** 3 full mock tests.

## Tools

- **Cambridge IELTS books 15–19** — must-have
- **IELTS Liz (YouTube)** — strategies
- **Magoosh IELTS** — daily practice app
- **Speaking partner** — native via italki ($15/hr) or a peer

## Most common mistakes

1. **Using words you don't know.** Band 7 is about precision, not flash.
2. **Ignoring Writing instructions.** If the prompt says "to what extent" and you "discuss both sides" — band 5.
3. **Speaking slowly out of fear.** Fluency beats precision; pause > 3 sec lowers your score.
4. **Skipping Speaking prep.**`,
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
