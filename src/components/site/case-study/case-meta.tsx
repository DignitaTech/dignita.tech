import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/lib/ecosystem";

export function CaseMeta({ project }: { project: Project }) {
  const { title, sector, year, services, liveUrl, accent } = project;
  const rows: { label: string; value: ReactNode }[] = [
    { label: "Cliente", value: title },
    { label: "Sector", value: sector },
    ...(year ? [{ label: "Año", value: year }] : []),
    ...(services?.length ? [{ label: "Servicios", value: services.join(" · ") }] : []),
  ];
  return (
    <Reveal>
      <dl className="mx-auto mt-14 grid w-full max-w-6xl gap-x-8 gap-y-6 rounded-3xl border border-foreground/10 bg-card/60 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {r.label}
            </dt>
            <dd className="mt-1.5 text-sm font-medium leading-relaxed">{r.value}</dd>
          </div>
        ))}
        {liveUrl ? (
          <div>
            <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              En vivo
            </dt>
            <dd className="mt-1.5">
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium"
                style={{ color: accent }}
              >
                Visitar <ArrowUpRight className="size-4" />
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
    </Reveal>
  );
}
