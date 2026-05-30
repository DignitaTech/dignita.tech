# Dignita — Handoff / Estado del proyecto

_Última actualización: 2026-05-30 (sesión de construcción del hub)._

## Qué es
`dignita.tech` — sitio Next.js 16 (App Router, React 19, Tailwind v4, TypeScript, pnpm).
Tema claro **blanco + naranja**, glassmorphism, `motion`, embla. Mobile-first, en español.
Posicionamiento: **automatización-first + hub de ecosistema** (ref: halo-lab.com).

## Estado ACTUAL (live)
- **Producción:** https://www.dignita.tech (root `dignita.tech` hace 308→www).
- **GitHub:** https://github.com/DignitaTech/dignita.tech (rama `main`, auto-deploy en cada push).
- **Vercel:** team `dignitatechs-projects`, proyecto `dignita.tech`.
- **Último commit:** `bafcd3b` (detalle de productos `/productos/[slug]` para los 3). Build verde, deploy READY.

### ⚠️ PRIMER PASO al retomar — verificar producción
La verificación final quedó interrumpida. Confirmar que ya NO dan 404:
```bash
for r in "" servicios productos retail herramientas proyectos equipo contacto; do
  echo "/$r → $(curl -s -o /dev/null -w '%{http_code}' https://www.dignita.tech/$r)"
done
# portadas brandbook deben dar 200:
curl -s -o /dev/null -w "%{http_code}\n" https://www.dignita.tech/branding/kipi-cash/portada.png
```
(Si algo da 404: `git pull`, `pnpm install`, `pnpm build`, y `vercel --yes --prod --scope dignitatechs-projects`.)

## Arquitectura del hub
- Home `/` = servicio insignia Automatización e IA (intacta: hero 3D Spline lazy, pipeline, áreas, proceso, testimonios, CTA, bridge, formulario).
- Páginas catálogo: `/servicios /productos /retail /herramientas /proyectos /equipo /contacto`.
- **Chrome compartido en `src/app/layout.tsx`**: `AmbientBackground` + `SiteNav` + `Footer`.
- **Fuente única de datos:** `src/lib/ecosystem.ts` (servicios, productos, retail, herramientas, proyectos, casos, equipo).
- Componentes clave: `src/components/site/{site-nav,catalog-card,page-shell,ecosystem-bridge,diagnostico}.tsx`.
- `/contacto` y la home reusan `Diagnostico` (formulario + fondo Neural Vortex naranja).
- `/proyectos`: casos de éxito (Operadores de World +16) + branding con **portadas reales**. Las cards publicadas enlazan a su case study.
- **Case studies `/proyectos/[slug]`** (Costa Rica Unlocked, Kipi.cash): landing rica estilo Halo Lab, vestida con el acento de cada marca, con imágenes extraídas del brandbook (logo, paleta, tipografía, mockups). Ruta dinámica con `generateStaticParams`; Mi Rest queda `published:false` (card "Próximamente", sin ruta).
- Componentes en `src/components/site/case-study/{case-hero,case-meta,case-section,case-gallery,palette-row,type-specimen}.tsx`. Datos en `ecosystem.ts → proyectos` (tipo `Project` extendido + helpers `publishedProjects`/`getProject`).
- **Detalle de servicios `/servicios/[slug]`** (los 6): hero (icono + CTAs) → qué resolvemos → qué incluye (checklist) → proceso → CTA → otros servicios. Acento naranja de marca (no per-item). Automatización enruta a `/`, Branding a `/proyectos`, soporte ofrece su subdominio como CTA secundaria. Componente `src/components/site/service/service-hero.tsx`, reusa `CaseSection`. Datos en `ecosystem.ts → servicios` (`CatalogItem` extendido con `slug/summary/problem/deliverables/process/primaryCta/secondaryCta` + helper `getService`). Las cards de `/servicios` se mapean a `/servicios/<slug>`.
- **Detalle de productos `/productos/[slug]`** (los 3): hero a 2 columnas (texto + screenshot en marco de navegador, o panel fallback "Vista previa próximamente") → qué resuelve → qué incluye → galería (si hay screenshots) → CTA → otros productos. **Acento por producto** (`accent`): Mirestconia naranja, Nivela verde, Orion índigo. Componentes `src/components/site/product/product-hero.tsx` + `src/components/site/cta-button.tsx` (compartido con service-hero). Datos en `ecosystem.ts → productos` (`CatalogItem` + `sector/accent/screenshots` + helper `getProduct`).
  - **Estado real de los SaaS (mayo 2026):** Mirestconia **live** (screenshot real en `public/productos/mirestconia/hero.jpg`, capturado con headless Chrome de mirestconia.com). Nivela **caído (500)** y Orion **parqueado en GoDaddy** → sus landings usan fallback visual + copy redactado; Orion CTA va a `/contacto` (no a la página parqueada). Cuando estén live: capturar screenshots reales y poblar `productos[].screenshots`.

