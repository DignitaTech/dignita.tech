import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CatalogCard } from "@/components/site/catalog-card";
import { retail } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Retail",
  description: "Impresoras 3D y cámaras de seguridad para empresas.",
};

export default function RetailPage() {
  return (
    <PageShell
      kicker="Retail"
      title={<>Hardware y <span className="text-gradient">soluciones físicas</span></>}
      description="Tecnología que también vive fuera de la pantalla."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {retail.map((item, i) => (
          <CatalogCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </PageShell>
  );
}
