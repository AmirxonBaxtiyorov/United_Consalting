export const SITE = {
  name: 'United Consulting',
  shortName: 'UC',
  tagline_ru: 'Учёба за рубежом без посредников и ложных обещаний',
  tagline_en: 'Study abroad without middlemen or false promises',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unitedglobalconsulting.uz',
  phone: '+998 88 526 30 00',
  phoneTel: '+998885263000',
  email: 'info@unitedglobalconsulting.uz',
  address: 'Tashkent, Uzbekistan',
  hours: 'Mon–Sat, 9:00–20:00',
  social: {
    whatsapp: 'https://wa.me/998885263000',
    telegram: 'https://t.me/unitedconsulting',
    instagram: 'https://instagram.com/unitedglobalconsulting.uz',
  },
  founded: 2026,
} as const;

export const COUNTRY_OPTIONS = [
  'usa',
  'malaysia',
  'singapore',
  'turkey',
  'finland',
  'italy',
  'germany',
  'luxembourg',
  'latvia',
  'poland',
  'romania',
  'hungary',
  'uk',
] as const;
