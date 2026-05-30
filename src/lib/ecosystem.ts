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
  image?: string;
  logo?: string;
  brandbook?: string;
}

export const proyectos: Project[] = [
  {
    title: "Costa Rica Unlocked",
    category: "Branding",
    description: "Identidad de marca para agencia de viajes y tours.",
    status: "Listo",
    image: "/branding/costa-rica-unlocked/portada.png",
  },
  {
    title: "Kipi.cash",
    category: "Branding",
    description: "Identidad de marca para fintech.",
    status: "Listo",
    image: "/branding/kipi-cash/portada.png",
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
