# Case Studies de Proyecto — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing de caso de estudio por proyecto en `/proyectos/<slug>`, vestida con la identidad de la marca, construida con imágenes extraídas del brandbook PDF.

**Architecture:** Template data-driven. Datos de cada proyecto en `src/lib/ecosystem.ts`; un set de componentes presentacionales aislados en `src/components/site/case-study/`; ruta dinámica `src/app/proyectos/[slug]/page.tsx` con `generateStaticParams`. Assets extraídos del PDF con un script Swift/PDFKit a `public/branding/<slug>/`.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, Tailwind v4, TypeScript, next/image, swift/PDFKit (extracción), sips (optimización).

**Verificación:** Estas son piezas presentacionales — no llevan unit tests. La verificación de cada tarea es: `pnpm build` verde (typecheck incluido) + la ruta pre-renderiza + screenshot vía Playwright que confirma el acabado. Commits frecuentes.

---

### Task 1: Script de extracción de PDF

**Files:**
- Create: `scripts/pdf-extract.swift`

- [ ] **Step 1:** Escribir el script Swift que renderiza páginas de un PDF a PNG.

```swift
import Foundation
import PDFKit
import AppKit

// Uso: swift scripts/pdf-extract.swift <pdf> <outDir> <scale> <page1> [page2 ...]
let args = CommandLine.arguments
guard args.count >= 5 else {
    FileHandle.standardError.write("Uso: pdf-extract <pdf> <outDir> <scale> <page...>\n".data(using: .utf8)!)
    exit(1)
}
let pdfPath = args[1]
let outDir = args[2]
let scale = CGFloat(Double(args[3]) ?? 2.0)
let pages = args[4...].compactMap { Int($0) }

guard let doc = PDFDocument(url: URL(fileURLWithPath: pdfPath)) else {
    FileHandle.standardError.write("No pude abrir el PDF\n".data(using: .utf8)!); exit(1)
}
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

for p in pages {
    guard let page = doc.page(at: p - 1) else { continue }      // 1-indexed → 0-indexed
    let rect = page.bounds(for: .mediaBox)
    let img = NSImage(size: NSSize(width: rect.width * scale, height: rect.height * scale))
    img.lockFocus()
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.saveGState()
    ctx.scaleBy(x: scale, y: scale)
    ctx.setFillColor(NSColor.white.cgColor)
    ctx.fill(CGRect(x: 0, y: 0, width: rect.width, height: rect.height))
    page.draw(with: .mediaBox, to: ctx)
    ctx.restoreGState()
    img.unlockFocus()
    guard let tiff = img.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let png = rep.representation(using: .png, properties: [:]) else { continue }
    let out = "\(outDir)/page-\(p).png"
    try? png.write(to: URL(fileURLWithPath: out))
    print("✓ \(out)")
}
```

- [ ] **Step 2:** Probar contra Kipi.

Run: `swift scripts/pdf-extract.swift "branding/KIPI.CASH BRANDBOOK.pdf" /tmp/kipi-test 2 1 2 3`
Expected: imprime `✓ /tmp/kipi-test/page-1.png` (etc.) y los PNG existen.

- [ ] **Step 3:** Commit.

```bash
git add scripts/pdf-extract.swift
git commit -m "feat: script swift para extraer paginas de brandbook PDF a PNG"
```

---

### Task 2: Curar assets de Kipi.cash y Costa Rica Unlocked

**Files:**
- Create: `public/branding/kipi-cash/*.png` (logo, paleta, tipografía, mockups)
- Create: `public/branding/costa-rica-unlocked/*.png` (idem)

- [ ] **Step 1:** Renderizar TODAS las páginas de cada PDF a un dir temporal para inspección.

```bash
PAGES=$(seq 1 40)  # ajustar al nº real de páginas tras inspección
swift scripts/pdf-extract.swift "branding/KIPI.CASH BRANDBOOK.pdf" /tmp/kipi 2 $PAGES
swift scripts/pdf-extract.swift "branding/Costa Rica Unlocked - BRANDBOOK.pdf" /tmp/cru 2 $PAGES
```

- [ ] **Step 2:** Inspeccionar (Read sobre los PNG) y elegir ~6-10 páginas por marca: portada (ya existe), logo, paleta, tipografía, 2-4 mockups/aplicaciones. Sampling de hex de paleta a ojo desde las páginas de color.

- [ ] **Step 3:** Copiar las elegidas a `public/branding/<slug>/` con nombres semánticos (`logo.png`, `palette.png`, `type.png`, `app-1.png`…) y optimizar con sips si pesan mucho:

```bash
sips -Z 1600 public/branding/kipi-cash/app-1.png  # cap a 1600px lado mayor
```

- [ ] **Step 4:** Verificar pesos (`du -h public/branding/**/*.png`) — ninguna > ~600KB idealmente.

- [ ] **Step 5:** Commit.

```bash
git add public/branding
git commit -m "feat: assets curados de brandbook (Kipi, Costa Rica Unlocked)"
```

---

### Task 3: Modelo de datos de case-study

**Files:**
- Modify: `src/lib/ecosystem.ts` (reemplaza `interface Project` y `export const proyectos`)

- [ ] **Step 1:** Reemplazar el tipo `Project` y el array `proyectos` por el modelo rico:

