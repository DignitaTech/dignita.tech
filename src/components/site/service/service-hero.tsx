import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { CatalogItem, ServiceCta } from "@/lib/ecosystem";

function CtaButton({ cta, primary }: { cta: ServiceCta; primary?: boolean }) {
  const cls = primary
    ? "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-from to-brand-to px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
    : "inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-medium transition hover:border-foreground/30";
  const icon = cta.external ? (
    <ArrowUpRight className="size-4" />
  ) : (
    <ArrowRight className="size-4" />
  );
  return cta.external ? (
    <a href={cta.href} target="_blank" rel="noreferrer" className={cls}>
      {cta.label}
      {icon}
    </a>
  ) : (
    <Link href={cta.href} className={cls}>
      {cta.label}
      {icon}
    </Link>
  );
}

export function ServiceHero({ service }: { service: CatalogItem }) {
  const Icon = service.icon;
  const { title, summary, description, status, primaryCta, secondaryCta } = service;
  return (
    <header className="relative overflow-hidden px-5 pt-28 sm:px-8 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-72 max-w-4xl rounded-full bg-gradient-to-br from-brand-from/30 to-brand-to/10 opacity-30 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <Link
            href="/servicios"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Servicios
          </Link>
        </Reveal>
        <Reveal delayIndex={1}>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
              <Icon className="size-7" />
            </div>
            {status ? (
              <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
                {status}
              </span>
            ) : null}
          </div>
        </Reveal>
        <Reveal delayIndex={2}>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delayIndex={3}>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {summary ?? description}
          </p>
        </Reveal>
        {primaryCta || secondaryCta ? (
          <Reveal delayIndex={4}>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta ? <CtaButton cta={primaryCta} primary /> : null}
              {secondaryCta ? <CtaButton cta={secondaryCta} /> : null}
            </div>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
