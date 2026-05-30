import { Reveal } from "@/components/ui/reveal";
import type { Typeface } from "@/lib/ecosystem";

export function TypeSpecimen({
  typography,
  accent,
}: {
  typography: Typeface[];
  accent: string;
}) {
  return (
    <div className="space-y-4">
      {typography.map((t, i) => (
        <Reveal key={t.name} delayIndex={i}>
          <div className="flex flex-col gap-3 rounded-3xl border border-foreground/10 bg-card/60 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div>
              <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {t.name}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{t.role}</div>
            </div>
            <div
              className="text-3xl font-medium sm:text-4xl"
              style={{ color: accent }}
            >
              Aa Bb Cc
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
