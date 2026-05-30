import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { proyectos, casos } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Portafolio de branding y casos de éxito de Dignita.",
};

export default function ProyectosPage() {
  return (
    <PageShell
      kicker="Proyectos"
      title={<>Marcas y <span className="text-gradient">resultados reales</span></>}
      description="Branding con criterio y operaciones que cambiaron de verdad."
    >
      {/* casos de éxito */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {casos.map((c, i) => (
          <Reveal key={c.client} delayIndex={i}>
            <Link href={`/casos/${c.slug}`} className="block h-full">
              <div
                className="group relative h-full overflow-hidden rounded-3xl border border-foreground/10 bg-card/60 p-6 transition hover:border-foreground/20 hover:bg-white/85"
                style={{ boxShadow: c.accent ? `0 0 40px -25px ${c.accent}44` : undefined }}
              >
                <div
                  className="flex size-12 items-center justify-center rounded-2xl ring-1 ring-foreground/10"
                  style={c.accent ? { background: `${c.accent}20`, color: c.accent } : undefined}
                >
                  <TrendingUp className="size-6" />
                </div>
                <div
                  className="mt-5 text-3xl font-semibold"
                  style={c.accent ? { color: c.accent } : undefined}
                >
                  {c.metric}
                </div>
                <div className="mt-1 text-base font-medium">{c.client}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                  style={c.accent ? { color: c.accent } : { color: "var(--primary)" }}
                >
                  Ver caso
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* branding */}
      <div className="mt-16">
        <Reveal>
          <Badge>Branding</Badge>
        </Reveal>
        <Reveal delayIndex={1}>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Identidades que construimos
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((p, i) => {
            const card = (
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card/60 transition duration-300 hover:border-foreground/20">
                {p.cover ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/0 to-transparent" />
                  </div>
                ) : (
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100/50 via-white to-amber-50/40">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-brand-from/30 to-brand-to/10 blur-2xl"
                    />
                    <span className="px-4 text-center text-lg font-semibold text-foreground/40">
                      {p.title}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-medium uppercase tracking-widest text-primary">
                    {p.sector}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-4 pt-1">
                    {p.published ? (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Ver caso
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    ) : (
                      <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
                        Próximamente
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );

            return (
              <Reveal key={p.slug} delayIndex={i % 3} className="h-full">
                {p.published ? (
                  <Link href={`/proyectos/${p.slug}`} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
