export type CountryName = {
  uz: string;
  ru: string;
  en: string;
};

export type Deadline = {
  id: string;
  label: string;
  date: string;
};

export type University = {
  name: string;
  chip: string;
  desc: string;
};

export type QuizWeight = {
  affordable: number;
  prestige: number;
  english: number;
  tech: number;
  warm: number;
  europe: number;
  asia: number;
  scholarship_focus: number;
};

export type Country = {
  slug: string;
  code: string;
  name: CountryName;
  capital: string;
  language: string;
  currency_local: string;
  image: string;
  universities_count: number;
  tuition_year: {
    bachelor: number;
    master: number;
    phd: number;
    language: number;
  };
  living_year: {
    dorm: number;
    shared: number;
    rent: number;
  };
  extra: {
    documents: number;
    visa: number;
    insurance: number;
    flight: number;
  };
  typical_deadlines: Deadline[];
  quiz_weight: QuizWeight;
  universities: University[];
};

export const COUNTRIES: Country[] = [
  {
    slug: 'usa',
    code: 'us',
    name: { uz: 'AQSH', ru: 'США', en: 'United States' },
    capital: 'Washington D.C.',
    language: 'English',
    currency_local: 'USD',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=80',
    universities_count: 5,
    tuition_year: { bachelor: 13000, master: 16000, phd: 14000, language: 8000 },
    living_year: { dorm: 9600, shared: 12000, rent: 18000 },
    extra: { documents: 450, visa: 350, insurance: 2200, flight: 1400 },
    typical_deadlines: [
      { id: 'us-fall', label: 'USF / UTA / Webster — Fall intake', date: '2026-07-01' },
      { id: 'us-spring', label: 'Illinois State / SEMO — Spring intake', date: '2026-11-01' },
    ],
    quiz_weight: { asia: 0, affordable: 1, prestige: 3, english: 3, tech: 3, warm: 1, europe: 0, scholarship_focus: 2 },
    universities: [
      { name: 'University of South Florida', chip: 'Public', desc: 'Tampa, Florida — kuchli IT, Business va Engineering.' },
      { name: 'University of Texas at Arlington', chip: 'Public', desc: 'IT, Engineering va Business uchun ideal.' },
      { name: 'Illinois State University', chip: 'Public', desc: "Arzonroq va xalqaro talabalarga qulay." },
      { name: 'Southeast Missouri State University', chip: 'Affordable', desc: 'Eng arzon variantlardan biri, scholarship beradi.' },
      { name: 'Webster University', chip: 'Private', desc: 'St. Louis, Business va International Relations.' },
    ],
  },
  {
    slug: 'malaysia',
    code: 'my',
    name: { uz: 'Malayziya', ru: 'Малайзия', en: 'Malaysia' },
    capital: 'Kuala Lumpur',
    language: 'English / Malay',
    currency_local: 'MYR',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80',
    universities_count: 4,
    tuition_year: { bachelor: 4000, master: 5500, phd: 4000, language: 2000 },
    living_year: { dorm: 2400, shared: 3600, rent: 6000 },
    extra: { documents: 220, visa: 180, insurance: 300, flight: 520 },
    typical_deadlines: [
      { id: 'my-apu', label: 'APU — Fall intake', date: '2026-08-15' },
      { id: 'my-taylors', label: "Taylor's / INTI — Spring intake", date: '2026-12-15' },
    ],
    quiz_weight: { asia: 3, affordable: 3, prestige: 2, english: 3, tech: 2, warm: 3, europe: 0, scholarship_focus: 2 },
    universities: [
      { name: 'Asia Pacific University (APU)', chip: 'Tech', desc: 'IT, AI va Engineering bo\'yicha eng yaxshi.' },
      { name: "Taylor's University", chip: 'Transfer', desc: 'UK / Australia transfer dasturlari kuchli.' },
      { name: 'INTI International University', chip: 'Affordable', desc: 'Eng arzon transfer variantlardan biri.' },
      { name: 'University of Greenwich Program', chip: 'UK Degree', desc: 'Malayziyada o\'qib UK diplomi olish.' },
    ],
  },
  {
    slug: 'singapore',
    code: 'sg',
    name: { uz: 'Singapur', ru: 'Сингапур', en: 'Singapore' },
    capital: 'Singapore',
    language: 'English',
    currency_local: 'SGD',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80',
    universities_count: 1,
    tuition_year: { bachelor: 7000, master: 9000, phd: 8000, language: 5000 },
    living_year: { dorm: 7200, shared: 9600, rent: 15000 },
    extra: { documents: 350, visa: 280, insurance: 600, flight: 900 },
    typical_deadlines: [
      { id: 'sg-amity', label: 'Amity Singapore — Foundation intake', date: '2026-09-01' },
    ],
    quiz_weight: { asia: 3, affordable: 1, prestige: 3, english: 3, tech: 3, warm: 3, europe: 0, scholarship_focus: 2 },
    universities: [
      { name: 'Amity Global Institute Singapore', chip: 'Foundation', desc: 'UK / USA / Australia transfer pathway.' },
    ],
  },
  {
    slug: 'turkey',
    code: 'tr',
    name: { uz: 'Turkiya', ru: 'Турция', en: 'Türkiye' },
    capital: 'Ankara',
    language: 'Turkish / English',
    currency_local: 'TRY',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=80',
    universities_count: 5,
    tuition_year: { bachelor: 4000, master: 5500, phd: 4000, language: 2400 },
    living_year: { dorm: 2400, shared: 3600, rent: 6000 },
    extra: { documents: 220, visa: 120, insurance: 300, flight: 350 },
    typical_deadlines: [
      { id: 'tr-yos', label: 'YÖS / Türkiye Bursları', date: '2026-02-20' },
      { id: 'tr-summer', label: 'Davlat universitetlari yozgi qabul', date: '2026-07-20' },
    ],
    quiz_weight: { asia: 1, affordable: 3, prestige: 2, english: 2, tech: 2, warm: 3, europe: 2, scholarship_focus: 3 },
    universities: [
      { name: 'Marmara University', chip: 'Public', desc: '1883-yildan beri Istanbuldagi TOP davlat universiteti.' },
      { name: 'Istanbul Kent University', chip: 'Medical', desc: 'Tibbiyot va sog\'liqni saqlash kuchli.' },
      { name: 'İstanbul Kültür Üniversitesi', chip: 'Private', desc: 'Business va Engineering uchun qulay.' },
      { name: 'Nişantaşı Üniversitesi', chip: 'Modern', desc: 'IT, Media, Aviation — 25–75% scholarship.' },
      { name: 'Üsküdar Üniversitesi', chip: 'Health', desc: 'Psychology va Health Sciences kuchli.' },
    ],
  },
  {
    slug: 'finland',
    code: 'fi',
    name: { uz: 'Finlyandiya', ru: 'Финляндия', en: 'Finland' },
    capital: 'Helsinki',
    language: 'Finnish / English',
    currency_local: 'EUR',
    image: '/universities/tampere.jpg',
    universities_count: 2,
    tuition_year: { bachelor: 9700, master: 11700, phd: 0, language: 5000 },
    living_year: { dorm: 5400, shared: 7800, rent: 12000 },
    extra: { documents: 250, visa: 180, insurance: 400, flight: 780 },
    typical_deadlines: [
      { id: 'fi-tampere', label: 'Tampere University — priority round', date: '2026-12-01' },
      { id: 'fi-hamk', label: 'HAMK — international application', date: '2027-01-14' },
    ],
    quiz_weight: { asia: 0, affordable: 1, prestige: 2, english: 3, tech: 3, warm: 0, europe: 3, scholarship_focus: 3 },
    universities: [
      { name: 'HAMK University', chip: 'Applied', desc: 'Amaliy ta\'lim, IT va biznes.' },
      { name: 'Tampere University', chip: 'TOP 10', desc: '50% yoki full scholarship imkoniyati.' },
    ],
  },
  {
    slug: 'italy',
    code: 'it',
    name: { uz: 'Italiya', ru: 'Италия', en: 'Italy' },
    capital: 'Rome',
    language: 'Italian / English',
    currency_local: 'EUR',
    image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1600&q=80',
    universities_count: 5,
    tuition_year: { bachelor: 3000, master: 4500, phd: 3500, language: 2600 },
    living_year: { dorm: 4800, shared: 6600, rent: 10800 },
    extra: { documents: 280, visa: 180, insurance: 400, flight: 650 },
    typical_deadlines: [
      { id: 'it-bologna', label: 'Università di Bologna — application', date: '2026-03-15' },
      { id: 'it-polimi', label: 'Politecnico di Milano — Spring call', date: '2026-05-10' },
      { id: 'it-padova', label: 'Università di Padova — admission', date: '2026-04-30' },
    ],
    quiz_weight: { asia: 0, affordable: 2, prestige: 3, english: 2, tech: 2, warm: 3, europe: 3, scholarship_focus: 3 },
    universities: [
      { name: 'Università di Bologna', chip: 'Oldest', desc: 'Unibo Action 100% kontrakt + €11,000 grant.' },
      { name: 'Università di Padova', chip: 'Grants', desc: 'Eng oson grant beradigan universitet.' },
      { name: 'Politecnico di Milano', chip: 'Tech', desc: 'IT, Engineering va Design — TOP.' },
      { name: 'Sapienza University of Rome', chip: 'Largest', desc: 'Yevropadagi eng katta universitet.' },
      { name: 'University of Turin', chip: 'Easy', desc: 'Kirish oson, DSU grant ehtimoli yuqori.' },
    ],
  },
  {
    slug: 'germany',
    code: 'de',
    name: { uz: 'Germaniya', ru: 'Германия', en: 'Germany' },
    capital: 'Berlin',
    language: 'German / English',
    currency_local: 'EUR',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80',
    universities_count: 3,
    tuition_year: { bachelor: 2500, master: 4000, phd: 0, language: 3500 },
    living_year: { dorm: 5400, shared: 8400, rent: 12000 },
    extra: { documents: 280, visa: 180, insurance: 1200, flight: 720 },
    typical_deadlines: [
      { id: 'de-rwth', label: 'RWTH Aachen — Winter intake', date: '2026-07-15' },
      { id: 'de-anhalt', label: 'Hochschule Anhalt — application', date: '2026-06-30' },
      { id: 'de-ue', label: 'UE Germany — rolling admission', date: '2026-08-15' },
    ],
    quiz_weight: { asia: 0, affordable: 3, prestige: 3, english: 2, tech: 3, warm: 1, europe: 3, scholarship_focus: 2 },
    universities: [
      { name: 'Hochschule Anhalt', chip: 'Free', desc: 'Bepul davlat universiteti, IELTS 5.5–6.0.' },
      { name: 'University of Applied Sciences Europe', chip: 'Private', desc: 'Berlin / Hamburg — tez acceptance letter.' },
      { name: 'RWTH Aachen University', chip: 'TOP', desc: 'Engineering va texnologiya bo\'yicha TOP.' },
    ],
  },
  {
    slug: 'luxembourg',
    code: 'lu',
    name: { uz: 'Lyuksemburg', ru: 'Люксембург', en: 'Luxembourg' },
    capital: 'Luxembourg City',
    language: 'English / French / German',
    currency_local: 'EUR',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80',
    universities_count: 1,
    tuition_year: { bachelor: 600, master: 600, phd: 200, language: 2000 },
    living_year: { dorm: 7200, shared: 10200, rent: 15600 },
    extra: { documents: 280, visa: 180, insurance: 500, flight: 700 },
    typical_deadlines: [
      { id: 'lu-bsc', label: 'University of Luxembourg — BSc', date: '2026-04-30' },
      { id: 'lu-msc', label: 'University of Luxembourg — MSc', date: '2026-05-31' },
    ],
    quiz_weight: { asia: 0, affordable: 3, prestige: 2, english: 2, tech: 2, warm: 1, europe: 3, scholarship_focus: 3 },
    universities: [
      { name: 'University of Luxembourg', chip: 'Multilingual', desc: 'Trilingual ta\'lim, IT va Finance kuchli.' },
    ],
  },
  {
    slug: 'latvia',
    code: 'lv',
    name: { uz: 'Latviya', ru: 'Латвия', en: 'Latvia' },
    capital: 'Riga',
    language: 'English / Latvian',
    currency_local: 'EUR',
    image: '/universities/rtu.jpg',
    universities_count: 2,
    tuition_year: { bachelor: 3500, master: 5000, phd: 4000, language: 2200 },
    living_year: { dorm: 3000, shared: 4800, rent: 7200 },
    extra: { documents: 230, visa: 150, insurance: 300, flight: 600 },
    typical_deadlines: [
      { id: 'lv-rtu', label: 'Riga Technical University — Summer', date: '2026-06-30' },
      { id: 'lv-ul', label: 'University of Latvia — admission', date: '2026-07-15' },
    ],
    quiz_weight: { asia: 0, affordable: 3, prestige: 2, english: 3, tech: 3, warm: 0, europe: 3, scholarship_focus: 2 },
    universities: [
      { name: 'Riga Technical University', chip: 'Tech', desc: 'Baltikadagi eng yaxshi texnik universitet.' },
      { name: 'University of Latvia', chip: 'Open', desc: 'IT, Business, Medicine — IELTS yumshoq.' },
    ],
  },
  {
    slug: 'poland',
    code: 'pl',
    name: { uz: 'Polsha', ru: 'Польша', en: 'Poland' },
    capital: 'Warsaw',
    language: 'English / Polish',
    currency_local: 'PLN',
    image: 'https://images.unsplash.com/photo-1607427293702-036933bbf746?auto=format&fit=crop&w=1600&q=80',
    universities_count: 2,
    tuition_year: { bachelor: 3500, master: 4500, phd: 3000, language: 2000 },
    living_year: { dorm: 3600, shared: 5400, rent: 8400 },
    extra: { documents: 230, visa: 180, insurance: 300, flight: 580 },
    typical_deadlines: [
      { id: 'pl-vistula', label: 'Vistula University — Summer intake', date: '2026-07-31' },
      { id: 'pl-uitm', label: 'UITM — application', date: '2026-08-15' },
    ],
    quiz_weight: { asia: 0, affordable: 3, prestige: 2, english: 3, tech: 2, warm: 1, europe: 3, scholarship_focus: 2 },
    universities: [
      { name: 'Vistula University', chip: 'Easy', desc: 'Warsaw — admission oson, IELTS yumshoq.' },
      { name: 'University of Information Tech', chip: 'IT', desc: 'IT va Aviation Management mashhur.' },
    ],
  },
  {
    slug: 'romania',
    code: 'ro',
    name: { uz: 'Ruminiya', ru: 'Румыния', en: 'Romania' },
    capital: 'Bucharest',
    language: 'English / Romanian',
    currency_local: 'RON',
    image: '/universities/politehnica.jpg',
    universities_count: 2,
    tuition_year: { bachelor: 2500, master: 3500, phd: 2500, language: 1500 },
    living_year: { dorm: 2400, shared: 3600, rent: 6000 },
    extra: { documents: 220, visa: 150, insurance: 300, flight: 480 },
    typical_deadlines: [
      { id: 'ro-transilvania', label: 'Transilvania University — application', date: '2026-07-15' },
      { id: 'ro-politehnica', label: 'Politehnica Bucharest — admission', date: '2026-07-31' },
    ],
    quiz_weight: { asia: 0, affordable: 3, prestige: 2, english: 2, tech: 3, warm: 1, europe: 3, scholarship_focus: 2 },
    universities: [
      { name: 'Transilvania University of Brașov', chip: 'Easy', desc: 'Visa va admission oson, narx arzon.' },
      { name: 'Politehnica University of Bucharest', chip: 'Engineering', desc: 'Engineering va AI bo\'yicha kuchli.' },
    ],
  },
  {
    slug: 'hungary',
    code: 'hu',
    name: { uz: 'Vengriya', ru: 'Венгрия', en: 'Hungary' },
    capital: 'Budapest',
    language: 'English / Hungarian',
    currency_local: 'HUF',
    image: '/universities/debrecen.jpg',
    universities_count: 2,
    tuition_year: { bachelor: 4500, master: 6000, phd: 4500, language: 2500 },
    living_year: { dorm: 3600, shared: 5400, rent: 8400 },
    extra: { documents: 230, visa: 180, insurance: 350, flight: 560 },
    typical_deadlines: [
      { id: 'hu-debrecen', label: 'University of Debrecen / Stipendium Hungaricum', date: '2027-01-15' },
      { id: 'hu-bmu', label: 'Budapest Metropolitan University', date: '2026-08-15' },
    ],
    quiz_weight: { asia: 0, affordable: 2, prestige: 2, english: 3, tech: 2, warm: 1, europe: 3, scholarship_focus: 3 },
    universities: [
      { name: 'University of Debrecen', chip: 'Stipendium', desc: 'Stipendium Hungaricum — full scholarship.' },
      { name: 'Budapest Metropolitan University', chip: 'Private', desc: 'Budapest, IELTS yumshoq.' },
    ],
  },
  {
    slug: 'uk',
    code: 'gb',
    name: { uz: 'Buyuk Britaniya', ru: 'Великобритания', en: 'United Kingdom' },
    capital: 'London',
    language: 'English',
    currency_local: 'GBP',
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=80',
    universities_count: 2,
    tuition_year: { bachelor: 12000, master: 14000, phd: 13000, language: 9000 },
    living_year: { dorm: 8400, shared: 12000, rent: 18000 },
    extra: { documents: 350, visa: 800, insurance: 600, flight: 750 },
    typical_deadlines: [
      { id: 'uk-sunderland', label: 'University of Sunderland — Fall intake', date: '2026-07-31' },
      { id: 'uk-teesside', label: 'Teesside University — January intake', date: '2026-11-30' },
    ],
    quiz_weight: { asia: 0, affordable: 1, prestige: 3, english: 3, tech: 3, warm: 1, europe: 3, scholarship_focus: 2 },
    universities: [
      { name: 'University of Sunderland', chip: 'Affordable', desc: 'Arzonroq UK — Visa approval yaxshi.' },
      { name: 'Teesside University', chip: 'AI', desc: 'IT, AI — £7,000 Vice-Chancellor Scholarship.' },
    ],
  },
];

export function getCountry(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}

export function allCountrySlugs(): string[] {
  return COUNTRIES.map((c) => c.slug);
}
