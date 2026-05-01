'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/config';
import { ArrowUp, MessageCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FloatingWidgets() {
  const t = useTranslations('widgets');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
      <a
        href={SITE.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsapp')}
        className="inline-flex items-center justify-center size-12 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition"
      >
        <MessageCircle className="size-5" />
      </a>
      <a
        href={SITE.social.telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('telegram')}
        className="inline-flex items-center justify-center size-12 rounded-full bg-[#229ED9] text-white shadow-lg hover:scale-105 transition"
      >
        <Send className="size-5" />
      </a>
      <button
        aria-label={t('back_to_top')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          'inline-flex items-center justify-center size-12 rounded-full bg-primary text-white shadow-lg hover:scale-105 transition',
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <ArrowUp className="size-5" />
      </button>
    </div>
  );
}
