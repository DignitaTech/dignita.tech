import { config, fields, collection } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "production" &&
    process.env.KEYSTATIC_GITHUB_CLIENT_ID
      ? ({ kind: "github", repo: "DignitaTech/dignita.tech" } as const)
      : ({ kind: "local" } as const),
  ui: {
    brand: { name: "Dignita" },
  },
  collections: {
    proyectos: collection({
      label: "Proyectos (casos)",
      slugField: "title",
      path: "content/proyectos/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({
          name: { label: "Título", validation: { isRequired: true } },
        }),
        category: fields.text({ label: "Categoría", defaultValue: "Branding" }),
        sector: fields.text({ label: "Sector" }),
        year: fields.text({ label: "Año" }),
        description: fields.text({ label: "Descripción (tarjeta)", multiline: true }),
        accent: fields.text({ label: "Color de acento (hex)", defaultValue: "#FF7A1A" }),
        published: fields.checkbox({ label: "Publicado", defaultValue: false }),
        cover: fields.text({ label: "Portada (ruta en /public)" }),
        summary: fields.text({ label: "Resumen", multiline: true }),
        challenge: fields.text({ label: "Reto", multiline: true }),
        approach: fields.text({ label: "Enfoque", multiline: true }),
        result: fields.text({ label: "Resultado", multiline: true }),
        liveUrl: fields.text({ label: "URL en vivo" }),
        services: fields.array(fields.text({ label: "Servicio" }), {
          label: "Servicios",
          itemLabel: (p) => p.value,
        }),
        palette: fields.array(
          fields.object({
            name: fields.text({ label: "Nombre" }),
            hex: fields.text({ label: "Hex" }),
          }),
          { label: "Paleta", itemLabel: (p) => p.fields.name.value || "Color" }
        ),
        typography: fields.array(
          fields.object({
            name: fields.text({ label: "Tipografía" }),
            role: fields.text({ label: "Uso" }),
          }),
          { label: "Tipografía", itemLabel: (p) => p.fields.name.value || "Fuente" }
        ),
        gallery: fields.array(
          fields.object({
            src: fields.text({ label: "Ruta de imagen (/public)" }),
            alt: fields.text({ label: "Alt" }),
            wide: fields.checkbox({ label: "Ancho completo", defaultValue: false }),
          }),
          { label: "Galería", itemLabel: (p) => p.fields.alt.value || "Imagen" }
        ),
      },
    }),
  },
});
