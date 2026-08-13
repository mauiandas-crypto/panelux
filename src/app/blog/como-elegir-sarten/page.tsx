import Link from 'next/link'

export const metadata = {
  title: 'Cómo Elegir la Sartén Perfecta - Panelux Uruguay',
  description: 'Guía completa para elegir la sartén ideal. Tipos de sartenes, materiales y recomendaciones de expertos.',
}

export default function ArticuloSarten() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Guías
            </span>
            <span className="text-gray-500 text-sm ml-4">10 de agosto de 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Cómo Elegir la Sartén Perfecta para tu Cocina
          </h1>
          <div className="text-7xl mb-6">🍳</div>
          <p className="text-xl text-gray-600">
            Guía completa con tipos de sartenes, materiales y recomendaciones para encontrar la sartén ideal según tus necesidades.
          </p>
        </header>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Introducción: La Importancia de la Sartén Correcta</h2>
            <p>
              La sartén es uno de los utensilios más utilizados en la cocina. Elegir la correcta puede marcar la diferencia entre comidas mediocres y verdaderas obras maestras culinarias.
            </p>
            <p>
              Una buena sartén no solo mejora los resultados, sino que también dura años si se cuida adecuadamente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tipos de Sartenes</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sartén Antiadherente</h3>
                <p className="mb-3">
                  La más popular en cocinas modernas. Ideal para cocinar con poco aceite.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Ventajas:</strong> Fácil de limpiar, ideal para dietas bajas en grasa, versátil</li>
                  <li><strong>Desventajas:</strong> Recubrimiento puede dañarse, no es apta para ciertos usos</li>
                  <li><strong>Mejor para:</strong> Huevos, crepes, salteados rápidos</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sartén de Acero Inoxidable</h3>
                <p className="mb-3">
                  Profesional, duradera y versátil. Requiere técnica pero ofrece resultados superiores.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Ventajas:</strong> Extremadamente duradera, soporta temperaturas altas, versátil</li>
                  <li><strong>Desventajas:</strong> Requiere técnica para evitar que se peguen los alimentos</li>
                  <li><strong>Mejor para:</strong> Sellar carnes, hacer salsa, cocina profesional</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sartén de Hierro Fundido</h3>
                <p className="mb-3">
                  Clásica, extremadamente duradera y versátil. Mejora con el tiempo.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Ventajas:</strong> Retiene calor excepcional, dura generaciones, versátil</li>
                  <li><strong>Desventajas:</strong> Pesada, requiere mantenimiento especial, no apta para lavavajillas</li>
                  <li><strong>Mejor para:</strong> Frituras, carnes a fuego alto, pan</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sartén de Vidrio</h3>
                <p className="mb-3">
                  Versátil, práctica y va del horno a la mesa.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Ventajas:</strong> Versátil, se ve el contenido, apta para horno y table</li>
                  <li><strong>Desventajas:</strong> Requiere cuidado para no romper, distribución de calor irregular</li>
                  <li><strong>Mejor para:</strong> Gratinados, pasta al horno, presentaciones</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Factores a Considerar al Elegir</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">1. Tamaño</h3>
                <p>
                  Las sartenes vienen en varios diámetros (20, 24, 28 y 30 cm). Elige según tus necesidades:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li><strong>20-22 cm:</strong> Individual, huevos, cantidades pequeñas</li>
                  <li><strong>24-26 cm:</strong> Para 2-3 personas (tamaño más popular)</li>
                  <li><strong>28-30 cm:</strong> Familias grandes, comidas para grupos</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">2. Profundidad</h3>
                <p>
                  Sartenes bajas: para frituras rápidas. Sartenes profundas (woks, saltadores): para guisos y salteados.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">3. Material de la Base</h3>
                <p>
                  Una base gruesa y homogénea distribuye mejor el calor. Busca bases de al menos 3mm.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">4. Mango</h3>
                <p>
                  Debe ser cómodo, resistente y aislante. Algunos prefieren mangos desmontables.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">5. Compatible con tu Cocina</h3>
                <p>
                  Verifica que sea compatible con tu tipo de cocina: gas, eléctrica o inducción.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recomendación: El Juego Perfecto</h2>
            <p>
              La mayoría de cocinas profesionales usan una combinación:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Sartén antiadherente de 24cm:</strong> Uso diario, desayunos, huevos</li>
              <li><strong>Sartén de acero inoxidable de 28cm:</strong> Versatilidad, carnes, salsas</li>
              <li><strong>Sartén de hierro de 26cm (opcional):</strong> Cuando quieres resultados premium</li>
            </ul>
          </section>

          <section>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-2">💡 Consejo de Experto</h3>
              <p>
                Invierte en pocas sartenes de buena calidad en lugar de muchas económicas. Una sartén de calidad dura décadas si se cuida bien.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cuidados Básicos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Lava con agua y jabón después de cada uso</li>
              <li>Seca inmediatamente para evitar oxidación</li>
              <li>No uses utensilios metálicos en antiadherentes</li>
              <li>Almacena sin apilar o con protecciones entre ellas</li>
              <li>Sigue recomendaciones específicas del fabricante</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusión</h2>
            <p>
              Elegir la sartén correcta es una decisión importante que impacta tu experiencia culinaria diaria. En Panelux Uruguay encontrarás una amplia selección de sartenes de todas las tipos y marcas confiables.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 my-12">
          <h3 className="text-2xl font-bold mb-2">¿Listo para elegir tu sartén?</h3>
          <p className="mb-4">Nuestros expertos te ayudarán a encontrar exactamente lo que necesitas.</p>
          <a
            href="https://wa.me/59892715555"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Consultar con experto
          </a>
        </div>

        {/* Relacionados */}
        <div className="border-t pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Más Artículos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/cuidados-utensilios" className="p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition">
              <h4 className="font-bold text-gray-900">Cuidados y Mantenimiento</h4>
              <p className="text-sm text-gray-600 mt-2">Prolonga la vida de tus utensilios</p>
            </Link>
            <Link href="/blog/tecnicas-cocina" className="p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition">
              <h4 className="font-bold text-gray-900">Técnicas de Cocina Profesional</h4>
              <p className="text-sm text-gray-600 mt-2">Mejora tus habilidades culinarias</p>
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
