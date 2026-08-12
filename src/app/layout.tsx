import type { Metadata } from "next";
import "./globals.css";
import NewHeader from "@/components/layout/NewHeader";
import WhatsappButton from "@/components/layout/WhatsappButton";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider } from "@/context/AdminContext";
import { OrderProvider } from "@/context/OrderContext";

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
