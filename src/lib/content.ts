import {
  Search,
  Workflow,
  FileScan,
  Bot,
  LifeBuoy,
  Activity,
  Network,
  Clock,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  id: string;
  index: string;
  title: string;
  short: string;
  pitch: string;
  bullets: string[];
  duration: string;
  pricing: string;
  icon: LucideIcon;
}

export interface ServiceGroup {
  id: string;
  kicker: string;
  title: string;
  description: string;
  services: Service[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: "diagnostico",
    kicker: "01 · Diagnóstico y priorización",
    title: "Saber dónde intervenir antes de invertir",
    description:
      "El punto de entrada: ordenar oportunidades y decidir el mecanismo correcto —reglas, IA aplicada o agentes— antes de construir nada.",
    services: [
      {
        id: "diagnostico-eficiencia",
        index: "01",
        title: "Diagnóstico de Eficiencia, Automatización e IA Aplicada",
        short: "Dónde la operación pierde tiempo, control y capacidad.",
        pitch:
          "Identificamos qué procesos intervenir primero y con qué enfoque, con criterio operativo y de negocio.",
        bullets: [
          "Levantamiento de procesos priorizados",
          "Matriz de oportunidades por mecanismo de solución",
          "Quick wins y roadmap inicial",
          "Caso base de impacto",
        ],
        duration: "2 a 4 semanas",
        pricing: "Proyecto de alcance cerrado",
        icon: Search,
      },
    ],
  },
  {
    id: "implementacion",
    kicker: "02 · Implementación de soluciones",
    title: "Convertir lo manual en flujos controlados",
    description:
      "El núcleo de ejecución: automatización operativa, documental y soluciones con IA o agentes, según la naturaleza del caso.",
    services: [
      {
        id: "automatizacion-operativa",
        index: "02",
        title: "Implementación de Automatización Operativa",
        short: "Tareas repetitivas convertidas en flujos trazables.",
        pitch:
          "Diseñamos, construimos y ponemos en marcha automatizaciones estandarizadas con menor intervención manual.",
        bullets: [
          "Ingreso, validación y cruce de datos entre sistemas",
          "Procesamiento de correos y bandejas",
          "Matriz de reglas y excepciones",
          "Pase a producción + guía operativa",
        ],
        duration: "3 a 8 semanas",
        pricing: "Proyecto de alcance cerrado",
        icon: Workflow,
      },
      {
        id: "automatizacion-documental",
        index: "03",
        title: "Automatización Documental e Inteligencia de Datos",
        short: "De documentos no estructurados a datos utilizables.",
        pitch:
          "Recibimos, clasificamos, extraemos, validamos y enrutamos información desde correos, PDFs, formularios y adjuntos.",
        bullets: [
          "Clasificación y extracción de campos",
          "Validación contra reglas de negocio",
          "Derivación a revisión humana en excepciones",
          "Trazabilidad de punta a punta",
        ],
        duration: "4 a 10 semanas",
        pricing: "Proyecto de alcance cerrado",
        icon: FileScan,
      },
      {
        id: "ia-agentes",
        index: "04",
        title: "Soluciones de IA Aplicada y Agentes Operativos",
        short: "Para casos con variabilidad o decisión acotada.",
        pitch:
          "Incorporamos IA y agentes cuando el caso supera lo que conviene resolver solo con reglas —sin perder control.",
        bullets: [
          "Clasificación, resumen, redacción y priorización con IA",
          "Agentes con herramientas autorizadas",
          "Guardrails y escalamiento humano",
          "Salida productiva controlada",
        ],
        duration: "4 a 10 semanas",
        pricing: "Proyecto de alcance cerrado",
        icon: Bot,
      },
    ],
  },
  {
    id: "continuidad",
    kicker: "03 · Continuidad y control",
    title: "Que la solución siga generando valor",
    description:
      "Una solución genera valor si sigue funcionando, se ajusta cuando el contexto cambia y no se vuelve un punto ciego.",
    services: [
      {
        id: "soporte-evolutivo",
        index: "05",
        title: "Soporte Evolutivo de Automatizaciones, IA y Agentes",
        short: "Continuidad operativa, no una bolsa de horas.",
        pitch:
          "Sostenemos lo implementado: incidencias, ajustes controlados y mejoras evolutivas según el plan contratado.",
        bullets: [
          "Gestión de incidencias y corrección de fallas",
          "Ajustes por cambios controlados",
          "Reporte periódico de estado",
          "Backlog de mejoras evolutivas",
        ],
        duration: "Servicio recurrente mensual",
        pricing: "Fee mensual recurrente",
        icon: LifeBuoy,
      },
      {
        id: "observabilidad",
        index: "06",
        title: "Observabilidad y Control de Automatizaciones y Agentes",
        short: "Visibilidad sobre desempeño y riesgo.",
        pitch:
          "Monitoreo, trazabilidad, alertas e indicadores para detectar fallas, seguir casos y mejorar la gestión.",
        bullets: [
          "Tableros de seguimiento operativo",
          "Indicadores de volumen, tiempos y errores",
          "Esquema de alertas",
          "Trazabilidad por caso o ejecución",
        ],
        duration: "3 a 6 semanas",
        pricing: "Proyecto de alcance cerrado",
        icon: Activity,
      },
    ],
  },
  {
    id: "gobierno",
    kicker: "04 · Escalamiento y gobierno",
    title: "Crecer con consistencia y control",
    description:
      "El marco que permite automatizar e incorporar IA y agentes con criterios comunes y capacidad de escala.",
    services: [
      {
        id: "arquitectura-gobierno",
        index: "07",
        title: "Arquitectura, Gobierno y Estándares",
        short: "La base común para diseñar, operar y escalar.",
        pitch:
          "Definimos principios, lineamientos y estándares para soluciones consistentes, seguras y trazables.",
        bullets: [
          "Principios y criterios de diseño",
          "Estándares de desarrollo y documentación",
          "Manejo de errores y excepciones",
          "Bases de gobierno para IA y agentes",
        ],
        duration: "3 a 8 semanas",
        pricing: "Proyecto de alcance cerrado",
        icon: Network,
      },
    ],
  },
];

