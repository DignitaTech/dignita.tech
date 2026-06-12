"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Mail, MapPin, ArrowUpRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
      { label: "Automatización e IA", href: "/" },
      { label: "Soporte TI / RPA", href: "/servicios" },
      { label: "Desarrollo web", href: "/servicios" },
      { label: "Branding", href: "/servicios" },
    ],
  },
  {
    title: "Ecosistema",
    links: [
      { label: "Productos", href: "/productos" },
      { label: "Retail", href: "/retail" },
      { label: "Herramientas", href: "/herramientas" },
    ],
  },
  {
    title: "Firma",
    links: [
      { label: "Proyectos", href: "/proyectos" },
      { label: "Equipo", href: "/equipo" },
      { label: "Contacto", href: "/contacto" },
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
              href="https://www.linkedin.com/company/dignita.tech/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="glass flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href="https://www.instagram.com/dignita.tech/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="glass flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href="https://www.facebook.com/dignita.tech"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="glass flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href="https://www.youtube.com/@dignitatech-tech"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="glass flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
            >
              <YoutubeIcon className="size-4" />
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
