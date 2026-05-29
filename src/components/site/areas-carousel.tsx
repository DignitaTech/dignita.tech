"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { areas } from "@/lib/content";
import { cn } from "@/lib/utils";

export function AreasCarousel() {
  const autoplay = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [autoplay.current]
  );
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section id="areas" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            kicker="Dónde intervenimos"
            title={
              <>
                Áreas con alto volumen{" "}
                <span className="text-gradient">manual y poca trazabilidad</span>
              </>
            }
            description="Empresas medianas, operaciones administrativas y de soporte con alto volumen transaccional y documental."
            className="max-w-2xl"
          />
          <div className="flex gap-2">
            <button
              aria-label="Anterior"
              onClick={() => emblaApi?.scrollPrev()}
              className="glass flex size-11 items-center justify-center rounded-full text-foreground transition hover:bg-foreground/10"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              aria-label="Siguiente"
              onClick={() => emblaApi?.scrollNext()}
              className="glass flex size-11 items-center justify-center rounded-full text-foreground transition hover:bg-foreground/10"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <Reveal className="mt-10" delayIndex={1}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y gap-4">
              {areas.map((area) => (
                <div
                  key={area.title}
                  className="min-w-0 shrink-0 grow-0 basis-[82%] sm:basis-[46%] lg:basis-[31.5%]"
                >
                  <article className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-foreground/10">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 32vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/0" />
                    <div className="absolute inset-x-3 bottom-3">
                      <div className="glass-strong rounded-2xl p-4">
                        <h3 className="text-base font-semibold tracking-tight">
                          {area.title}
                        </h3>
                        <p className="mt-1 text-sm leading-snug text-foreground/70">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* dots */}
        <div className="mt-6 flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir al slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                selected === i
                  ? "w-7 bg-gradient-to-r from-brand-from to-brand-to"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
