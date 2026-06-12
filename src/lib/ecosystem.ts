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
  /** campos de la landing de detalle (servicios y productos) */
  slug?: string;
  summary?: string;
  problem?: string;
  deliverables?: string[];
  process?: ProcessStep[];
  primaryCta?: ServiceCta;
  secondaryCta?: ServiceCta;
  /** slugs de proyectos relacionados (para la sección Trabajos relacionados) */
  relatedProjects?: string[];
  /** solo productos */
  sector?: string;
  accent?: string;
  screenshots?: CaseStudyImage[];
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
      "Cuando un equipo, una red o un servicio se cae, cada minuto cuesta. Sin un soporte que responda con velocidad y criterio, los problemas pequeños se convierten en paros grandes, pérdida de datos y equipos bloqueados que no pueden trabajar.",
    deliverables: [
      "Mesa de ayuda (help desk) para usuarios",
      "Soporte y monitoreo de infraestructura",
      "Gestión de incidentes con SLA definido",
      "Mantenimiento preventivo de equipos y redes",
      "Gestión de accesos y licencias",
      "Respaldo y continuidad del negocio",
    ],
    process: [
      { title: "Diagnóstico", description: "Auditamos tu infraestructura actual y definimos los niveles de soporte que necesitas." },
      { title: "Implementación", description: "Configuramos la mesa de ayuda, herramientas de monitoreo y flujos de escalamiento." },
      { title: "Operación continua", description: "Mesa de ayuda activa con SLA comprometidos y atención proactiva de incidentes." },
      { title: "Mejora y reporte", description: "Análisis mensual de incidentes, tendencias y optimizaciones preventivas." },
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
      "Un bot que se rompe en silencio es peor que no tener bot: el proceso falla sin que nadie lo note y el error se acumula. Las automatizaciones necesitan quien las cuide, las actualice y responda cuando algo cambia en los sistemas que integran.",
    deliverables: [
      "Monitoreo de bots y flujos en producción",
      "Corrección ante cambios de sistemas o interfaces",
      "Optimización y nuevas reglas de negocio",
      "Alertas y reportes de ejecución",
      "SLA de respuesta ante incidentes",
      "Documentación actualizada de cada automatización",
    ],
    process: [
      { title: "Inventario", description: "Levantamos todos los bots y flujos activos, su estado y su criticidad para el negocio." },
      { title: "Monitoreo activo", description: "Instalamos alertas y supervisión en tiempo real para detectar fallos antes de que impacten." },
      { title: "Respuesta ante incidentes", description: "Atendemos roturas y errores con tiempos de respuesta según SLA acordado." },
      { title: "Mantenimiento preventivo", description: "Actualizamos reglas de negocio y adaptamos bots ante cambios en sistemas o interfaces." },
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
      "Una web lenta, vieja o que no convierte es plata que se va. Hoy el sitio es el primer vendedor de tu marca, trabaja 24/7 y es la primera impresión ante clientes, socios e inversores. Tener presencia digital no es suficiente: necesitas que funcione.",
    deliverables: [
      "Sitios y landing pages de alto rendimiento",
      "Aplicaciones web y plataformas a medida",
      "Integraciones (pagos, CRM, automatización)",
      "SEO técnico y Core Web Vitals",
      "Diseño UX/UI orientado a conversión",
      "Hosting, dominio y mantenimiento",
    ],
    process: [
      { title: "Descubrimiento", description: "Entendemos negocio, audiencia y objetivos de conversión antes de escribir una línea." },
      { title: "Diseño", description: "Estructura, UX y dirección visual alineadas a la marca y al objetivo del sitio." },
      { title: "Desarrollo", description: "Construcción rápida, accesible y optimizada en tecnología moderna." },
      { title: "Lanzamiento", description: "Publicación, configuración de analíticas y mejora continua post-lanzamiento." },
    ],
    relatedProjects: ["mahescorp", "costa-rica-unlocked"],
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
      "Una marca sin sistema se ve distinta en cada lugar y no genera recuerdo. Una identidad improvisada diluye la confianza, confunde al cliente y obliga a rediseñar una y otra vez. La identidad no es un logo: es coherencia con intención.",
    deliverables: [
      "Estrategia y posicionamiento de marca",
      "Naming",
      "Logotipo y sistema visual",
      "Paleta, tipografía y aplicaciones",
      "Manual de marca (brandbook)",
      "Versiones adaptadas para digital, impreso y señalética",
    ],
    process: [
      { title: "Estrategia", description: "Definimos posicionamiento, audiencia objetivo y atributos de marca que la diferencian." },
      { title: "Concepto", description: "Exploramos direcciones visuales y seleccionamos la que mejor representa la marca." },
      { title: "Sistema", description: "Desarrollamos logotipo, paleta, tipografía y las aplicaciones clave de la identidad." },
      { title: "Entrega", description: "Manual de marca completo y archivos listos para usar en todos los formatos y contextos." },
    ],
    relatedProjects: ["costa-rica-unlocked"],
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
    slug: "mirestconia",
    title: "Mirestconia",
    description: "Plataforma SaaS para gestión de restaurantes con IA.",
    href: "https://mirestconia.com",
    external: true,
    icon: LayoutGrid,
    status: "Activo",
    sector: "Restaurantes · SaaS",
    accent: "#F25C1F",
    summary:
      "Gestiona tu restaurante con tecnología: mesas, cocina, facturación y más, desde una interfaz moderna, rápida y fácil de usar.",
    problem:
      "Operar un restaurante con cuadernos, WhatsApp y hojas sueltas hace que se pierdan pedidos, se descuadre la caja y nadie sepa qué se vende de verdad.",
    deliverables: [
      "Gestión de mesas y salón en tiempo real",
      "Comandas a cocina sin papel",
      "Facturación y control de caja",
      "Reportes de ventas y productos",
      "Pensado para restaurantes del Perú",
    ],
    primaryCta: { label: "Ir a Mirestconia", href: "https://mirestconia.com", external: true },
    secondaryCta: { label: "Quiero algo así", href: "/contacto" },
    screenshots: [
      {
        src: "/productos/mirestconia/hero.jpg",
        alt: "Panel de Mirestconia: mesas activas, cocina, ventas del día y clientes",
        wide: true,
      },
    ],
  },
  {
    slug: "nivela-tu-academy",
    title: "Nivela tu Academy",
    description: "Plataforma SaaS para academias y formación online.",
    href: "https://nivelatuacademy.com",
    external: true,
    icon: GraduationCap,
    status: "Activo",
    sector: "Educación · SaaS",
    accent: "#0E9F6E",
    summary:
      "La plataforma para que academias y formadores vendan, gestionen y dicten sus cursos online en un solo lugar.",
    problem:
      "Las academias pierden tiempo y alumnos cuando los cursos, los pagos y el seguimiento viven en herramientas separadas que no se hablan entre sí.",
    deliverables: [
      "Catálogo y venta de cursos online",
      "Gestión de alumnos y matrículas",
      "Pagos y suscripciones",
      "Contenido, clases y evaluaciones",
      "Reportes de avance y retención",
    ],
    primaryCta: { label: "Conocer Nivela", href: "https://nivelatuacademy.com", external: true },
    secondaryCta: { label: "Quiero una plataforma así", href: "/contacto" },
  },
  {
    slug: "orion-erp",
    title: "Orion ERP",
    description: "ERP modular para operaciones administrativas y financieras.",
    href: "https://orion-rp.com",
    external: true,
    icon: Database,
    status: "Próximamente",
    sector: "ERP · SaaS",
    accent: "#4F46E5",
    summary:
      "Un ERP modular que ordena la operación administrativa y financiera de tu empresa en un solo sistema.",
    problem:
      "Cuando inventario, compras, ventas y contabilidad viven en archivos distintos, la información nunca cuadra y las decisiones llegan tarde.",
    deliverables: [
      "Módulos de compras, ventas e inventario",
      "Administración y finanzas",
      "Reportería y tableros de control",
      "Multi-empresa y multi-usuario",
      "Modular: activas solo lo que necesitas",
    ],
    primaryCta: { label: "Quiero Orion", href: "/contacto" },
  },
];

