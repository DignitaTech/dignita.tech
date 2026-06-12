"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { servicios, productos } from "@/lib/ecosystem";

/* ── mega-menu data ───────────────────────────────────────────── */
const megaMenus = {
  "/servicios": {
    label: "Servicios",
    items: servicios.filter((s) => s.slug).map((s) => ({
      title: s.title,
      description: s.description,
      href: `/servicios/${s.slug}`,
      icon: s.icon,
    })),
    cta: { label: "Ver todos los servicios", href: "/servicios" },
  },
  "/productos": {
    label: "Productos",
    items: productos.filter((p) => p.slug).map((p) => ({
      title: p.title,
      description: p.description,
      href: `/productos/${p.slug}`,
      icon: p.icon,
    })),
    cta: { label: "Ver todos los productos", href: "/productos" },
  },
} as const;

const simpleLinks = [
  { label: "Proyectos", href: "/proyectos" },
  { label: "Equipo", href: "/equipo" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/dignita.tech/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dignita.tech/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/dignita.tech",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@dignitatech-tech",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

/* ── dropdown ─────────────────────────────────────────────────── */
function MegaMenu({
  menu,
  open,
}: {
  menu: (typeof megaMenus)[keyof typeof megaMenus];
  open: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-full z-50 mt-3 w-[min(96vw,560px)] -translate-x-1/2"
        >
          <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-white shadow-xl shadow-black/8 backdrop-blur-md">
            <div className="grid grid-cols-2 gap-0 p-2">
              {menu.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-3 rounded-xl p-3.5 transition hover:bg-foreground/[0.04]"
                  >
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-from/15 to-brand-to/8 text-primary transition group-hover:from-brand-from/25">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-semibold text-foreground">
                        {item.title}
                      </div>
                      <div className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-foreground/8 px-4 py-2.5">
              <Link
                href={menu.cta.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:gap-2"
              >
                {menu.cta.label}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── main nav ─────────────────────────────────────────────────── */
export function SiteNav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close mobile on route change
  React.useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const toggleMenu = (key: string) =>
    setOpenMenu((v) => (v === key ? null : key));

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      {/* ── desktop bar ── */}
      <nav
        className={cn(
          "mx-auto flex w-[min(100%-1.5rem,72rem)] items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-5",
          scrolled ? "glass-strong h-14 shadow-lg shadow-black/10" : "h-14"
        )}
      >
        {/* logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo-dignita.png"
            alt="Dignita"
            width={160}
            height={50}
            priority
            className="h-7 w-auto object-contain sm:h-8"
          />
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* mega-menu triggers */}
          {Object.entries(megaMenus).map(([key, menu]) => (
            <div key={key} className="relative">
              <button
                onClick={() => toggleMenu(key)}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition",
                  openMenu === key
                    ? "bg-foreground/8 text-foreground"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                {menu.label}
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    openMenu === key && "rotate-180"
                  )}
                />
              </button>
              <MegaMenu menu={menu} open={openMenu === key} />
            </div>
          ))}

          {/* simple links */}
          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm transition",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* social + CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          {socialLinks.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
            >
              {s.icon}
            </a>
          ))}
          <div className="mx-1 h-4 w-px bg-foreground/10" />
          <Link href="/contacto">
            <Button variant="brand" size="sm">
              Agendar diagnóstico
            </Button>
          </Link>
        </div>

        {/* mobile hamburger */}
        <button
          className="flex size-10 items-center justify-center rounded-full text-foreground lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* ── mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 w-[min(100%-1.5rem,72rem)] lg:hidden"
          >
            <div className="glass-strong flex flex-col gap-0.5 rounded-3xl p-2 shadow-lg shadow-black/10">
              {/* mega items mobile */}
              {Object.entries(megaMenus).map(([key, menu]) => (
                <div key={key}>
                  <button
                    onClick={() =>
                      setMobileExpanded((v) => (v === key ? null : key))
                    }
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-foreground/90 transition hover:bg-foreground/5"
                  >
                    {menu.label}
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground transition-transform duration-200",
                        mobileExpanded === key && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mx-2 mb-1 space-y-0.5 rounded-2xl bg-foreground/[0.03] p-2">
                          {menu.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/60"
                              >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-from/20 to-brand-to/10 text-primary">
                                  <Icon className="size-4" />
                                </div>
                                <span className="text-sm text-foreground/80">
                                  {item.title}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* simple links */}
              {simpleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-foreground/90 transition hover:bg-foreground/5"
                >
                  {link.label}
                </Link>
              ))}

              {/* social icons */}
              <div className="flex items-center justify-center gap-3 px-4 py-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="px-1 pb-1">
                <Link href="/contacto" onClick={() => setMobileOpen(false)}>
                  <Button variant="brand" className="w-full">
                    Agendar diagnóstico
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
