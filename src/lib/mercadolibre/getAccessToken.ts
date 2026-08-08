// Obtener access token de MercadoLibre usando credenciales de la app
// Sin depender de Redis (funciona offline)

let cachedToken: {
  access_token: string
  expires_at: number
} | null = null

export async function getMercadoLibreAccessToken(): Promise<string> {
  try {
    // Si el token está en cache y no ha expirado, usarlo
    if (cachedToken && cachedToken.expires_at > Date.now()) {
      console.log('Usando token cached de ML')
      return cachedToken.access_token
    }

    const APP_ID = process.env.MERCADOLIBRE_APP_ID
    const CLIENT_SECRET = process.env.MERCADOLIBRE_CLIENT_SECRET

    if (!APP_ID || !CLIENT_SECRET) {
      console.error('Credenciales de MercadoLibre no configuradas')
      throw new Error('MERCADOLIBRE_APP_ID o MERCADOLIBRE_CLIENT_SECRET no configurados')
    }

    console.log('Obteniendo token de MercadoLibre...')

    // Usar Client Credentials para obtener token
    // https://developers.mercadolibre.com.ar/es_ar/autenticacion-y-autorizacion
    const response = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: APP_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error obteniendo token ML [${response.status}]:`, errorText)
      throw new Error(`Error obteniendo token: ${response.status}`)
    }

    const data = await response.json()

    if (!data.access_token) {
      console.error('No se recibió access_token en la respuesta:', data)
      throw new Error('No se recibió access_token de MercadoLibre')
    }

    // Guardar en cache (valido por data.expires_in segundos)
    const expiresAt = Date.now() + (data.expires_in * 1000) - 60000 // 1 min menos para seguridad
    cachedToken = {
      access_token: data.access_token,
      expires_at: expiresAt
    }

    console.log(`Token obtenido exitosamente. Expira en ${data.expires_in}s`)
    return data.access_token
  } catch (error) {
    console.error('Error en getMercadoLibreAccessToken:', error)
    throw error
  }
}
