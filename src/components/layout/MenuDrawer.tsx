'use client';

import Link from 'next/link';
import { MENU_CATEGORIES, HELP_LINKS, CONTACT_DATA } from '@/config/menu-data';
import { COLORS, Z_INDEX } from '@/lib/design-tokens';
import { CloseIcon } from '@/components/icons/Icons';

interface MenuDrawerProps {
  onClose: () => void;
}

export default function MenuDrawer({ onClose }: MenuDrawerProps) {
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
          <button onClick={onClose} className="hover:opacity-75">
            <CloseIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Categorías */}
        <div className="p-4 border-b" style={{ borderColor: COLORS.neutral[200] }}>
          <h3 className="text-sm font-bold mb-3 uppercase">Categorías</h3>
          <nav className="space-y-1">
            {MENU_CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${encodeURIComponent(cat.categoria)}`}
                onClick={onClose}
                className="block py-3 px-3 rounded-lg hover:bg-gray-100 font-medium"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/catalogo"
              onClick={onClose}
              className="block py-3 px-3 rounded-lg hover:bg-gray-100 font-medium text-blue-600"
            >
              Ver catálogo completo
            </Link>
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
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ) : (
                <Link
                  key={link.id}
                  href={link.link}
                  onClick={onClose}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600"
                >
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
          </div>
        </div>
      </div>
    </>
  );
}