export const getProduct = (slug: string) =>
  productos.find((p) => p.slug === slug);

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
    description: "Calculadora de ROI para IA y automatización. Genera tu propuesta comercial con proyección mes 1 al año 5.",
    href: "https://genera.dignita.tech",
    external: true,
    status: "Activo",
    icon: Sparkles,
    cta: "Calcular ROI",
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
    liveUrl: "https://costaricaunlocked.com",
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
    slug: "mahescorp",
    title: "Mahescorp",
    category: "Desarrollo web",
    sector: "Educación & B2B",
    year: "2024",
    description: "Academia digital a medida para empresa B2B.",
    accent: "#1A6B8A",
    published: true,
    liveUrl: "https://mahescorp.com",
    summary:
      "Academia digital construida a medida para Mahescorp — la plataforma que luego evolucionó en el producto Nivela Tu Academy.",
    challenge:
      "Mahescorp necesitaba digitalizar su formación sin depender de herramientas genéricas que no reflejaban su marca ni se adaptaban a su modelo B2B de clientes corporativos.",
    approach:
      "Diseñamos y desarrollamos una plataforma de academia digital completa: catálogo de cursos, gestión de alumnos, pagos y contenido con su propia identidad. La solidez de la solución fue la semilla del producto Nivela Tu Academy.",
    result:
      "Academia operativa con identidad propia, gestión autónoma y una base tecnológica que hoy impulsa Nivela Tu Academy como producto SaaS.",
    services: ["Desarrollo web", "Plataforma digital", "UX/UI"],
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

