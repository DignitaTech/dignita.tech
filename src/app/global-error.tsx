"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0e1a",
          color: "#e7ecf5",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Algo salió mal
        </h1>
        <p style={{ marginTop: "0.5rem", opacity: 0.7 }}>
          Ocurrió un error inesperado.
        </p>
        <button
          onClick={() => reset()}
          style={{
            marginTop: "1.5rem",
            height: 44,
            padding: "0 1.5rem",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            color: "#0a0e1a",
            fontWeight: 500,
            background: "linear-gradient(90deg,#7fe3f0,#6aa6f0,#9b8cf5)",
          }}
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
