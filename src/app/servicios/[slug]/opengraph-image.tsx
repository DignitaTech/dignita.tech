import { ImageResponse } from "next/og";
import { getService } from "@/lib/ecosystem";

// Node runtime
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  const title = service?.title ?? "Servicio";
  const description = service?.summary ?? service?.description ?? "";

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start", padding: "80px",
        background: "#ffffff", fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #FF5C1A, #FFAD6A)" }} />
        <div style={{ fontSize: 16, fontWeight: 600, color: "#FF5C1A", textTransform: "uppercase", letterSpacing: 3, marginBottom: 24 }}>
          Servicio · Dignita
        </div>
        <div style={{ fontSize: 54, fontWeight: 700, color: "#111", lineHeight: 1.1, marginBottom: 24, maxWidth: 900 }}>
          {title}
        </div>
        {description ? (
          <div style={{ fontSize: 22, color: "#666", maxWidth: 700, lineHeight: 1.5 }}>
            {description.slice(0, 120)}{description.length > 120 ? "…" : ""}
          </div>
        ) : null}
        <div style={{ position: "absolute", bottom: 40, right: 80, fontSize: 18, color: "#999" }}>
          dignita.tech/servicios
        </div>
      </div>
    ),
    { ...size }
  );
}
