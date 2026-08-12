'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PromoBar from './PromoBar';
import MenuDrawer from './MenuDrawer';
import { COLORS, Z_INDEX } from '@/lib/design-tokens';
import { productos } from '@/data/productos';

export default function NewHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<typeof productos>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Normalizar texto: minúsculas y sin acentos
  const normalizeText = (text: string) => {
    return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  };

  useEffect(() => {
    if (searchInput.trim()) {
      const searchTerms = searchInput.trim().split(/\s+/);
      const normalizedSearchTerms = searchTerms.map(normalizeText);

      const filtered = productos.filter((p) => {
        const normalizedNombre = normalizeText(p.nombre);
        const normalizedCodigo = normalizeText(p.codigo);

        // Todas las palabras del búsqueda deben estar en el nombre o código
        return normalizedSearchTerms.every(
          (term) => normalizedNombre.includes(term) || normalizedCodigo.includes(term)
        );
      }).slice(0, 5);

      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchInput)}`);
      setSearchInput('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (codigo: string) => {
    router.push(`/productos/${codigo}`);
    setSearchInput('');
    setShowSuggestions(false);
  };

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
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-md relative">
            <form onSubmit={handleSearch} className="w-full flex">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => searchInput && setShowSuggestions(true)}
                className="flex-1 px-4 py-2 border-2 rounded-l-lg outline-none text-gray-900"
                style={{ borderColor: COLORS.primary[200] }}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-lg text-white hover:opacity-90 transition"
                style={{ backgroundColor: COLORS.primary[500] }}
              >
                🔍
              </button>
            </form>

            {/* Dropdown de sugerencias */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-1 bg-white border-2 rounded-lg shadow-lg z-50"
                style={{ borderColor: COLORS.primary[200] }}
              >
                {searchSuggestions.map((producto) => (
                  <button
                    key={producto.codigo}
                    onClick={() => handleSuggestionClick(producto.codigo)}
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b last:border-b-0 transition flex items-center gap-3"
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{producto.nombre}</div>
                      <div className="text-xs text-gray-500">${producto.pvp}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

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
