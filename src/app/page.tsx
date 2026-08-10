export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">🍳 Panelux</h1>
          <a
            href="https://wa.me/598XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 px-6 text-center">
        <h2 className="text-5xl font-bold mb-6">Panelux Uruguay</h2>
        <p className="text-2xl mb-8">Distribuidor Oficial de Utensilios de Cocina</p>
        <a
          href="#productos"
          className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
        >
          Ver Productos →
        </a>
      </section>

      {/* Productos */}
      <section id="productos" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 pb-4 border-b-4 border-blue-500">
          Sartenes y Woks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Producto 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img
              src="/productos/Magnific%20AA/5000041_Magnific_AA_Frigideira%20Francesa%20%C3%8732_Grafite.jpg"
              alt="Sartén"
              className="w-full h-56 object-cover hover:scale-105 transition"
            />
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-2">Magnific - Sartén Francesa 32cm</h3>
              <p className="text-sm text-gray-600 mb-4">Código: 5000041</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">$710</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold transition">
                  ➕
                </button>
              </div>
            </div>
          </div>

          {/* Producto 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img
              src="/productos/Magnific%20AA/5000094_Magnific_AA_Ca%C3%A7arola%20%C3%8718_Grafite.jpg"
              alt="Cacerola"
              className="w-full h-56 object-cover hover:scale-105 transition"
            />
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-2">Magnific - Cacerola 18cm</h3>
              <p className="text-sm text-gray-600 mb-4">Código: 5000094</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">$600</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold transition">
                  ➕
                </button>
              </div>
            </div>
          </div>

          {/* Producto 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img
              src="/productos/Magnific%20AA/5000096_Magnific_AA_Ca%C3%A7arola%20%C3%8722_Grafite.jpg"
              alt="Cacerola"
              className="w-full h-56 object-cover hover:scale-105 transition"
            />
            <div className="p-6">
              <h3 className="font-bold text-gray-900 mb-2">Magnific - Cacerola 22cm</h3>
              <p className="text-sm text-gray-600 mb-4">Código: 5000096</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">$840</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold transition">
                  ➕
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 p-8 bg-blue-50 rounded-lg">
          <p className="text-gray-600 text-lg font-semibold">
            ✨ Mostrando 3 de 76 productos disponibles
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 text-center">
        <p className="font-bold mb-2">© 2026 Panelux Uruguay</p>
        <p className="text-gray-400">Distribuidor Oficial | Yaguarón 1764, Montevideo</p>
      </footer>
    </main>
  )
}