export interface KPI {
  value: string;
  label: string;
  sub?: string;
}

export interface Activity {
  title: string;
  description: string;
}

export interface SuccessCase {
  slug: string;
  client: string;
  sector: string;
  metric: string;
  description: string;
  accent?: string;
  cover?: string;
  year?: string;
  summary?: string;
  challenge?: string;
  approach?: string;
  result?: string;
  kpis?: KPI[];
  activities?: Activity[];
  socialUrl?: string;
  socialLabel?: string;
  highlights?: string[];
  gallery?: CaseStudyImage[];
}

export const casos: SuccessCase[] = [
  {
    slug: "operadores-de-world",
    client: "Operadores de World",
    sector: "Telecomunicaciones · Perú",
    year: "2023–2024",
    metric: "+16 locales",
    accent: "#7C3AED",
    cover: "/casos/operadores-de-world/orbe.jpg",
    description: "Operación digitalizada y soportada en más de 16 locales a nivel nacional.",
    summary:
      "Dignita fue el equipo detrás del crecimiento de uno de los operadores de World más activos del Perú — 16 puntos aperturados, más de 100 mil usuarios registrados y el reconocimiento como el operador con más registros a nivel nacional, en repetidas ocasiones.",
    challenge:
      "World necesitaba un operador que no solo vendiera, sino que construyera comunidad, presencia digital y volumen de registros sostenido. El reto era operar en múltiples frentes simultáneamente: apertura de puntos, activaciones en campo, contenido digital y gestión de resultados.",
    approach:
      "Ejecutamos una operación 360 con más de 90 trabajadores gestionados directamente: apertura de 16 puntos de venta en 7+ departamentos (Arequipa, Trujillo, Chiclayo, Piura, Chimbote, Nuevo Chimbote y más), activaciones BTL en campo, producción de contenido bajo la marca Crypnita, y campañas de publicidad digital que alcanzaron a más de 30 millones de personas en Perú.",
    result:
      "En un año nos posicionamos como el operador de World con más registros a nivel nacional — en decenas de ocasiones. 100 mil usuarios registrados, 16 locales operativos en 7 departamentos, 90+ trabajadores y más de 30 millones de usuarios impactados con publicidad.",
    kpis: [
      { value: "1 año", label: "Como operador oficial", sub: "2023–2024" },
      { value: "16+", label: "Puntos aperturados", sub: "a nivel nacional" },
      { value: "+100K", label: "Usuarios registrados", sub: "en Perú" },
      { value: "+30M", label: "Usuarios alcanzados", sub: "con publicidad digital" },
      { value: "90+", label: "Trabajadores gestionados", sub: "equipo propio" },
      { value: "7+", label: "Departamentos", sub: "Arequipa, Trujillo, Chiclayo, Piura, Chimbote y más" },
    ],
    activities: [
      { title: "Activaciones en campo", description: "Operativos BTL en puntos estratégicos para captar usuarios presencialmente." },
      { title: "Producción de video", description: "Contenido audiovisual de marca para redes sociales y campañas digitales." },
      { title: "Gestión de posts", description: "Estrategia y publicación de contenido orgánico en redes sociales." },
      { title: "Publicidad digital", description: "Campañas pagadas que alcanzaron más de 30 millones de usuarios en Perú." },
      { title: "BTL y eventos", description: "Activaciones below-the-line en zonas de alto tráfico y eventos masivos." },
      { title: "Gestión de puntos", description: "Apertura, operación y soporte de 16 locales simultáneamente." },
    ],
    highlights: [
      "Operador de World con más registros a nivel nacional — en decenas de ocasiones",
      "Único operador con presencia simultánea en 7+ departamentos del Perú",
      "Más de 90 trabajadores gestionados directamente",
      "Más de 30 millones de personas alcanzadas con publicidad digital",
      "Alianzas en Piura, Chiclayo, Ferreñafe, Trujillo, Chimbote, Nuevo Chimbote, Huaraz, Lima y Arequipa",
    ],
    socialUrl: "https://www.instagram.com/crypnita.pe/",
    socialLabel: "@crypnita.pe",
    gallery: [
      {
        src: "/casos/operadores-de-world/punto.jpg",
        alt: "Punto de registro Worldcoin operado por Dignita",
        wide: false,
      },
    ],
  },
];

export const getCaso = (slug: string) => casos.find((c) => c.slug === slug);

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  photo?: string;
  linkedin?: string;
}

export const equipo: TeamMember[] = [
  {
    name: "Leonidas Yauri",
    role: "CEO · Consultor Senior en Product Design & Dev Full Stack, Marketing Strategy",
    initials: "LY",
    photo: "/equipo/leonidas-yauri.webp",
  },
  { name: "Alexander Castañeda", role: "Co-fundador", initials: "AC" },
];
