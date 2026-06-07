import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const garments = ["shirt", "pants", "sport"];
const colors = ["sky-blue", "white", "navy", "terracotta", "gray"];
const views = ["front", "front-3q-right", "right", "back", "left", "front-3q-left", "fabric-detail"];

const angleCases = [
  [0, "front"],
  [44, "front-3q-right"],
  [90, "right"],
  [181, "back"],
  [270, "left"],
  [316, "front-3q-left"],
  [359, "front"],
];

function closestView(angle) {
  const normalized = ((angle % 360) + 360) % 360;
  const candidates = [
    ["front", 0],
    ["front-3q-right", 45],
    ["right", 90],
    ["back", 180],
    ["left", 270],
    ["front-3q-left", 315],
    ["front", 360],
  ];
  return candidates.reduce(
    (best, candidate) => {
      const distance = Math.abs(normalized - candidate[1]);
      return distance < best.distance ? { view: candidate[0], distance } : best;
    },
    { view: "front", distance: Number.POSITIVE_INFINITY }
  ).view;
}

const missing = [];
for (const garment of garments) {
  for (const color of colors) {
    for (const view of views) {
      const path = join(root, "public", "assets", "garments", garment, color, `${view}.png`);
      if (!existsSync(path)) missing.push(path);
    }
  }
}

const wrongAngles = angleCases.filter(([angle, expected]) => closestView(angle) !== expected);
const fallbackPath = join(root, "public", "assets", "garments", "shirt", "gray", "front.png");

if (missing.length > 0 || wrongAngles.length > 0 || !existsSync(fallbackPath)) {
  console.error(JSON.stringify({ missing, wrongAngles, fallbackExists: existsSync(fallbackPath) }, null, 2));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      checkedAssets: garments.length * colors.length * views.length,
      angleCases: angleCases.length,
      fallbackExists: true,
    },
    null,
    2
  )
);
