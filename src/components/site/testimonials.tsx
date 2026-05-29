"use client";

import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/content";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section id="testimonios" className="relative px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
        >
          <Badge>Casos y resultados</Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Lo que cambia cuando la operación{" "}
            <span className="text-gradient">recupera control</span>
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            Narrativa de problema → intervención → resultado, en las áreas donde
            más duele la carga manual.
          </p>
        </motion.div>

        <div className="mt-12 flex max-h-[720px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={17} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={19}
          />
        </div>
      </div>
    </section>
  );
}
