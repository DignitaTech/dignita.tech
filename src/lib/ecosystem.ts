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

export interface ServiceCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface CatalogItem {
  title: string;
  description: string;
  href: string;
  external: boolean;
  status?: "Activo" | "Próximamente" | "En revisión" | "Listo";
  icon: LucideIcon;
  cta?: string;
  /** campos de la landing de detalle (servicios) */
  slug?: string;
  summary?: string;
  problem?: string;
  deliverables?: string[];
  process?: ProcessStep[];
  primaryCta?: ServiceCta;
  secondaryCta?: ServiceCta;
}

export const servicios: CatalogItem[] = [
  {
    slug: "automatizacion-e-ia",
    title: "Automatización e IA estratégica",
    description: "Nuestro servicio insignia: convertimos el trabajo manual en flujos ágiles, controlables y trazables.",
    href: "/",
    external: false,
    status: "Activo",
    icon: Workflow,
    cta: "Ver",
    summary:
      "Convertimos el trabajo manual en flujos ágiles, controlables y trazables. Nuestro servicio insignia.",
    problem:
      "Equipos atrapados en tareas repetitivas, datos dispersos y procesos que dependen de que alguien se acuerde. El costo no es solo tiempo: es error, retraso y falta de visibilidad.",
    deliverables: [
      "Diagnóstico operativo y mapa de procesos",
      "Automatización de flujos (RPA + integraciones)",
      "Agentes y asistentes con IA aplicada",
      "Tableros de control y trazabilidad",
      "Soporte y mejora continua",
    ],
    process: [
      { title: "Diagnóstico", description: "Entramos por el dolor operativo real y mapeamos el proceso." },
      { title: "Priorización", description: "Elegimos dónde la automatización rinde más, rápido." },
      { title: "Mecanismo correcto", description: "RPA, integración o IA — la herramienta que de verdad encaja." },
      { title: "Mejora visible y sostenida", description: "Ejecutamos una mejora medible y la mantenemos en el tiempo." },
    ],
    primaryCta: { label: "Ver el servicio completo", href: "/" },
    secondaryCta: { label: "Agendar diagnóstico", href: "/contacto" },
  },
  {
    slug: "soporte-ti",
    title: "Soporte TI",
    description: "Mesa de ayuda y soporte de infraestructura para que tu operación nunca se detenga.",
    href: "https://soporte.dignita.tech",
    external: true,
    status: "Próximamente",
    icon: Headset,
    summary:
      "Mesa de ayuda y soporte de infraestructura para que tu operación nunca se detenga.",
    problem:
      "Cuando un equipo, una red o un servicio se cae, cada minuto cuesta. Sin un soporte que responda, los problemas pequeños se vuelven paros grandes.",
    deliverables: [
      "Mesa de ayuda (help desk) para usuarios",
      "Soporte y monitoreo de infraestructura",
      "Gestión de incidentes con SLA",
      "Mantenimiento preventivo",
      "Respaldo y continuidad del negocio",
    ],
    primaryCta: { label: "Solicitar soporte", href: "/contacto" },
    secondaryCta: { label: "Ir al portal de soporte", href: "https://soporte.dignita.tech", external: true },
  },
  {
    slug: "soporte-rpa",
    title: "Soporte RPA",
    description: "Mantenimiento y continuidad de tus automatizaciones y bots en producción.",
    href: "https://soporterpa.dignita.tech",
    external: true,
    status: "Activo",
    icon: Bot,
    summary:
      "Mantenimiento y continuidad de tus automatizaciones y bots en producción.",
    problem:
      "Un bot que se rompe en silencio es peor que no tener bot: el proceso falla sin que nadie lo note. Las automatizaciones necesitan quien las cuide.",
    deliverables: [
      "Monitoreo de bots y flujos en producción",
      "Corrección ante cambios de sistemas o interfaces",
      "Optimización y nuevas reglas de negocio",
      "Alertas y reportes de ejecución",
      "SLA de respuesta ante incidentes",
    ],
    primaryCta: { label: "Solicitar soporte RPA", href: "/contacto" },
    secondaryCta: { label: "Ir al portal de soporte RPA", href: "https://soporterpa.dignita.tech", external: true },
  },
  {
    slug: "desarrollo-web",
    title: "Desarrollo web",
    description: "Sitios y aplicaciones web rápidas, modernas y orientadas a conversión.",
    href: "/contacto",
    external: false,
    icon: Code2,
    cta: "Cotizar",
    summary:
      "Sitios y aplicaciones web rápidas, modernas y orientadas a conversión.",
    problem:
      "Una web lenta, vieja o que no convierte es plata que se va. Hoy el sitio es el primer vendedor de tu marca, y trabaja 24/7.",
    deliverables: [
      "Sitios y landing pages de alto rendimiento",
      "Aplicaciones web a medida",
      "Integraciones (pagos, CRM, automatización)",
      "SEO técnico y Core Web Vitals",
      "Hosting, dominio y mantenimiento",
    ],
    process: [
      { title: "Descubrimiento", description: "Entendemos negocio, audiencia y objetivos de conversión." },
      { title: "Diseño", description: "Estructura, UX y dirección visual alineadas a la marca." },
      { title: "Desarrollo", description: "Construcción rápida, accesible y optimizada." },
      { title: "Lanzamiento", description: "Publicación, medición y mejora continua." },
    ],
    primaryCta: { label: "Cotizar mi web", href: "/contacto" },
  },
  {
    slug: "branding",
    title: "Branding",
    description: "Identidad de marca con criterio: estrategia, naming y sistema visual.",
    href: "/proyectos",
    external: false,
    icon: Palette,
    cta: "Ver proyectos",
    summary:
      "Identidad de marca con criterio: estrategia, naming y sistema visual.",
    problem:
      "Una marca sin sistema se ve distinta en cada lugar y no genera recuerdo. La identidad no es un logo: es coherencia con intención.",
    deliverables: [
      "Estrategia y posicionamiento de marca",
      "Naming",
      "Logotipo y sistema visual",
      "Paleta, tipografía y aplicaciones",
      "Brandbook",
    ],
    primaryCta: { label: "Ver proyectos de branding", href: "/proyectos" },
    secondaryCta: { label: "Quiero mi marca", href: "/contacto" },
  },
  {
    slug: "lanzamiento-de-marca",
    title: "Lanzamiento de marca",
    description: "Branding + desarrollo web + comunicación, en un solo frente de lanzamiento.",
    href: "/contacto",
    external: false,
    icon: Rocket,
    cta: "Cotizar",
    summary:
      "Branding + desarrollo web + comunicación, en un solo frente de lanzamiento.",
    problem:
      "Lanzar por partes —marca por un lado, web por otro, comunicación improvisada— diluye el impacto. Un lanzamiento se gana con todo alineado.",
    deliverables: [
      "Identidad de marca completa",
      "Sitio web de lanzamiento",
      "Sistema de comunicación y contenidos",
      "Activación digital",
      "Acompañamiento en el go-to-market",
    ],
    process: [
      { title: "Estrategia", description: "Posicionamiento, mensaje y plan de lanzamiento." },
      { title: "Identidad", description: "Marca y sistema visual listos para escalar." },
      { title: "Plataforma", description: "Web y canales preparados para recibir tráfico." },
      { title: "Activación", description: "Salida coordinada y medición del impacto." },
    ],
    primaryCta: { label: "Planear mi lanzamiento", href: "/contacto" },
  },
];

