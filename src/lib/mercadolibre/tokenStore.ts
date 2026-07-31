import { Redis } from '@upstash/redis';

// Vercel es serverless (sin disco persistente entre invocaciones), asi que a
// diferencia de todogastro-bot (que guarda el token en un archivo local) ese
// mismo dato se guarda en Upstash Redis. El refresh_token de MercadoLibre es
// de un solo uso: si se pierde hay que re-autorizar la app a mano desde
// GET /api/auth/mercadolibre.
const TOKEN_KEY = 'mercadolibre:token';

export type MercadolibreToken = {
  access_token: string;
  refresh_token: string;
  user_id: number;
  expires_in: number;
  token_type: string;
  scope: string;
  obtained_at: string;
};

const redis = Redis.fromEnv();

export async function getToken(): Promise<MercadolibreToken | null> {
  return redis.get<MercadolibreToken>(TOKEN_KEY);
}

export async function saveToken(tokenResponse: Omit<MercadolibreToken, 'obtained_at'>): Promise<MercadolibreToken> {
  const token = { ...tokenResponse, obtained_at: new Date().toISOString() } satisfies MercadolibreToken;
  await redis.set(TOKEN_KEY, token);
  return token;
}

export async function clearToken(): Promise<void> {
  await redis.del(TOKEN_KEY);
}
