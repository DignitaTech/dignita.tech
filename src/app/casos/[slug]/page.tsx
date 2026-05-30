import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Trophy, CheckCircle2, MapPin, Camera } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { casos, getCaso } from "@/lib/ecosystem";
import { PeruMap } from "@/components/site/peru-map";

export function generateStaticParams() {
  return casos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!caso) return {};
  return {
    title: `${caso.client} — Caso de éxito`,
    description: caso.summary ?? caso.description,
  };
}

export default async function CasoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caso = getCaso(slug);
  if (!caso) notFound();

  const { accent = "#7C3AED" } = caso;

  return (
    <>
      {/* ── HERO ── */}
      <header className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-80 max-w-4xl rounded-full opacity-15 blur-3xl"
          style={{ background: accent }}
        />
        <div className="relative mx-auto w-full max-w-5xl">
          <Reveal>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Proyectos
            </Link>
          </Reveal>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            {/* Texto */}
            <div>
              <Reveal delayIndex={1}>
                <div
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  <span>{caso.sector}</span>
                  {caso.year && (
                    <>
                      <span className="text-foreground/20">·</span>
                      <span>{caso.year}</span>
                    </>
                  )}
                </div>
              </Reveal>
              <Reveal delayIndex={2}>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {caso.client}
                </h1>
              </Reveal>
              {caso.summary && (
                <Reveal delayIndex={3}>
                  <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                    {caso.summary}
                  </p>
                </Reveal>
              )}
            </div>

            {/* Foto del Orbe */}
            {caso.cover && (
              <Reveal delayIndex={2}>
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-foreground/10"
                  style={{ boxShadow: `0 40px 120px -45px ${accent}55` }}
                >
                  <Image
                    src={caso.cover}
                    alt={`${caso.client} — Orbe de World`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 512px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </header>

      <main className="px-5 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">

          {/* ── KPIs ── */}
          {caso.kpis?.length && (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {caso.kpis.map((kpi, i) => (
                <Reveal key={kpi.label} delayIndex={i % 4}>
                  <div
                    className="rounded-3xl border border-foreground/10 bg-card/60 p-6 text-center"
                    style={{ boxShadow: `0 0 40px -20px ${accent}33` }}
                  >
                    <div
                      className="text-3xl font-semibold tracking-tight sm:text-4xl"
                      style={{ color: accent }}
                    >
                      {kpi.value}
                    </div>
                    <div className="mt-1 text-sm font-medium">{kpi.label}</div>
                    {kpi.sub && (
                      <div className="mt-0.5 text-xs text-muted-foreground">{kpi.sub}</div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* ── #1 a nivel nacional ── */}
          {caso.highlights?.length && (
            <Reveal>
              <div
                className="mt-8 overflow-hidden rounded-3xl border p-6 sm:p-8"
                style={{
                  borderColor: `${accent}33`,
                  background: `linear-gradient(135deg, ${accent}0d, transparent 60%)`,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <Trophy className="size-5" style={{ color: accent }} />
                  <h2 className="font-semibold text-lg">Reconocimientos</h2>
                </div>
                <ul className="space-y-3">
                  {caso.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0" style={{ color: accent }} />
                      <span className="text-sm leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* ── Narrativa ── */}
          {[
            { kicker: "El contexto", title: "El reto", body: caso.challenge },
            { kicker: "Nuestra ejecución", title: "Cómo lo abordamos", body: caso.approach },
            { kicker: "Los números", title: "El resultado", body: caso.result },
          ].filter((n) => n.body).map((n, i) => (
            <section key={n.kicker} className="mt-16 sm:mt-20">
              <Reveal>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  {n.kicker}
                </span>
              </Reveal>
              <Reveal delayIndex={1}>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {n.title}
                </h2>
              </Reveal>
              <Reveal delayIndex={2}>
                <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  {n.body}
                </p>
              </Reveal>
            </section>
          ))}

          {/* ── Actividades ── */}
          {caso.activities?.length && (
            <section className="mt-16 sm:mt-20">
              <Reveal>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  Lo que ejecutamos
                </span>
              </Reveal>
              <Reveal delayIndex={1}>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Actividades clave
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {caso.activities.map((act, i) => (
                  <Reveal key={act.title} delayIndex={i % 3}>
                    <div className="flex flex-col gap-2 rounded-2xl border border-foreground/10 bg-card/60 p-5">
                      <div
                        className="h-1 w-8 rounded-full"
                        style={{ background: accent }}
                      />
                      <h3 className="font-semibold tracking-tight">{act.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {act.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ── Mapa de cobertura ── */}
          <section className="mt-16 sm:mt-20">
            <Reveal>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: accent }}
              >
                Alcance nacional
              </span>
            </Reveal>
            <Reveal delayIndex={1}>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Presencia en 7+ departamentos
              </h2>
            </Reveal>
            <div className="mt-8 grid items-center gap-8 rounded-3xl border border-foreground/10 bg-card/60 p-6 sm:p-8 lg:grid-cols-2">
              <Reveal>
                <PeruMap accent={accent} />
              </Reveal>
              <Reveal delayIndex={1}>
                <div>
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    Operamos simultáneamente en los principales mercados del país,
                    con puntos de venta, activaciones y equipo propio en cada plaza.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Piura",
                      "Chiclayo",
                      "Ferreñafe",
                      "Trujillo",
                      "Chimbote",
                      "Nuevo Chimbote",
                      "Huaraz",
                      "Lima",
                      "Arequipa",
                    ].map((city) => (
                      <span
                        key={city}
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm"
                        style={{ borderColor: `${accent}33`, color: accent }}
                      >
                        <MapPin className="size-3.5" />
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Galería de fotos ── */}
          {caso.gallery?.length ? (
            <section className="mt-16 sm:mt-20">
              <Reveal>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  En el campo
                </span>
              </Reveal>
              <Reveal delayIndex={1}>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  El Orbe en acción
                </h2>
              </Reveal>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {caso.gallery.map((img, i) => (
                  <Reveal key={img.src} delayIndex={i % 3}>
                    <div
                      className={`relative overflow-hidden rounded-2xl ring-1 ring-foreground/10 ${
                        img.wide ? "col-span-2 aspect-[16/10]" : "aspect-[3/4]"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}

          {/* ── Instagram ── */}
          {caso.socialUrl && (
            <Reveal>
              <div className="mt-10 flex items-center gap-4 rounded-2xl border border-foreground/10 bg-card/60 p-5">
                <div
                  className="flex size-12 shrink-0 items-center justify-center rounded-2xl text-white"
                  style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366)" }}
                >
                  {/* Instagram SVG — lucide-react 1.17 eliminó iconos de marca */}
                  <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">Seguí la operación en Instagram</div>
                  <a
                    href={caso.socialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {caso.socialLabel ?? caso.socialUrl}
                  </a>
                </div>
                <a
                  href={caso.socialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium transition hover:border-foreground/30"
                >
                  Ver perfil <ArrowRight className="size-4" />
                </a>
              </div>
            </Reveal>
          )}

          {/* ── CTA ── */}
          <Reveal>
            <div
              className="mt-16 overflow-hidden rounded-3xl border border-foreground/10 p-8 sm:p-12"
              style={{ background: `linear-gradient(135deg, ${accent}10, transparent 60%)` }}
            >
              <h2 className="max-w-xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                ¿Tu empresa necesita resultados así?
              </h2>
              <p className="mt-3 max-w-lg text-muted-foreground">
                Diseñamos e implementamos la operación completa: digital, campo y
                tecnología, todo coordinado desde un solo equipo.
              </p>
              <Link
                href="/contacto"
                className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                style={{ background: accent }}
              >
                Hablemos <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
