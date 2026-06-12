import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";
import { stat } from "node:fs/promises";

const kb = async (p) => `${((await stat(p)).size / 1024).toFixed(0)}KB`;

// Foto de equipo: 1254px/1.8MB -> 512px webp (se muestra a 96px)
const foto = "public/equipo/leonidas-yauri.png";
await sharp(foto)
  .resize(512, 512, { fit: "cover" })
  .webp({ quality: 82 })
  .toFile("public/equipo/leonidas-yauri.webp");
console.log("foto:", await kb(foto), "->", await kb("public/equipo/leonidas-yauri.webp"));

// Logo principal: 1083px/204KB -> 640px png con paleta (nav/footer lo muestran <160px)
const logo = "public/logo-dignita.png";
const logoBuf = await sharp(logo)
  .resize({ width: 640 })
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toBuffer();
await sharp(logoBuf).toFile(logo);
console.log("logo:", await kb(logo));

// Icon: recomprimir con paleta manteniendo dimensiones
const icon = "src/app/icon.png";
const iconBuf = await sharp(icon)
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toBuffer();
await sharp(iconBuf).toFile(icon);
console.log("icon:", await kb(icon));
