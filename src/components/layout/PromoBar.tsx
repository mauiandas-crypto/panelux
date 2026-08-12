'use client';

import { useState, useEffect } from 'react';
import { COLORS } from '@/lib/design-tokens';
import { useAdmin } from '@/context/AdminContext';

export default function PromoBar() {
  const { data } = useAdmin();
  const [current, setCurrent] = useState(0);

  // Filtrar solo los mensajes activos
  const activePromos = data.promoMessages
    .filter(p => p.active)
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (activePromos.length === 0) return;

    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % activePromos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activePromos.length]);

  if (activePromos.length === 0) {
    return null;
  }

  return (
    <div
      className="w-full py-2 px-4 text-center text-white text-sm font-medium flex items-center justify-center gap-4"
      style={{ backgroundColor: COLORS.primary[600] }}
    >
      <button
        onClick={() => setCurrent(c => (c - 1 + activePromos.length) % activePromos.length)}
        className="hover:opacity-75"
      >
        ←
      </button>
      <div className="flex-1">{activePromos[current]?.text}</div>
      <button
        onClick={() => setCurrent(c => (c + 1) % activePromos.length)}
        className="hover:opacity-75"
      >
        →
      </button>
    </div>
  );
}
