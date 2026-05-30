import { ImageResponse } from "next/og";

// Node runtime — edge has issues with ImageResponse rendering
export const alt = "Dignita — Menos carga manual. Más control operativo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Acento naranja top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #FF5C1A, #FFAD6A)" }} />

        {/* Logo text */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "linear-gradient(135deg, #FF5C1A, #FF8A50)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 18, height: 18, background: "white", borderRadius: 3 }} />
          </div>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>Dignita</span>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 56, fontWeight: 700, color: "#111", lineHeight: 1.1, marginBottom: 24, maxWidth: 800 }}>
          Automatización e IA{" "}
          <span style={{ color: "#FF5C1A" }}>estratégica</span>
          {" "}para tu operación.
        </div>

        {/* Sub */}
        <div style={{ fontSize: 24, color: "#666", maxWidth: 700, lineHeight: 1.5 }}>
          Menos carga manual. Más control operativo.
        </div>

        {/* URL */}
        <div style={{ position: "absolute", bottom: 40, right: 80, fontSize: 18, color: "#999" }}>
          dignita.tech
        </div>
      </div>
    ),
    { ...size }
  );
}
