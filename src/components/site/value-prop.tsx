import { AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { DifferentiatorsCarousel } from "@/components/site/differentiators-carousel";
import { pains } from "@/lib/content";

export function ValueProp() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          kicker="Por qué Dignita"
          title={
            <>
              Especialistas en <span className="text-gradient">operación</span>,
              no en discursos
            </>
          }
          description="Competimos en automatización operativa, control, trazabilidad y continuidad —incorporando IA y agentes con criterio de negocio."
        />

        {/* pains */}
        <Reveal className="mx-auto mt-10 max-w-3xl" delayIndex={1}>
          <div className="glass rounded-3xl p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground/80">
              <AlertTriangle className="size-4 text-primary" />
              Atacamos dolores concretos
            </div>
            <div className="flex flex-wrap gap-2">
              {pains.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs text-foreground/80"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* differentiators — carrusel */}
        <DifferentiatorsCarousel />
      </div>
    </section>
  );
}
