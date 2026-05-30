import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ProductHero } from "@/components/site/product/product-hero";
import { CaseSection } from "@/components/site/case-study/case-section";
import { CaseGallery } from "@/components/site/case-study/case-gallery";
import { productos, getProduct } from "@/lib/ecosystem";

export function generateStaticParams() {
  return productos.filter((p) => p.slug).map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const description = product.summary ?? product.description;
  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      images: product.screenshots?.[0] ? [{ url: product.screenshots[0].src }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const { accent, problem, deliverables, screenshots } = product;
  const others = productos.filter((p) => p.slug && p.slug !== slug);

  return (
    <>
      <ProductHero product={product} />

      <main className="px-5 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          {problem ? (
            <CaseSection kicker="El reto" title="Qué resuelve" accent={accent}>
              <Reveal>
                <p className="max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
                  {problem}
                </p>
              </Reveal>
            </CaseSection>
          ) : null}

          {deliverables?.length ? (
            <CaseSection kicker="Funcionalidades" title="Qué incluye" accent={accent}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {deliverables.map((d, i) => (
                  <Reveal key={d} delayIndex={i % 2} as="li">
                    <div className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-card/60 p-4">
                      <Check
                        className="mt-0.5 size-5 shrink-0"
                        style={accent ? { color: accent } : undefined}
                      />
                      <span className="text-sm leading-relaxed">{d}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </CaseSection>
          ) : null}

          {screenshots?.length ? (
            <CaseSection kicker="El producto" title="Por dentro" accent={accent}>
              <CaseGallery images={screenshots} />
            </CaseSection>
          ) : null}

          {/* CTA */}
          <CaseSection>
            <Reveal>
              <div
                className="relative overflow-hidden rounded-3xl border border-foreground/10 p-8 sm:p-12"
                style={{
                  background: accent
                    ? `linear-gradient(135deg, ${accent}14, transparent 60%)`
                    : undefined,
                }}
              >
                <h2 className="max-w-xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  ¿Quieres un producto así para tu operación?
                </h2>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  Construimos y operamos software a la medida de tu negocio. Cuéntanos
                  qué necesitas resolver.
                </p>
                <Link
                  href="/contacto"
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  style={{
                    background: accent ?? "var(--primary)",
                  }}
                >
                  Hablemos
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </CaseSection>

          {/* otros productos */}
          {others.length ? (
            <CaseSection kicker="Más software" title="Otros productos" accent={accent}>
              <div className="grid gap-4 sm:grid-cols-2">
                {others.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <Reveal key={p.slug} delayIndex={i % 2}>
                      <Link
                        href={`/productos/${p.slug}`}
                        className="group flex items-center gap-4 rounded-3xl border border-foreground/10 bg-card/60 p-4 transition hover:border-foreground/20"
                      >
                        <div
                          className="flex size-12 shrink-0 items-center justify-center rounded-2xl text-white"
                          style={{ background: p.accent ?? "var(--primary)" }}
                        >
                          <Icon className="size-6" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-base font-semibold tracking-tight">
                            {p.title}
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                            {p.description}
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
