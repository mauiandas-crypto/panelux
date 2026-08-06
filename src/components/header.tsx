import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            className="w-10 h-10 text-blue-600"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            {/* Círculo fondo */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />

            {/* Olla estilizada */}
            <path
              d="M30 50 Q30 35 50 35 Q70 35 70 50 L68 65 Q68 70 63 70 L37 70 Q32 70 32 65 Z"
              fill="currentColor"
              opacity="0.8"
            />

            {/* Mango */}
            <path
              d="M70 48 Q85 48 85 55"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-blue-600">Panelux</h1>
            <p className="text-xs text-gray-600">Uruguay</p>
          </div>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          <Link href="#categorias" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
            Productos
          </Link>
          <a href="https://wa.me/598XXXXXXXXX" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
            Contacto
          </a>
        </nav>

        {/* WhatsApp Button (Mobile) */}
        <Link
          href="https://wa.me/598XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
          title="Contactar por WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.07 4.56L19 4.5c-1.81-1.8-4.22-2.79-6.78-2.79-5.28 0-9.58 4.3-9.58 9.58 0 1.68.44 3.33 1.28 4.79L2 22l5.15-1.35c1.4.76 2.98 1.16 4.6 1.16 5.28 0 9.59-4.3 9.59-9.59 0-2.56-.99-4.97-2.79-6.78zM11.75 19.76c-1.41 0-2.8-.37-4.01-1.07l-.29-.16-2.99.79.8-2.95-.19-.3c-.78-1.24-1.19-2.68-1.19-4.14 0-4.42 3.6-8.02 8.02-8.02 2.14 0 4.15.84 5.66 2.36 1.51 1.51 2.34 3.51 2.34 5.64 0 4.42-3.6 8.02-8.02 8.02zm4.38-6.04c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.55.13-.17.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.65-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.48-.39-.41-.54-.42-.14-.01-.29-.01-.44-.01-.15 0-.4.06-.61.29-.21.23-.84.82-.84 2 0 1.18.86 2.33 1 2.49.14.16 1.72 2.62 4.16 3.67.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.08 1.43-.58 1.63-1.14.2-.56.2-1.05.14-1.14-.06-.1-.22-.16-.46-.28z"/>
          </svg>
        </Link>
      </div>
    </header>
  )
}
