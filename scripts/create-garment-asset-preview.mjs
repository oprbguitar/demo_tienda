import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const garments = [
  ["shirt", "Camisa"],
  ["pants", "Pantalon"],
  ["sport", "Sport"],
];
const colors = ["sky-blue", "white", "navy", "terracotta", "gray"];
const views = ["front", "front-3q-right", "right", "back", "left", "front-3q-left", "fabric-detail"];

const cards = garments
  .map(([garment, label]) => {
    const colorRows = colors
      .map((color) => {
        const images = views
          .map(
            (view) => `
              <figure>
                <img src="../assets/garments/${garment}/${color}/${view}.png" alt="${label} ${color} ${view}">
                <figcaption>${view}</figcaption>
              </figure>`
          )
          .join("");
        return `<section class="color"><h3>${color}</h3><div class="grid">${images}</div></section>`;
      })
      .join("");
    return `<section class="garment"><h2>${label}</h2>${colorRows}</section>`;
  })
  .join("");

const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PrendaExacta - Revision de assets</title>
  <style>
    body{margin:0;background:#f8fafc;color:#07122f;font-family:Inter,Arial,sans-serif}
    main{max-width:1440px;margin:auto;padding:32px}
    h1{font-size:34px;margin:0 0 6px;font-weight:900}
    p{margin:0 0 28px;color:#475569;font-weight:600}
    .garment{background:white;border:1px solid #dbe3ef;border-radius:8px;padding:22px;margin:0 0 28px;box-shadow:0 10px 30px rgba(15,23,42,.06)}
    h2{font-size:24px;margin:0 0 22px}
    h3{font-size:14px;margin:22px 0 10px;color:#334155}
    .grid{display:grid;grid-template-columns:repeat(7,minmax(110px,1fr));gap:12px}
    figure{margin:0;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;padding:8px}
    img{display:block;width:100%;aspect-ratio:1;object-fit:contain;background:white;border-radius:6px}
    figcaption{text-align:center;font-size:11px;font-weight:800;color:#64748b;margin-top:7px}
    @media(max-width:900px){main{padding:18px}.grid{grid-template-columns:repeat(2,1fr)}}
  </style>
</head>
<body>
  <main>
    <h1>Revision de assets multivista</h1>
    <p>Revisa calidad premium, consistencia de color, silueta y angulo. Regenera cualquier imagen que se vea plana o poco realista.</p>
    ${cards}
  </main>
</body>
</html>`;

const outputDir = join(process.cwd(), "public", "asset-preview");
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "index.html"), html);
console.log(`Preview created at ${join(outputDir, "index.html")}`);
