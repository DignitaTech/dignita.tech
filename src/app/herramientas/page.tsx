import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CatalogCard } from "@/components/site/catalog-card";
import { herramientas } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Herramientas",
  description: "Herramientas internas y públicas potenciadas por IA.",
};

export default function HerramientasPage() {
  return (
    <PageShell
      kicker="Herramientas"
      title={<>Herramientas <span className="text-gradient">con IA</span></>}
      description="Utilidades que aceleran el trabajo, potenciadas por IA."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {herramientas.map((item, i) => (
          <CatalogCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </PageShell>
  );
}
