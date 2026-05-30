import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/site/ambient-background";
import { SiteNav } from "@/components/site/site-nav";
import { Footer } from "@/components/ui/footer-section";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://dignita.tech";
const DESCRIPTION =
  "Dignita convierte operaciones manuales, lentas y poco trazables en flujos ágiles, controlables y sostenibles. Automatización operativa, IA aplicada y agentes para áreas administrativas y de soporte.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Dignita — Menos carga manual. Más control operativo.",
    template: "%s · Dignita",
  },
  description: DESCRIPTION,
  keywords: [
    "automatización operativa",
    "IA aplicada",
    "agentes operativos",
    "automatización documental",
    "observabilidad",
    "back office",
    "RPA con criterio",
  ],
  icons: {
    icon: "/logo-dignita.png",
    shortcut: "/logo-dignita.png",
    apple: "/logo-dignita.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE,
    siteName: "Dignita",
    title: "Dignita — Menos carga manual. Más control operativo.",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dignita — Menos carga manual. Más control operativo.",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AmbientBackground />
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
