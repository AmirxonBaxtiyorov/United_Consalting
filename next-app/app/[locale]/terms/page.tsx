import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return { title: t('title') };
}

const COPY = {
  ru: `Сайт United Global Consulting предоставляет информационные и консультационные услуги по поступлению в иностранные университеты.

Использование сайта означает согласие с этими условиями:

1. Стоимость услуг обсуждается индивидуально до заключения договора. Первая консультация бесплатная.
2. Мы не гарантируем поступление в конкретный университет — решение о приёме принимает университет, а не агентство. Мы гарантируем качественную подготовку документов и сопровождение процесса.
3. Визовые решения принимаются консульствами независимо от нашего агентства. В случае отказа в визе мы помогаем с анализом причин и повторной подачей.
4. Материалы блога и калькулятора носят информационный характер и не являются юридической консультацией.`,
  uz: `United Global Consulting sayti xorijiy universitetlarga kirish bo'yicha axborot va maslahat xizmatlarini taqdim etadi.

Saytdan foydalanish quyidagi shartlarga rozilik berishni anglatadi:

1. Xizmatlar narxi shartnomadan oldin individual muhokama qilinadi. Birinchi maslahat bepul.
2. Aniq universitetga kirishni kafolatlamaymiz — qabul qarorini universitet qabul qiladi, agentlik emas. Biz hujjatlarni sifatli tayyorlashni va jarayonni qo'llab-quvvatlashni kafolatlaymiz.
3. Viza qarorlari bizga bog'liq emas, konsulliklar tomonidan qabul qilinadi. Rad etilgan taqdirda sabablarni tahlil qilib, qayta topshirishga yordam beramiz.
4. Blog va kalkulyator materiallari axborot xarakteriga ega bo'lib, yuridik maslahat emas.`,
  en: `The United Global Consulting website provides information and consulting services for admissions to foreign universities.

Use of the website constitutes acceptance of these terms:

1. Service fees are discussed individually prior to signing a contract. The first consultation is free.
2. We do not guarantee admission to a specific university — the admission decision rests with the university, not the agency. We guarantee quality document preparation and end-to-end process support.
3. Visa decisions are made by consulates, independently of our agency. If refused, we help analyze the reasons and prepare the re-submission.
4. Blog and calculator materials are informational and do not constitute legal advice.`,
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'terms' });
  const l = (locale as keyof typeof COPY) in COPY ? (locale as keyof typeof COPY) : 'ru';
  return (
    <article className="py-16 md:py-20">
      <div className="container-x max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-primary">{t('title')}</h1>
        <p className="mt-3 text-sm text-muted-fg">{t('updated')}: 2026-04-22</p>
        <div className="prose-body mt-8 whitespace-pre-line">{COPY[l]}</div>
      </div>
    </article>
  );
}
