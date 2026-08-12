import Link from 'next/link'

export const metadata = {
  title: 'Términos de Servicio - Panelux Uruguay',
  description: 'Lee nuestros términos y condiciones de uso. Política de compra, devoluciones y garantía en Panelux Uruguay.',
}

export default function Terminos() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Términos de Servicio</h1>

        <div className="prose prose-lg text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Aceptación de Términos</h2>
            <p>
              Al usar Panelux Uruguay y realizar compras, aceptas estos términos y condiciones. Si no estás de acuerdo, no uses nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Productos y Precios</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Disponibilidad:</strong> Los productos están disponibles mientras el stock dure</li>
              <li><strong>Precios:</strong> Los precios mostrados incluyen IVA y son en pesos uruguayos</li>
              <li><strong>Cambios de precio:</strong> Nos reservamos el derecho de cambiar precios sin previo aviso</li>
              <li><strong>Fotos:</strong> Las imágenes son referenciales y pueden variar ligeramente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Proceso de Compra</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Debes tener al menos 18 años para comprar</li>
              <li>Toda la información que proporciones debe ser correcta y precisa</li>
              <li>Nos reservamos el derecho de rechazar cualquier pedido</li>
              <li>Los pedidos se confirman mediante email</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Formas de Pago</h2>
            <p>Aceptamos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Mercado Pago:</strong> Tarjetas de crédito/débito, efectivo, transferencia</li>
              <li><strong>Pago al recibir:</strong> Con POS Herby en Montevideo y Cd. de la Costa</li>
              <li><strong>Hasta 12 cuotas:</strong> Sin interés en tarjetas participantes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Envíos y Entregas</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Zona de envío gratis:</strong> Montevideo y Ciudad de la Costa</li>
              <li><strong>Otras zonas:</strong> Consultar costo de envío</li>
              <li><strong>Tiempo de entrega:</strong> 3-5 días hábiles después de confirmado el pago</li>
              <li><strong>Riesgo:</strong> El riesgo de pérdida pasa al cliente una vez entregado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Garantía y Devoluciones</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Garantía:</strong> Todos nuestros productos cuentan con garantía oficial del fabricante</li>
              <li><strong>Plazo de garantía:</strong> Según especificaciones del fabricante (ver producto)</li>
              <li><strong>Devoluciones:</strong> Se aceptan dentro de 10 días de recibido el producto</li>
              <li><strong>Condiciones:</strong> Producto sin uso, con embalaje original</li>
              <li><strong>Reembolso:</strong> Se procesa dentro de 5-7 días hábiles</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Responsabilidad Limitada</h2>
            <p>
              Panelux Uruguay no es responsable por:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Daños incidentales o consecuentes</li>
              <li>Pérdida de datos o beneficios</li>
              <li>Uso indebido de productos</li>
              <li>Daños causados por terceros</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Uso del Sitio Web</h2>
            <p>No debes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Usar el sitio para actividades ilegales</li>
              <li>Intentar acceder a áreas restringidas</li>
              <li>Transmitir virus o código malicioso</li>
              <li>Interferir con el funcionamiento del sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Propiedad Intelectual</h2>
            <p>
              Todo el contenido del sitio (textos, imágenes, logos) es propiedad de Panelux Uruguay. No puedes reproducir, distribuir o usar sin autorización.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Ley Aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República Oriental del Uruguay. Cualquier disputa será resuelta en los juzgados de Montevideo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Contacto</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>WhatsApp:</strong> 095 244 593</p>
              <p><strong>Email:</strong> info@panelux.com.uy</p>
              <p><strong>Horario:</strong> Lun-Vie 9:00-18:00, Sáb 10:00-14:00</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">12. Cambios en los Términos</h2>
            <p>
              Nos reservamos el derecho de actualizar estos términos en cualquier momento. Los cambios serán publicados en esta página.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Última actualización:</strong> 12 de agosto de 2026
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
