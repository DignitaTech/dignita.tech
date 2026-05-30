import type { MetadataRoute } from "next";
import { servicios, productos, publishedProjects } from "@/lib/ecosystem";

const BASE = "https://dignita.tech";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
type Entry = { path: string; priority: number; changeFrequency: Freq };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: Entry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/servicios", priority: 0.9, changeFrequency: "monthly" },
    { path: "/productos", priority: 0.9, changeFrequency: "monthly" },
    { path: "/proyectos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/retail", priority: 0.7, changeFrequency: "monthly" },
    { path: "/herramientas", priority: 0.6, changeFrequency: "monthly" },
    { path: "/equipo", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contacto", priority: 0.7, changeFrequency: "yearly" },
  ];

  const servicePages: Entry[] = servicios
    .filter((s) => s.slug)
    .map((s) => ({ path: `/servicios/${s.slug}`, priority: 0.7, changeFrequency: "monthly" }));

  const productPages: Entry[] = productos
    .filter((p) => p.slug)
    .map((p) => ({ path: `/productos/${p.slug}`, priority: 0.7, changeFrequency: "monthly" }));

  const projectPages: Entry[] = publishedProjects.map((p) => ({
    path: `/proyectos/${p.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...servicePages, ...productPages, ...projectPages].map((e) => ({
    url: `${BASE}${e.path}`,
    lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
