"use client";

import { useState } from "react";

interface City {
  name: string;
  x: number;
  y: number;
  /** lado de la etiqueta para evitar solapamientos */
  side?: "left" | "right";
}

// Coordenadas proyectadas (equirectangular) sobre el contorno real de Perú.
// viewBox 300 x 427 — ver scripts/peru-projection.
const cities: City[] = [
  { name: "Piura", x: 27.1, y: 124.3, side: "left" },
  { name: "Ferreñafe", x: 45.6, y: 156.5, side: "left" },
  { name: "Chiclayo", x: 44.5, y: 159.4, side: "left" },
  { name: "Trujillo", x: 62.3, y: 189.3, side: "left" },
  { name: "Chimbote", x: 71.9, y: 210.7, side: "left" },
  { name: "Nuevo Chimbote", x: 72.9, y: 213.8, side: "left" },
  { name: "Huaraz", x: 95.3, y: 220.7, side: "right" },
  { name: "Lima", x: 106, y: 276.8, side: "left" },
  { name: "Arequipa", x: 226.9, y: 373.9, side: "right" },
];

// Contorno real de Perú (GeoJSON simplificado proyectado).
const PERU_PATH =
  "M269.7,400 L263.8,411.4 L252.5,417 L230.5,404.3 L228.6,395.1 L185,372.8 L145.6,348.5 L128.7,334.7 L119.6,316.4 L123.2,309.9 L104.6,280.7 L82.9,239.7 L62.2,195.4 L53.2,185.2 L46.3,168.8 L29.2,154.3 L13.5,145.3 L20.6,135.4 L10,114.1 L16.8,98.6 L34.3,84.5 L37,93.8 L30.7,99.1 L31.3,107.2 L40.4,105.4 L49.2,107.9 L58.5,119.1 L70.9,109.9 L75,94.9 L88.5,75.6 L114.9,66.8 L138.9,43.5 L145.7,29 L142.6,12.1 L148.5,10 L163.1,20.5 L170.1,31 L180.3,36.8 L193.2,60.1 L209.6,62.9 L221.7,57 L229.6,60.9 L242.8,59 L259.6,69.4 L245.5,92 L252,92.5 L263,104.4 L243.2,103.3 L240.3,106.7 L222.3,111 L197.1,126.1 L195.6,136.5 L189.9,144.2 L192.1,156.3 L178.9,162.7 L178.9,172.1 L173.1,176.2 L182.2,196.2 L194.4,209.7 L189.8,219.3 L204.4,220.6 L212.7,232.5 L232.1,233 L250.1,219.9 L248.6,253.7 L258.6,256.3 L271,252.5 L290,288.3 L285.3,295.8 L284.2,311.4 L283.8,330.4 L275.2,341.5 L279.1,349.8 L274.1,357.2 L283.5,375.9 L269.7,400 Z";

export function PeruMap({ accent = "#7C3AED" }: { accent?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox="0 0 300 427"
        className="w-full max-w-[300px] drop-shadow-lg"
        aria-label="Mapa de cobertura en Perú"
      >
        <defs>
          <filter id="cityGlow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="peruFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`${accent}1a`} />
            <stop offset="100%" stopColor={`${accent}0a`} />
          </linearGradient>
        </defs>

        {/* Contorno de Perú */}
        <path
          d={PERU_PATH}
          fill="url(#peruFill)"
          stroke={`${accent}55`}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Pulse en hover */}
        {cities.map((c) =>
          hovered === c.name ? (
            <circle
              key={`p-${c.name}`}
              cx={c.x}
              cy={c.y}
              r="9"
              fill={`${accent}22`}
              className="animate-ping"
            />
          ) : null
        )}

        {/* Ciudades */}
        {cities.map((c) => {
          const isHover = hovered === c.name;
          const labelX = c.side === "right" ? c.x + 8 : c.x - 8;
          return (
            <g
              key={c.name}
              onMouseEnter={() => setHovered(c.name)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle cx={c.x} cy={c.y} r="5" fill={`${accent}30`} />
              <circle cx={c.x} cy={c.y} r="2.6" fill={accent} filter="url(#cityGlow)" />
              <text
                x={labelX}
                y={c.y + 2.5}
                textAnchor={c.side === "right" ? "start" : "end"}
                fontSize="7.5"
                fontWeight={isHover ? 700 : 600}
                fill={isHover ? accent : "currentColor"}
                opacity={isHover ? 1 : 0.7}
                className="select-none transition-all"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                {c.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
