"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Badge } from "@/components/ui/badge";

export function ShowcaseScroll() {
  return (
    <section id="observabilidad" className="relative">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-4 px-5">
            <Badge>Caso de éxito · Verisure</Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              De la operación manual al
              <br />
              <span className="text-gradient">control operativo real</span>
            </h2>
            <p className="max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
              Así se ve, en la práctica, recuperar tiempo, control y
              trazabilidad en una operación con alto volumen.
            </p>
          </div>
        }
      >
        <iframe
          src="https://www.youtube.com/embed/mDclxf9ZdcU?rel=0&modestbranding=1"
          title="Caso de éxito · Verisure"
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </ContainerScroll>
    </section>
  );
}