```ts
export interface CaseStudyImage { src: string; alt: string; wide?: boolean }
export interface PaletteColor { name: string; hex: string }
export interface Typeface { name: string; role: string }

export interface Project {
  slug: string;
  title: string;
  category: string;
  sector: string;
  year?: string;
  description: string;
  accent: string;
  cover: string;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  services: string[];
  gallery: CaseStudyImage[];
  palette: PaletteColor[];
  typography: Typeface[];
  liveUrl?: string;
  published: boolean;
}
```

- [ ] **Step 2:** Poblar `proyectos` con Costa Rica Unlocked y Kipi.cash (datos reales tras inspección de assets en Task 2) y Mi Rest con `published: false`. (Copy redactado a partir del brandbook + one-liners; hex reales de la paleta.)

- [ ] **Step 3:** Añadir helper:

```ts
export const publishedProjects = proyectos.filter((p) => p.published);
export const getProject = (slug: string) => proyectos.find((p) => p.slug === slug && p.published);
```

- [ ] **Step 4:** `pnpm build` — debe compilar sin type errors (la página `/proyectos` aún usa `p.image`/`p.logo`/`p.brandbook` → se actualiza en Task 6; si rompe el build, hacer Task 6 antes de buildear). Para no romper, ajustar `/proyectos/page.tsx` a `p.cover` en este mismo commit.

- [ ] **Step 5:** Commit.

```bash
git add src/lib/ecosystem.ts
git commit -m "feat: modelo de datos rico para case studies de proyecto"
```

---

### Task 4: Componentes presentacionales del case study

**Files:**
- Create: `src/components/site/case-study/case-hero.tsx`
- Create: `src/components/site/case-study/case-meta.tsx`
- Create: `src/components/site/case-study/case-section.tsx`
- Create: `src/components/site/case-study/case-gallery.tsx`
- Create: `src/components/site/case-study/palette-row.tsx`
- Create: `src/components/site/case-study/type-specimen.tsx`

- [ ] **Step 1:** Crear cada componente como Server Component presentacional que recibe datos por props. Patrón de estilo: reusar tokens existentes (`rounded-3xl`, `border-foreground/10`, `bg-card/60`, `text-muted-foreground`, `Reveal` de `@/components/ui/reveal`). El `accent` entra por inline style (`style={{ '--accent': accent } as CSSProperties}`) y se usa para gradientes/realces. Cada componente: una responsabilidad, props tipadas desde `@/lib/ecosystem`.

- [ ] **Step 2:** `pnpm build` — compila sin errores (aunque aún no haya página que los use, basta con que typecheck pase; si Next se queja de componentes no usados, no lo hace — son módulos).

- [ ] **Step 3:** Commit.

```bash
git add src/components/site/case-study
git commit -m "feat: componentes presentacionales de case study"
```

---

### Task 5: Ruta dinámica `/proyectos/[slug]`

**Files:**
- Create: `src/app/proyectos/[slug]/page.tsx`

- [ ] **Step 1:** Verificar la firma correcta de params en Next 16 (params es Promise en RSC). Leer `node_modules/next/dist/docs/` o context7 antes de escribir. Escribir la página:
  - `generateStaticParams()` → `publishedProjects.map(p => ({ slug: p.slug }))`
  - `generateMetadata({ params })` → title/description/openGraph con `cover`
  - Componente: `getProject(slug)`; si no, `notFound()`. Compone las secciones: CaseHero → CaseMeta → Reto/Enfoque/Resultado (CaseSection) → logo/PaletteRow/TypeSpecimen → CaseGallery → CTA + nav a otros proyectos.

- [ ] **Step 2:** `pnpm build` — verde, y confirmar en el output que aparecen `/proyectos/costa-rica-unlocked` y `/proyectos/kipi-cash` como rutas estáticas (`●` o `○`).

- [ ] **Step 3:** Verificación visual: `pnpm dev` + Playwright screenshot de ambas rutas. Confirmar acabado "pro".

- [ ] **Step 4:** Commit.

```bash
git add src/app/proyectos/[slug]/page.tsx
git commit -m "feat: ruta de case study por proyecto"
```

---

### Task 6: Enlazar el catálogo a los case studies

**Files:**
- Modify: `src/app/proyectos/page.tsx`

- [ ] **Step 1:** En la grid de branding, envolver la card publicada en `<Link href={`/proyectos/${p.slug}`}>`; las no publicadas (Mi Rest) quedan sin enlace, mostrando "Próximamente". Usar `p.cover` (ya migrado en Task 3). Quitar el bloque "Ver brandbook" (ya no aplica: el detalle es la landing).

- [ ] **Step 2:** `pnpm build` verde.

- [ ] **Step 3:** Verificación visual: desde `/proyectos`, click lleva a cada case study.

- [ ] **Step 4:** Commit.

```bash
git add src/app/proyectos/page.tsx
git commit -m "feat: cards de proyecto enlazan a su case study"
```

---

### Task 7: Deploy y verificación de producción

- [ ] **Step 1:** `git push origin main` (dispara auto-deploy Vercel).
- [ ] **Step 2:** Esperar READY y verificar 200:

```bash
for r in proyectos proyectos/costa-rica-unlocked proyectos/kipi-cash; do
  echo "/$r → $(curl -s -o /dev/null -w '%{http_code}' https://www.dignita.tech/$r)"
done
```
Expected: todas 200.

- [ ] **Step 3:** Actualizar `HANDOFF.md` (marcar pendiente #6-proyectos hecho, anotar el patrón para extender a servicios/productos). Commit + push.
```
