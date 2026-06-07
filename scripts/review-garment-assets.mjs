import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { PNG } from "pngjs";

const root = process.cwd();
const garments = ["shirt", "pants", "sport"];
const colors = ["sky-blue", "white", "navy", "terracotta", "gray"];
const views = ["front", "front-3q-right", "right", "back", "left", "front-3q-left", "fabric-detail"];

function readPng(path) {
  return PNG.sync.read(readFileSync(path));
}

function inspect(path, view) {
  const png = readPng(path);
  const samples = [];
  const edgeSamples = [];
  let nonWhite = 0;
  let alphaVisible = 0;
  const colorBuckets = new Set();

  for (let y = 0; y < png.height; y += 12) {
    for (let x = 0; x < png.width; x += 12) {
      const index = (png.width * y + x) << 2;
      const r = png.data[index];
      const g = png.data[index + 1];
      const b = png.data[index + 2];
      const a = png.data[index + 3];
      if (a > 12) alphaVisible++;
      if (a > 12 && !(r > 238 && g > 238 && b > 238)) nonWhite++;
      colorBuckets.add(`${Math.round(r / 16)}-${Math.round(g / 16)}-${Math.round(b / 16)}`);
      samples.push([r, g, b, a]);
      if (x < 48 || y < 48 || x > png.width - 48 || y > png.height - 48) edgeSamples.push([r, g, b, a]);
    }
  }

  const edgeClean =
    edgeSamples.filter(([r, g, b, a]) => a < 12 || (r > 225 && g > 225 && b > 225)).length / Math.max(edgeSamples.length, 1);
  const productRatio = nonWhite / Math.max(alphaVisible, 1);

  return {
    width: png.width,
    height: png.height,
    colorBuckets: colorBuckets.size,
    edgeClean: Number(edgeClean.toFixed(3)),
    productRatio: Number(productRatio.toFixed(3)),
    flags: [
      png.width !== 900 || png.height !== 900 ? "dimension-not-900" : null,
      view !== "fabric-detail" && edgeClean < 0.88 ? "background-edge-not-clean" : null,
      view !== "fabric-detail" && productRatio < 0.01 ? "too-empty" : null,
      view !== "fabric-detail" && productRatio > 0.72 ? "too-full-or-background-tinted" : null,
      colorBuckets.size < (view === "fabric-detail" ? 4 : 16) ? "possibly-flat-or-icon-like" : null,
    ].filter(Boolean),
  };
}

const rows = [];
for (const garment of garments) {
  for (const color of colors) {
    for (const view of views) {
      const path = join(root, "public", "assets", "garments", garment, color, `${view}.png`);
      if (!existsSync(path)) {
        rows.push({ garment, color, view, path, status: "missing", flags: ["missing"] });
        continue;
      }
      const result = inspect(path, view);
      rows.push({
        garment,
        color,
        view,
        path,
        status: result.flags.length > 0 ? "review" : "ok",
        ...result,
      });
    }
  }
}

const needsReview = rows.filter((row) => row.status !== "ok");
const report = {
  checked: rows.length,
  ok: rows.length - needsReview.length,
  needsReview: needsReview.length,
  rows,
};

const reportPath = join(root, "public", "assets", "garments", "asset-review-report.json");
writeFileSync(reportPath, JSON.stringify(report, null, 2));

if (needsReview.length > 0) {
  console.warn(JSON.stringify({ checked: report.checked, ok: report.ok, needsReview: report.needsReview }, null, 2));
  console.warn(`Review details saved to ${reportPath}`);
} else {
  console.log(JSON.stringify({ checked: report.checked, ok: report.ok, needsReview: 0, reportPath }, null, 2));
}
