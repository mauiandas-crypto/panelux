'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/config'

function CheckIcon() {
  return (
    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
      <svg viewBox="0 0 20 20" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10l4 4 8-8" />
      </svg>
    </span>
  )
}

function CatalogIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 12l9 4 9-4" />
      <path d="M3 17l9 4 9-4" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
      <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.386.7 4.61 1.907 6.478L4.5 28.5l7.24-1.898a11.94 11.94 0 0 0 4.26.784c6.628 0 12.001-5.373 12.001-12.001S22.629 3 16.001 3zm6.98 17.02c-.297.836-1.472 1.53-2.412 1.73-.64.136-1.474.245-4.286-.921-3.6-1.49-5.916-5.145-6.098-5.386-.176-.24-1.462-1.945-1.462-3.71 0-1.766.905-2.63 1.226-2.99.32-.359.7-.449.933-.449.234 0 .467.002.671.012.216.01.505-.082.79.603.297.712 1.008 2.463 1.096 2.643.088.18.147.392.03.632-.117.24-.176.39-.35.6-.176.21-.37.469-.528.63-.176.18-.36.375-.155.735.205.36.911 1.503 1.955 2.435 1.343 1.198 2.475 1.57 2.836 1.746.36.18.57.15.78-.09.21-.24.897-1.045 1.137-1.405.234-.36.474-.3.792-.18.325.12 2.056.97 2.408 1.146.352.18.586.27.673.42.088.15.088.868-.209 1.704z"/>
    </svg>
  )
}

function ChevronIcon({ direction, className = 'w-5 h-5' }: { direction: 'left' | 'right'; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  )
}

