import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'uz', 'en'],
  defaultLocale: 'uz',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
