import Link from 'next/link'

export const metadata = {
  title: 'Beneficios de Cocinar con Olla a Presión - Panelux Uruguay',
  description: 'Descubre los beneficios de usar olla a presión. Ahorra tiempo, energía y dinero cocinando con olla a presión.',
}

export default function ArticuloOllaPresion() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Consejos
            </span>
            <span className="text-gray-500 text-sm ml-4">12 de agosto de 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Beneficios de Cocinar con Olla a Presión
          </h1>
          <div className="text-7xl mb-6">🍲</div>
          <p className="text-xl text-gray-600">
            Descubre por qué la olla a presión es el utensilio favorito de chefs profesionales y amas de casa en todo el mundo.
          </p>
        </header>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué usar olla a presión?</h2>
            <p>
              La olla a presión es un utensilio revolucionario que ha transformado la manera de cocinar en millones de hogares. Su tecnología permite cocinar alimentos más rápidamente mientras se conservan los nutrientes y sabores naturales.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Ahorra Tiempo</h2>
            <p>
              Una de las ventajas más importantes es la velocidad. La olla a presión puede reducir el tiempo de cocción en un 30-70% comparado con métodos tradicionales.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Guiso: 3 horas → 45 minutos</li>
              <li>Arroz integral: 45 minutos → 15 minutos</li>
              <li>Cortes duros de carne: 2 horas → 30 minutos</li>
              <li>Legumbres: 1-2 horas → 15-20 minutos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Economía de Energía</h2>
            <p>
              Al reducir significativamente el tiempo de cocción, la olla a presión consume menos energía. Esto se traduce en facturas de electricidad o gas más bajas.
            </p>
            <p>
              Según estudios, el uso de olla a presión puede reducir el consumo energético en la cocina hasta en 70%.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Sabor y Nutrientes Preservados</h2>
            <p>
              Contrario a lo que muchos creen, la presión no destruye el sabor. De hecho, al cocinar más rápidamente, los alimentos retienen más nutrientes y sabores naturales que se pierden en cocciones prolongadas.
            </p>
            <p>
              Las vitaminas termolábiles (especialmente las del grupo B) se preservan mejor en cocciones rápidas.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Versátil y Práctica</h2>
            <p>
              Puedes cocinar prácticamente cualquier cosa: carnes, pescados, legumbres, granos, verduras, postres e incluso hacer esterilización casera.
            </p>
            <p>
              Es perfecta para familias ocupadas, personas que trabajan muchas horas o quienes desean preparar comidas elaboradas sin invertir horas en la cocina.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Textura y Consistencia Perfecta</h2>
            <p>
              La presión ayuda a que los alimentos duros se vuelvan tiernos uniformemente, creando texturas y consistencias difíciles de lograr con otros métodos.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Seguridad Moderna</h2>
            <p>
              Las ollas a presión modernas como las de Panelux Uruguay incluyen múltiples sistemas de seguridad: válvulas de alivio, sistemas anti-bloqueo y cierres de seguridad.
            </p>
            <p>
              Son completamente seguras cuando se usan según las instrucciones del fabricante.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Ideal para Recetas Tradicionales</h2>
            <p>
              Muchas recetas tradicionales que tardaban horas (puchero, ropa vieja, feijoada) ahora se pueden preparar en fracciones de ese tiempo sin perder autenticidad.
            </p>
          </section>

          <section>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-2">💡 Consejo Práctico</h3>
              <p>
                Si eres nuevo en el uso de olla a presión, comienza con recetas sencillas como arroz, pastas o agua para bebidas calientes. Una vez que domines la técnica básica, podrás experimentar con recetas más complejas.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusión</h2>
            <p>
              La olla a presión es una inversión inteligente para cualquier cocina. Ahorra tiempo, energía y dinero mientras mantiene la calidad y sabor de tus comidas. En Panelux Uruguay encontrarás ollas a presión de excelente calidad con garantía oficial.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 my-12">
          <h3 className="text-2xl font-bold mb-2">¿Necesitas una olla a presión?</h3>
          <p className="mb-4">Tenemos opciones de todas las capacidades y marcas confiables con garantía oficial.</p>
          <button
            onClick={() => window.open('https://wa.me/598095244593', '_blank')}
            className="bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Consultar disponibilidad
          </button>
        </div>

        {/* Relacionados */}
        <div className="border-t pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Artículos Relacionados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/cuidados-utensilios" className="p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition">
              <h4 className="font-bold text-gray-900">Cuidados y Mantenimiento de Utensilios</h4>
              <p className="text-sm text-gray-600 mt-2">Aprende a prolongar la vida útil de tus ollas</p>
            </Link>
            <Link href="/blog/receta-guiso" className="p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition">
              <h4 className="font-bold text-gray-900">Recetas para Olla de Vidrio</h4>
              <p className="text-sm text-gray-600 mt-2">Deliciosas recetas que puedes preparar</p>
            </Link>
          </div>
        </div>

        {/* Volver */}
        <div className="mt-12 pt-8 border-t">
          <Link href="/blog" className="text-blue-600 font-semibold hover:text-blue-800">
            ← Volver al Blog
          </Link>
        </div>
      </article>
    </div>
  )
}
