import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '@/lib/mercadolibre/oauthClient';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');
  const errorDescription = req.nextUrl.searchParams.get('error_description');

  if (error) {
    return NextResponse.json({ error, errorDescription }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ error: 'Falta el parametro "code" en el callback.' }, { status: 400 });
  }

  try {
    const token = await exchangeCodeForToken(code);
    console.log('[auth/mercadolibre] app autorizada, user_id:', token.user_id);
    return new NextResponse('Cuenta de MercadoLibre conectada correctamente. Ya podes cerrar esta pestana.');
  } catch (err) {
    console.error('[auth/mercadolibre] error intercambiando el code:', err);
    return NextResponse.json({ error: 'Error conectando la cuenta de MercadoLibre. Revisa los logs.' }, { status: 500 });
  }
}
