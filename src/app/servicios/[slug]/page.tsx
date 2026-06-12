import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ServiceHero } from "@/components/site/service/service-hero";
import { CaseSection } from "@/components/site/case-study/case-section";
import { servicios, getService, proyectos } from "@/lib/ecosystem";
import { JsonLd } from "@/components/site/json-ld";

export function generateStaticParams() {
  return servicios.filter((s) => s.slug).map((s) => ({ slug: s.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const description = service.summary ?? service.description;
  return {
    title: service.title,
    description,
    openGraph: { title: service.title, description },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { problem, deliverables, process } = service;
  const others = servicios.filter((s) => s.slug && s.slug !== slug);
  const relatedProjects = (service.relatedProjects ?? [])
    .map((ps) => proyectos.find((p) => p.slug === ps && p.published))
    .filter(Boolean);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary ?? service.description,
    url: `https://dignita.tech/servicios/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Dignita",
      url: "https://dignita.tech",
    },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceHero service={service} />

      <main className="px-5 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          {problem ? (
            <CaseSection kicker="El reto" title="Qué resolvemos">
              <Reveal>
                <p className="max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  {problem}
                </p>
              </Reveal>
            </CaseSection>
          ) : null}

          {deliverables?.length ? (
            <CaseSection kicker="Alcance" title="Qué incluye">
              <ul className="grid gap-3 sm:grid-cols-2">
                {deliverables.map((d, i) => (
                  <Reveal key={d} delayIndex={i % 2} as="li">
                    <div className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-card/60 p-4">
                      <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed">{d}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </CaseSection>
          ) : null}

          {process?.length ? (
            <CaseSection kicker="Cómo trabajamos" title="El proceso">
              <ol className="space-y-4">
                {process.map((step, i) => (
                  <Reveal key={step.title} delayIndex={i} as="li">
                    <div className="flex gap-4 rounded-3xl border border-foreground/10 bg-card/60 p-5">
                      <span className="font-mono text-sm text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-semibold tracking-tight">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </CaseSection>
          ) : null}

          {/* CTA */}
          <CaseSection>
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-brand-from/12 via-card/60 to-brand-to/10 p-8 sm:p-12">
                <h2 className="max-w-xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  ¿Hablamos de tu operación?
                </h2>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  Empezamos por un diagnóstico: entendemos tu proceso y proponemos la
                  primera mejora con impacto medible.
                </p>
                <Link
                  href="/contacto"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-from to-brand-to px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Agendar diagnóstico
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </CaseSection>

          {/* trabajos relacionados */}
          {relatedProjects.length ? (
            <CaseSection kicker="Trabajos" title="Lo que hemos construido">
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedProjects.map((p, i) => (
                  <Reveal key={p!.slug} delayIndex={i % 2}>
                    <div className="flex flex-col gap-3 rounded-3xl border border-foreground/10 bg-card/60 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div
                          className="size-3 shrink-0 rounded-full mt-1"
                          style={{ backgroundColor: p!.accent }}
                        />
                        {p!.liveUrl && (
                          <a
                            href={p!.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-1 rounded-full border border-foreground/10 px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-foreground/20 hover:text-foreground"
                          >
                            {p!.liveUrl.replace(/^https?:\/\//, "")}
                            <ArrowUpRight className="size-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold tracking-tight">{p!.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {p!.sector} {p!.year ? `· ${p!.year}` : ""}
                        </p>
                      </div>
                      {p!.summary && (
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {p!.summary}
                        </p>
                      )}
                      <Link
                        href={`/proyectos/${p!.slug}`}
                        className="group inline-flex items-center gap-1 text-xs font-medium text-primary transition hover:gap-1.5"
                      >
                        Ver proyecto
                        <ArrowUpRight className="size-3" />
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </CaseSection>
          ) : null}

          {/* más servicios */}
          {others.length ? (
            <CaseSection kicker="Ecosistema" title="Otros servicios">
              <div className="grid gap-4 sm:grid-cols-2">
                {others.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <Reveal key={s.slug} delayIndex={i % 2}>
                      <Link
                        href={`/servicios/${s.slug}`}
                        className="group flex items-center gap-4 rounded-3xl border border-foreground/10 bg-card/60 p-4 transition hover:border-foreground/20"
                      >
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
                          <Icon className="size-6" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-base font-semibold tracking-tight">
                            {s.title}
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                            {s.description}
                          </p>
                        </div>
                        <ArrowUpRight className="ml-auto size-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </CaseSection>
          ) : null}
        </div>
      </main>
    </>
  );
}
