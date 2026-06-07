import Image from "next/image";
import { garmentAssetColors, garmentViews, type GarmentAssetType } from "@/lib/garmentAssets";

const garments: Array<{ key: GarmentAssetType; label: string }> = [
  { key: "shirt", label: "Camisa" },
  { key: "pants", label: "Pantalon" },
  { key: "sport", label: "Sport" },
];

const viewLabels: Record<string, string> = {
  front: "Frontal",
  "front-3q-right": "3/4 derecha",
  right: "Lateral",
  back: "Espalda",
  left: "Lateral izq.",
  "front-3q-left": "3/4 izquierda",
  "fabric-detail": "Detalle tela",
};

export default function AssetPreviewPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2 border-b border-slate-200 pb-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-700">PrendaExacta</p>
          <h1 className="text-3xl font-black">Revision de assets multivista</h1>
          <p className="max-w-3xl text-sm font-medium leading-6 text-slate-600">
            Vista interna para revisar consistencia visual por prenda, color y angulo. Si una imagen se ve plana,
            infantil o poco premium, debe regenerarse antes de usarla en produccion.
          </p>
        </div>

        <div className="space-y-10">
          {garments.map((garment) => (
            <section key={garment.key} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black">{garment.label}</h2>
                  <p className="text-sm font-semibold text-slate-500">5 colores x 7 vistas</p>
                </div>
              </div>

              <div className="space-y-8">
                {garmentAssetColors.map((color) => (
                  <div key={`${garment.key}-${color}`}>
                    <h3 className="mb-3 text-sm font-black text-slate-700">{color}</h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
                      {garmentViews.map((view) => (
                        <figure key={`${garment.key}-${color}-${view}`} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                          <div className="relative aspect-square overflow-hidden rounded-md bg-white">
                            <Image
                              src={`/assets/garments/${garment.key}/${color}/${view}.png`}
                              alt={`${garment.label} ${color} ${view}`}
                              fill
                              sizes="180px"
                              className="object-contain"
                            />
                          </div>
                          <figcaption className="mt-2 truncate text-center text-[11px] font-black text-slate-600">
                            {viewLabels[view]}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
