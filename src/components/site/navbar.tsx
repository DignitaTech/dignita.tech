"use client";

import * as React from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Áreas", href: "#areas" },
  { label: "Casos", href: "#testimonios" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex w-[min(100%-1.5rem,72rem)] items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-5",
          scrolled ? "glass-strong h-14 shadow-lg shadow-black/20" : "h-14"
        )}
      >
        <a href="#top" className="flex items-center">
          <Image
            src="/logo-dignita.png"
            alt="Dignita"
            width={160}
            height={50}
            priority
            className="h-7 w-auto object-contain sm:h-8"
          />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#contacto">
            <Button variant="brand" size="sm">
              Agendar diagnóstico
            </Button>
          </a>
        </div>

        <button
          className="flex size-10 items-center justify-center rounded-full text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* mobile sheet */}
      <div
        className={cn(
          "mx-auto mt-2 w-[min(100%-1.5rem,72rem)] overflow-hidden transition-all duration-300 md:hidden",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        )}
      >
        <div className="glass-strong flex flex-col gap-1 rounded-3xl p-3 shadow-lg shadow-black/20">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm text-foreground/90 transition hover:bg-foreground/5"
            >
              {link.label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} className="mt-1">
            <Button variant="brand" className="w-full">
              Agendar diagnóstico
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
