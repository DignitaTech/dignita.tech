import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { CaseHero } from "@/components/site/case-study/case-hero";
import { CaseMeta } from "@/components/site/case-study/case-meta";
import { CaseSection } from "@/components/site/case-study/case-section";
import { CaseGallery } from "@/components/site/case-study/case-gallery";
import { PaletteRow } from "@/components/site/case-study/palette-row";
import { TypeSpecimen } from "@/components/site/case-study/type-specimen";
import { getProject, publishedProjects } from "@/lib/ecosystem";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} — Caso de branding`;
  const description = project.summary ?? project.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: project.cover ? [{ url: project.cover }] : undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { accent, title, challenge, approach, result, palette, typography, gallery } =
    project;
  const narrative = [
    { label: "El reto", body: challenge },
    { label: "El enfoque", body: approach },
    { label: "El resultado", body: result },
  ].filter((n) => n.body);

  const others = publishedProjects.filter((p) => p.slug !== slug);

  return (
    <>
      <CaseHero project={project} />

      <main className="px-5 pb-24 sm:px-8">
        <CaseMeta project={project} />

        <div className="mx-auto w-full max-w-6xl">
          {narrative.length ? (
            <CaseSection kicker="El caso" title="Cómo lo abordamos" accent={accent}>
              <div className="grid gap-10 lg:grid-cols-3">
                {narrative.map((n, i) => (
                  <Reveal key={n.label} delayIndex={i}>
                    <div>
                      <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: accent }}
                      >
                        {n.label}
                      </span>
                      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                        {n.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </CaseSection>
          ) : null}

          <CaseSection kicker="Identidad" title="Logotipo" accent={accent}>
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-foreground/10">
                <Image
                  src={`/branding/${slug}/logo.png`}
                  alt={`Logotipo de ${title}`}
                  fill
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </CaseSection>

          {palette?.length ? (
            <CaseSection kicker="Color" title="Paleta" accent={accent}>
              <PaletteRow palette={palette} />
            </CaseSection>
          ) : null}

          {typography?.length ? (
            <CaseSection kicker="Tipografía" title="Sistema tipográfico" accent={accent}>
              <div className="space-y-4">
                <TypeSpecimen typography={typography} accent={accent} />
                <Reveal>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-3xl ring-1 ring-foreground/10">
                    <Image
                      src={`/branding/${slug}/type.png`}
                      alt={`Especimen tipográfico de ${title}`}
                      fill
                      sizes="(max-width: 1152px) 100vw, 1152px"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </div>
            </CaseSection>
          ) : null}

          {gallery?.length ? (
            <CaseSection kicker="Aplicaciones" title="La marca en acción" accent={accent}>
              <CaseGallery images={gallery} />
            </CaseSection>
          ) : null}

          {/* CTA */}
          <CaseSection>
            <Reveal>
              <div
                className="relative overflow-hidden rounded-3xl border border-foreground/10 p-8 sm:p-12"
                style={{
                  background: `linear-gradient(135deg, ${accent}14, transparent 60%)`,
                }}
              >
                <h2 className="max-w-xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  ¿Tu marca necesita una identidad así?
                </h2>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  Diseñamos identidades con criterio: estrategia, naming y sistema
                  visual, listos para escalar.
                </p>
                <Link
                  href="/contacto"
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  style={{ background: accent }}
                >
                  Hablemos de tu marca
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </CaseSection>

          {/* otros proyectos */}
          {others.length ? (
            <CaseSection kicker="Más casos" title="Otros proyectos" accent={accent}>
              <div className="grid gap-4 sm:grid-cols-2">
                {others.map((p, i) => (
                  <Reveal key={p.slug} delayIndex={i % 2}>
                    <Link
                      href={`/proyectos/${p.slug}`}
                      className="group flex items-center gap-4 rounded-3xl border border-foreground/10 bg-card/60 p-4 transition hover:border-foreground/20"
                    >
                      {p.cover ? (
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-foreground/10">
                          <Image
                            src={p.cover}
                            alt={p.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                          {p.sector}
                        </div>
                        <div className="mt-0.5 truncate text-lg font-semibold tracking-tight">
                          {p.title}
                        </div>
                      </div>
                      <ArrowUpRight className="ml-auto size-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Reveal>
                ))}
              </div>
            </CaseSection>
          ) : null}
        </div>
      </main>
    </>
  );
}
