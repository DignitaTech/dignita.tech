"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Bot,
  Workflow,
  Plug,
  BarChart3,
  Cpu,
  Bell,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { stats } from "@/lib/content";

/* ---------------------------------------------------------------------------
   Visual del hero — órbitas CSS puras (cero WebGL, cero JS de animación).
   Núcleo de marca + dos anillos con nodos de servicio que orbitan.
--------------------------------------------------------------------------- */

function OrbitNode({
  icon: Icon,
  label,
  inset,
  duration,
  delay,
  reverse,
}: {
  icon: React.ElementType;
  label: string;
  inset: number;
  duration: number;
  delay: number;
  reverse?: boolean;
}) {
  const timing = {
    "--orbit-duration": `${duration}s`,
    animationDelay: `${delay}s`,
  } as React.CSSProperties;

  return (
    <div
      className={`absolute ${reverse ? "animate-orbit-reverse" : "animate-orbit"}`}
      style={{ ...timing, inset }}
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        {/* contra-rotación: mantiene el chip siempre derecho */}
        <div
          className={reverse ? "animate-orbit" : "animate-orbit-reverse"}
          style={timing}
        >
          <span className="glass flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium text-foreground/80">
            <Icon className="size-3.5 text-primary" />
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* grid de fondo con desvanecido radial */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />

      {/* halo de marca */}
      <div
        className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--brand-via) 20%, transparent), transparent 65%)",
        }}
      />

      <div className="relative h-[420px] w-[420px] scale-[0.66] sm:scale-90 lg:scale-100">
        {/* barrido tipo radar */}
        <div
          className="absolute inset-6 animate-orbit rounded-full [--orbit-duration:16s]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, color-mix(in oklch, var(--brand-via) 14%, transparent) 55deg, transparent 110deg)",
          }}
        />

        {/* anillos */}
        <div className="absolute inset-0 rounded-full border border-dashed border-foreground/15" />
        <div className="absolute inset-[88px] rounded-full border border-foreground/10" />

        {/* anillo exterior — 3 nodos */}
        <OrbitNode icon={Workflow} label="RPA" inset={0} duration={44} delay={0} />
        <OrbitNode icon={Plug} label="Integraciones" inset={0} duration={44} delay={-14.7} />
        <OrbitNode icon={BarChart3} label="Reportes" inset={0} duration={44} delay={-29.3} />

        {/* anillo interior — 2 nodos, sentido contrario */}
        <OrbitNode icon={Cpu} label="Agentes IA" inset={88} duration={28} delay={0} reverse />
        <OrbitNode icon={Bell} label="Alertas" inset={88} duration={28} delay={-14} reverse />

        {/* núcleo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="absolute -inset-5 rounded-full blur-2xl"
            style={{
              background:
                "color-mix(in oklch, var(--brand-via) 30%, transparent)",
            }}
          />
          <span
            className="absolute inset-0 animate-core-pulse rounded-full"
            style={{
              background:
                "color-mix(in oklch, var(--brand-via) 35%, transparent)",
            }}
          />
          <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-from via-brand-via to-brand-to shadow-lg shadow-orange-400/40">
            <Bot className="size-10 text-white" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy — carga inmediato */}
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

        {/* visual — CSS puro, sin dependencias pesadas */}
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
            <HeroVisual />
            <div className="pointer-events-none absolute bottom-4 left-4 right-4">
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
