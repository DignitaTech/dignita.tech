import type { ReactNode, CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function CaseSection({
  kicker,
  title,
  accent,
  className,
  children,
}: {
  kicker?: string;
  title?: ReactNode;
  accent?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("mt-20 sm:mt-28", className)}>
      {kicker || title ? (
        <div className="mb-8">
          {kicker ? (
            <Reveal>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={accent ? ({ color: accent } as CSSProperties) : undefined}
              >
                {kicker}
              </span>
            </Reveal>
          ) : null}
          {title ? (
            <Reveal delayIndex={1}>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
              </h2>
            </Reveal>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
