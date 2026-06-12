import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AmbientBackground } from "@/components/site/ambient-background";
import { SiteNav } from "@/components/site/site-nav";
import { Footer } from "@/components/ui/footer-section";
import { JsonLd } from "@/components/site/json-ld";

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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dignita",
  url: "https://dignita.tech",
  logo: "https://dignita.tech/logo-dignita.png",
  description:
    "Dignita convierte operaciones manuales, lentas y poco trazables en flujos ágiles, controlables y sostenibles. Automatización operativa, IA aplicada y agentes para áreas administrativas y de soporte.",
  sameAs: [] as string[],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dignita",
  url: "https://dignita.tech",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <AmbientBackground />
        <SiteNav />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
