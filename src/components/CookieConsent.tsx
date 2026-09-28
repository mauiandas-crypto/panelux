'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { siteConfig } from '@/lib/config'

const CONSENT_KEY = 'panelux_cookie_consent'

type Consent = 'accepted' | 'rejected'

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored === 'accepted' || stored === 'rejected') setConsent(stored)
    } catch {
      // localStorage no disponible (modo privado, etc.) - se sigue mostrando el banner
    }
    setReady(true)
  }, [])

  const choose = (value: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {}
    setConsent(value)
  }

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-PNDPWGJF2Y"
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-PNDPWGJF2Y');
              `,
            }}
          />
          {siteConfig.analytics.metaPixelId && (
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${siteConfig.analytics.metaPixelId}');
                  fbq('track', 'PageView');
                `,
              }}
            />
          )}
        </>
      )}

      {ready && consent === null && (
        <div className="fixed bottom-0 inset-x-0 z-[100] bg-white border-t-2 border-gray-200 shadow-2xl px-4 py-4 sm:px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-gray-700 text-center sm:text-left">
              Usamos cookies propias y de terceros para analítica y publicidad, y así mejorar tu experiencia. Podés aceptarlas o rechazarlas cuando quieras. Más información en nuestra{' '}
              <Link href="/privacidad" className="underline font-semibold">
                Política de Privacidad
              </Link>
              .
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => choose('rejected')}
                className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition text-sm"
              >
                Rechazar
              </button>
              <button
                onClick={() => choose('accepted')}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-sm"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
