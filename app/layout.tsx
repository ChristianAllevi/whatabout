import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopBanner from "@/components/layout/TopBanner";

export const metadata: Metadata = {
  title: "What About — Parliamo di noi.",
  description:
    "What About è un brand italiano che stimola il dialogo autentico. Scopri What About Tower, il gioco cooperativo che costruisce conversazioni, mattoncino per mattoncino.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-white text-primary-dark">
        <TopBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
