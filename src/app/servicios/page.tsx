import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { CatalogCard } from "@/components/site/catalog-card";
import { servicios } from "@/lib/ecosystem";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Automatización e IA, soporte TI y RPA, desarrollo web, branding y lanzamiento de marca.",
};

export default function ServiciosPage() {
  return (
    <PageShell
      kicker="Servicios"
      title={<>Lo que <span className="text-gradient">hacemos por ti</span></>}
      description="Desde automatización e IA hasta desarrollo, branding y soporte. Cada frente, con criterio operativo."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((item, i) => (
          <CatalogCard
            key={item.title}
            item={
              item.slug
                ? { ...item, href: `/servicios/${item.slug}`, external: false, cta: "Ver servicio" }
                : item
            }
            i={i}
          />
        ))}
      </div>
    </PageShell>
  );
}
