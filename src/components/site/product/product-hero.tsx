import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/site/cta-button";
import type { CatalogItem } from "@/lib/ecosystem";

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-card/60 shadow-2xl shadow-foreground/5">
      <div className="flex items-center gap-1.5 border-b border-foreground/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
        <span className="size-2.5 rounded-full bg-foreground/15" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function FallbackPanel({
  icon: Icon,
  accent,
  title,
}: {
  icon: CatalogItem["icon"];
  accent?: string;
  title: string;
}) {
  return (
    <div
      className="flex aspect-[16/10] flex-col items-center justify-center gap-4 rounded-3xl border border-foreground/10 p-8 text-center"
      style={{
        background: accent
          ? `linear-gradient(135deg, ${accent}22, ${accent}08)`
          : undefined,
      }}
    >
      <div
        className="flex size-16 items-center justify-center rounded-2xl text-white"
        style={{ background: accent }}
      >
        <Icon className="size-8" />
      </div>
      <div className="text-lg font-semibold tracking-tight">{title}</div>
      <span className="rounded-full bg-white/60 px-3 py-1 text-xs text-muted-foreground ring-1 ring-foreground/10">
        Vista previa próximamente
      </span>
    </div>
  );
}

export function ProductHero({ product }: { product: CatalogItem }) {
  const Icon = product.icon;
  const { title, summary, description, status, sector, accent, primaryCta, secondaryCta } =
    product;
  const shot = product.screenshots?.[0];
  return (
    <header className="relative overflow-hidden px-5 pt-28 sm:px-8 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 max-w-4xl rounded-full opacity-20 blur-3xl"
        style={{ background: accent }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <Reveal>
            <Link
              href="/productos"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Productos
            </Link>
          </Reveal>
          <Reveal delayIndex={1}>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
              <span>{sector ?? "SaaS"}</span>
              {status ? (
                <>
                  <span className="text-foreground/20">·</span>
                  <span>{status}</span>
                </>
              ) : null}
            </div>
          </Reveal>
          <Reveal delayIndex={2}>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delayIndex={3}>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {summary ?? description}
            </p>
          </Reveal>
          {primaryCta || secondaryCta ? (
            <Reveal delayIndex={4}>
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta ? <CtaButton cta={primaryCta} primary accent={accent} /> : null}
                {secondaryCta ? <CtaButton cta={secondaryCta} /> : null}
              </div>
            </Reveal>
          ) : null}
        </div>

        <Reveal delayIndex={2}>
          {shot ? (
            <BrowserFrame src={shot.src} alt={shot.alt} />
          ) : (
            <FallbackPanel icon={Icon} accent={accent} title={title} />
          )}
        </Reveal>
      </div>
    </header>
  );
}
