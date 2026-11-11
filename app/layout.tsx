import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/layout/TopBanner";
import CartProvider from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "What About — Parliamo di noi.",
  description:
    "What About è un brand italiano che stimola il dialogo autentico. Scopri The What About Tower, il gioco cooperativo che costruisce conversazioni, mattoncino per mattoncino.",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-white text-primary-dark">
        <CartProvider>
          <TopBanner />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