export const differentiators = [
  {
    title: "Foco operativo",
    description:
      "No vendemos transformación genérica. Intervenimos procesos reales de back office, finanzas y soporte.",
  },
  {
    title: "Intervención con criterio",
    description:
      "Elegimos el mecanismo correcto para cada caso: reglas, IA aplicada o agentes. Nunca al revés.",
  },
  {
    title: "Ejecución + control",
    description:
      "Unimos construir la solución con dejarla trazable, observable y sostenible en el tiempo.",
  },
  {
    title: "Lenguaje de negocio",
    description:
      "Hablamos de tiempo, capacidad y trazabilidad —no de bots ni de palabras de moda.",
  },
  {
    title: "IA con sobriedad",
    description:
      "Incorporamos IA y agentes solo donde aportan valor real, con guardrails y control humano.",
  },
  {
    title: "Escala con estructura",
    description:
      "Arquitectura y estándares para que automatizar deje de generar soluciones aisladas y frágiles.",
  },
];

export const pains = [
  "Carga manual excesiva",
  "Errores y retrabajo",
  "Lentitud operativa",
  "Falta de trazabilidad",
  "Dificultad para escalar",
  "Automatizaciones sin control",
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Abrimos la conversación, ordenamos oportunidades y definimos el mecanismo correcto.",
    icon: Search,
  },
  {
    step: "02",
    title: "Primera solución",
    description:
      "Ejecutamos una mejora visible y defendible: operativa, documental o con IA/agentes.",
    icon: Workflow,
  },
  {
    step: "03",
    title: "Soporte evolutivo",
    description:
      "Sostenemos la solución en operación y la ajustamos cuando el contexto cambia.",
    icon: LifeBuoy,
  },
  {
    step: "04",
    title: "Observabilidad",
    description:
      "Damos visibilidad sobre desempeño y riesgo para seguir casos y detectar fallas.",
    icon: Activity,
  },
  {
    step: "05",
    title: "Arquitectura y gobierno",
    description:
      "Estandarizamos para escalar con consistencia, seguridad y control.",
    icon: Network,
  },
];

export interface AreaCard {
  title: string;
  description: string;
  image: string;
}

export const areas: AreaCard[] = [
  {
    title: "Finanzas y tesorería",
    description: "Conciliaciones, cuentas por pagar y cierres con menos retrabajo.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cuentas por pagar",
    description: "Captura de facturas y validación documental de punta a punta.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Back office y soporte",
    description: "Tareas repetitivas convertidas en flujos trazables y estables.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Compras y abastecimiento",
    description: "Órdenes, validaciones y seguimiento de casos sin planillas.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Servicios compartidos",
    description: "Procesos de alto volumen con control y trazabilidad por caso.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Operaciones administrativas",
    description: "Documentos no estructurados convertidos en datos utilizables.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  },
];

export const stats = [
  { value: "−70%", label: "carga manual en procesos intervenidos", icon: Clock },
  { value: "7", label: "líneas de servicio, una sola lógica", icon: Workflow },
  { value: "100%", label: "trazabilidad por caso y ejecución", icon: Activity },
];

export interface BrandLogo {
  src: string;
  alt: string;
}

export const clientLogos: BrandLogo[] = [
  { src: "/clientes/bbva.png", alt: "BBVA" },
  { src: "/clientes/bcp.png", alt: "BCP" },
  { src: "/clientes/verisure.png", alt: "Verisure" },
  { src: "/clientes/niubiz.png", alt: "Niubiz" },
  { src: "/clientes/tambo.png", alt: "Tambo" },
  { src: "/clientes/hayduk.png", alt: "Hayduk" },
  { src: "/clientes/promperu.png", alt: "PromPerú" },
  { src: "/clientes/rocketbot.png", alt: "Rocketbot" },
];

export const techLogos: BrandLogo[] = [
  { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase",
  },
  { src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel" },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub",
  },
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "NVIDIA",
  },
];
