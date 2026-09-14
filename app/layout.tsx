import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Folios Digitales Premium® | Los expertos en facturación electrónica ✓",
  description:
    "Folios Digitales Premium® | Los expertos en facturación electrónica ✓",
  keywords:
    "facturación electrónica, facturas electronicas, franquicias, cfd, comprobantes fiscales digitales, sistema de facturacion.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu+Condensed&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
