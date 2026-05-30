# Dignita — Handoff / Estado del proyecto

_Última actualización: 2026-05-30 (sesión: Genera v2 + SEO/observabilidad + nav mega-menú + caso World)._

## Qué es
`dignita.tech` — sitio Next.js 16 (App Router, React 19, Tailwind v4, TypeScript, pnpm).
Tema claro **blanco + naranja**, glassmorphism, `motion`, embla. Mobile-first, en español.
Posicionamiento: **automatización-first + hub de ecosistema** (ref: halo-lab.com).

## Estado ACTUAL (live)
- **Producción:** https://www.dignita.tech (root `dignita.tech` hace 308→www).
- **GitHub:** https://github.com/DignitaTech/dignita.tech (rama `main`, auto-deploy en cada push).
- **Vercel:** team `dignitatechs-projects`, proyecto `dignita.tech`.
- **Último commit:** `505d3d8` (mapa cobertura + galería caso World). Build verde, deploy READY.
- **Otros sitios del ecosistema:**
  - **`genera.dignita.tech`** ✅ LIVE — proyecto Next.js separado en `~/genera-v2`, repo `github.com/DignitaTech/genera`, proyecto Vercel `genera-v2` (`prj_2ytLB5cj74vFtzAWQHqaFktcvmYH`, team `team_6ZwesA3MT4jMXEW24XVsG1R1`). Dominio verificado vía TXT. **Auto-deploy NO conectado al repo** (deploy manual: `cd ~/genera-v2 && vercel --yes --prod --scope dignitatechs-projects`). Pendiente: conectar Git en dashboard Vercel (Settings → Git).

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
- **Caso de éxito `/casos/[slug]`** (Operadores de World): landing dedicada con acento violeta `#7C3AED`. Hero → 6 KPIs (1 año, 16+ puntos, +100K usuarios, +30M alcance, 90+ trabajadores, 7+ deptos) → reconocimientos → reto/enfoque/resultado → actividades clave → **mapa de cobertura** (`src/components/site/peru-map.tsx`, silueta SVG estilizada con 7 ciudades: Piura, Chiclayo, Trujillo, Chimbote, Nuevo Chimbote, Lima, Arequipa) → galería (`casos[].gallery`, **slot vacío — faltan fotos del Orbe**) → Instagram @crypnita.pe → CTA. Datos en `ecosystem.ts → casos` (`SuccessCase` extendido + helper `getCaso`). La card en `/proyectos` enlaza a `/casos/<slug>`.
  - ⚠️ **Mapa estilizado**, no contorno real de Perú. Para precisión: reemplazar `PERU_PATH` en `peru-map.tsx` con un SVG/topojson real.
  - ⚠️ **Faltan fotos del Orbe de World** (gente registrándose) → subir a `public/casos/operadores-de-world/` y poblar `casos[].gallery` en `ecosystem.ts`.

## SEO + Observabilidad (sesión 2026-05-30)
- **Vercel Analytics + Speed Insights** activos (`@vercel/analytics/next` + `@vercel/speed-insights/next` en `layout.tsx`). Métricas por ruta en dashboard Vercel.
- **JSON-LD** estructurado: Organization + WebSite (sitewide en `layout.tsx`), Service (`/servicios/[slug]`), CreativeWork (`/proyectos/[slug]`). Componente `src/components/site/json-ld.tsx`.
- **sitemap.xml + robots.txt** en `src/app/{sitemap,robots}.ts` (autoalimentados de `ecosystem.ts`). robots referencia también `genera.dignita.tech/sitemap.xml`. Genera tiene los suyos en `~/genera-v2/app/{sitemap,robots}.ts`.
- **OG images dinámicas: INTENTADAS Y REVERTIDAS** — `ImageResponse`/`next/og` daba 500 en prod (edge: body vacío; node: prerender error). Los archivos `opengraph-image.tsx` fueron eliminados. Si se reintenta: investigar bien runtime + fuentes en Next 16.
- **Pendiente usuario:** Google Search Console — agregar propiedad `dignita.tech`, verificar, enviar `https://dignita.tech/sitemap.xml`.

## Nav (mega-menú)
- `src/components/site/site-nav.tsx` reescrito: **Servicios** y **Productos** son dropdowns (mega-menú con icono+descripción+link por item, alimentados de `ecosystem.ts`). Proyectos/Equipo son links simples. Mobile: drawer con acordeón expandible por sección. Fondo blanco limpio (sin rejillas).

## Formulario (actualizado)
- **hCaptcha** agregado (`@hcaptcha/react-hcaptcha`, sitekey público de Web3Forms `50b2fe65-...`). El botón submit se desactiva hasta completar el captcha.
- ✅ env `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` seteada en Vercel prod/dev (`2ebfb9fb-...`), verificada inlineada en el bundle de prod. **Pendiente:** usuario confirme recepción de un envío real (Web3Forms solo acepta POST desde navegador, no curl/server).

