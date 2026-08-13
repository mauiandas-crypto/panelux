'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white overflow-hidden pt-20 pb-12">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                🇺🇾 Distribuidor Oficial - Uruguay
              </span>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                Utensilios de cocina <span className="text-blue-200">premium</span>
              </h1>
              <p className="text-xl text-blue-100">
                Compra online o pedi asesoramiento. Tenemos stock, envío a todo Uruguay, hasta 12 cuotas y servicio técnico propio.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition transform hover:scale-105"
              >
                📦 Ver Catálogo Completo
              </Link>
              <button
                onClick={() => window.open('https://wa.me/59892715555', '_blank')}
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition transform hover:scale-105"
              >
                💬 Hablar con un Asesor
              </button>
            </div>

            {/* Quick Benefits */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-blue-100">Envío gratis en Montevideo y Ciudad de la Costa</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-blue-100">Pago al recibir con POS Herby</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-blue-100">Garantía oficial del fabricante</span>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Image */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            {/* Floating Animation Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-transparent rounded-3xl opacity-20 animate-pulse"></div>

            {/* Animated Image Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <style>{`
                @keyframes float {
                  0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                  }
                  50% {
                    transform: translateY(-20px) rotate(2deg);
                  }
                }

                @keyframes pulse-glow {
                  0%, 100% {
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
                  }
                  50% {
                    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
                  }
                }

                .float-animation {
                  animation: float 4s ease-in-out infinite;
                }

                .pulse-glow {
                  animation: pulse-glow 3s ease-in-out infinite;
                }
              `}</style>

              {/* Emoji Product Display */}
              <div className="float-animation text-9xl md:text-[150px] pulse-glow">
                🍳
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 text-6xl opacity-30 animate-bounce">🥘</div>
            <div className="absolute bottom-10 left-10 text-6xl opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }}>🍲</div>
          </div>
        </div>
      </div>
    </div>
  )
}
