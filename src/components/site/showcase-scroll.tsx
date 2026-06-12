"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VIDEO_ID = "mDclxf9ZdcU";

export function ShowcaseScroll() {
  const [playing, setPlaying] = React.useState(false);

  return (
    <section
      id="observabilidad"
      className="relative px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 text-center">
        <Badge>Caso de éxito · Verisure</Badge>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          De la operación manual al
          <br />
          <span className="text-gradient">control operativo real</span>
        </h2>
        <p className="max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          Así se ve, en la práctica, recuperar tiempo, control y trazabilidad
          en una operación con alto volumen.
        </p>

        {/* marco del video — el iframe solo carga al reproducir */}
        <div className="mt-8 w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
          <div className="relative aspect-video w-full">
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=1`}
                title="Caso de éxito · Verisure"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Reproducir video: caso de éxito Verisure"
                className="group absolute inset-0 cursor-pointer"
              >
                {/* miniatura de YouTube — mucho más liviana que el player */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                  alt="Vista previa del caso de éxito con Verisure"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-foreground/20 transition-colors group-hover:bg-foreground/10" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-brand-from via-brand-via to-brand-to shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
                  <Play className="ml-1 size-7 fill-white text-white sm:size-8" />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
