import type { Metadata } from "next";
import "./globals.css";
import NewHeader from "@/components/layout/NewHeader";
import WhatsappButton from "@/components/layout/WhatsappButton";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/SchemaOrg";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";
import { OrderProvider } from "@/context/OrderContext";

export const metadata: Metadata = {
  title: "Panelux Uruguay | Distribuidor Oficial de Utensilios de Cocina Premium",
  description: "Panelux es el distribuidor oficial en Uruguay de la marca brasileña líder en utensilios de cocina. Sartenes, ollas, cacerolas y más productos premium con garantía oficial.",
  keywords: "Panelux, utensilios de cocina, sartenes, ollas, distribuidor oficial, Uruguay",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: "https://panelux.com.uy",
    siteName: "Panelux Uruguay",
    title: "Panelux Uruguay | Distribuidor Oficial",
    description: "Utensilios de cocina premium de la marca brasileña Panelux",
    images: [
      {
        url: "https://panelux.com.uy/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Panelux Uruguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panelux Uruguay",
    description: "Distribuidor oficial de utensilios de cocina premium",
    images: ["https://panelux.com.uy/twitter-image.jpg"],
  },
  canonical: "https://panelux.com.uy",
  alternates: {
    canonical: "https://panelux.com.uy",
  },
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body>
        <AdminProvider>
          <OrderProvider>
            <CartProvider>
              <NewHeader />
              {children}
              <WhatsappButton />
            </CartProvider>
          </OrderProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
