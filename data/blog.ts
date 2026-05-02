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
  {
    slug: 'student-visa-korea-2026',
    category: 'visa',
    cover: 'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1600&q=80',
    reading_time: 9,
    published_at: '2026-04-22',
    title: {
      ru: 'Студенческая виза D-2 в Корею 2026: полный пошаговый гайд',
      uz: "Koreya D-2 talaba vizasi 2026: to'liq bosqichma-bosqich qo'llanma",
      en: 'Korea D-2 student visa 2026: a step-by-step guide',
    },
    excerpt: {
      ru: 'Документы, сроки, финансовое подтверждение, частые отказы и как их избежать. Реальные цифры консульства Кореи в Ташкенте.',
      uz: "Hujjatlar, muddatlar, moliyaviy tasdiq, ko'p uchragan rad etishlar va ulardan saqlanish. Toshkentdagi Koreya konsulligining haqiqiy raqamlari.",
      en: 'Documents, timelines, financial proof, common refusals and how to avoid them. Real numbers from the Korean consulate in Tashkent.',
    },
    body: {
      ru: `## Что такое D-2 и кому она подходит

**D-2** — корейская студенческая виза для обучения в аккредитованных вузах: бакалавриат (D-2-2), магистратура (D-2-3), PhD (D-2-4), исследователь (D-2-5), языковые курсы при университете (D-2-7). Срок — на весь период программы.

> Не путать с **D-4** (общеязыковые школы вне университета): другие документы, другая логика. В этом гайде только D-2.

## Когда подавать

- **Spring intake** (март 2027): получение Certificate of Admission в декабре 2026 → подача визы в январе–феврале.
- **Fall intake** (сентябрь 2026): admission в июне → виза в июле–августе.

Корейское посольство в Ташкенте обрабатывает D-2 за **2–4 недели**. Закладывайте 6 недель буфера до вылета.

## Полный пакет документов

1. **Загранпаспорт** — действителен ещё 6+ месяцев.
2. **2 фото 3.5×4.5** — белый фон, не старше 6 месяцев.
3. **Анкета** — заполняется на сайте посольства, печатается, подписывается.
4. **Certificate of Admission** — оригинал из корейского вуза.
5. **Business Registration Certificate** вуза — высылается вузом вместе с admission.
6. **Аттестат / диплом + апостиль + перевод** — нотариальный перевод на корейский или английский.
7. **Транскрипт оценок + апостиль + перевод**.
8. **Финансовое подтверждение** — банковская выписка минимум на **\$20,000** на 1 год обучения. Деньги должны лежать на счёте **не менее 1 месяца**.
9. **Письмо-объяснение происхождения средств** — если деньги на счёте недавно.
10. **Спонсорское письмо** — если платит родитель: их ID + выписка + объяснение родства (свидетельство о рождении).
11. **Health check certificate** для туберкулёза — для некоторых программ. Делается в корейской больнице по приезде, но рекомендуется привезти результат от своего врача.
12. **Языковой сертификат** — TOPIK 3+ для корейских программ, IELTS 5.5+ для английских.
13. **Sevimage Insurance** — за 1 год.

## Как заполнить финансовое подтверждение правильно

**Самая частая причина отказа.** Что советуем:

- Сумма **строго от \$20,000** (даже если стипендия покрывает обучение — посольство хочет видеть резерв).
- Деньги должны **лежать минимум 30 дней**. Если завели вчера — откажут.
- **Не USDT, не наличные** — только банковский счёт в **узбекском или зарубежном банке**. Идеально — мультивалютная карта Капитал банка / Hamkorbank на сум-долларовых ставках.
- **Источник денег**. Если родитель-предприниматель: справка с ИНН + выписка с бизнес-счёта за 6 месяцев + договор/контракт.

## Частые причины отказа (статистика 2025)

1. **Финансовое подтверждение слабое** (40%) — мало денег или свежее поступление.
2. **Слабая мотивация** в анкете (20%) — копи-паст шаблонов.
3. **Языковой сертификат не соответствует программе** (15%) — TOPIK 2 на корейскую магистратуру.
4. **Подача "fake" admission** от непризнанных школ (10%) — сразу blacklist.
5. **Прошлые проблемы** (10%) — отказ в шенгенской визе, депортация, overstay.
6. **Документ просрочен** (5%) — паспорт, апостиль > 6 мес.

## Что делать после получения визы

1. Купить билет — не ранее, чем за 60 дней до начала семестра (D-2 даёт право въехать только в этом окне).
2. Оформить **Alien Registration Card** в течение 90 дней после прилёта.
3. Открыть корейский банковский счёт — KEB Hana или Woori (нужен ARC).
4. Подключиться к **National Health Insurance** через 6 месяцев (автоматически).

## Полезные ссылки

- Embassy of Korea in Uzbekistan: kor.uz
- HiKorea (госуслуги для иностранцев): hikorea.go.kr
- Korean visa portal: visa.go.kr`,
      uz: `## D-2 viza nima va kimga mos

**D-2** — Koreyaning talaba vizasi: bakalavr (D-2-2), magistr (D-2-3), PhD (D-2-4), tadqiqotchi (D-2-5), universitet til kursi (D-2-7). Muddati — butun dastur uchun.

> **D-4** (universitet tashqarisidagi til maktablari) bilan adashtirmang. Bu yerda faqat D-2.

## Qachon topshirish kerak

- **Bahorgi qabul** (mart 2027): Certificate of Admission dekabr 2026'da → viza yanvar–fevralda.
- **Kuzgi qabul** (sentyabr 2026): admission iyunda → viza iyul–avgustda.

Toshkentdagi Koreya elchixonasi D-2'ni **2–4 hafta**da ko'rib chiqadi. Parvozdan oldin 6 haftalik zaxira qoldiring.

## To'liq hujjatlar to'plami

1. **Xorijiy pasport** — yana 6+ oy amal qiladigan.
2. **2 ta 3.5×4.5 surat** — oq fon, 6 oydan eski emas.
3. **Anketa** — elchixona saytidan to'ldiring.
4. **Certificate of Admission** — Koreya universitetidan original.
5. **Business Registration Certificate** — admission bilan birga keladi.
6. **Attestat / diplom + apostil + tarjima** — koreys yoki ingliz tiliga notarial tarjima.
7. **Baholar transkripti + apostil + tarjima**.
8. **Moliyaviy tasdiq** — bank ko'chirmasi kamida **\$20,000**. Pul hisobda **kamida 1 oy** turishi kerak.
9. **Pul kelib chiqishi xat** — agar pul yangi joylangan bo'lsa.
10. **Homiylik xat** — ota-ona to'lasa: ularning ID + ko'chirma + tug'ilganlik haqida guvohnoma.
11. **Tibbiy ko'rik (sil)** — ba'zi dasturlar uchun.
12. **Til sertifikati** — koreys dasturlari uchun TOPIK 3+, ingliz uchun IELTS 5.5+.
13. **Sug'urta** — 1 yilga.

## Moliyaviy tasdiqni qanday to'g'ri tayyorlash

**Eng ko'p uchraydigan rad sababi.** Maslahatlar:

- Summa **kamida \$20,000** (stipendiya o'qishni qoplagan bo'lsa ham).
- Pul **kamida 30 kun** turishi kerak.
- **USDT yoki naqd emas** — faqat bank hisobi (O'zbekiston yoki xorijiy).
- **Pul manbasini** ko'rsating: tadbirkorlik bo'lsa — STIR + 6 oylik biznes hisob.

## Eng ko'p uchraydigan rad sabablari (2025 statistika)

1. **Zaif moliyaviy tasdiq** (40%)
2. **Anketadagi zaif motivatsiya** (20%)
3. **Til sertifikati dasturga mos emas** (15%)
4. **Tan olinmagan maktabdan "fake" admission** (10%)
5. **Avvalgi muammolar** (10%) — Schengen rad, deportatsiya, overstay
6. **Hujjat muddati o'tgan** (5%) — pasport, apostil > 6 oy

## Vizadan keyin nima qilish

1. Chiptani sotib oling — semestr boshlanishidan 60 kun oldindan emas.
2. **Alien Registration Card**'ni kelganidan keyin 90 kun ichida.
3. Koreya bankida hisob oching (KEB Hana yoki Woori, ARC kerak).
4. **National Health Insurance** 6 oydan keyin avtomatik.

## Foydali manbalar

- Koreya Toshkentdagi elchixonasi: kor.uz
- HiKorea: hikorea.go.kr
- Koreys viza portali: visa.go.kr`,
      en: `## What D-2 is and who it's for

**D-2** is Korea's student visa for accredited universities: bachelor (D-2-2), master (D-2-3), PhD (D-2-4), researcher (D-2-5), university language program (D-2-7). It covers the entire program length.

> Don't confuse it with **D-4** (standalone language schools) — different paperwork, different logic. This guide is D-2 only.

## When to apply

- **Spring intake** (March 2027): Certificate of Admission in December 2026 → visa in January–February.
- **Fall intake** (September 2026): admission in June → visa in July–August.

The Korean embassy in Tashkent processes D-2 in **2–4 weeks**. Plan a 6-week buffer before departure.

## Full document checklist

1. **Passport** — valid for 6+ more months.
2. **2 photos 3.5×4.5 cm** — white background, under 6 months old.
3. **Application form** — fill on the embassy site, print, sign.
4. **Certificate of Admission** — original from the Korean university.
5. **Business Registration Certificate** — comes with admission.
6. **Diploma + apostille + translation** — notarized to Korean or English.
7. **Transcript + apostille + translation**.
8. **Financial proof** — bank statement of at least **\$20,000**. Money must sit on the account for **at least 1 month**.
9. **Source-of-funds letter** — if the money is recent.
10. **Sponsor letter** — if a parent pays: their ID + bank statement + birth certificate (proof of relation).
11. **TB health check** — for some programs.
12. **Language certificate** — TOPIK 3+ for Korean-taught, IELTS 5.5+ for English-taught.
13. **Insurance** — for 1 year.

## How to get financial proof right

**The #1 refusal reason.** Tips:

- Amount **at least \$20,000** (even if a scholarship covers tuition).
- Funds must **sit at least 30 days** on the account.
- **Not USDT, not cash** — only a bank account (Uzbek or foreign).
- **Source of funds**: if a self-employed parent — tax ID + 6-month business account statement.

## Most common refusal reasons (2025)

1. **Weak financial proof** (40%)
2. **Weak motivation in the form** (20%)
3. **Language cert below program requirement** (15%)
4. **"Fake" admission from unrecognized schools** (10%)
5. **Past issues** (10%) — Schengen refusal, deportation, overstay
6. **Expired documents** (5%) — passport, apostille > 6 months

## After you get the visa

1. Buy a ticket — not earlier than 60 days before the semester starts.
2. **Alien Registration Card** within 90 days after arrival.
3. Open a Korean bank account (KEB Hana or Woori — needs ARC).
4. **National Health Insurance** after 6 months automatically.

## Useful links

- Embassy of Korea in Uzbekistan: kor.uz
- HiKorea (gov services for foreigners): hikorea.go.kr
- Korean visa portal: visa.go.kr`,
    },
  },
  {
    slug: 'italy-dsu-scholarship-2026',
    category: 'scholarships',
    cover: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1600&q=80',
    reading_time: 8,
    published_at: '2026-04-18',
    title: {
      ru: 'Бесплатная магистратура в Италии: стипендия DSU 2026',
      uz: "Italiyada bepul magistratura: 2026 DSU stipendiyasi",
      en: 'Free master\'s in Italy: the DSU scholarship 2026',
    },
    excerpt: {
      ru: 'Региональная стипендия DSU покрывает всё: обучение, общежитие, питание, до €7,500 в год. Кто может подать и какие нужны документы.',
      uz: "DSU mintaqaviy stipendiyasi hammasini qoplaydi: o'qish, yotoqxona, oziq-ovqat, yiliga €7,500'gacha. Kim topshira oladi va qanday hujjatlar kerak.",
      en: 'The regional DSU scholarship covers everything: tuition, dorm, food, up to €7,500/year. Who can apply and what documents you need.',
    },
    body: {
      ru: `## Что такое DSU

**DSU (Diritto allo Studio Universitario)** — региональная стипендия для всех студентов, чей семейный доход ниже порога. Дают **итальянцам и иностранцам одинаково**, нет квоты "только для своих".

Стипендия даёт:

- **Полное освобождение от обучения** (€500–€4,000 в зависимости от вуза).
- **Общежитие или аренду** (€2,500–€5,500 в год).
- **Питание в студенческой столовой** (бесплатно или €1.50 за обед).
- **Стипендия наличными** — €2,000–€7,500 в год (если живёшь не в общежитии).

В сумме — до **€10,000–€12,000 в год** покрытия.

## Кто может получить

Главный фактор — **ISEE** (индикатор семейного дохода и имущества). Для иностранцев из Узбекистана это:

- Справка о доходах семьи за 2024 год (или 2025) с переводом и апостилем.
- Справка о собственности (квартира, земля).
- Подтверждение о составе семьи.

Все документы переводятся на итальянский (присяжный переводчик в Италии или Узбекистане + апостиль) и подаются в **CAF Patronato** или вуз.

**Порог дохода:**
- ISEE до €23,000 → 100% покрытия (тираж + общежитие + €5,500–€7,500 наличными).
- ISEE €23,000–€26,000 → 75% покрытия.
- ISEE €26,000–€30,000 → 50% покрытия.

Для Узбекистана средняя семья по ISEE подаёт на 100%.

## Какие университеты дают самые большие DSU

Региональные агентства разные. Топ-5 по размеру стипендии:

1. **Politecnico di Torino** — Piemonte: до €7,200 наличными + общежитие.
2. **Università di Bologna** — Emilia-Romagna: до €5,500 + общежитие.
3. **Sapienza Roma** — Lazio: до €5,150 + общежитие.
4. **Università di Padova** — Veneto: до €5,800.
5. **Politecnico di Milano** — Lombardia: до €6,200, но Милан дорогой → выгодно жить в общежитии.

## Дедлайны 2026/27

- **Заявка на admission** в Politecnico/Sapienza/Bologna — **январь–март 2026**.
- **Подача DSU** — **август–октябрь 2026** (после получения admission и приезда).
- **Регистрация ISEE** в Италии — после прилёта, в CAF Patronato (бесплатно).

## Что нужно сделать сейчас (если хотите осенью 2026)

1. **Сейчас** — выберите 3 университета с английскими/итальянскими программами по специальности.
2. **Январь–февраль 2026** — IELTS 6.0 или итальянский B2.
3. **Февраль–март 2026** — подача в universitaly.it (центральный портал).
4. **Апрель–май 2026** — pre-enrollment в посольство Италии в Ташкенте.
5. **Июнь–август 2026** — виза D, переезд.
6. **Сентябрь–октябрь 2026** — подача DSU.

## Документы для DSU (повторный список)

- Свидетельство о рождении + апостиль + перевод.
- Справка о семье (кто в составе) — местные власти.
- Справки о доходе родителей за 2 года + апостиль + перевод.
- Справка о собственности (квартира, машина, бизнес).
- Студенческий ID Италии (получается после регистрации).
- Контракт аренды или справка из общежития.

## Главное правило

**Подавать одновременно на admission И на DSU.** Большинство студентов узнают о DSU после переезда и теряют 1 семестр. Заранее соберите документы — за 6 месяцев до подачи.`,
      uz: `## DSU nima

**DSU (Diritto allo Studio Universitario)** — oilaviy daromadi yetarli bo'lmagan barcha talabalarga beriladigan mintaqaviy stipendiya. **Italyanlar va xorijliklar teng** beriladi.

Stipendiya beradi:

- **O'qishdan to'liq ozod qilish** (€500–€4,000 universitet bo'yicha).
- **Yotoqxona yoki ijara** (yiliga €2,500–€5,500).
- **Talabalar oshxonasi** (bepul yoki tushlik €1.50).
- **Naqd stipendiya** — yotoqxonada yashamasangiz, yiliga €2,000–€7,500.

Jami yiliga **€10,000–€12,000**'gacha qoplash.

## Kim ola oladi

Asosiy omil — **ISEE** (oila daromadi va mol-mulk indikatori). O'zbekistonlik xorijlik uchun:

- 2024 (yoki 2025) yil oila daromadi haqidagi ma'lumotnoma + apostil + tarjima.
- Mol-mulk haqida ma'lumotnoma (uy, yer).
- Oila tarkibi haqida tasdiq.

Hujjatlar italyan tiliga tarjima qilinadi (qasamyod tarjimon) va **CAF Patronato** yoki universitetga topshiriladi.

**Daromad chegarasi:**
- ISEE €23,000 gacha → 100% qoplash.
- ISEE €23,000–€26,000 → 75%.
- ISEE €26,000–€30,000 → 50%.

O'zbekiston o'rtacha oilasi 100% topshiradi.

## Eng katta DSU beradigan universitetlar

1. **Politecnico di Torino** — Piemonte: yiliga €7,200 naqd + yotoqxona.
2. **Università di Bologna** — Emilia-Romagna: €5,500 + yotoqxona.
3. **Sapienza Roma** — Lazio: €5,150 + yotoqxona.
4. **Università di Padova** — Veneto: €5,800.
5. **Politecnico di Milano** — Lombardia: €6,200.

## 2026/27 muddatlari

- **Admission** Politecnico/Sapienza/Bologna — **yanvar–mart 2026**.
- **DSU topshirish** — **avgust–oktyabr 2026** (admission va kelganidan keyin).
- **ISEE Italiyada** — kelganidan keyin CAF Patronato'da bepul.

## Hozir nima qilish kerak

1. **Hozir** — 3 ta universitet tanlang.
2. **Yanvar–fevral 2026** — IELTS 6.0 yoki italyan B2.
3. **Fevral–mart 2026** — universitaly.it'ga topshirish.
4. **Aprel–may 2026** — Toshkentdagi Italiya elchixonasiga pre-enrollment.
5. **Iyun–avgust 2026** — D viza, ko'chish.
6. **Sentyabr–oktyabr 2026** — DSU topshirish.

## DSU hujjatlar

- Tug'ilganlik haqida guvohnoma + apostil + tarjima.
- Oila tarkibi haqida ma'lumotnoma.
- 2 yillik ota-ona daromadi + apostil + tarjima.
- Mol-mulk ma'lumotnomasi.
- Italiyada ro'yxatdan o'tgan keyingi talabalar ID.
- Ijara yoki yotoqxona shartnomasi.

## Asosiy qoida

**Admission'ga va DSU'ga bir vaqtda topshirish.** Ko'p talabalar DSU haqida kech bilib, 1 semestr yo'qotadi.`,
      en: `## What DSU is

**DSU (Diritto allo Studio Universitario)** is a regional scholarship for any student whose family income is below threshold. Italians and foreigners are treated **equally** — no domestic-only quota.

It provides:

- **Full tuition waiver** (€500–€4,000 depending on the uni).
- **Dorm or rent reimbursement** (€2,500–€5,500/yr).
- **Student canteen** (free or €1.50/meal).
- **Cash stipend** — €2,000–€7,500/yr if not living in a dorm.

Total: up to **€10,000–€12,000/yr** in coverage.

## Who qualifies

The key metric is **ISEE** (family income + assets indicator). For Uzbek students:

- Family income certificate for 2024 (or 2025) + apostille + Italian translation.
- Property certificate (apartment, land).
- Family composition certificate.

All documents are translated to Italian (sworn translator in Italy or Uzbekistan + apostille) and submitted to **CAF Patronato** or the university.

**Income brackets:**
- ISEE up to €23,000 → 100% coverage (waiver + dorm + €5,500–€7,500 cash).
- ISEE €23,000–€26,000 → 75%.
- ISEE €26,000–€30,000 → 50%.

A typical Uzbek family qualifies for 100%.

## Top universities for DSU size

1. **Politecnico di Torino** — Piemonte: up to €7,200 cash + dorm.
2. **Università di Bologna** — Emilia-Romagna: up to €5,500 + dorm.
3. **Sapienza Roma** — Lazio: up to €5,150 + dorm.
4. **Università di Padova** — Veneto: up to €5,800.
5. **Politecnico di Milano** — Lombardia: up to €6,200.

## Deadlines 2026/27

- **Admission** at Polito/Sapienza/Bologna — **January–March 2026**.
- **DSU application** — **August–October 2026** (after admission and arrival).
- **ISEE registration in Italy** — after arrival, free at CAF Patronato.

## What to do now (if you want Fall 2026)

1. **Now** — pick 3 universities with English or Italian programs.
2. **Jan–Feb 2026** — IELTS 6.0 or Italian B2.
3. **Feb–Mar 2026** — apply on universitaly.it.
4. **Apr–May 2026** — pre-enrollment at the Italian embassy in Tashkent.
5. **Jun–Aug 2026** — D visa, move.
6. **Sep–Oct 2026** — submit DSU.

## DSU document checklist

- Birth certificate + apostille + translation.
- Family composition certificate.
- 2-year parental income statements + apostille + translation.
- Property certificate.
- Italian student ID after enrollment.
- Rent contract or dorm certificate.

## The golden rule

**Apply for admission AND DSU together.** Most students learn about DSU after they move and lose a semester. Prepare documents 6 months in advance.`,
    },
  },
  {
    slug: 'usa-vs-europe-which-is-cheaper',
    category: 'tips',
    cover: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=1600&q=80',
    reading_time: 11,
    published_at: '2026-04-15',
    title: {
      ru: 'США или Европа: где учиться дешевле в 2026',
      uz: "AQSh yoki Yevropa: 2026'da qayerda o'qish arzonroq",
      en: 'USA or Europe: where is studying cheaper in 2026',
    },
    excerpt: {
      ru: 'Реальные цифры по 5 университетам США и 5 европейским. Что вы платите за бренд, что — за реальное качество, что — за географию.',
      uz: "AQShning 5 ta va Yevropaning 5 ta universiteti bo'yicha haqiqiy raqamlar. Brendga, sifatga va geografiyaga to'lov.",
      en: 'Real numbers across 5 US and 5 European universities. What you pay for the brand vs. real quality vs. geography.',
    },
    body: {
      ru: `## Короткий ответ

**Европа дешевле почти всегда.** Среднегодовая разница: \$25,000–\$45,000. Но в США есть тропы со \$0 — full-ride scholarship'ы и community college route.

## Сравнение по 5 университетам каждой стороны

### США (бакалавриат, иностранцы, без стипендии)

| Университет | Tuition/год | Жильё/год | Итого |
|---|---|---|---|
| MIT | \$59,750 | \$18,500 | \$78,250 |
| Harvard | \$57,261 | \$20,375 | \$77,636 |
| University of Michigan | \$57,273 | \$15,500 | \$72,773 |
| Penn State | \$39,316 | \$13,500 | \$52,816 |
| Arizona State | \$31,200 | \$13,000 | \$44,200 |

**Среднее по США:** \$65,000/год.

### Европа (бакалавриат, иностранцы, без стипендии)

| Университет | Tuition/год | Жильё/год | Итого |
|---|---|---|---|
| Politecnico di Milano | €4,000 (\$4,200) | €7,500 | \$12,000 |
| Sapienza Roma | €1,000 (\$1,050) | €5,500 | \$6,800 |
| TU Munich (Германия) | €0 | €9,000 | \$9,500 |
| Sorbonne (Франция) | €2,800 (\$3,000) | €7,000 | \$10,500 |
| KU Leuven (Бельгия) | €4,200 (\$4,500) | €7,500 | \$12,500 |

**Среднее по Европе:** \$10,500/год.

**Разница: ×6 в пользу Европы.**

## А что со стипендиями?

### США
- **Full-ride scholarship** — обучение + жильё + проживание. Дают **30+ университетов**, включая Harvard, Yale, MIT, Stanford, Princeton, Duke, Wesleyan.
- **Шансы:** 1.5–2.5% (для отличников + SAT 1500+).
- **Merit-based scholarships** в state university — \$10,000–\$25,000 скидка.

### Европа
- **DAAD (Германия)** — €934/мес на жизнь, обучение бесплатно.
- **Erasmus Mundus** — €49,000–€57,000 на 2 года (магистратура).
- **DSU (Италия)** — €5,000–€7,500/год + жильё (см. отдельную статью).
- **Stipendium Hungaricum** — полное покрытие.

## Тогда зачем вообще платить за США?

1. **Сильные карьерные возможности** — особенно tech и finance. Зарплата выпускника MIT — \$110,000+ vs €45,000 в Европе.
2. **Network эффект** — однокурсники = будущие коллеги в Google, Goldman, Tesla.
3. **OPT visa** — после диплома 1 год работать в США + ещё 2 для STEM. Шанс на H-1B.
4. **Доступ к венчурному капиталу** — 70% стартапов мира поднимают деньги в США.

## Что выбрать в зависимости от цели

| Ваша цель | Куда |
|---|---|
| Полная стипендия + любая страна | Европа (DAAD, Erasmus, DSU) |
| Tech-карьера в Big Tech / FAANG | США (если есть бюджет) или Singapore/UK |
| Получить EU паспорт со временем | Европа (любая страна — 5–10 лет резиденства) |
| Родители платят, главное — престиж | США Ivy League |
| Учёба + работа неполный день | Германия / Нидерланды (20 ч/нед разрешено, рынок труда сильный) |
| Минимум денег + магистратура | Италия с DSU, Германия |

## Промежуточные варианты (часто игнорируются)

- **Канада** — между США и Европой по цене (\$22,000–\$35,000), легче иммиграция.
- **Сингапур / Гонконг** — азиатский MIT, \$16,000–\$25,000, отличная карьера в Азии.
- **Турция** — €1,500–€4,000/год за обучение, English-medium программы. Самое дешёвое предложение по соотношению цена/качество.

## Финальная формула

**Если бюджет < \$15,000/год → Европа (Германия, Италия, Венгрия) или Турция.**
**Если бюджет \$30,000–\$50,000 + IELTS 7+ → США state universities или UK.**
**Если бюджет неограничен + цель Big Tech / Wall Street → США Ivy League.**

Главное — **не платить \$70,000 в Penn State, если ту же специальность дают в TU Munich за €0.** Бренд диплома важен только в первые 3 года карьеры; дальше всё определяют ваши проекты.`,
      uz: `## Qisqa javob

**Yevropa deyarli har doim arzonroq.** O'rtacha yiliga farq: \$25,000–\$45,000. Lekin AQShda \$0'lik yo'l ham bor — full-ride va community college.

## 5 ta universitet bo'yicha taqqoslash

### AQSh (bakalavr, xorijliklar, stipendiyasiz)

| Universitet | Yiliga o'qish | Yashash | Jami |
|---|---|---|---|
| MIT | \$59,750 | \$18,500 | \$78,250 |
| Harvard | \$57,261 | \$20,375 | \$77,636 |
| Penn State | \$39,316 | \$13,500 | \$52,816 |
| Arizona State | \$31,200 | \$13,000 | \$44,200 |

**O'rtacha AQSh:** yiliga \$65,000.

### Yevropa

| Universitet | Yiliga o'qish | Yashash | Jami |
|---|---|---|---|
| Politecnico di Milano | €4,000 | €7,500 | \$12,000 |
| Sapienza Roma | €1,000 | €5,500 | \$6,800 |
| TU Munich | €0 | €9,000 | \$9,500 |
| Sorbonne | €2,800 | €7,000 | \$10,500 |
| KU Leuven | €4,200 | €7,500 | \$12,500 |

**O'rtacha Yevropa:** yiliga \$10,500.

**Farq: Yevropa foydasiga ×6.**

## Stipendiyalar haqida

### AQSh
- **Full-ride** — Harvard, Yale, MIT, Stanford va 30+ universitet beradi.
- **Imkoniyat:** 1.5–2.5% (a'lo + SAT 1500+).

### Yevropa
- **DAAD (Germaniya)** — €934/oy + bepul o'qish.
- **Erasmus Mundus** — 2 yil uchun €49,000.
- **DSU (Italiya)** — €5,000–€7,500/yil + yotoqxona.
- **Stipendium Hungaricum** — to'liq qoplash.

## Nega AQSh uchun to'lash kerak

1. **Karyera imkoniyatlari** — MIT bitiruvchisi yiliga \$110,000+ vs Yevropada €45,000.
2. **Network** — kursdoshlar = Google, Goldman, Tesla.
3. **OPT viza** — 1 yil ishlash, STEM uchun yana 2 yil.
4. **Venchur kapital** — startap pul yig'ish uchun AQSh.

## Maqsadingizga ko'ra tanlov

| Maqsad | Qaerga |
|---|---|
| To'liq stipendiya | Yevropa (DAAD, Erasmus, DSU) |
| Big Tech karyerasi | AQSh yoki Singapur/UK |
| EU pasporti | Yevropa (5–10 yil rezident) |
| Prestij | AQSh Ivy League |
| Ish + o'qish | Germaniya / Niderlandiya |
| Eng arzon magistr | Italiya DSU, Germaniya |

## Oraliq variantlar

- **Kanada** — \$22,000–\$35,000, immigratsiya oson.
- **Singapur / Gonkong** — \$16,000–\$25,000.
- **Turkiya** — yiliga €1,500–€4,000, English-medium.

## Yakuniy formula

- **Yiliga < \$15,000 → Yevropa yoki Turkiya.**
- **\$30,000–\$50,000 + IELTS 7+ → AQSh davlat yoki UK.**
- **Cheksiz + Big Tech → AQSh Ivy League.**`,
      en: `## Short answer

**Europe is almost always cheaper.** Average yearly difference: \$25,000–\$45,000. But the US has \$0 paths — full-ride scholarships and community college transfer.

## 5-university comparison

### USA (bachelor, international, no scholarship)

| University | Tuition/yr | Housing/yr | Total |
|---|---|---|---|
| MIT | \$59,750 | \$18,500 | \$78,250 |
| Harvard | \$57,261 | \$20,375 | \$77,636 |
| University of Michigan | \$57,273 | \$15,500 | \$72,773 |
| Penn State | \$39,316 | \$13,500 | \$52,816 |
| Arizona State | \$31,200 | \$13,000 | \$44,200 |

**US average:** \$65,000/yr.

### Europe

| University | Tuition/yr | Housing/yr | Total |
|---|---|---|---|
| Politecnico di Milano | €4,000 | €7,500 | \$12,000 |
| Sapienza Roma | €1,000 | €5,500 | \$6,800 |
| TU Munich | €0 | €9,000 | \$9,500 |
| Sorbonne (France) | €2,800 | €7,000 | \$10,500 |
| KU Leuven (Belgium) | €4,200 | €7,500 | \$12,500 |

**Europe average:** \$10,500/yr.

**Gap: 6× in favour of Europe.**

## What about scholarships?

### USA
- **Full-ride scholarships** at Harvard, Yale, MIT, Stanford, Princeton, Duke etc.
- **Odds:** 1.5–2.5% (top GPA + SAT 1500+).
- **Merit-based** at state universities — \$10,000–\$25,000 off.

### Europe
- **DAAD (Germany)** — €934/mo + free tuition.
- **Erasmus Mundus** — €49,000–€57,000 for 2 years.
- **DSU (Italy)** — €5,000–€7,500/yr + dorm.
- **Stipendium Hungaricum** — full coverage.

## Why pay for the USA at all?

1. **Career outcomes** — MIT grad earns \$110,000+ vs €45,000 in Europe.
2. **Network** — your peers become colleagues at Google, Goldman, Tesla.
3. **OPT visa** — 1 year US work after grad + 2 more for STEM. Shot at H-1B.
4. **Access to venture capital** — 70% of world startups raise in the US.

## Pick by goal

| Your goal | Where |
|---|---|
| Full scholarship + any country | Europe (DAAD, Erasmus, DSU) |
| Big Tech / FAANG | USA (if budget) or Singapore/UK |
| EU passport eventually | Europe (5–10 years residency) |
| Pure prestige, parents pay | US Ivy League |
| Study + part-time job | Germany / Netherlands |
| Minimum cost + master's | Italy DSU, Germany |

## Underrated middle options

- **Canada** — \$22,000–\$35,000, easier immigration.
- **Singapore / Hong Kong** — \$16,000–\$25,000, strong Asia careers.
- **Turkey** — €1,500–€4,000/yr, English-medium. Best price/quality ratio.

## Final formula

- **Budget < \$15,000/yr → Europe (Germany, Italy, Hungary) or Turkey.**
- **\$30,000–\$50,000 + IELTS 7+ → US state universities or UK.**
- **Unlimited + Big Tech → US Ivy League.**

Don't pay \$70,000 at Penn State for a major TU Munich offers for €0. Brand matters for the first 3 years of your career — after that, it's your projects.`,
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
