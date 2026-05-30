import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CatalogCard } from "@/components/site/catalog-card";
import { productos } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Productos",
  description: "Productos SaaS construidos por Dignita: Mirestconia, Nivela tu Academy y Orion ERP.",
};

export default function ProductosPage() {
  return (
    <PageShell
      kicker="Productos · SaaS"
      title={<>Software que <span className="text-gradient">construimos y operamos</span></>}
      description="Productos SaaS propios, en producción y con clientes reales."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((item, i) => (
          <CatalogCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </PageShell>
  );
}
