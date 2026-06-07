import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

type Garment = "shirt" | "pants" | "sport";
type View = "front" | "front-3q-right" | "right" | "back" | "left" | "front-3q-left" | "fabric-detail";

const garments: Garment[] = ["shirt", "pants", "sport"];
const colors = {
  "sky-blue": "soft sky blue",
  white: "warm premium white",
  navy: "deep navy blue",
  terracotta: "warm terracotta",
  gray: "light neutral gray",
} as const;
const views: View[] = ["front", "front-3q-right", "right", "back", "left", "front-3q-left", "fabric-detail"];

const viewCopy: Record<View, string> = {
  front: "straight front view",
  "front-3q-right": "premium three-quarter front view turned slightly to the right",
  right: "clean right side profile view",
  back: "straight back view",
  left: "clean left side profile view",
  "front-3q-left": "premium three-quarter front view turned slightly to the left",
  "fabric-detail": "macro fabric close-up texture only, no full garment",
};

const garmentCopy: Record<Garment, string> = {
  shirt:
    "men's long sleeve tailored dress shirt, structured collar, button placket, cuffs, subtle seams, premium cotton poplin finish",
  pants:
    "men's tailored trousers, waistband, belt loops, fly closure, side pockets, center creases, clean hem, premium gabardine finish",
  sport:
    "men's premium sportwear set, clean crew neck t-shirt and jogger pant, elastic waistband, drawstring, ribbed cuffs, soft jersey cotton finish",
};

function promptFor(garment: Garment, colorKey: keyof typeof colors, view: View) {
  if (view === "fabric-detail") {
    return [
      `Photorealistic premium ecommerce macro fabric texture for ${garmentCopy[garment]}.`,
      `Fabric color: ${colors[colorKey]}.`,
      "Clean studio lighting, subtle weave, realistic fibers, elegant textile detail, square composition.",
      "No text, no logo, no icon, no illustration, no childish style, no wireframe, no hanger, no human model.",
    ].join(" ");
  }

  return [
    `Photorealistic premium ecommerce product image of a ${garmentCopy[garment]}.`,
    `Color: ${colors[colorKey]}. View: ${viewCopy[view]}.`,
    "Floating isolated garment, consistent proportions, visible stitching and construction details, soft natural shadows, white or very light warm studio background, luxury catalog quality, square image.",
    "No person, no mannequin body, no hanger, no text, no logo, no watermark, no flat vector, no icon, no wireframe, no cartoon, no cheap mockup, no childish style.",
  ].join(" ");
}

async function imageToBuffer(item: { b64_json?: string; url?: string }) {
  if (item.b64_json) return Buffer.from(item.b64_json, "base64");
  if (!item.url) throw new Error("The image response did not include b64_json or url.");

  const response = await fetch(item.url);
  if (!response.ok) throw new Error(`Could not download generated image: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

async function generateAsset(garment: Garment, color: keyof typeof colors, view: View, apiKey: string) {
  const outputPath = join(process.cwd(), "public", "assets", "garments", garment, color, `${view}.png`);
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: promptFor(garment, color, view),
      size: "1024x1024",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Image generation failed for ${garment}/${color}/${view}: ${response.status} ${body}`);
  }

  const payload = (await response.json()) as { data?: Array<{ b64_json?: string; url?: string }> };
  const firstImage = payload.data?.[0];
  if (!firstImage) throw new Error(`Image generation returned no images for ${garment}/${color}/${view}.`);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, await imageToBuffer(firstImage));
  console.log(`Generated ${outputPath}`);
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OPENAI_API_KEY is not set. Skipping real garment image generation without failing.");
    return;
  }

  for (const garment of garments) {
    for (const color of Object.keys(colors) as Array<keyof typeof colors>) {
      for (const view of views) {
        await generateAsset(garment, color, view, apiKey);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
