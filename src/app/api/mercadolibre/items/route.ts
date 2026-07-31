import { NextResponse } from 'next/server';
import { fetchAllSellerItems } from '@/lib/mercadolibre/itemsClient';

// Endpoint de relevamiento (no pensado para el catalogo publico): trae todos
// los items de la cuenta con id/titulo/categoria/marca para poder definir a
// mano el criterio que separa productos Panelux de productos Todo Gastro.
export async function GET() {
  try {
    const items = await fetchAllSellerItems();
    const summary = items.map((item) => ({
      id: item.id,
      title: item.title,
      category_id: item.category_id,
      price: item.price,
      currency_id: item.currency_id,
      brand: item.attributes?.find((a) => a.id === 'BRAND')?.value_name ?? null,
      permalink: item.permalink,
    }));
    return NextResponse.json({ count: summary.length, items: summary });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
