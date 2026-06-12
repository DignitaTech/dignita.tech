import { LogoCloud } from "@/components/ui/logo-cloud";
import { Reveal } from "@/components/ui/reveal";
import { clientLogos, techLogos } from "@/lib/content";

export function Logos() {
  return (
    <section className="px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 sm:gap-14">
        <div>
          <Reveal className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Marcas que confiaron en nuestro equipo
            </p>
          </Reveal>
          <Reveal delayIndex={1}>
            <LogoCloud logos={clientLogos} duration={36} />
          </Reveal>
        </div>
        <div>
          <Reveal className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Orquestamos las plataformas que tu operación ya usa
            </p>
          </Reveal>
          <Reveal delayIndex={1}>
            <LogoCloud logos={techLogos} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
