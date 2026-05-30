import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { PaletteColor } from "@/lib/ecosystem";

function isLight(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.72;
}

export function PaletteRow({ palette }: { palette: PaletteColor[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {palette.map((c, i) => (
        <Reveal key={c.hex} delayIndex={i % 5}>
          <div
            className="flex aspect-[4/5] flex-col justify-end rounded-2xl p-4 ring-1 ring-inset ring-black/5"
            style={
              {
                backgroundColor: c.hex,
                color: isLight(c.hex) ? "#1a1a1a" : "#ffffff",
              } as CSSProperties
            }
          >
            <span className="text-sm font-medium">{c.name}</span>
            <span className="text-xs uppercase opacity-70">{c.hex}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
