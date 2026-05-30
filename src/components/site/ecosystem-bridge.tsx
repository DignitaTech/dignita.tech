import Link from "next/link";
import { ArrowRight, LayoutGrid, Boxes, FolderGit2, Users } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const links = [
  { label: "Productos", href: "/productos", icon: LayoutGrid },
  { label: "Retail", href: "/retail", icon: Boxes },
  { label: "Proyectos", href: "/proyectos", icon: FolderGit2 },
  { label: "Equipo", href: "/equipo", icon: Users },
];

export function EcosystemBridge() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-5xl text-center">
        <Reveal>
          <Badge>Ecosistema Dignita</Badge>
        </Reveal>
        <Reveal delayIndex={1}>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Más que automatización
          </h2>
        </Reveal>
        <Reveal delayIndex={2}>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Construimos y operamos productos, marcas y soluciones. Explora todo lo que hace Dignita.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {links.map((l, i) => (
            <Reveal key={l.href} delayIndex={i % 4}>
              <Link
                href={l.href}
                className="group flex h-full flex-col items-center gap-3 rounded-3xl border border-foreground/10 bg-card/60 p-6 transition hover:border-foreground/20 hover:bg-white/85"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
                  <l.icon className="size-5" />
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium">
                  {l.label}
                  <ArrowRight className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
