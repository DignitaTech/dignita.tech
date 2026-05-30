import { ImageResponse } from "next/og";
import { getProject } from "@/lib/ecosystem";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? "Proyecto";
  const sector = project?.sector ?? "Branding";
  const accent = project?.accent ?? "#FF5C1A";
  const summary = project?.summary ?? project?.description ?? "";

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start", padding: "80px",
        background: "#ffffff", fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: accent }} />
        <div style={{ fontSize: 16, fontWeight: 600, color: accent, textTransform: "uppercase", letterSpacing: 3, marginBottom: 24 }}>
          {sector} · Dignita
        </div>
        <div style={{ fontSize: 58, fontWeight: 700, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
          {title}
        </div>
        {summary ? (
          <div style={{ fontSize: 22, color: "#666", maxWidth: 700, lineHeight: 1.5 }}>
            {summary.slice(0, 110)}{summary.length > 110 ? "…" : ""}
          </div>
        ) : null}
        <div style={{ position: "absolute", bottom: 40, right: 80, fontSize: 18, color: "#999" }}>
          dignita.tech/proyectos
        </div>
      </div>
    ),
    { ...size }
  );
}
