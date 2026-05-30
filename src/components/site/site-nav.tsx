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
          <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-white/95 shadow-xl shadow-black/8 backdrop-blur-md">
            <div className="grid grid-cols-2 gap-px bg-foreground/5 p-1">
              {menu.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-3 rounded-xl bg-white p-3.5 transition hover:bg-orange-50/60"
                  >
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-from/20 to-brand-to/10 text-primary ring-1 ring-foreground/8 transition group-hover:from-brand-from/30">
                      <Icon className="size-4.5" />
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
            <div className="border-t border-foreground/8 bg-foreground/[0.02] px-4 py-2.5">
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

        {/* CTA */}
        <div className="hidden lg:block">
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

              {/* CTA */}
              <div className="mt-1 px-1 pb-1">
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
