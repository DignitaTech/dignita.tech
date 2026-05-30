import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { CatalogItem } from "@/lib/ecosystem";

export function CatalogCard({ item, i = 0 }: { item: CatalogItem; i?: number }) {
  const Icon = item.icon;
  const inner = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card/60 p-6 transition duration-300 hover:border-foreground/20 hover:bg-white/85">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-brand-from/25 to-brand-to/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
      />
      <div className="flex items-center justify-between">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-from/25 to-brand-to/20 text-primary ring-1 ring-foreground/10">
          <Icon className="size-6" />
        </div>
        {item.status ? (
          <span className="rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] text-muted-foreground">
            {item.status}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        {item.cta ?? "Visitar"}
        {item.external ? (
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
    </article>
  );

  return (
    <Reveal delayIndex={i % 3} className="h-full">
      {item.external ? (
        <a href={item.href} target="_blank" rel="noreferrer" className="block h-full">
          {inner}
        </a>
      ) : (
        <Link href={item.href} className="block h-full">
          {inner}
        </Link>
      )}
    </Reveal>
  );
}
