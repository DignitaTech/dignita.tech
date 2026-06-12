import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { equipo } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Equipo",
  description: "El equipo detrás de Dignita.",
};

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function EquipoPage() {
  return (
    <PageShell
      kicker="Equipo"
      title={<>Las personas <span className="text-gradient">detrás de Dignita</span></>}
      description="Operadores antes que consultores. Construimos lo que vendemos."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {equipo.map((m, i) => (
          <Reveal key={m.name} delayIndex={i % 3}>
            <article className="flex h-full flex-col items-center rounded-3xl border border-foreground/10 bg-card/60 p-8 text-center">
              {m.photo ? (
                <div className="size-24 overflow-hidden rounded-full ring-2 ring-foreground/10">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ) : (
                <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-2xl font-semibold text-primary-foreground">
                  {m.initials}
                </div>
              )}
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              {m.linkedin ? (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`LinkedIn de ${m.name}`}
                  className="mt-4 flex size-9 items-center justify-center rounded-full bg-foreground/5 text-muted-foreground transition hover:text-foreground"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
