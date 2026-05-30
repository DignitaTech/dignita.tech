# Dignita — Case studies de proyecto (landings ricas) — Diseño

_Fecha: 2026-05-29. Estado: aprobado, pendiente de plan de implementación._

## Objetivo

Cada proyecto de branding tiene su propia **landing de caso de estudio** en
`/proyectos/<slug>`, nivel "pro" (estilo Halo Lab), construida con las **imágenes
que ya viven dentro del brandbook PDF** de cada marca. No es un PDF descargable:
es una mini case-study navegable, vestida con la identidad de la marca presentada.

Primer entregable: **Costa Rica Unlocked** y **Kipi.cash** (tienen brandbook).
**Mi Rest con IA** queda como card "Próximamente" (sin detalle) hasta tener assets.

## Enfoque elegido

**Template data-driven**: un único template de case-study reutilizable + los datos
de cada proyecto como fuente única en `src/lib/ecosystem.ts`. El acento de marca,
la galería y el copy varían por proyecto. Descartados: página 100% a mano por
proyecto (duplicación, lento) y MDX (mete tooling innecesario a un setup hoy limpio).

## Pipeline de assets

- Script `scripts/pdf-extract.swift` (PDFKit, nativo macOS — no requiere
  poppler/imagemagick): renderiza páginas elegidas de un brandbook PDF a PNG retina
  (escala 2x) en `public/branding/<slug>/`.
  - Uso: `swift scripts/pdf-extract.swift "<pdf>" "<outDir>" <scale> <page...>`
- Se eligen ~6-10 páginas fuertes por proyecto: portada, sistema de logo, paleta,
  tipografía, mockups/aplicaciones. Se curan y se optimizan (peso razonable para web).
- Los PDF crudos siguen **gitignored** (`/branding/`). Solo se commitean las PNG
  curadas en `public/branding/<slug>/`.

## Modelo de datos (`src/lib/ecosystem.ts`)

Se extiende el tipo de proyecto a un case-study. Forma propuesta:

```ts
interface CaseStudyImage { src: string; alt: string; wide?: boolean }
interface PaletteColor { name: string; hex: string }
interface Typeface { name: string; role: string }

interface Project {
  slug: string;            // "costa-rica-unlocked"
  title: string;
  category: string;        // "Branding"
  sector: string;          // "Turismo y tours" / "Fintech"
  year?: string;
  description: string;     // one-liner (card)
  accent: string;          // hex de la marca, p.ej. "#0F7A3D"
  cover: string;           // portada (hero + card)
  summary: string;         // posicionamiento corto bajo el título
  challenge: string;       // Reto
  approach: string;        // Enfoque
  result: string;          // Resultado
  services: string[];      // ["Estrategia", "Naming", "Identidad visual"]
  gallery: CaseStudyImage[];
  palette: PaletteColor[];
  typography: Typeface[];
  liveUrl?: string;
  published: boolean;      // false → no genera ruta, card muestra "Próximamente"
}
```

El copy (reto/enfoque/resultado), los hex de paleta y los nombres de tipografía se
redactan a partir de lo que muestra el brandbook + los one-liners actuales; el
cliente los afina luego.

## Ruta y rendering

- `src/app/proyectos/[slug]/page.tsx` — Server Component.
  - `generateStaticParams()` a partir de los proyectos `published`.
  - `generateMetadata()` por proyecto (title, description, og con la portada).
  - `notFound()` si el slug no existe o no está `published`.
- Pre-render estático (sin caching explícito, igual que el resto del sitio).

## Layout del case study

Secciones (estilo Halo Lab, con el acento de la marca):

1. **Hero** full-bleed: kicker `sector · año`, título grande, `summary`, portada,
   gradiente derivado del `accent`.
2. **Barra meta**: cliente · sector · servicios · año · enlace "ver en vivo" (si `liveUrl`).
3. **Reto → Enfoque → Resultado**: narrativa en bloques.
4. **Sistema de logo**: imágenes de logo sobre paneles de marca.
5. **Paleta**: swatches con nombre + hex (de `palette`).
6. **Tipografía**: specimen (de `typography`).
7. **Galería de aplicaciones**: mockups a ancho completo (`wide`) + grid.
8. **Cierre + CTA** a `/contacto` ("¿Tu marca necesita esto?") + navegación a otros proyectos.

## Componentes (aislados, `src/components/site/case-study/`)

- `case-hero.tsx` — hero con portada + acento.
- `case-meta.tsx` — barra de metadatos.
- `case-section.tsx` — bloque titulado reutilizable (kicker + título + contenido).
- `case-gallery.tsx` — galería responsive (soporta `wide`).
- `palette-row.tsx` — swatches de color.
- `type-specimen.tsx` — muestra tipográfica.

Cada uno con un propósito único, recibe datos por props, testeable/entendible aislado.

## Chrome

Se mantiene el shell claro de Dignita (`SiteNav` + `Footer` + `AmbientBackground`
en `layout.tsx`). Cada case study aplica **su propio acento** en hero, kickers y
swatches → se siente extensión de la marca presentada sin romper el sitio.

## Cambios en el catálogo

`src/app/proyectos/page.tsx`: las cards de branding pasan a enlazar a
`/proyectos/<slug>` (`<Link>` interno) en los proyectos `published`. Los no
publicados (Mi Rest) mantienen el tratamiento "Próximamente" sin enlace.

## Fuera de alcance (por ahora)

- Detalle para servicios / productos / retail (pendiente #6 restante, otra iteración).
- PDF de brandbook descargable/hosteado (pendiente #3 separado).
- Detalle de "Mi Rest con IA" (sin assets todavía).

## Criterios de éxito

- `/proyectos/costa-rica-unlocked` y `/proyectos/kipi-cash` renderizan un case
  study completo con imágenes reales del brandbook y el acento de cada marca.
- Desde `/proyectos` se llega a cada case study con un click.
- `pnpm build` verde (sin type errors), las nuevas rutas pre-renderizadas.
- Producción 200 en las nuevas rutas tras deploy.
```
