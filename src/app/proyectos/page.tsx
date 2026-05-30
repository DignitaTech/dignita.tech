import type { Metadata } from "next";
import Image from "next/image";
import { TrendingUp, FileText } from "lucide-react";
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
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-brand-from/10 via-card/60 to-brand-to/10 p-6">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
                <TrendingUp className="size-6" />
              </div>
              <div className="mt-5 text-3xl font-semibold text-gradient">{c.metric}</div>
              <div className="mt-1 text-base font-medium">{c.client}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            </div>
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
          {proyectos.map((p, i) => (
            <Reveal key={p.title} delayIndex={i % 3} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card/60 transition duration-300 hover:border-foreground/20">
                {p.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/0 to-transparent" />
                    {p.logo ? (
                      <div className="absolute left-4 top-4 flex h-10 items-center rounded-xl bg-white/85 px-3 ring-1 ring-foreground/10 backdrop-blur">
                        <Image
                          src={p.logo}
                          alt={`Logo ${p.title}`}
                          width={88}
                          height={28}
                          className="h-6 w-auto object-contain"
                        />
                      </div>
                    ) : null}
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
                    {p.category}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3 pt-1">
                    {p.brandbook ? (
                      <a
                        href={p.brandbook}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        <FileText className="size-4" /> Ver brandbook
                      </a>
                    ) : p.status ? (
                      <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
                        {p.status}
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
