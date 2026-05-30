# Dignita — Hub de ecosistema (diseño)

**Fecha:** 2026-05-29
**Estado:** Aprobado para Fase 1

## 1. Objetivo

Convertir `dignita.tech` de una landing de automatización en un **hub tipo estudio/agencia** (referencia: halo-lab.com) que organice todo el ecosistema Dignita, **manteniendo automatización e IA como núcleo** (la home no cambia su mensaje).

## 2. Posicionamiento

- **Automatización-first + ecosistema.** El spear sigue siendo "Menos carga manual. Más control operativo."
- El resto (servicios, productos SaaS, retail, herramientas, proyectos) se presenta como **catálogo/directorio**: cada item es una card que enlaza a su sitio o subdominio externo.
- Arquitectura **híbrida multi-página** (App Router), pero estilo catálogo (links afuera, no landings ricas por item en Fase 1).

## 3. Sitemap

```
/                 Automatización e IA estratégica (home actual — intacta)
/servicios        6 líneas de servicio (cards)
/productos        SaaS (cards → externo)
/retail           Retail (cards → subdominio)
/herramientas     Tools (cards → subdominio)
/proyectos        Portafolio branding + Casos de éxito
/equipo           Equipo
/contacto         Formulario (hoy es la sección #contacto de la home)
```

## 4. Navegación global

Nav presente en todas las páginas (mobile-first; en móvil = menú hamburguesa):

```
[logo]  Servicios  Productos  Retail  Herramientas  Proyectos  Equipo  [Agendar diagnóstico]
```

- En desktop, Productos/Retail/Herramientas pueden agruparse bajo un dropdown **"Ecosistema ▾"** si el nav queda muy cargado (decisión de implementación).
- El logo lleva a `/`. "Agendar diagnóstico" lleva a `/contacto`.

## 5. Catálogo — fuente única de verdad

### /servicios (6 cards)
| Servicio | Destino | Estado |
|---|---|---|
| Automatización e IA estratégica | `/` (insignia) | listo |
| Soporte TI | https://soporte.dignita.tech | próximamente |
| Soporte RPA | https://soporterpa.dignita.tech | activo |
| Desarrollo web | `/contacto` | sin sitio |
| Branding | `/proyectos` + `/contacto` | sin sitio |
| Lanzamiento de marca (Branding + Web + Comunicación) | `/contacto` | sin sitio |

### /productos — SaaS (3 cards)
| Producto | URL |
|---|---|
| Mirestconia | https://mirestconia.com |
| Nivela tu Academy | https://nivelatuacademy.com |
| Orion ERP | https://orion-rp.com |

### /retail (2 cards)
| Item | URL | Estado |
|---|---|---|
| Impresoras 3D | https://3d.dignita.tech | listo |
| Cámaras de seguridad | https://seguridad.dignita.tech | listo |

### /herramientas (1 card)
| Herramienta | URL | Estado |
|---|---|---|
| Genera | https://genera.dignita.tech | en revisión |

### /proyectos
- **Branding:** Costa Rica Unlocked (listo) · Kipi.cash (listo) · Mi Rest con ia (por documentar)
- **Casos de éxito (bloque destacado):** Operadores de World — +16 locales

### /equipo
- Leonidas Yauri — foto, rol, links
- Alexander Castañeda — foto, rol, links

## 6. Cambios en la home

- Añadir el **nav global** (reemplaza el navbar actual de anclas).
- Añadir un **bloque-puente** corto al final ("Más que automatización — explora el ecosistema") con accesos a Productos / Retail / Proyectos / Equipo.
- Mantener todo lo demás (hero 3D, pipeline de servicios de automatización, áreas, proceso, testimonios, formulario, vortex).

## 7. Sistema de diseño (reusar el existente)

- Tema claro blanco + naranja, glassmorphism, `motion`, embla para carruseles.
- Componentes UI ya existentes (`Badge`, `Button`, `Card`, `Reveal`, `LogoCloud`, etc.).
- Patrón de card de catálogo: logo/preview + nombre + descripción corta + chip de estado + botón "Visitar ↗" (o CTA interna).
- Cada página catálogo reutiliza `SectionHeading` + `AmbientBackground` + footer.

## 8. No-goals (Fase 2)

- Páginas de detalle ricas por servicio/producto/proyecto.
- Documentar "Mi Rest con ia".
- Revisar e integrar Genera a fondo.
- Blog/Insights, pricing.
- i18n (inglés).

## 9. Criterios de éxito

- Nav global consistente en todas las páginas, mobile-first.
- Las 5 páginas catálogo (`/servicios`, `/productos`, `/retail`, `/herramientas`, `/proyectos`) + `/equipo` cargan y enlazan correctamente.
- Home intacta en mensaje, con nav nuevo + bloque-puente.
- `pnpm build` pasa; deploy a Vercel desde GitHub.