export const getService = (slug: string) =>
  servicios.find((s) => s.slug === slug);

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

export interface CaseStudyImage {
  src: string;
  alt: string;
  /** ocupa todo el ancho de la galería */
  wide?: boolean;
}

export interface PaletteColor {
  name: string;
  hex: string;
}

export interface Typeface {
  name: string;
  role: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  sector: string;
  description: string;
  /** color de la marca presentada, en hex */
  accent: string;
  published: boolean;
  cover?: string;
  year?: string;
  summary?: string;
  challenge?: string;
  approach?: string;
  result?: string;
  services?: string[];
  gallery?: CaseStudyImage[];
  palette?: PaletteColor[];
  typography?: Typeface[];
  liveUrl?: string;
}

export const proyectos: Project[] = [
  {
    slug: "costa-rica-unlocked",
    title: "Costa Rica Unlocked",
    category: "Branding",
    sector: "Turismo & experiencias",
    year: "2024",
    description: "Identidad de marca para una agencia de viajes y tours.",
    accent: "#00629A",
    published: true,
    cover: "/branding/costa-rica-unlocked/portada.png",
    summary:
      "Identidad para una agencia que abre la Costa Rica auténtica — la que no sale en los folletos.",
    challenge:
      "Costa Rica compite con cientos de operadores que venden las mismas postales. La marca necesitaba sentirse local, vibrante y premium a la vez, capaz de vivir igual de bien en una camiseta, una van o el feed de un viajero.",
    approach:
      "Partimos de un logotipo manuscrito con personalidad y lo anclamos a una paleta tomada del país: azul océano, verde selva, rojo y dorado. La tipografía Proxima Nova ordena la información sin apagar la energía del lettering.",
    result:
      "Un sistema cálido y memorable que viaja bien: del merchandising a la flota, del empaque a la señalética, todo se reconoce como Costa Rica Unlocked.",
    services: ["Estrategia de marca", "Logotipo & lettering", "Identidad visual", "Aplicaciones de marca"],
    palette: [
      { name: "Azul océano", hex: "#00629A" },
      { name: "Rojo", hex: "#ED5157" },
      { name: "Verde selva", hex: "#387B61" },
      { name: "Dorado", hex: "#FFD878" },
      { name: "Crema", hex: "#FFFAF1" },
    ],
    typography: [{ name: "Proxima Nova", role: "Titulares y texto" }],
    gallery: [
      { src: "/branding/costa-rica-unlocked/nature.jpg", alt: "Dirección de fotografía de marca: naturaleza de Costa Rica", wide: true },
      { src: "/branding/costa-rica-unlocked/sand.jpg", alt: "Logotipo aplicado sobre la arena de la playa", wide: true },
      { src: "/branding/costa-rica-unlocked/van.jpg", alt: "Rotulación de la van de Costa Rica Unlocked", wide: true },
      { src: "/branding/costa-rica-unlocked/hat.jpg", alt: "Bucket hat con la marca" },
      { src: "/branding/costa-rica-unlocked/tote.jpg", alt: "Tote bag con el logotipo" },
    ],
  },
  {
    slug: "kipi-cash",
    title: "Kipi.cash",
    category: "Branding",
    sector: "Fintech",
    year: "2024",
    description: "Identidad de marca para una fintech.",
    accent: "#4157EE",
    published: true,
    cover: "/branding/kipi-cash/portada.jpg",
    summary:
      "La identidad de una fintech pensada para que mover dinero se sienta simple, cercano y confiable.",
    challenge:
      "Kipi.cash llegaba a un mercado saturado de apps financieras frías y genéricas. Necesitaba una identidad que transmitiera confianza sin sacrificar cercanía, y que funcionara igual en una pantalla de onboarding que en una gorra.",
    approach:
      "Construimos un sistema visual sobre un azul eléctrico, equilibrado con una paleta pastel —rosa, amarillo y celeste— que humaniza cada punto de contacto. El logotipo es directo y legible; Helvetica Neue mantiene todo limpio y operativo.",
    result:
      "Una marca flexible y reconocible, lista para escalar de la app a la calle: producto digital, merchandising y señalética comparten el mismo ADN.",
    services: ["Estrategia de marca", "Naming", "Identidad visual", "Sistema de aplicación"],
    palette: [
      { name: "Azul eléctrico", hex: "#4157EE" },
      { name: "Rosa", hex: "#F28AC6" },
      { name: "Amarillo", hex: "#FAD958" },
      { name: "Celeste", hex: "#72DDFC" },
      { name: "Tinta", hex: "#2E2D3B" },
    ],
    typography: [
      { name: "Helvetica Neue", role: "Titulares e interfaz" },
      { name: "Helvetica Neue Light", role: "Texto largo" },
    ],
    gallery: [
      { src: "/branding/kipi-cash/app.jpg", alt: "Pantallas de la app de Kipi.cash", wide: true },
      { src: "/branding/kipi-cash/laptop.jpg", alt: "Sitio de Kipi.cash en laptop", wide: true },
      { src: "/branding/kipi-cash/signage.jpg", alt: "Señalética de oficina de Kipi.cash", wide: true },
      { src: "/branding/kipi-cash/cap.jpg", alt: "Gorra con la marca Kipi.cash" },
      { src: "/branding/kipi-cash/tee.jpg", alt: "Camiseta con la marca Kipi.cash" },
    ],
  },
  {
    slug: "mi-rest-con-ia",
    title: "Mi Rest con IA",
    category: "Branding",
    sector: "Restaurantes & IA",
    description: "Identidad de marca para un producto de gestión de restaurantes con IA.",
    accent: "#FF7A1A",
    published: false,
  },
];

export const publishedProjects = proyectos.filter((p) => p.published);

export const getProject = (slug: string) =>
  proyectos.find((p) => p.slug === slug && p.published);

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
