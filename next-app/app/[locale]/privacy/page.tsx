import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SITE } from '@/lib/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return { title: t('title') };
}

const COPY = {
  ru: `Настоящая политика описывает, какие персональные данные мы собираем через форму обратной связи (имя, телефон, email, страна интереса, уровень обучения, сообщение) и как их используем: связь с вами для консультации, подбор программ, напоминания о сроках.

Данные хранятся в защищённой базе Supabase и не передаются третьим лицам, за исключением партнёрских университетов — только с вашего явного согласия на этапе подачи документов.

Вы можете запросить удаление данных в любой момент, написав на ${SITE.email}.`,
  uz: `Ushbu siyosat biz orqa aloqa formasida qanday shaxsiy ma'lumotlarni yig'ishimizni (ism, telefon, email, qiziqqan davlat, ta'lim darajasi, xabar) va ulardan qanday foydalanishimizni tavsiflaydi: maslahat uchun aloqa, dastur tanlash, muddatlar haqida eslatmalar.

Ma'lumotlar himoyalangan Supabase bazasida saqlanadi va uchinchi shaxslarga berilmaydi, bundan faqat hamkor universitetlar mustasno — hujjatlarni topshirish bosqichidagi sizning aniq roziligingiz bilan.

Istalgan vaqtda ma'lumotlarni o'chirishni so'rashingiz mumkin: ${SITE.email}.`,
  en: `This policy describes what personal data we collect via our contact form (name, phone, email, country of interest, level of study, message) and how we use it: contacting you for consultation, matching programs, reminding about deadlines.

Data is stored in a secure Supabase database and is not shared with third parties, with the exception of partner universities — only with your explicit consent during the application stage.

You may request deletion of your data at any time by writing to ${SITE.email}.`,
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });
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
