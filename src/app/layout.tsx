import type { Metadata } from "next";
import Script from "next/script";
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
import { siteConfig } from "@/lib/config";

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

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PNDPWGJF2Y"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PNDPWGJF2Y');
            `,
          }}
        />
        {/* Meta Pixel */}
        {siteConfig.analytics.metaPixelId && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${siteConfig.analytics.metaPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body>
        {siteConfig.analytics.metaPixelId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${siteConfig.analytics.metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
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
            </CartProvider>
          </OrderProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
