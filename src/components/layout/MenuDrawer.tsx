'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MENU_CATEGORIES, HELP_LINKS, FEATURED_BANNERS, CONTACT_DATA } from '@/config/menu-data';
import { COLORS, Z_INDEX } from '@/lib/design-tokens';

interface MenuDrawerProps {
  onClose: () => void;
}

export default function MenuDrawer({ onClose }: MenuDrawerProps) {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black"
        style={{ opacity: 0.5, zIndex: Z_INDEX.modal - 1 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 h-screen bg-white flex flex-col overflow-y-auto"
        style={{ width: '100%', maxWidth: '400px', zIndex: Z_INDEX.modal }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: COLORS.neutral[200] }}>
          <h2 className="text-lg font-bold" style={{ color: COLORS.primary[600] }}>Menú</h2>
          <button onClick={onClose} className="text-2xl hover:opacity-75">✕</button>
        </div>

        {/* Destacados */}
        <div className="p-4 border-b" style={{ borderColor: COLORS.neutral[200] }}>
          <h3 className="text-sm font-bold mb-3 uppercase">Destacados</h3>
          <div className="grid grid-cols-2 gap-3">
            {FEATURED_BANNERS.map(b => (
              <Link
                key={b.id}
                href={b.link}
                onClick={onClose}
                className="relative rounded-lg overflow-hidden h-28 bg-gray-300 flex items-center justify-center text-center"
              >
                <span className="text-white font-bold">{b.title}</span>
                {b.badge && <span className="absolute top-2 right-2 text-xs font-bold px-2 py-1 bg-red-500 text-white rounded">{b.badge}</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* Categorías */}
        <div className="p-4 border-b" style={{ borderColor: COLORS.neutral[200] }}>
          <h3 className="text-sm font-bold mb-3 uppercase">Categorías</h3>
          <nav className="space-y-1">
            {MENU_CATEGORIES.map(cat => (
              <div key={cat.id}>
                <button
                  onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
                  className="w-full flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-100 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span>{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <span style={{ transform: expandedCat === cat.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</span>
                </button>
                {expandedCat === cat.id && (
                  <div className="bg-gray-50 rounded mt-1 py-2">
                    {cat.subs.map(sub => (
                      <Link
                        key={sub}
                        href={`/categoria/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={onClose}
                        className="block px-6 py-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        • {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Ayuda */}
        <div className="p-4 border-b" style={{ borderColor: COLORS.neutral[200] }}>
          <h3 className="text-sm font-bold mb-3 uppercase">Ayuda</h3>
          <nav className="space-y-2">
            {HELP_LINKS.map(link => (
              link.external ? (
                <a
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600"
                >
                  <span>{link.icon}</span>
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ) : (
                <Link
                  key={link.id}
                  href={link.link}
                  onClick={onClose}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600"
                >
                  <span>{link.icon}</span>
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* Contacto */}
        <div className="mt-auto p-4 border-t bg-gray-50" style={{ borderColor: COLORS.neutral[200] }}>
          <div className="text-xs text-gray-600 space-y-1">
            <p className="font-semibold">{CONTACT_DATA.address}</p>
            <p>{CONTACT_DATA.phone}</p>
            <p>{CONTACT_DATA.hours.weekday}</p>
            <p>{CONTACT_DATA.hours.saturday}</p>
          </div>
        </div>
      </div>
    </>
  );
}
