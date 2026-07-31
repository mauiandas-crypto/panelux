import { mercadolibreConfig } from './config';
import { getToken, saveToken, type MercadolibreToken } from './tokenStore';

// Dominio de autorizacion por pais -- panelux.com.uy es una cuenta uruguaya
// (la misma cuenta vendedora que Todo Gastro, con una app de ML separada).
// El endpoint de intercambio de tokens (api.mercadolibre.com) es el mismo
// para todos los paises.
const AUTHORIZATION_URL = 'https://auth.mercadolibre.com.uy/authorization';
const TOKEN_URL = 'https://api.mercadolibre.com/oauth/token';
const EXPIRY_MARGIN_MS = 60_000; // renovar un poco antes de que venza de verdad

export function buildAuthorizationUrl(state?: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: mercadolibreConfig.appId,
    redirect_uri: mercadolibreConfig.redirectUri,
  });
  if (state) params.set('state', state);
  return `${AUTHORIZATION_URL}?${params.toString()}`;
}

async function requestToken(bodyParams: Record<string, string>) {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams(bodyParams).toString(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`MercadoLibre OAuth error ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

export async function exchangeCodeForToken(code: string): Promise<MercadolibreToken> {
  const data = await requestToken({
    grant_type: 'authorization_code',
    client_id: mercadolibreConfig.appId,
    client_secret: mercadolibreConfig.clientSecret,
    code,
    redirect_uri: mercadolibreConfig.redirectUri,
  });
  return saveToken(data);
}

export async function refreshAccessToken(): Promise<MercadolibreToken> {
  const current = await getToken();
  if (!current || !current.refresh_token) {
    throw new Error('No hay refresh_token guardado; hay que re-autorizar la app en GET /api/auth/mercadolibre.');
  }
  const data = await requestToken({
    grant_type: 'refresh_token',
    client_id: mercadolibreConfig.appId,
    client_secret: mercadolibreConfig.clientSecret,
    refresh_token: current.refresh_token,
  });
  return saveToken(data);
}

function isExpired(token: MercadolibreToken): boolean {
  const expiresAt = new Date(token.obtained_at).getTime() + token.expires_in * 1000;
  return Date.now() > expiresAt - EXPIRY_MARGIN_MS;
}

export async function getValidAccessToken(): Promise<string> {
  const token = await getToken();
  if (!token) {
    throw new Error('La app todavia no esta autorizada en MercadoLibre. Abri GET /api/auth/mercadolibre.');
  }
  if (isExpired(token)) {
    const refreshed = await refreshAccessToken();
    return refreshed.access_token;
  }
  return token.access_token;
}
