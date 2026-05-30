import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ServiceCta } from "@/lib/ecosystem";

export function CtaButton({
  cta,
  primary,
  accent,
}: {
  cta: ServiceCta;
  primary?: boolean;
  accent?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition";
  const cls = primary
    ? `${base} text-white hover:opacity-90 ${
        accent ? "" : "bg-gradient-to-r from-brand-from to-brand-to"
      }`
    : `${base} border border-foreground/15 hover:border-foreground/30`;
  const style: CSSProperties | undefined =
    primary && accent ? { background: accent } : undefined;
  const icon = cta.external ? (
    <ArrowUpRight className="size-4" />
  ) : (
    <ArrowRight className="size-4" />
  );
  return cta.external ? (
    <a href={cta.href} target="_blank" rel="noreferrer" className={cls} style={style}>
      {cta.label}
      {icon}
    </a>
  ) : (
    <Link href={cta.href} className={cls} style={style}>
      {cta.label}
      {icon}
    </Link>
  );
}
