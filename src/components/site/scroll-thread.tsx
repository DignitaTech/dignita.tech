"use client";

import * as React from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  motion,
} from "motion/react";
import { cn } from "@/lib/utils";

// Reads existing section ids only — never modifies them.
const SECTION_IDS = [
  "top",
  "observabilidad",
  "servicios",
  "areas",
  "proceso",
  "testimonios",
  "contacto",
];

export function ScrollThread() {
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  const headTop = useTransform(fill, (v) => `${v * 100}%`);

  const [nodes, setNodes] = React.useState<number[]>([]);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const compute = () => {
      const docH = document.documentElement.scrollHeight || 1;
      const fr = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY + rect.height * 0.18;
        return Math.min(0.99, Math.max(0.01, top / docH));
      }).filter((v): v is number => v !== null);
      setNodes(fr);
    };

    compute();
    window.addEventListener("resize", compute);
    const t1 = setTimeout(compute, 500);
    const t2 = setTimeout(compute, 1500);
    return () => {
      window.removeEventListener("resize", compute);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useMotionValueEvent(fill, "change", (v) => setProgress(v));

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-[10px] z-20 w-[2px] sm:left-6"
    >
      <div className="absolute inset-0 rounded-full bg-foreground/10" />

      <motion.div
        style={{ scaleY: fill }}
        className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-gradient-to-b from-brand-from via-brand-via to-brand-to"
      />

      <motion.div
        style={{ top: headTop }}
        className="absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-from to-brand-to shadow-[0_0_12px_2px_rgba(249,115,22,0.5)]"
      />

      {nodes.map((f, i) => {
        const active = progress >= f - 0.01;
        return (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${f * 100}%` }}
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                active
                  ? "size-3 bg-gradient-to-br from-brand-from to-brand-to shadow-[0_0_0_4px_rgba(249,115,22,0.14)]"
                  : "size-2 bg-foreground/20 ring-2 ring-background"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
