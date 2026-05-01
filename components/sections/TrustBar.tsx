import { useTranslations } from 'next-intl';
import { PARTNERS } from '@/data/partners';
import Image from 'next/image';

export function TrustBar() {
  const t = useTranslations('trust_bar');
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-10 bg-[var(--color-surface)] border-y border-border">
      <div className="container-x mb-6 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] text-muted-fg uppercase">
          {t('label')}
        </p>
      </div>
      <div className="overflow-hidden relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-surface)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-surface)] to-transparent z-10" />
        <div className="flex gap-10 animate-marquee w-max items-center">
          {doubled.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="shrink-0 h-16 w-40 relative grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition"
              title={p.name}
            >
              <Image
                src={p.logo}
                alt={p.name}
                fill
                sizes="160px"
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
