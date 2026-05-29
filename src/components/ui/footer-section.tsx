"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Mail, MapPin, ArrowUpRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  brand?: string;
  tagline?: string;
  columns?: FooterColumn[];
  email?: string;
  location?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    title: "Servicios",
    links: [
      { label: "Diagnóstico", href: "#servicios" },
      { label: "Automatización operativa", href: "#servicios" },
      { label: "Automatización documental", href: "#servicios" },
      { label: "IA aplicada y agentes", href: "#servicios" },
    ],
  },
  {
    title: "Continuidad",
    links: [
      { label: "Soporte evolutivo", href: "#servicios" },
      { label: "Observabilidad", href: "#servicios" },
      { label: "Arquitectura y gobierno", href: "#servicios" },
    ],
  },
  {
    title: "Firma",
    links: [
      { label: "Cómo trabajamos", href: "#proceso" },
      { label: "Casos", href: "#testimonios" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
];

export function Footer({
  brand = "Dignita",
  tagline = "Menos carga manual. Más control operativo.",
  columns = defaultColumns,
  email = "leonidas.yauri@dignita.tech",
  location = "Nuevo Chimbote, Perú",
}: FooterProps) {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-foreground/10 bg-background"
    >
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[820px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.75_0.19_55/0.22),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* brand + newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#top" className="flex items-center">
              <Image
                src="/logo-dignita.png"
                alt={brand}
                width={210}
                height={66}
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {tagline}
            </p>

            <form
              className="glass mt-7 flex max-w-md items-center gap-2 rounded-full p-1.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="tu@empresa.com"
                aria-label="Correo electrónico"
                className="h-10 flex-1 rounded-full bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-r from-brand-from via-brand-via to-brand-to px-4 text-sm font-medium text-primary-foreground transition hover:brightness-110"
              >
                Agendar <Send className="size-4" />
              </button>
            </form>

            <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 transition hover:text-foreground"
              >
                <Mail className="size-4 text-primary" /> {email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> {location}
              </span>
            </div>
          </motion.div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col, ci) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 * ci,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
                      >
                        {link.label}
                        <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* giant animated wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative mt-16 select-none"
        >
          <div
            className={cn(
              "bg-clip-text text-center text-[22vw] font-bold leading-none tracking-tighter text-transparent",
              "bg-gradient-to-b from-foreground/10 to-foreground/0"
            )}
          >
            DIGNITA
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {brand}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="glass flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href={`mailto:${email}`}
              aria-label="Email"
              className="glass flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
