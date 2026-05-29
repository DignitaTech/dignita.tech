import { ArrowRight, CalendarCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-foreground/10 p-8 text-center sm:p-14">
            {/* glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.75_0.19_55/0.25),transparent_60%)]"
            />
            <div className="glass-strong absolute inset-0 -z-10" />

            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/30 to-brand-to/20 text-primary ring-1 ring-foreground/10">
              <CalendarCheck className="size-7" />
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Identifiquemos dónde recuperar{" "}
              <span className="text-gradient">tiempo y control</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Empezamos con un diagnóstico de alcance cerrado: menor riesgo de
              inversión y el mecanismo correcto para cada caso.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#contacto" className="w-full sm:w-auto">
                <Button variant="brand" size="lg" className="w-full sm:w-auto">
                  Agendar diagnóstico
                  <ArrowRight className="size-4" />
                </Button>
              </a>
              <a href="#servicios" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explorar el portafolio
                </Button>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
