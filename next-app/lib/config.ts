export const SITE = {
  name: 'United Global Consulting',
  shortName: 'UGC',
  tagline_ru: 'Учёба за рубежом без посредников и ложных обещаний',
  tagline_en: 'Study abroad without middlemen or false promises',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://global-consalting.vercel.app',
  phone: '+998 88 526 30 00',
  phoneTel: '+998885263000',
  email: 'info@unitedglobal.uz',
  address: 'Tashkent, Uzbekistan',
  hours: 'Mon–Sat, 9:00–20:00',
  social: {
    whatsapp: 'https://wa.me/998885263000',
    telegram: 'https://t.me/unitedglobal',
    instagram: 'https://instagram.com/unitedglobal.uz',
  },
  founded: 2026,
} as const;

export const COUNTRY_OPTIONS = [
  'korea',
  'singapore',
  'usa',
  'italy',
  'luxembourg',
  'finland',
  'turkey',
  'japan',
  'latvia',
  'malaysia',
] as const;
