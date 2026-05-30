"use client";

import { useState } from "react";

interface City {
  name: string;
  x: number;
  y: number;
  label?: string;
}

const cities: City[] = [
  { name: "Piura", x: 118, y: 78, label: "Piura" },
  { name: "Chiclayo", x: 130, y: 132, label: "Chiclayo" },
  { name: "Trujillo", x: 138, y: 172, label: "Trujillo" },
  { name: "Chimbote", x: 143, y: 214, label: "Chimbote" },
  { name: "Nuevo Chimbote", x: 155, y: 230, label: "Nuevo Chimbote" },
  { name: "Lima", x: 148, y: 295, label: "Lima" },
  { name: "Arequipa", x: 194, y: 408, label: "Arequipa" },
];

// Simplified Peru outline path (normalized to ~300x480 viewBox)
const PERU_PATH = `
  M 148,18 L 162,22 L 175,30 L 188,28 L 202,35 L 215,42 L 225,55
  L 230,68 L 235,82 L 238,96 L 240,112 L 237,128 L 230,140
  L 228,155 L 232,168 L 238,182 L 242,198 L 245,215 L 243,230
  L 240,246 L 238,262 L 242,276 L 248,290 L 252,305 L 255,320
  L 258,336 L 260,352 L 258,368 L 254,382 L 250,396 L 245,410
  L 238,422 L 228,432 L 215,438 L 200,442 L 185,440 L 170,435
  L 155,430 L 140,425 L 125,418 L 112,408 L 100,396 L 90,382
  L 82,368 L 78,352 L 76,336 L 78,320 L 82,305 L 85,290
  L 82,276 L 78,262 L 72,248 L 65,234 L 60,220 L 58,205
  L 55,190 L 52,175 L 50,160 L 52,145 L 58,132 L 65,118
  L 70,104 L 72,90 L 75,76 L 80,63 L 88,52 L 98,42
  L 108,34 L 120,26 L 133,20 Z
`;

export function PeruMap({ accent = "#7C3AED" }: { accent?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox="0 0 300 480"
        className="w-full max-w-xs drop-shadow-lg"
        aria-label="Mapa de operaciones en Perú"
      >
        {/* Ocean background subtle */}
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`${accent}08`} />
            <stop offset="100%" stopColor={`${accent}03`} />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Peru silhouette */}
        <path
          d={PERU_PATH}
          fill={`${accent}12`}
          stroke={`${accent}40`}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Pulse rings on hovered city */}
        {cities.map((city) =>
          hovered === city.name ? (
            <circle
              key={`pulse-${city.name}`}
              cx={city.x}
              cy={city.y}
              r="14"
              fill={`${accent}20`}
              className="animate-ping"
            />
          ) : null
        )}

        {/* City dots */}
        {cities.map((city) => (
          <g
            key={city.name}
            onMouseEnter={() => setHovered(city.name)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            {/* outer ring */}
            <circle
              cx={city.x}
              cy={city.y}
              r="8"
              fill={`${accent}25`}
              stroke={`${accent}60`}
              strokeWidth="1"
            />
            {/* inner dot */}
            <circle
              cx={city.x}
              cy={city.y}
              r="4"
              fill={accent}
              filter="url(#glow)"
            />
            {/* label */}
            <text
              x={city.x + 12}
              y={city.y + 4}
              fontSize="9"
              fontWeight="600"
              fill={accent}
              className="select-none"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {city.label ?? city.name}
            </text>
          </g>
        ))}

        {/* "Perú" label */}
        <text
          x="155"
          y="340"
          textAnchor="middle"
          fontSize="11"
          fontWeight="500"
          fill="currentColor"
          opacity="0.25"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          PERÚ
        </text>
      </svg>
    </div>
  );
}
