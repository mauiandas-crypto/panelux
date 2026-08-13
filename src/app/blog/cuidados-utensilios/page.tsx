import Link from 'next/link'

export const metadata = {
  title: 'Cuidados y Mantenimiento de Utensilios - Panelux Uruguay',
  description: 'Guía completa para mantener tus utensilios de cocina en perfecto estado. Tips de limpieza y conservación.',
}

export default function ArticuloCuidados() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Mantenimiento
            </span>
            <span className="text-gray-500 text-sm ml-4">8 de agosto de 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Cuidados y Mantenimiento de Utensilios de Cocina
          </h1>
          <div className="text-7xl mb-6">🧹</div>
          <p className="text-xl text-gray-600">
            Aprende cómo mantener tus utensilios en perfectas condiciones y alargar significativamente su vida útil.
          </p>
        </header>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Introducción: Inversión en Durabilidad</h2>
            <p>
              Un utensilio de cocina de calidad es una inversión a largo plazo. Con los cuidados adecuados, puede durarte 10, 20 o incluso 50 años.
            </p>
            <p>
              Estos simple consejos te ayudarán a preservar tus utensilios en perfecto estado.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Limpieza Inmediata</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-bold text-gray-900 mb-3">La Regla de Oro:</p>
              <p>
                Limpia inmediatamente después de usar, mientras el utensilio está aún tibio.
              </p>
            </div>
            <p className="mt-4">
              Esto previene que restos de comida se sequen y peguen, haciéndolos más fáciles de limpiar y evitando daños por oxidación.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Limpieza por Tipo de Utensilio</h2>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sartenes Antiadherentes</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Usa agua tibia y jabón suave</li>
                  <li>Nunca uses esponjas metálicas o abrasivas</li>
                  <li>Seca completamente después de lavar</li>
                  <li>Evita cambios extremos de temperatura</li>
                  <li>Guarda con cuidado para no rascar el recubrimiento</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sartenes de Acero Inoxidable</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Puedes usar agua caliente y jabón</li>
                  <li>Para manchas difíciles, usa vinagre blanco o bicarbonato</li>
                  <li>Puedes usar esponjas un poco más abrasivas</li>
                  <li>Seca bien para evitar manchas de agua</li>
                  <li>Apta para lavavajillas (aunque no se recomienda)</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ollas de Hierro Fundido</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lava con agua caliente apenas termines de cocinar</li>
                  <li>Nunca la dejes en remojo</li>
                  <li>Seca COMPLETAMENTE con un trapo limpio</li>
                  <li>Aplica un poco de aceite después de secar para mantener el seasoning</li>
                  <li>Nunca uses lavavajillas</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ollas de Vidrio y Cerámica</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Lava con agua y jabón suave</li>
                  <li>Evita cambios bruscos de temperatura</li>
                  <li>Ten cuidado con golpes (pueden romper)</li>
                  <li>Normalmente aptas para lavavajillas</li>
                  <li>Almacena con cuidado para evitar roturas</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Almacenamiento Correcto</h2>
            <p>
              El lugar donde guardas tus utensilios es tan importante como cómo los limpias.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>No apiles sin protección:</strong> Usa papeles o protectores entre ellas para evitar rayones</li>
              <li><strong>Lugar seco:</strong> Guarda donde no haya humedad excesiva</li>
              <li><strong>Alejado de calor extremo:</strong> No junto a radiadores o ventanas con sol directo</li>
              <li><strong>Lugar accesible:</strong> Evita guardar en lugares muy altos si tienes niños</li>
              <li><strong>Protege mangos:</strong> Algunos mangos de plástico pueden dañarse con temperaturas extremas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Problemas Comunes y Soluciones</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Manchas de Agua en Acero Inoxidable</h3>
                <p>
                  Limpia con vinagre blanco o limón, frota en dirección del grano del acero.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Óxido en Hierro Fundido</h3>
                <p>
                  Frota con acero de lana fina, enjuaga, seca y re-seasona con aceite. Si es severo, considera profesionales de restauración.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Rayones en Antiadherentes</h3>
                <p>
                  Son inevitables con el tiempo. Rayones pequeños no afectan. Si son severos y el teflón se pela, es hora de reemplazar.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Ollas Deformadas</h3>
                <p>
                  Evita cambios extremos de temperatura. No pongas ollas calientes en agua fría. Si se deforma, puede que necesite reemplazo.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Longevidad: Qué Esperar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-900">Antiadherentes</h3>
                <p className="text-sm text-blue-800 mt-2">5-10 años con cuidado</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-900">Acero Inoxidable</h3>
                <p className="text-sm text-blue-800 mt-2">20+ años, casi indefinido</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-900">Hierro Fundido</h3>
                <p className="text-sm text-blue-800 mt-2">Generaciones, 50+ años</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-900">Vidrio/Cerámica</h3>
                <p className="text-sm text-blue-800 mt-2">Indefinido (si no se rompe)</p>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-2">💡 Tip Final</h3>
              <p>
                Invierte en utensilios de buena calidad desde el inicio. La diferencia de precio inicial se compensa ampliamente con años de uso sin problemas.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusión</h2>
            <p>
              Con estos simples cuidados, tus utensilios de cocina te servirán fielmente durante años. Recuerda: la limpieza inmediata y el almacenamiento correcto son los secretos principales para mantener tus utensilios como nuevos.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 my-12">
          <h3 className="text-2xl font-bold mb-2">¿Necesitas reemplazar algún utensilio?</h3>
          <p className="mb-4">En Panelux Uruguay tenemos opciones de todas las categorías con garantía oficial.</p>
          <a
            href="https://wa.me/59892715555"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Ver nuestros productos
          </a>
        </div>

        {/* Relacionados */}
        <div className="border-t pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Más en el Blog</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/como-elegir-sarten" className="p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition">
              <h4 className="font-bold text-gray-900">Cómo Elegir la Sartén Perfecta</h4>
              <p className="text-sm text-gray-600 mt-2">Guía completa para encontrar la ideal</p>
            </Link>
            <Link href="/blog/olla-presion-beneficios" className="p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition">
              <h4 className="font-bold text-gray-900">Beneficios de Olla a Presión</h4>
              <p className="text-sm text-gray-600 mt-2">Por qué vale la pena tener una</p>
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
