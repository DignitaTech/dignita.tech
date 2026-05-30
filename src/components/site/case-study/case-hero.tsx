import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/lib/ecosystem";

export function CaseHero({ project }: { project: Project }) {
  const { accent, title, summary, sector, year, cover } = project;
  return (
    <header className="relative overflow-hidden px-5 pt-28 sm:px-8 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 max-w-4xl rounded-full opacity-[0.18] blur-3xl"
        style={{ background: accent }}
      />
      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Proyectos
          </Link>
        </Reveal>
        <Reveal delayIndex={1}>
          <div
            className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: accent }}
          >
            <span>{sector}</span>
            {year ? (
              <>
                <span className="text-foreground/20">·</span>
                <span>{year}</span>
              </>
            ) : null}
          </div>
        </Reveal>
        <Reveal delayIndex={2}>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        {summary ? (
          <Reveal delayIndex={3}>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {summary}
            </p>
          </Reveal>
        ) : null}
      </div>

      {cover ? (
        <Reveal delayIndex={4} className="relative mx-auto mt-12 w-full max-w-6xl">
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-foreground/10 sm:aspect-[16/9]"
            style={{ boxShadow: `0 40px 120px -45px ${accent}66` }}
          >
            <Image
              src={cover}
              alt={`Portada de la marca ${title}`}
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </Reveal>
      ) : null}
    </header>
  );
}
