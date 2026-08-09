import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10">
            <img
              src="/panelux-logo.png"
              alt="Panelux Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-2xl font-bold text-blue-600">Panelux</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Inicio
          </Link>
          <Link href="/categoria/ollas" className="text-gray-700 hover:text-blue-600 font-medium">
            Productos
          </Link>
          <Link href="/buscar" className="text-gray-700 hover:text-blue-600 font-medium">
            Buscar
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/buscar"
            className="text-gray-700 hover:text-blue-600"
          >
            🔍
          </Link>
          <Link
            href="/carrito"
            className="text-gray-700 hover:text-blue-600"
          >
            🛒
          </Link>
        </div>
      </div>
    </header>
  )
}
