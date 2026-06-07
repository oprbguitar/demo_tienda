import type { GarmentType } from "@/data/garments";

export type GarmentAssetType = "shirt" | "pants" | "sport";
export type GarmentViewKey = "front" | "front-3q-right" | "right" | "back" | "left" | "front-3q-left" | "fabric-detail";
export type RotatableGarmentViewKey = Exclude<GarmentViewKey, "fabric-detail">;
export type GarmentColorKey =
  | "sky-blue"
  | "white"
  | "navy"
  | "terracotta"
  | "beige"
  | "gray"
  | "petroleum-blue"
  | "olive"
  | "burgundy"
  | "black";

export const garmentViews: GarmentViewKey[] = ["front", "front-3q-right", "right", "back", "left", "front-3q-left", "fabric-detail"];
export const rotatableGarmentViews: RotatableGarmentViewKey[] = ["front", "front-3q-right", "right", "back", "left", "front-3q-left"];
export const garmentAssetColors: GarmentColorKey[] = [
  "sky-blue",
  "white",
  "navy",
  "terracotta",
  "gray",
];

const colorAliases: Record<string, GarmentColorKey> = {
  "azul cielo": "sky-blue",
  "azul acero": "sky-blue",
  celeste: "sky-blue",
  blanco: "white",
  "blanco roto": "white",
  "azul marino": "navy",
  navy: "navy",
  "azul petróleo": "petroleum-blue",
  "azul petroleo": "petroleum-blue",
  terracota: "terracotta",
  terracotta: "terracotta",
  arena: "beige",
  beige: "beige",
  caqui: "beige",
  "caqui suave": "beige",
  gris: "gray",
  "gris claro": "gray",
  plata: "gray",
  "verde oliva": "olive",
  oliva: "olive",
  "verde militar": "olive",
  vino: "burgundy",
  borgoña: "burgundy",
  burgundy: "burgundy",
  negro: "black",
  black: "black",
};

const viewAngles: Array<{ view: RotatableGarmentViewKey; angle: number }> = [
  { view: "front", angle: 0 },
  { view: "front-3q-right", angle: 45 },
  { view: "right", angle: 90 },
  { view: "back", angle: 180 },
  { view: "left", angle: 270 },
  { view: "front-3q-left", angle: 315 },
  { view: "front", angle: 360 },
];

export function normalizeGarmentType(garmentType: GarmentType): GarmentAssetType {
  if (garmentType === "camisa") return "shirt";
  if (garmentType === "pantalon") return "pants";
  return "sport";
}

export function normalizeGarmentColor(colorName: string): GarmentColorKey {
  const normalized = colorName.trim().toLowerCase();
  return colorAliases[normalized] ?? "gray";
}

export function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

export function getClosestViewByAngle(angle: number): RotatableGarmentViewKey {
  const normalized = normalizeAngle(angle);
  let closest = viewAngles[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const candidate of viewAngles) {
    const distance = Math.abs(normalized - candidate.angle);
    if (distance < closestDistance) {
      closest = candidate;
      closestDistance = distance;
    }
  }

  return closest.view;
}

export function getGarmentViewAsset(garmentType: GarmentType, colorName: string, angle: number) {
  const garment = normalizeGarmentType(garmentType);
  const color = normalizeGarmentColor(colorName);
  const view = getClosestViewByAngle(angle);

  return {
    garment,
    color,
    view,
    path: `/assets/garments/${garment}/${color}/${view}.png`,
    fallbackPath: `/assets/garments/${garment}/gray/${view}.png`,
  };
}

export function getGarmentViewAssetByView(garmentType: GarmentType, colorName: string, view: GarmentViewKey) {
  const garment = normalizeGarmentType(garmentType);
  const color = normalizeGarmentColor(colorName);

  return {
    garment,
    color,
    view,
    path: `/assets/garments/${garment}/${color}/${view}.png`,
    fallbackPath: `/assets/garments/${garment}/gray/${view}.png`,
  };
}
