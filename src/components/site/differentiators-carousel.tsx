"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import { differentiators } from "@/lib/content";
import { cn } from "@/lib/utils";

export function DifferentiatorsCarousel() {
  const autoplay = React.useRef(
    Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
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
    <div className="mt-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4">
          {differentiators.map((d, i) => (
            <div
              key={d.title}
              className="min-w-0 shrink-0 grow-0 basis-[80%] sm:basis-[46%] lg:basis-[33.333%]"
            >
              <div className="group glass relative h-full overflow-hidden rounded-3xl p-6 transition duration-300 hover:bg-white/85">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-gradient-to-br from-brand-from/25 to-brand-to/15 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
                    <Check className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {d.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="mt-7 flex items-center justify-center gap-4">
        <button
          aria-label="Anterior"
          onClick={() => emblaApi?.scrollPrev()}
          className="glass flex size-11 items-center justify-center rounded-full text-foreground transition hover:bg-white/85"
        >
          <ArrowLeft className="size-4" />
        </button>

        <div className="flex items-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir al diferenciador ${i + 1}`}
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

        <button
          aria-label="Siguiente"
          onClick={() => emblaApi?.scrollNext()}
          className="glass flex size-11 items-center justify-center rounded-full text-foreground transition hover:bg-white/85"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
