"use client";

import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { stats } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="relative px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <Badge>
              <Sparkles className="size-3.5 text-primary" />
              Automatización operativa · IA aplicada · Agentes
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Menos carga manual.
            <br />
            <span className="text-gradient">Más control operativo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
          >
            Automatización, IA aplicada y agentes para convertir el trabajo
            manual en flujos ágiles, controlables y trazables.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <a href="#contacto" className="w-full sm:w-auto">
              <Button variant="brand" size="lg" className="w-full sm:w-auto">
                Agendar diagnóstico
                <ArrowRight className="size-4" />
              </Button>
            </a>
            <a href="#servicios" className="w-full sm:w-auto">
              <Button variant="glass" size="lg" className="w-full sm:w-auto">
                Ver servicios
              </Button>
            </a>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid grid-cols-3 gap-3 sm:gap-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-3 text-left sm:p-4">
                <div className="text-xl font-semibold text-gradient sm:text-2xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="relative h-[360px] w-full overflow-hidden border-foreground/10 bg-gradient-to-br from-orange-100/60 via-white to-amber-50/50 sm:h-[460px] lg:h-[540px]">
            <Spotlight
              className="-top-40 left-0 md:-top-20 md:left-60"
              fill="#fb923c"
            />
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="glass rounded-full px-3 py-1 text-[11px] text-foreground/70">
                Operación asistida, no automatizada a ciegas
              </span>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
