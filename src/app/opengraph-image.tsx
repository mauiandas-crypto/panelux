import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Panelux Uruguay - Distribuidor Oficial de Utensilios de Cocina Premium'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5E5198 0%, #292342 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: 'white',
            letterSpacing: -2,
            textAlign: 'center',
          }}
        >
          PANELUX
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: '#e7e4f3',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          Uruguay
        </div>
        <div
          style={{
            width: 120,
            height: 4,
            background: '#8879be',
            borderRadius: 2,
            marginTop: 28,
            marginBottom: 28,
          }}
        />
        <div
          style={{
            fontSize: 30,
            color: '#e7e4f3',
            textAlign: 'center',
            maxWidth: 920,
          }}
        >
          Distribuidor Oficial de Utensilios de Cocina Premium
        </div>
      </div>
    ),
    { ...size }
  )
}
