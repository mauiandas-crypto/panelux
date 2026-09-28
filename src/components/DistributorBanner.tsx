import { siteConfig } from '@/lib/config'
import { ChatIcon } from '@/components/icons/Icons'

export default function DistributorBanner() {
  const whatsappNumber = siteConfig.contact.whatsapp
  const mensaje = encodeURIComponent('Hola! Quiero información para ser distribuidor de Panelux.')

  return (
    <div className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <p className="text-sm sm:text-base font-medium">
          ¿Querés ser distribuidor de Panelux? Escribinos
        </p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${mensaje}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white font-bold px-4 py-1.5 rounded-full text-sm transition"
        >
          <ChatIcon className="w-4 h-4" />
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  )
}
