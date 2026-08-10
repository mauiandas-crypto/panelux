'use client';

import Link from 'next/link';
import { useState } from 'react';
import PromoBar from './PromoBar';
import MenuDrawer from './MenuDrawer';
import { COLORS, Z_INDEX } from '@/lib/design-tokens';

export default function NewHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <PromoBar />
      <header
        className="sticky bg-white border-b"
        style={{ top: 0, zIndex: Z_INDEX.sticky, borderColor: COLORS.neutral[200] }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4 justify-between">
          {/* Hamburguesa + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
            >
              ☰
            </button>
            <Link href="/" className="flex items-center">
              <img src="/assets/panelux-logo.png" alt="Panelux" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Search */}
          <form className="hidden md:flex flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-1 px-4 py-2 border-2 rounded-l-lg outline-none"
              style={{ borderColor: COLORS.primary[200] }}
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-r-lg text-white"
              style={{ backgroundColor: COLORS.primary[500] }}
            >
              🔍
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link href="/favoritos" className="p-2 hover:bg-gray-100 rounded-lg">❤️</Link>
            <Link href="/carrito" className="p-2 hover:bg-gray-100 rounded-lg">🛒</Link>
          </div>
        </div>
      </header>

      {/* Drawer */}
      {menuOpen && <MenuDrawer onClose={() => setMenuOpen(false)} />}
    </>
  );
}
