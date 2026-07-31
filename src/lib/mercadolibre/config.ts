function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}

export const mercadolibreConfig = {
  get appId() {
    return required('MERCADOLIBRE_APP_ID');
  },
  get clientSecret() {
    return required('MERCADOLIBRE_CLIENT_SECRET');
  },
  get redirectUri() {
    return required('MERCADOLIBRE_REDIRECT_URI');
  },
};