## Keystatic CMS (instalado, pausado)
- Instalado (`@keystatic/core` + `@keystatic/next`). Config en `src/keystatic.config.ts` (storage GitHub si `KEYSTATIC_GITHUB_CLIENT_ID` existe, sino local). Panel `/keystatic` ✅ live, API en `src/app/api/keystatic/[...params]/route.ts`, reader en `src/lib/reader.ts`. Contenido `proyectos` migrado a YAML en `content/proyectos/`. `KEYSTATIC_SECRET` seteado en Vercel.
- **Pendiente para activar edición en prod:** visitar `/keystatic` en producción → botón "Create GitHub App" (one-click). El usuario decidió **pausarlo** (no urgente — Claude Code edita más rápido). Las páginas **aún leen de `ecosystem.ts`**, NO del reader (la migración del data-source quedó pendiente).

## Assets de branding
- Brandbooks crudos (PDF, ~79MB y ~48MB) en `./branding/` → **gitignored** (no se suben).
- **Extracción de páginas:** `scripts/pdf-extract.swift` (PDFKit nativo, no requiere poppler/imagemagick).
  Uso: `swift scripts/pdf-extract.swift "<pdf>" "<outDir>" <scale> <page...>`. Para curar más assets de un nuevo proyecto: renderizar todas las páginas a baja res, elegir las fuertes, re-renderizar en alta (scale 2), optimizar con `sips` (`sips -Z 1800`, fotos a `-s format jpeg -s formatOptions 80`).
- Assets curados en `public/branding/{costa-rica-unlocked,kipi-cash}/` (portada, logo, type, paleta vía hex en datos, mockups). Solo PNG/JPG curados se commitean; el PDF no.
- Hex de paleta sampleados a mano desde las páginas de color del PDF (ver `proyectos[].palette` en `ecosystem.ts`).

## Formulario de contacto
- Web3Forms. Key esperada `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = `2ebfb9fb-8d3e-4529-befd-5f940b7bb583`.
- 🔴 **BUG (2026-05-30): el form está ROTO en producción.** El env `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` está **vacío (`""`)** en Vercel prod y en `.env.local`. Como es `NEXT_PUBLIC` (inline en build), el form hace `if(!ACCESS_KEY) setStatus("error")` y nunca envía. **Fix:** setear la key (`vercel env add` / dashboard) en prod **y** local, **redeploy** (no basta cambiar el env, hay que rebuildear), y probar el envío **desde el navegador** (Web3Forms rechaza POST server-side/curl — "Use our API in client side"; solo plan Pro permite server IP).
- Entrega a **leonidas.yauri@dignita.tech** (según la cuenta dueña del access key). Pendiente: confirmar recepción tras el fix.

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
1. 🔴 **Confirmar entrega del formulario** — usuario envía uno real desde el navegador y verifica que llega a leonidas.yauri@dignita.tech (no se puede testear server-side).
2. 🟡 **Fotos del Orbe de World** → `public/casos/operadores-de-world/` + poblar `casos[].gallery`.
3. 🟡 **Mapa real de Perú** en `peru-map.tsx` (hoy silueta estilizada).
4. 🟡 **Google Search Console** — agregar/verificar `dignita.tech`, enviar sitemap.
5. Conectar **auto-deploy Git** del proyecto Vercel `genera-v2` (hoy deploy manual).
6. Documentar **Mi Rest con IA** (`published:false`; falta brandbook).
7. Screenshots reales de Nivela/Orion cuando vuelvan a estar live.
8. Fotos reales del equipo + LinkedIn en `ecosystem.ts → equipo` (hoy iniciales LY/AC).
9. Brandbooks descargables (comprimir/hostear PDFs).
10. (Opcional) Reanudar **Keystatic**: migrar páginas a leer del reader + activar GitHub App.

✅ Cerrado: detalle de proyectos/servicios/productos, caso World, Genera v2, SEO (sitemap/robots/JSON-LD), Analytics, nav mega-menú, captcha, key del form.

## Gotchas
- `lucide-react` 1.17 **eliminó iconos de marca** (`Linkedin`, `Github`) → usar SVG inline.
- `next/image` con imágenes locales de `/public` NO necesita `remotePatterns`.
- Spline del hero es **lazy** (IntersectionObserver + skeleton) para no cargar ~1.9MB de entrada.
- App Router necesitó `src/app/not-found.tsx` para no romper el build del 404.

## Documentos del proceso
- Spec: `docs/superpowers/specs/2026-05-29-dignita-hub-design.md`
- Plan: `docs/superpowers/plans/2026-05-29-dignita-hub.md`
- Contenido maestro original: `~/Downloads/dignita_portafolio_reestructurado.md`
