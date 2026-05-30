# Dignita Hub de Ecosistema — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir dignita.tech en un hub multi-página (estilo catálogo) que organiza servicios, productos, retail, herramientas, proyectos y equipo, manteniendo la home de automatización intacta.

**Architecture:** Next.js App Router. Se hoistea el "chrome" compartido (fondo ambiental, nav global, footer) a `layout.tsx` para que todas las rutas lo compartan. Cada página de catálogo es un Server Component que mapea datos de una fuente única (`src/lib/ecosystem.ts`) a un componente `CatalogCard` reutilizable. La home conserva su contenido pero pierde el chrome duplicado y gana un bloque-puente al ecosistema.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, motion, lucide-react. Sin framework de tests unitarios → verificación = `pnpm build` + chequeo en navegador (Playwright/curl).

**Verification note:** Este repo no tiene jest/vitest. Cada tarea verifica con `pnpm build` (debe compilar y typecheck). La tarea final hace verificación visual + DOM en el dev server y deploy.

---

## File Structure

- Create: `src/lib/ecosystem.ts` — fuente única de datos del ecosistema (servicios, productos, retail, herramientas, proyectos, casos, equipo).
- Create: `src/components/site/site-nav.tsx` — nav global basado en rutas (reemplaza el uso de `navbar.tsx`).
- Create: `src/components/site/catalog-card.tsx` — card reutilizable (interna o externa).
- Create: `src/components/site/page-shell.tsx` — encabezado de página catálogo (heading + spacing bajo el nav fijo).
- Create: `src/components/site/ecosystem-bridge.tsx` — bloque-puente en la home.
- Create: `src/app/servicios/page.tsx`, `src/app/productos/page.tsx`, `src/app/retail/page.tsx`, `src/app/herramientas/page.tsx`, `src/app/proyectos/page.tsx`, `src/app/equipo/page.tsx`, `src/app/contacto/page.tsx`.
- Modify: `src/app/layout.tsx` — montar AmbientBackground + SiteNav + Footer.
- Modify: `src/app/page.tsx` — quitar chrome duplicado, añadir EcosystemBridge.
- Modify: `src/components/ui/footer-section.tsx` — columnas del footer con el nuevo sitemap.

---

## Task 1: Hoist shared chrome to layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add chrome to layout body**

En `src/app/layout.tsx`, agrega los imports al inicio (después de los imports de fuentes):

```tsx
import { AmbientBackground } from "@/components/site/ambient-background";
import { SiteNav } from "@/components/site/site-nav";
import { Footer } from "@/components/ui/footer-section";
```

Y cambia el `<body>` para envolver children:

```tsx
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AmbientBackground />
        <SiteNav />
        {children}
        <Footer />
      </body>
```

> Nota: `SiteNav` se crea en la Task 3. Hasta entonces el build fallará por import faltante — por eso la Task 3 va antes de buildear. Para mantener orden, implementa Task 2 y 3 y vuelve a verificar Task 1 al final. (Si ejecutas en orden, haz el build de verificación de Task 1 DESPUÉS de Task 3.)

- [ ] **Step 2: Remove duplicated chrome from home**

En `src/app/page.tsx`, elimina los imports de `AmbientBackground`, `Navbar`/`SiteNav` y `Footer`, y el render de `<AmbientBackground />`, `<Navbar />` y `<Footer />`. El componente debe quedar así:

```tsx
import { ScrollThread } from "@/components/site/scroll-thread";
import { Hero } from "@/components/site/hero";
import { Logos } from "@/components/site/logos";
import { ValueProp } from "@/components/site/value-prop";
import { ShowcaseScroll } from "@/components/site/showcase-scroll";
import { ServicesPipeline } from "@/components/site/services-pipeline";
import { AreasCarousel } from "@/components/site/areas-carousel";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { CTA } from "@/components/site/cta";
import { Diagnostico } from "@/components/site/diagnostico";
import { EcosystemBridge } from "@/components/site/ecosystem-bridge";

export default function Home() {
  return (
    <div className="relative">
      <ScrollThread />
      <main className="relative">
        <Hero />
        <Logos />
        <ValueProp />
        <ShowcaseScroll />
        <ServicesPipeline />
        <AreasCarousel />
        <Process />
        <Testimonials />
        <CTA />
        <EcosystemBridge />
        <Diagnostico />
      </main>
    </div>
  );
}
```

