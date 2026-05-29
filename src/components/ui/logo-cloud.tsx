"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface Logo {
  src?: string;
  alt: string;
  node?: React.ReactNode;
}

export function LogoCloud({
  logos,
  className,
  duration = 30,
}: {
  logos: Logo[];
  className?: string;
  duration?: number;
}) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-24" />
      <motion.div
        className="flex w-max items-center gap-10 py-2 sm:gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex h-9 shrink-0 items-center opacity-50 transition duration-300 hover:opacity-80"
          >
            {logo.node ?? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt={logo.alt}
                className="logo-mono h-6 w-auto object-contain sm:h-7"
              />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
