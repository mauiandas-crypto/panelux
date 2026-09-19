import Link from 'next/link'
import { TargetIcon, EyeIcon, HeartIcon, TrophyIcon, ShieldIcon, TruckIcon, WrenchIcon, CreditCardIcon, UsersIcon, PinIcon, ClockIcon, BoxIcon, ChatIcon, MailIcon, PhoneIcon, ChevronLeftIcon } from '@/components/icons/Icons'
import { siteConfig } from '@/lib/config'

export const metadata = {
  title: 'Sobre Panelux Uruguay - Distribuidor Oficial',
  description: 'Conoce la historia de Panelux Uruguay, nuestro compromiso con la calidad y el servicio al cliente.',
}

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Sobre Panelux Uruguay</h1>
          <p className="text-xl text-gray-600">Distribuidor oficial desde 2020</p>
        </div>

        {/* Historia */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>
              Todogastro SAS nace en 2020 y hoy representa oficialmente a Panelux Brasil en Uruguay, la marca brasileña líder en utensilios de cocina con más de 25 años de trayectoria.
            </p>
            <p>
              Nuestro compromiso desde el día uno ha sido traer productos de calidad premium a los hogares uruguayos, manteniendo los más altos estándares de servicio y garantía.
            </p>
            <p>
              Hoy seguimos trabajando para que cada vez más hogares uruguayos conozcan y confíen en los productos Panelux.
            </p>
          </div>
        </section>

        {/* Misión */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-blue-900 mb-3">
                <TargetIcon className="w-6 h-6" /> Misión
              </h3>
              <p className="text-gray-700">
                Distribuir utensilios de cocina de calidad premium que mejoren la experiencia culinaria de cada familia uruguaya.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-purple-900 mb-3">
                <EyeIcon className="w-6 h-6" /> Visión
              </h3>
              <p className="text-gray-700">
                Ser el distribuidor más confiable y recomendado de utensilios de cocina en Uruguay.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-green-900 mb-3">
                <HeartIcon className="w-6 h-6" filled /> Valores
              </h3>
              <p className="text-gray-700">
                Calidad, confianza, servicio al cliente y compromiso con la excelencia.
              </p>
            </div>
          </div>
        </section>

        {/* Por Qué Elegirnos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Por Qué Elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <TrophyIcon className="w-5 h-5" /> Distribuidor Oficial
              </h3>
              <p className="text-gray-700">
                Somos el distribuidor oficial certificado de Panelux en Uruguay. Todos nuestros productos son 100% auténticos.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <ShieldIcon className="w-5 h-5" /> Garantía Oficial
              </h3>
              <p className="text-gray-700">
                Todos nuestros productos incluyen garantía oficial del fabricante. Somos responsables de su cumplimiento.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <TruckIcon className="w-5 h-5" /> Logística Propia
              </h3>
              <p className="text-gray-700">
                Contamos con envíos rápidos y número de seguimiento en cada pedido. Envío gratis a todo Uruguay en compras mayores a ${siteConfig.shipping.minOrderForFreeShipping.toLocaleString('es-UY')}.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <WrenchIcon className="w-5 h-5" /> Servicio Técnico Propio
              </h3>
              <p className="text-gray-700">
                Contamos con equipo técnico capacitado para resolver problemas y brindar soporte post-venta.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <CreditCardIcon className="w-5 h-5" /> Múltiples Formas de Pago
              </h3>
              <p className="text-gray-700">
                Tarjetas de crédito, débito, efectivo, transferencia, Mercado Pago. Hasta 12 cuotas sin interés.
              </p>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <UsersIcon className="w-5 h-5" /> Atención Personalizada
              </h3>
              <p className="text-gray-700">
                Nuestro equipo está disponible para asesorarte en la elección del producto que mejor se adapte a tus necesidades.
              </p>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Visitanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <PinIcon className="w-5 h-5" /> Tienda Física
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Yaguarón 1764, Montevideo</strong>
              </p>
              <p className="text-gray-700">
                Puedes visitarnos para ver los productos en persona, hablar con nuestro equipo y recibir asesoramiento profesional.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-8">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <ClockIcon className="w-5 h-5" /> Horarios
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Lunes a Viernes:</strong> 8:30 - 17:15
              </p>
              <p className="text-gray-700">
                Te recomendamos contactarnos antes de visitarnos para asegurar disponibilidad.
              </p>
            </div>
          </div>
        </section>

        {/* Retiro y servicio técnico */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <BoxIcon className="w-5 h-5" /> Retiro en local
              </h3>
              <p className="text-gray-700">
                Podés retirar tu pedido sin costo en nuestro local de Yaguarón 1764,
                Montevideo. Coordiná el retiro por WhatsApp una vez confirmado tu pedido.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-8">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-4">
                <WrenchIcon className="w-5 h-5" /> Servicio técnico
              </h3>
              <p className="text-gray-700">
                Contamos con servicio técnico propio para reparaciones y consultas sobre
                productos dentro de garantía. Conocé nuestra{' '}
                <Link href="/terminos" className="text-blue-600 font-semibold hover:underline">
                  política de garantía y devoluciones
                </Link>.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Preguntas?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Estamos aquí para ayudarte. Contáctanos por cualquier medio.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/59892715555"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
            >
              <ChatIcon className="w-5 h-5" /> WhatsApp
            </a>
            <a
              href="mailto:info@panelux.com.uy"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
            >
              <MailIcon className="w-5 h-5" /> Email
            </a>
            <a
              href="tel:+59892715555"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition"
            >
              <PhoneIcon className="w-5 h-5" /> Llamar
            </a>
          </div>
        </div>

        {/* Volver */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-800">
            <ChevronLeftIcon className="w-4 h-4" /> Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
