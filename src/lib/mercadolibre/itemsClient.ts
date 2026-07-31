import { getToken } from './tokenStore';
import { getValidAccessToken } from './oauthClient';

const API_BASE = 'https://api.mercadolibre.com';

async function mlFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const accessToken = await getValidAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`MercadoLibre API error ${res.status} en ${path}: ${JSON.stringify(data)}`);
  }
  return data as T;
}

export type MercadolibreItem = {
  id: string;
  title: string;
  category_id: string;
  price: number;
  currency_id: string;
  available_quantity: number;
  status: string;
  permalink: string;
  thumbnail: string;
  attributes: Array<{ id: string; name: string; value_name: string | null }>;
  [key: string]: unknown;
};

// Trae todos los item_id de la cuenta vendedora, paginando de a 100 (limite
// de la API de /users/{id}/items/search).
export async function fetchSellerItemIds({ limit = 2000 } = {}): Promise<string[]> {
  const token = await getToken();
  if (!token || !token.user_id) {
    throw new Error('La app todavia no esta autorizada en MercadoLibre. Abri GET /api/auth/mercadolibre.');
  }

  const pageSize = 100;
  const ids: string[] = [];
  let offset = 0;

  while (ids.length < limit) {
    const data = await mlFetch<{ results: string[]; paging: { total: number } }>(
      `/users/${token.user_id}/items/search?limit=${pageSize}&offset=${offset}`
    );
    ids.push(...data.results);
    offset += pageSize;
    if (offset >= data.paging.total || data.results.length === 0) break;
  }

  return ids.slice(0, limit);
}

// Multiget de detalle de items (hasta 20 ids por llamada, limite de la API).
export async function fetchItemsDetails(itemIds: string[]): Promise<MercadolibreItem[]> {
  const uniqueIds = [...new Set(itemIds)].filter(Boolean);
  const chunkSize = 20;
  const items: MercadolibreItem[] = [];

  for (let i = 0; i < uniqueIds.length; i += chunkSize) {
    const chunk = uniqueIds.slice(i, i + chunkSize);
    const data = await mlFetch<Array<{ code: number; body: MercadolibreItem }>>(
      `/items?ids=${chunk.join(',')}`
    );
    for (const entry of data) {
      if (entry.code === 200 && entry.body) items.push(entry.body);
    }
  }

  return items;
}

// Trae todos los items de la cuenta con su detalle completo. Util para el
// primer relevamiento (definir el criterio de filtro Panelux vs Todo
// Gastro) y despues como base del catalogo publico.
export async function fetchAllSellerItems(): Promise<MercadolibreItem[]> {
  const ids = await fetchSellerItemIds();
  return fetchItemsDetails(ids);
}
