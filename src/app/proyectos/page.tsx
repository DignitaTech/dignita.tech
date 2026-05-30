import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
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
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((p, i) => (
            <Reveal key={p.title} delayIndex={i % 3}>
              <article className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-orange-100/50 via-white to-amber-50/40 p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-brand-from/30 to-brand-to/10 blur-2xl"
                />
                <span className="text-xs font-medium uppercase tracking-widest text-primary">
                  {p.category}
                </span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                {p.status ? (
                  <span className="mt-3 w-fit rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
                    {p.status}
                  </span>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
