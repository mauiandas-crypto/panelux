import type { Metadata } from "next";
import "./globals.css";
import NewHeader from "@/components/layout/NewHeader";
import WhatsappButton from "@/components/layout/WhatsappButton";

export const metadata: Metadata = {
  title: "Panelux Uruguay | Distribuidor Oficial",
  description: "Utensilios de cocina premium de la marca brasileña Panelux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <NewHeader />
        {children}
        <WhatsappButton />
      </body>
    </html>
  );
}
