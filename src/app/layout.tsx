import type { Metadata } from "next";
import "./globals.css";
import NewHeader from "@/components/layout/NewHeader";
import Footer from "@/components/layout/Footer";
import WhatsAppChat from "@/components/WhatsAppChat";
import TrustBadges from "@/components/TrustBadges";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/SchemaOrg";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";
import { OrderProvider } from "@/context/OrderContext";
import DarkModeToggle from "@/components/DarkModeToggle";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import WelcomeBanner from "@/components/WelcomeBanner";
import CookieConsent from "@/components/CookieConsent";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Panelux Uruguay",
    description: "Distribuidor oficial de utensilios de cocina premium",
  },
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
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="TN5rsy79YpZLsfZ-7Acl6QPAqq1ggb73s3OGTsbS50Y" />
        {/* Google Merchant Center Verification */}
        <meta name="google-site-verification" content="blC9UrUVOaeg1PM5jXtFjBFmti77fAsyaq9lw-Rc40s" />

        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body>
        <AnalyticsTracker />
        <AdminProvider>
          <OrderProvider>
            <CartProvider>
              <NewHeader />
              {/* En mobile ocupa mucho scroll antes de llegar al contenido, y
                  en el home repite lo que ya dicen los bullets del Hero. */}
              <div className="hidden md:block">
                <TrustBadges />
              </div>
              {children}
              <WelcomeBanner />
              <WhatsAppChat />
              <DarkModeToggle />
              <Footer />
              <CookieConsent />
            </CartProvider>
          </OrderProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
