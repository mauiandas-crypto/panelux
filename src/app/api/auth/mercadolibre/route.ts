import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { buildAuthorizationUrl } from '@/lib/mercadolibre/oauthClient';

// Punto de entrada manual: abrir esta URL en el navegador logueado con la
// cuenta vendedora de Panelux/Todo Gastro en MercadoLibre para autorizar la
// app de Panelux (separada de la app de todogastro-bot).
export async function GET() {
  const state = randomBytes(16).toString('hex');
  return NextResponse.redirect(buildAuthorizationUrl(state));
}