> `EcosystemBridge` se crea en Task 12. Hasta entonces, omite su import/uso o créalo vacío. Recomendado: ejecutar Task 12 antes del build final.

- [ ] **Step 3: Verify (after Tasks 2,3,12 done)**

Run: `pnpm build`
Expected: `Compiled successfully` y rutas listadas sin errores de import.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "refactor: hoist nav/footer/background al layout para multipágina"
```

---

## Task 2: Ecosystem data (single source of truth)

**Files:**
- Create: `src/lib/ecosystem.ts`

- [ ] **Step 1: Write the data module**

```ts
import {
  Bot,
  Headset,
  Workflow,
  Code2,
  Palette,
  Rocket,
  LayoutGrid,
  GraduationCap,
  Database,
  Boxes,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface CatalogItem {
  title: string;
  description: string;
  href: string;
  external: boolean;
  status?: "Activo" | "Próximamente" | "En revisión" | "Listo";
  icon: LucideIcon;
  cta?: string;
}

export const servicios: CatalogItem[] = [
  {
    title: "Automatización e IA estratégica",
    description: "Nuestro servicio insignia: convertimos el trabajo manual en flujos ágiles, controlables y trazables.",
    href: "/",
    external: false,
    status: "Activo",
    icon: Workflow,
    cta: "Ver",
  },
  {
    title: "Soporte TI",
    description: "Mesa de ayuda y soporte de infraestructura para que tu operación nunca se detenga.",
    href: "https://soporte.dignita.tech",
    external: true,
    status: "Próximamente",
    icon: Headset,
  },
  {
    title: "Soporte RPA",
    description: "Mantenimiento y continuidad de tus automatizaciones y bots en producción.",
    href: "https://soporterpa.dignita.tech",
    external: true,
    status: "Activo",
    icon: Bot,
  },
  {
    title: "Desarrollo web",
    description: "Sitios y aplicaciones web rápidas, modernas y orientadas a conversión.",
    href: "/contacto",
    external: false,
    icon: Code2,
    cta: "Cotizar",
  },
  {
    title: "Branding",
    description: "Identidad de marca con criterio: estrategia, naming y sistema visual.",
    href: "/proyectos",
    external: false,
    icon: Palette,
    cta: "Ver proyectos",
  },
  {
    title: "Lanzamiento de marca",
    description: "Branding + desarrollo web + comunicación, en un solo frente de lanzamiento.",
    href: "/contacto",
    external: false,
    icon: Rocket,
    cta: "Cotizar",
  },
];

export const productos: CatalogItem[] = [
  {
    title: "Mirestconia",
    description: "Plataforma SaaS para gestión de restaurantes con IA.",
    href: "https://mirestconia.com",
    external: true,
    icon: LayoutGrid,
  },
  {
    title: "Nivela tu Academy",
    description: "Plataforma SaaS para academias y formación online.",
    href: "https://nivelatuacademy.com",
    external: true,
    icon: GraduationCap,
  },
  {
    title: "Orion ERP",
    description: "ERP modular para operaciones administrativas y financieras.",
    href: "https://orion-rp.com",
    external: true,
    icon: Database,
  },
];

export const retail: CatalogItem[] = [
  {
    title: "Impresoras 3D",
    description: "Venta y soluciones de impresión 3D para empresas y makers.",
    href: "https://3d.dignita.tech",
    external: true,
    status: "Listo",
    icon: Boxes,
  },
  {
    title: "Cámaras de seguridad",
    description: "Sistemas de videovigilancia y seguridad electrónica.",
    href: "https://seguridad.dignita.tech",
    external: true,
    status: "Listo",
    icon: ShieldCheck,
  },
];

export const herramientas: CatalogItem[] = [
  {
    title: "Genera",
    description: "Herramienta de generación asistida por IA.",
    href: "https://genera.dignita.tech",
    external: true,
    status: "En revisión",
    icon: Sparkles,
  },
];

export interface Project {
  title: string;
  category: string;
  description: string;
  status?: string;
  href?: string;
}

export const proyectos: Project[] = [
  {
    title: "Costa Rica Unlocked",
    category: "Branding",
    description: "Identidad de marca para agencia de viajes y tours.",
    status: "Listo",
  },
  {
    title: "Kipi.cash",
    category: "Branding",
    description: "Identidad de marca para fintech.",
    status: "Listo",
  },
  {
    title: "Mi Rest con IA",
    category: "Branding",
    description: "Identidad de marca para producto de restaurantes con IA.",
    status: "Por documentar",
  },
];

export interface SuccessCase {
  client: string;
  metric: string;
  description: string;
}

export const casos: SuccessCase[] = [
  {
    client: "Operadores de World",
    metric: "+16 locales",
    description: "Operación digitalizada y soportada en más de 16 locales.",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  linkedin?: string;
}

export const equipo: TeamMember[] = [
  { name: "Leonidas Yauri", role: "Fundador · Automatización e IA", initials: "LY" },
  { name: "Alexander Castañeda", role: "Co-fundador", initials: "AC" },
];
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: compila (este archivo es solo data + tipos; no debe romper nada aún).

- [ ] **Step 3: Commit**

```bash
git add src/lib/ecosystem.ts
git commit -m "feat: fuente única de datos del ecosistema Dignita"
```

---

## Task 3: Global route-based nav (SiteNav)

**Files:**
- Create: `src/components/site/site-nav.tsx`

- [ ] **Step 1: Write SiteNav**

```tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Servicios", href: "/servicios" },
  { label: "Productos", href: "/productos" },
  { label: "Retail", href: "/retail" },
  { label: "Herramientas", href: "/herramientas" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Equipo", href: "/equipo" },
];

export function SiteNav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex w-[min(100%-1.5rem,72rem)] items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-5",
          scrolled ? "glass-strong h-14 shadow-lg shadow-black/10" : "h-14"
        )}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-dignita.png"
            alt="Dignita"
            width={160}
            height={50}
            priority
            className="h-7 w-auto object-contain sm:h-8"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link href="/contacto">
            <Button variant="brand" size="sm">
              Agendar diagnóstico
            </Button>
          </Link>
        </div>

        <button
          className="flex size-10 items-center justify-center rounded-full text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "mx-auto mt-2 w-[min(100%-1.5rem,72rem)] overflow-hidden transition-all duration-300 lg:hidden",
          open ? "max-h-[28rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <div className="glass-strong flex flex-col gap-1 rounded-3xl p-3 shadow-lg shadow-black/10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-foreground/90 transition hover:bg-foreground/5"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contacto" onClick={() => setOpen(false)} className="mt-1">
            <Button variant="brand" className="w-full">
              Agendar diagnóstico
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: compila. Tras esta tarea, el import de `SiteNav` en `layout.tsx` (Task 1) ya resuelve.

- [ ] **Step 3: Commit**

```bash
git add src/components/site/site-nav.tsx
git commit -m "feat: nav global basado en rutas (SiteNav)"
```

---

## Task 4: CatalogCard + PageShell

**Files:**
- Create: `src/components/site/catalog-card.tsx`
- Create: `src/components/site/page-shell.tsx`

- [ ] **Step 1: Write CatalogCard**

```tsx
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { CatalogItem } from "@/lib/ecosystem";

export function CatalogCard({ item, i = 0 }: { item: CatalogItem; i?: number }) {
  const Icon = item.icon;
  const inner = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card/60 p-6 transition duration-300 hover:border-foreground/20 hover:bg-white/85">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-brand-from/25 to-brand-to/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
      />
      <div className="flex items-center justify-between">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
          <Icon className="size-6" />
        </div>
        {item.status ? (
          <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
            {item.status}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        {item.cta ?? "Visitar"}
        {item.external ? (
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </article>
  );

  return (
    <Reveal delayIndex={i % 3} className="h-full">
      {item.external ? (
        <a href={item.href} target="_blank" rel="noreferrer" className="block h-full">
          {inner}
        </a>
      ) : (
        <Link href={item.href} className="block h-full">
          {inner}
        </Link>
      )}
    </Reveal>
  );
}
```

- [ ] **Step 2: Write PageShell**

```tsx
import { SectionHeading } from "@/components/site/section-heading";

export function PageShell({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading kicker={kicker} title={title} description={description} />
        <div className="mt-14">{children}</div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run: `pnpm build`
Expected: compila.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/catalog-card.tsx src/components/site/page-shell.tsx
git commit -m "feat: CatalogCard + PageShell reutilizables"
```

---

## Task 5: /servicios page

**Files:**
- Create: `src/app/servicios/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CatalogCard } from "@/components/site/catalog-card";
import { servicios } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Automatización e IA, soporte TI y RPA, desarrollo web, branding y lanzamiento de marca.",
};

export default function ServiciosPage() {
  return (
    <PageShell
      kicker="Servicios"
      title={<>Lo que <span className="text-gradient">hacemos por ti</span></>}
      description="Desde automatización e IA hasta desarrollo, branding y soporte. Cada frente, con criterio operativo."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((item, i) => (
          <CatalogCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: aparece la ruta `/servicios` en la tabla de rutas.

- [ ] **Step 3: Commit**

```bash
git add src/app/servicios/page.tsx
git commit -m "feat: página /servicios"
```

---

## Task 6: /productos page

**Files:**
- Create: `src/app/productos/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CatalogCard } from "@/components/site/catalog-card";
import { productos } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Productos",
  description: "Productos SaaS construidos por Dignita: Mirestconia, Nivela tu Academy y Orion ERP.",
};

export default function ProductosPage() {
  return (
    <PageShell
      kicker="Productos · SaaS"
      title={<>Software que <span className="text-gradient">construimos y operamos</span></>}
      description="Productos SaaS propios, en producción y con clientes reales."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((item, i) => (
          <CatalogCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: ruta `/productos` listada.

- [ ] **Step 3: Commit**

```bash
git add src/app/productos/page.tsx
git commit -m "feat: página /productos"
```

---

## Task 7: /retail page

**Files:**
- Create: `src/app/retail/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CatalogCard } from "@/components/site/catalog-card";
import { retail } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Retail",
  description: "Impresoras 3D y cámaras de seguridad para empresas.",
};

export default function RetailPage() {
  return (
    <PageShell
      kicker="Retail"
      title={<>Hardware y <span className="text-gradient">soluciones físicas</span></>}
      description="Tecnología que también vive fuera de la pantalla."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {retail.map((item, i) => (
          <CatalogCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: ruta `/retail` listada.

- [ ] **Step 3: Commit**

```bash
git add src/app/retail/page.tsx
git commit -m "feat: página /retail"
```

---

## Task 8: /herramientas page

**Files:**
- Create: `src/app/herramientas/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CatalogCard } from "@/components/site/catalog-card";
import { herramientas } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Herramientas",
  description: "Herramientas internas y públicas potenciadas por IA.",
};

export default function HerramientasPage() {
  return (
    <PageShell
      kicker="Herramientas"
      title={<>Herramientas <span className="text-gradient">con IA</span></>}
      description="Utilidades que aceleran el trabajo, potenciadas por IA."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {herramientas.map((item, i) => (
          <CatalogCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: ruta `/herramientas` listada.

- [ ] **Step 3: Commit**

```bash
git add src/app/herramientas/page.tsx
git commit -m "feat: página /herramientas"
```

---

## Task 9: /proyectos page (branding + casos)

**Files:**
- Create: `src/app/proyectos/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { proyectos, casos } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Portafolio de branding y casos de éxito de Dignita.",
};

export default function ProyectosPage() {
  return (
    <PageShell
      kicker="Proyectos"
      title={<>Marcas y <span className="text-gradient">resultados reales</span></>}
      description="Branding con criterio y operaciones que cambiaron de verdad."
    >
      {/* casos de éxito */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {casos.map((c, i) => (
          <Reveal key={c.client} delayIndex={i}>
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-brand-from/10 via-card/60 to-brand-to/10 p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
                <TrendingUp className="size-6" />
              </div>
              <div className="mt-5 text-3xl font-semibold text-gradient">{c.metric}</div>
              <div className="mt-1 text-base font-medium">{c.client}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* branding */}
      <div className="mt-16">
        <Reveal>
          <Badge>Branding</Badge>
        </Reveal>
        <Reveal delayIndex={1}>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Identidades que construimos
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((p, i) => (
            <Reveal key={p.title} delayIndex={i % 3}>
              <article className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-orange-100/50 via-white to-amber-50/40 p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-brand-from/30 to-brand-to/10 blur-2xl"
                />
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  {p.category}
                </span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                {p.status ? (
                  <span className="mt-3 w-fit rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
                    {p.status}
                  </span>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: ruta `/proyectos` listada.

- [ ] **Step 3: Commit**

```bash
git add src/app/proyectos/page.tsx
git commit -m "feat: página /proyectos (branding + casos de éxito)"
```

---

## Task 10: /equipo page

**Files:**
- Create: `src/app/equipo/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { Linkedin } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { equipo } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Equipo",
  description: "El equipo detrás de Dignita.",
};

export default function EquipoPage() {
  return (
    <PageShell
      kicker="Equipo"
      title={<>Las personas <span className="text-gradient">detrás de Dignita</span></>}
      description="Operadores antes que consultores. Construimos lo que vendemos."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {equipo.map((m, i) => (
          <Reveal key={m.name} delayIndex={i % 3}>
            <article className="flex h-full flex-col items-center rounded-3xl border border-foreground/10 bg-card/60 p-8 text-center">
              <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-2xl font-semibold text-primary-foreground">
                {m.initials}
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              {m.linkedin ? (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`LinkedIn de ${m.name}`}
                  className="mt-4 flex size-9 items-center justify-center rounded-full bg-foreground/5 text-muted-foreground transition hover:text-foreground"
                >
                  <Linkedin className="size-4" />
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: ruta `/equipo` listada.

- [ ] **Step 3: Commit**

```bash
git add src/app/equipo/page.tsx
git commit -m "feat: página /equipo"
```

---

## Task 11: /contacto page (reuse Diagnostico)

**Files:**
- Create: `src/app/contacto/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import { Diagnostico } from "@/components/site/diagnostico";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Agenda tu diagnóstico con Dignita.",
};

export default function ContactoPage() {
  return (
    <main className="relative pt-16">
      <Diagnostico />
    </main>
  );
}
```

> `Diagnostico` ya tiene `id="contacto"`, su propio fondo (Neural Vortex) y el formulario conectado a Web3Forms. El `pt-16` evita que el nav fijo tape el inicio.

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: ruta `/contacto` listada.

- [ ] **Step 3: Commit**

```bash
git add src/app/contacto/page.tsx
git commit -m "feat: página /contacto (reusa Diagnostico)"
```

---

## Task 12: Ecosystem bridge en home + footer

**Files:**
- Create: `src/components/site/ecosystem-bridge.tsx`
- Modify: `src/components/ui/footer-section.tsx`

- [ ] **Step 1: Write EcosystemBridge**

```tsx
import Link from "next/link";
import { ArrowRight, LayoutGrid, Boxes, FolderGit2, Users } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const links = [
  { label: "Productos", href: "/productos", icon: LayoutGrid },
  { label: "Retail", href: "/retail", icon: Boxes },
  { label: "Proyectos", href: "/proyectos", icon: FolderGit2 },
  { label: "Equipo", href: "/equipo", icon: Users },
];

export function EcosystemBridge() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-5xl text-center">
        <Reveal>
          <Badge>Ecosistema Dignita</Badge>
        </Reveal>
        <Reveal delayIndex={1}>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Más que automatización
          </h2>
        </Reveal>
        <Reveal delayIndex={2}>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Construimos y operamos productos, marcas y soluciones. Explora todo lo que hace Dignita.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {links.map((l, i) => (
            <Reveal key={l.href} delayIndex={i % 4}>
              <Link
                href={l.href}
                className="group flex h-full flex-col items-center gap-3 rounded-3xl border border-foreground/10 bg-card/60 p-6 transition hover:border-foreground/20 hover:bg-white/85"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
                  <l.icon className="size-5" />
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium">
                  {l.label}
                  <ArrowRight className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update footer columns**

En `src/components/ui/footer-section.tsx`, reemplaza el array `defaultColumns` por:

```tsx
const defaultColumns: FooterColumn[] = [
  {
    title: "Servicios",
    links: [
      { label: "Automatización e IA", href: "/" },
      { label: "Soporte TI / RPA", href: "/servicios" },
      { label: "Desarrollo web", href: "/servicios" },
      { label: "Branding", href: "/servicios" },
    ],
  },
  {
    title: "Ecosistema",
    links: [
      { label: "Productos", href: "/productos" },
      { label: "Retail", href: "/retail" },
      { label: "Herramientas", href: "/herramientas" },
    ],
  },
  {
    title: "Firma",
    links: [
      { label: "Proyectos", href: "/proyectos" },
      { label: "Equipo", href: "/equipo" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];
```

> Nota: los `href` del footer pueden quedar como `<a>` (ya existentes). Funcionan para rutas internas. No es necesario cambiarlos a `<Link>` en Fase 1.

- [ ] **Step 3: Verify**

Run: `pnpm build`
Expected: compila; la home incluye el bloque-puente.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/ecosystem-bridge.tsx src/components/ui/footer-section.tsx
git commit -m "feat: bloque-puente al ecosistema en home + footer actualizado"
```

---

## Task 13: Verificación integral + deploy

**Files:** (ninguno nuevo)

- [ ] **Step 1: Build limpio**

Run: `pnpm build`
Expected: `Compiled successfully`, y en la tabla de rutas aparecen: `/`, `/servicios`, `/productos`, `/retail`, `/herramientas`, `/proyectos`, `/equipo`, `/contacto`.

- [ ] **Step 2: Verificación en navegador (dev server)**

Run: `pnpm dev` y con Playwright/curl verifica cada ruta responde 200 y tiene su heading. Ejemplo de chequeo:

```bash
for r in servicios productos retail herramientas proyectos equipo contacto; do
  curl -s -o /dev/null -w "/$r → %{http_code}\n" "http://localhost:3000/$r" --max-time 10
done
```
Expected: todas `200`.

Verifica también con Playwright que el `SiteNav` aparece en al menos 2 rutas distintas y que el logo carga (naturalWidth > 0).

- [ ] **Step 3: Commit (si hubo ajustes)**

```bash
git add -A
git commit -m "chore: verificación integral del hub"
```

- [ ] **Step 4: Push + deploy**

```bash
git push origin main
vercel --yes --prod --scope dignitatechs-projects
```
Expected: deployment `READY`. Verifica `https://www.dignita.tech/servicios` → 200.

---

## Notas de ejecución

- Orden recomendado: **2 → 3 → 4 → 5..11 → 12 → 1 → 13**. La Task 1 (hoist chrome) deja imports a `SiteNav` y `EcosystemBridge` que deben existir antes del build; por eso su verificación va casi al final, aunque conceptualmente es la primera.
- Mantener tema claro + naranja + glassmorphism existente; no introducir nuevas dependencias.
- No tocar la home salvo lo indicado (quitar chrome duplicado + añadir EcosystemBridge).
