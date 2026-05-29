import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="proceso" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading
          kicker="Cómo trabajamos"
          title={
            <>
              Una secuencia comercial{" "}
              <span className="text-gradient">con lógica</span>
            </>
          }
          description="Entrar por el dolor operativo, priorizar bien, elegir el mecanismo correcto, ejecutar una mejora visible y sostenerla."
        />

        <ol className="relative mt-14 space-y-5 sm:space-y-6">
          {/* rail */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-from/50 via-foreground/15 to-transparent sm:left-[31px]"
          />
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.step} delayIndex={i} as="li">
                <div className="relative flex gap-4 sm:gap-5">
                  <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10 backdrop-blur sm:size-16">
                    <Icon className="size-6 sm:size-7" />
                  </div>
                  <div className="glass flex-1 rounded-3xl p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-primary">
                        {step.step}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-10" delayIndex={1}>
          <div className="glass-strong mx-auto max-w-2xl rounded-3xl p-6 text-center">
            <p className="text-sm text-muted-foreground">Oferta principal</p>
            <p className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
              Diagnóstico + Primera Solución Operativa
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
