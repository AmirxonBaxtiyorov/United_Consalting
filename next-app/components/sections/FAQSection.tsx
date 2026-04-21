'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionTitle } from '@/components/ui/section-title';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const QUESTIONS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

export function FAQSection() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <SectionTitle
          eyebrow={t('eyebrow')}
          title={t('title')}
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {QUESTIONS.map((q, i) => {
            const isOpen = open === i;
            const answerKey = q.replace('q', 'a') as 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7';
            return (
              <div
                key={q}
                className={cn(
                  'rounded-2xl border border-border bg-white transition',
                  isOpen && 'shadow-[var(--shadow-card)]'
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-primary">{t(q)}</span>
                  <ChevronDown
                    className={cn(
                      'size-5 text-muted-fg transition-transform',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid overflow-hidden transition-[grid-template-rows] duration-300',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="min-h-0">
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-muted-fg leading-relaxed">
                      {t(answerKey)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