// Cada slide destaca una línea real del catálogo, con fotos reales de
// productos que efectivamente se venden hoy.
const slides = [
  {
    key: 'magnific',
    badge: 'Distribuidor Oficial · Uruguay',
    titulo: 'Cocina como',
    tituloDestacado: 'profesional',
    subtitulo: 'Comprá online. Envío a todo Uruguay, hasta 12 cuotas y servicio técnico propio.',
    catalogoHref: '/catalogo?categoria=Sartenes%20y%20woks',
    main: { src: '/Productos/Magnific AA/5000141_Magnific_AA_Frigideira Funda_com_Tampa Ø22_Grafite.jpg', alt: 'Sartén hondo Magnific 22cm con tapa' },
    left: { src: '/Productos/Magnific AA/5000096_Magnific_AA_Caçarola Ø22_Grafite.jpg', alt: 'Cacerola Magnific 22cm' },
    right: { src: '/Productos/Magnific AA/5001217_Magnific_AA_WOK Ø24_Grafite.jpg', alt: 'Wok Magnific 24cm' },
  },
  {
    key: 'maximum-stone',
    badge: 'Línea Maximum Stone',
    titulo: 'Resistencia que',
    tituloDestacado: 'se nota',
    subtitulo: '7 capas de antiadherente y 1,9mm de aluminio. Hecha para durar, con garantía oficial.',
    catalogoHref: '/catalogo?categoria=Ollas%20y%20cacerolas',
    main: { src: '/Productos/Maximum Stone/5001640_Maximum_Frigideira Funda_com_Tampa_Ø26_Preta.jpg', alt: 'Sartén hondo Maximum Stone 26cm con tapa' },
    left: { src: '/Productos/Maximum Stone/5001656_Maximum_Panela Ø18_Preta.jpg', alt: 'Olla Maximum Stone 18cm' },
    right: { src: '/Productos/Maximum Stone/5002498_Maximum_Wok_com_Tampa e Alça_Ø28_Preta.jpg', alt: 'Wok Maximum Stone 28cm con tapa' },
  },
  {
    key: 'presion',
    badge: 'Ollas a presión',
    titulo: 'Ahorrá tiempo',
    tituloDestacado: 'en la cocina',
    subtitulo: 'Cociná guisos, legumbres y cortes duros en una fracción del tiempo, ahorrando gas.',
    catalogoHref: '/catalogo?categoria=Ollas%20a%20presión',
    main: { src: '/Productos/Panela de Pressão/5000001_Classic_PPFI_3L_Polida.jpg', alt: 'Olla a presión Classic 3L pulida' },
    left: { src: '/Productos/Panela de Pressão/2000009_Classic PRO_PPFE_15L_Polida.jpg', alt: 'Olla a presión Classic Pró 15L pulida' },
    right: { src: '/Productos/Panela de Pressão/5000019_Magnific_PPFI_3L_Grafite.jpg', alt: 'Olla a presión Magnific 3L grafito' },
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)

  const goTo = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[active]

  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white overflow-hidden pt-6 pb-8 md:pt-20 md:pb-16">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left Side - Text */}
          <div key={slide.key} className="space-y-3 md:space-y-6 hero-fade">
            <div className="hidden md:inline-block">
              <span className="bg-white/15 border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                {slide.badge}
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-6xl font-bold leading-tight mb-2 md:mb-4">
                {slide.titulo} <span className="text-blue-200">{slide.tituloDestacado}</span>
              </h1>
              <p className="text-base md:text-xl text-blue-100">
                {slide.subtitulo}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 pt-1 md:pt-4">
              <Link
                href={slide.catalogoHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition transform hover:scale-105"
              >
                <CatalogIcon />
                Ver catálogo completo
              </Link>
              <button
                onClick={() => window.open('https://wa.me/59892715555', '_blank')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition transform hover:scale-105"
              >
                <ChatIcon />
                Hablar con un asesor
              </button>
            </div>

            {/* Quick Benefits - constantes, no dependen del slide */}
            <div className="hidden md:block space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-blue-100">
                  Envío gratis en todo Uruguay en compras mayores a ${siteConfig.shipping.minOrderForFreeShipping.toLocaleString('es-UY')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-blue-100">Garantía oficial del fabricante</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-blue-100">Hasta {siteConfig.payments.maxInstallments} cuotas sin interés</span>
              </div>
            </div>
          </div>

          {/* Right Side - Real product photography, layered for depth */}
          <div className="relative h-48 md:h-[28rem] flex items-center justify-center" style={{ perspective: '1200px' }}>
            <div className="absolute w-48 h-48 md:w-80 md:h-80 bg-white/10 rounded-full blur-2xl"></div>

            <style>{`
              @keyframes hero-float {
                0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
                50% { transform: translateY(-10px) rotate(var(--rot, 0deg)); }
              }
              .hero-float { animation: hero-float 5s ease-in-out infinite; }

              @keyframes hero-fade-in {
                from { opacity: 0; transform: translateY(6px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .hero-fade { animation: hero-fade-in 0.4s ease-out; }
            `}</style>

            <div key={slide.key} className="contents hero-fade">
              {/* Tarjeta de fondo - izquierda */}
              <div
                className="absolute w-20 h-20 md:w-52 md:h-52 bg-white rounded-2xl shadow-2xl p-2 md:p-4 hero-float"
                style={{ left: '4%', top: '4%', animationDelay: '0.3s', '--rot': '-10deg' } as React.CSSProperties}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slide.left.src}
                    alt={slide.left.alt}
                    fill
                    className="object-contain"
                    sizes="208px"
                  />
                </div>
              </div>

              {/* Tarjeta de fondo - derecha */}
              <div
                className="absolute w-16 h-16 md:w-48 md:h-48 bg-white rounded-2xl shadow-2xl p-2 md:p-4 hero-float"
                style={{ right: '2%', bottom: '2%', animationDelay: '1.1s', '--rot': '9deg' } as React.CSSProperties}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slide.right.src}
                    alt={slide.right.alt}
                    fill
                    className="object-contain"
                    sizes="192px"
                  />
                </div>
              </div>

              {/* Tarjeta principal - protagonista */}
              <div
                className="relative w-32 h-32 md:w-80 md:h-80 bg-white rounded-2xl shadow-2xl p-3 md:p-6 hero-float"
                style={{ animationDelay: '0s', '--rot': '-3deg' } as React.CSSProperties}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slide.main.src}
                    alt={slide.main.alt}
                    fill
                    className="object-contain"
                    sizes="(min-width: 768px) 320px, 128px"
                    priority={active === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles del carrusel */}
        <div className="flex items-center justify-center md:justify-start gap-4 mt-6 md:mt-10">
          <button
            onClick={() => goTo(active - 1)}
            aria-label="Slide anterior"
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
          >
            <ChevronIcon direction="left" className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.key}
                onClick={() => goTo(idx)}
                aria-label={`Ir al slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === active ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(active + 1)}
            aria-label="Siguiente slide"
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
          >
            <ChevronIcon direction="right" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