## Assets de branding
- Brandbooks crudos (PDF, ~79MB y ~48MB) en `./branding/` → **gitignored** (no se suben).
- **Extracción de páginas:** `scripts/pdf-extract.swift` (PDFKit nativo, no requiere poppler/imagemagick).
  Uso: `swift scripts/pdf-extract.swift "<pdf>" "<outDir>" <scale> <page...>`. Para curar más assets de un nuevo proyecto: renderizar todas las páginas a baja res, elegir las fuertes, re-renderizar en alta (scale 2), optimizar con `sips` (`sips -Z 1800`, fotos a `-s format jpeg -s formatOptions 80`).
- Assets curados en `public/branding/{costa-rica-unlocked,kipi-cash}/` (portada, logo, type, paleta vía hex en datos, mockups). Solo PNG/JPG curados se commitean; el PDF no.
- Hex de paleta sampleados a mano desde las páginas de color del PDF (ver `proyectos[].palette` en `ecosystem.ts`).

## Formulario de contacto
- Web3Forms. Key en Vercel env `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = `2ebfb9fb-8d3e-4529-befd-5f940b7bb583`.
- Local: está en `.env.local` (gitignored) — si falta, copiar la key ahí.
- Entrega a **leonidas.yauri@dignita.tech**. (Pendiente: confirmar que llega el correo de prueba.)

## Comandos
```bash
cd ~/dignita.tech
pnpm install            # si es máquina nueva
pnpm dev                # dev (puerto 3000; si ocupado usa 3002)
pnpm build              # build/typecheck (debe decir Compiled successfully, sin Type error)
git push origin main    # dispara auto-deploy en Vercel
vercel --yes --prod --scope dignitatechs-projects   # deploy manual
```

## Cuentas (ya autenticadas en esta Mac)
- **gh** logueado, cuenta activa `DignitaTech` (hay varias cuentas; activar con `gh auth switch -u DignitaTech` si hace falta).
- **vercel** logueado como `dignitatech`, team `dignitatechs-projects`.
- En máquina nueva habrá que `gh auth login` y `vercel login` de nuevo.

## DNS (ya configurado, no tocar)
- `dignita.tech` A → `216.198.79.1` (IP nueva de Vercel). `www` CNAME → `db67e7e4e68125de.vercel-dns-017.com`.
- MX/SPF de Google y subdominios (3d, seguridad, ai, crm, soporte, etc.) intactos.

## Pendientes / Fase 2
1. **Confirmar producción 200** en todas las rutas (ver arriba).
2. Confirmar que el formulario entrega correo a leonidas.yauri@dignita.tech.
3. Brandbooks descargables (comprimir/hostear PDFs) + link en `/proyectos`.
4. Documentar **Mi Rest con IA** (hoy `published:false`; cuando tenga brandbook, extraer assets y poblar el case study — mismo patrón que CRU/Kipi).
5. Revisar e integrar **Genera** (genera.dignita.tech).
6. ✅ **Proyectos**, ✅ **Servicios** y ✅ **Productos** ya tienen detalle rico (`/{proyectos,servicios,productos}/[slug]`). **Pendiente #6 cerrado.** Falta solo: capturar screenshots reales de Nivela/Orion cuando vuelvan a estar live.
7. Fotos reales del equipo (hoy iniciales LY/AC) y LinkedIn en `ecosystem.ts → equipo`.

## Gotchas
- `lucide-react` 1.17 **eliminó iconos de marca** (`Linkedin`, `Github`) → usar SVG inline.
- `next/image` con imágenes locales de `/public` NO necesita `remotePatterns`.
- Spline del hero es **lazy** (IntersectionObserver + skeleton) para no cargar ~1.9MB de entrada.
- App Router necesitó `src/app/not-found.tsx` para no romper el build del 404.

## Documentos del proceso
- Spec: `docs/superpowers/specs/2026-05-29-dignita-hub-design.md`
- Plan: `docs/superpowers/plans/2026-05-29-dignita-hub.md`
- Contenido maestro original: `~/Downloads/dignita_portafolio_reestructurado.md`
