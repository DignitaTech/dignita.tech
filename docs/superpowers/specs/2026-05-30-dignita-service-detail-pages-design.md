# Dignita — Páginas de detalle de servicio — Diseño

_Fecha: 2026-05-30. Estado: aprobado (alcance: los 6 servicios)._

## Objetivo

Cada servicio tiene una landing de detalle en `/servicios/<slug>` (data-driven,
misma arquitectura que los case studies de proyecto). Las cards de `/servicios`
enlazan a su detalle; desde el detalle se enruta al destino real (home flagship,
/proyectos, /contacto o el subdominio correspondiente).

## Alcance

Los 6 servicios. Automatización e IA y Branding tienen detalle conciso que enruta
a su experiencia completa (`/` y `/proyectos`); el resto cierra en `/contacto`
(soporte además ofrece su subdominio como CTA secundaria).

## Datos (`src/lib/ecosystem.ts`)

Se extiende `CatalogItem` con campos opcionales (no rompe productos/retail/herramientas):

```ts
interface ServiceCta { label: string; href: string; external?: boolean }
// añadidos a CatalogItem:
slug?: string;
summary?: string;        // value prop bajo el título
problem?: string;        // el dolor que resuelve
deliverables?: string[]; // qué incluye
process?: { title: string; description: string }[];
primaryCta?: ServiceCta;
secondaryCta?: ServiceCta;
```

Helper: `getService(slug) = servicios.find(s => s.slug === slug)`.

## Ruta

- `src/app/servicios/[slug]/page.tsx` — RSC, `generateStaticParams` de todos los
  servicios con slug, `generateMetadata`, `notFound()` si no existe.

## Layout

1. **Hero** — icono del servicio, sector/kicker, título, summary, CTA primaria
   (+ secundaria si aplica). Acento: naranja de marca Dignita (no per-item).
2. **Qué resolvemos** — el `problem`.
3. **Qué incluye** — `deliverables` como checklist.
4. **Cómo trabajamos** — `process` por pasos (si está).
5. **CTA** final a `/contacto`.

## Componentes

- `src/components/site/service/service-hero.tsx` (hero con icono + CTAs).
- Reuso de `CaseSection` para los bloques titulados.

## Catálogo

`/servicios/page.tsx`: cada item se mapea a `{ ...s, href: '/servicios/'+slug,
external:false, cta:'Ver servicio' }` y se pasa a `CatalogCard` (sin tocar el
componente). Así todas las cards enrutan al detalle.

## Fuera de alcance

- Detalle de productos (SaaS) — siguiente iteración, requiere screenshots.
- Cambiar el home (sigue siendo el detalle completo de Automatización).
