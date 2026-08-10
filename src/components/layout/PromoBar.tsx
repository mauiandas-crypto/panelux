'use client';

import { useState, useEffect } from 'react';
import { PROMO_MESSAGES, COLORS } from '@/lib/design-tokens';

export default function PromoBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % PROMO_MESSAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full py-2 px-4 text-center text-white text-sm font-medium flex items-center justify-center gap-4"
      style={{ backgroundColor: COLORS.primary[600] }}
    >
      <button onClick={() => setCurrent(c => (c - 1 + PROMO_MESSAGES.length) % PROMO_MESSAGES.length)} className="hover:opacity-75">←</button>
      <div className="flex-1">{PROMO_MESSAGES[current]}</div>
      <button onClick={() => setCurrent(c => (c + 1) % PROMO_MESSAGES.length)} className="hover:opacity-75">→</button>
    </div>
  );
}
