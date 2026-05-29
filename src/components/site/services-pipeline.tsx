"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Clock, Wallet, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { serviceGroups } from "@/lib/content";
import { cn } from "@/lib/utils";

function stageParts(kicker: string) {
  const [num, ...rest] = kicker.split("·");
  return { num: num.trim(), name: rest.join("·").trim() };
}

export function ServicesPipeline() {
  const [active, setActive] = React.useState(0);
  const group = serviceGroups[active];
  const progress = ((active + 1) / serviceGroups.length) * 100;

  return (
    <section id="servicios" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          kicker="Portafolio"
          title={
            <>
              Un <span className="text-gradient">pipeline</span>, no un catálogo
            </>
          }
          description="Toca cada etapa para ver sus servicios. Así avanza una cuenta: diagnosticar, implementar, sostener y escalar con control."
        />

        {/* pipeline rail */}
        <div className="relative mt-14">
          {/* track */}
          <div className="absolute inset-x-3 top-7 h-0.5 rounded-full bg-foreground/10 sm:top-8" />
          <motion.div
            className="absolute left-3 top-7 h-0.5 rounded-full bg-gradient-to-r from-brand-from via-brand-via to-brand-to sm:top-8"
            initial={false}
            animate={{ width: `calc(${progress}% - 1.5rem)` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative grid grid-cols-4 gap-1 sm:gap-3">
            {serviceGroups.map((g, i) => {
              const { num, name } = stageParts(g.kicker);
              const isActive = i === active;
              const isDone = i < active;
              return (
                <button
                  key={g.id}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className="group flex flex-col items-center gap-2 text-center focus:outline-none"
                >
                  <span
                    className={cn(
                      "flex size-14 items-center justify-center rounded-2xl text-lg font-bold tabular-nums transition-all duration-300 sm:size-16 sm:text-2xl",
                      isActive
                        ? "scale-105 bg-gradient-to-br from-brand-from via-brand-via to-brand-to text-primary-foreground shadow-lg shadow-primary/25"
                        : isDone
                          ? "bg-card text-primary ring-1 ring-foreground/10 shadow-md shadow-foreground/5"
                          : "bg-card text-muted-foreground ring-1 ring-foreground/10 shadow-md shadow-foreground/5 group-hover:text-foreground"
                    )}
                  >
                    {num}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] leading-tight transition-colors sm:text-xs",
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* active stage content */}
        <div className="mt-12 min-h-[26rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-7 max-w-3xl">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {group.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.services.map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <motion.article
                      key={service.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.06 * i,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card/60 p-6 transition duration-300 hover:border-foreground/20 hover:bg-white/85"
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-brand-from/25 to-brand-to/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
                          <Icon className="size-6" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {service.index}
                        </span>
                      </div>

                      <h4 className="mt-5 text-balance text-lg font-semibold leading-snug tracking-tight">
                        {service.title}
                      </h4>
                      <p className="mt-2 text-sm text-foreground/70">
                        {service.short}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {service.bullets.slice(0, 4).map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-wrap gap-2 border-t border-foreground/10 pt-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
                          <Clock className="size-3.5" /> {service.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
                          <Wallet className="size-3.5" /> {service.pricing}
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* next-stage hint */}
        {active < serviceGroups.length - 1 ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setActive((v) => Math.min(v + 1, serviceGroups.length - 1))}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/85"
            >
              Siguiente etapa: {stageParts(serviceGroups[active + 1].kicker).name}
              <ArrowRight className="size-4 text-primary" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
