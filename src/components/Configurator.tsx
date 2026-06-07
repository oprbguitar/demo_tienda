"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, ClipboardList, Headphones, LockKeyhole, Plus, Ruler } from "lucide-react";
import { ColorPalette } from "@/components/ColorPalette";
import { Garment3DViewer } from "@/components/Garment3DViewer";
import { colors } from "@/data/colors";
import { fabrics } from "@/data/fabrics";
import type { GarmentType } from "@/data/garments";
import { getFabricTextureStyle } from "@/lib/fabricTexture";
import { getGarmentViewAssetByView } from "@/lib/garmentAssets";
import { readLocal, storageKeys, writeLocal } from "@/lib/storage";

type Options = Record<string, string[]>;

type ConfiguratorProps = {
  garment: GarmentType;
  title: string;
  subtitle: string;
  options: Options;
  basePrice: number;
};

type Selection = Record<string, string>;

export function Configurator({ garment, title, subtitle, options, basePrice }: ConfiguratorProps) {
  const storageKey = garment === "camisa" ? storageKeys.camisa : garment === "pantalon" ? storageKeys.pantalon : storageKeys.sport;
  const defaults = useMemo(
    () => Object.fromEntries(Object.entries(options).map(([key, values]) => [key, values[0] ?? ""])) as Selection,
    [options]
  );
  const [selection, setSelection] = useState<Selection>(defaults);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setSelection(sanitizeSelection(readLocal(storageKey, defaults), options, defaults));
      setHydrated(true);
    });
  }, [defaults, options, storageKey]);

  useEffect(() => {
    if (hydrated) writeLocal(storageKey, selection);
  }, [hydrated, selection, storageKey]);

  const selectedFabric = fabrics.find((fabric) => fabric.name === selection.tela);
  const selectedColor = colors.find((color) => color.name === selection.color);
  const colorHex = selectedColor?.hex ?? "#6f8fb8";
  const estimatedPrice = Math.round(basePrice * (selectedFabric?.priceFactor ?? 1) * 10) / 10;
  const displayName = garment === "sport" ? selection.prenda ?? "Sport" : garment === "pantalon" ? "Pantalón" : "Camisa";
  const colorOptions = colors.filter((color) => color.garment === garment || color.garment === "ambos").map((color) => ({ name: color.name, hex: color.hex }));

  function setValue(field: string, value: string) {
    setSelection((current) => ({ ...current, [field]: value }));
  }

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[250px_minmax(0,1fr)_340px]">
        <StepRail garment={garment} selection={selection} />

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-700">← Volver</Link>
              <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950">{title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p>
            </div>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 text-sm font-black text-blue-700 shadow-sm hover:border-blue-300 hover:bg-blue-50">
              <Bookmark size={20} /> Guardar diseño
            </button>
          </div>

          <div className="grid gap-7 py-6 lg:grid-cols-[minmax(280px,0.92fr)_minmax(280px,1fr)]">
            <section className="lg:border-r lg:border-slate-200 lg:pr-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-slate-950">Vista previa</h2>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-sm font-bold text-slate-600">
                  {selection.color}
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colorHex }} />
                </span>
              </div>
              <Garment3DViewer
                garment={garment}
                colorHex={colorHex}
                colorName={selection.color}
                fabric={selection.tela}
                productName={selection.prenda}
              />
              <p className="mt-5 text-xs leading-5 text-slate-500">
                La vista previa es referencial. El resultado final puede variar según tela, caída y confección.
              </p>
            </section>

            <section className="space-y-5">
              {Object.entries(options).map(([field, values]) => (
                <OptionGroup
                  key={field}
                  field={field}
                  values={values}
                  selected={selection[field]}
                  colorOptions={colorOptions}
                  colorHex={colorHex}
                  onChange={(value) => setValue(field, value)}
                />
              ))}
              <button className="flex h-11 items-center justify-center gap-2 text-sm font-black text-blue-700">
                Ver más opciones de confección <Plus size={17} />
              </button>
            </section>
          </div>

          <div className="flex justify-center border-t border-slate-200 pt-6">
            <Link href="/medidas" className="inline-flex h-12 min-w-80 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 text-sm font-black text-white shadow-sm hover:bg-blue-800">
              Continuar a medidas <Ruler size={17} />
            </Link>
          </div>
        </section>

        <SummaryPanel
          garment={garment}
          displayName={displayName}
          selection={selection}
          estimatedPrice={estimatedPrice}
          colorHex={colorHex}
        />
      </div>
    </main>
  );
}

function sanitizeSelection(selection: Selection, options: Options, defaults: Selection) {
  return Object.fromEntries(
    Object.entries(defaults).map(([field, fallback]) => {
      const allowedValues = options[field] ?? [];
      const currentValue = selection[field];
      return [field, allowedValues.includes(currentValue) ? currentValue : fallback];
    })
  ) as Selection;
}

function StepRail({ garment, selection }: { garment: GarmentType; selection: Selection }) {
  return (
    <aside className="hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:block">
      <h2 className="font-black text-slate-950">Diseña tu {garment === "sport" ? "sport" : garment}</h2>
      <ol className="mt-6 space-y-4">
        {Object.entries(selection).map(([key, value], index) => (
          <li key={key} className="flex gap-3">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-black ${index === 0 ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`}>
              {index + 1}
            </span>
            <span>
              <span className="block text-sm font-black capitalize text-slate-950">{key}</span>
              <span className="block text-sm leading-5 text-slate-500">{value}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-8 rounded-lg bg-cyan-50 p-4 text-sm text-slate-700">
        <div className="flex items-center justify-between gap-3">
          <p className="font-black text-slate-950">¿Necesitas ayuda?</p>
          <Headphones className="text-blue-700" size={20} />
        </div>
        <p className="mt-2 leading-6">Un proveedor podrá validar tus medidas antes de cortar la tela.</p>
        <button className="mt-4 h-10 w-full rounded-lg border border-slate-200 bg-white text-sm font-black text-blue-700">
          Contactar proveedor
        </button>
      </div>
    </aside>
  );
}

function OptionGroup({
  field,
  values,
  selected,
  colorOptions,
  colorHex,
  onChange,
}: {
  field: string;
  values: string[];
  selected: string;
  colorOptions: { name: string; hex: string }[];
  colorHex: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="border-b border-slate-200 pb-5 last:border-b-0">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-lg font-black capitalize text-slate-950">{field}</h2>
        <span className="text-sm font-semibold text-slate-500">{selected}</span>
      </div>
      {field === "color" ? (
        <div className="flex items-center gap-3">
          <ColorPalette options={colorOptions} selected={selected} onChange={onChange} compact />
          <button className="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 text-slate-800">
            <Plus size={18} />
          </button>
        </div>
      ) : field === "tela" ? (
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {values.slice(0, 4).map((value) => {
            const fabric = fabrics.find((item) => item.name === value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => onChange(value)}
                className={`rounded-lg border bg-white p-2 text-left text-xs font-bold transition ${selected === value ? "border-blue-700 text-blue-700 ring-2 ring-blue-100" : "border-slate-200 text-slate-700 hover:border-blue-300"}`}
              >
                <span
                  className="mb-2 block h-14 rounded-md"
                  style={getFabricTextureStyle(colorHex, value)}
                />
                {value}
                <span className="mt-1 block text-[11px] font-medium leading-4 text-slate-500">{fabric?.climate}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {values.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              className={`min-h-11 rounded-lg border px-3 py-2 text-center text-sm font-black transition ${selected === value ? "border-blue-700 bg-white text-blue-700 ring-2 ring-blue-100" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50"}`}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function SummaryPanel({
  garment,
  displayName,
  selection,
  estimatedPrice,
  colorHex,
}: {
  garment: GarmentType;
  displayName: string;
  selection: Selection;
  estimatedPrice: number;
  colorHex: string;
}) {
  const summaryAsset = getGarmentViewAssetByView(garment, selection.color ?? "gray", "front-3q-right");

  return (
    <aside className="xl:sticky xl:top-24 xl:self-start">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Resumen de tu prenda</h2>
        <div className="mt-4 flex gap-3 rounded-lg bg-slate-50 p-3">
          <span className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-white shadow-sm">
            <Image
              src={summaryAsset.path}
              alt={`Vista resumida de ${displayName}`}
              fill
              sizes="112px"
              className="scale-125 object-contain"
            />
          </span>
          <div className="min-w-0 py-2">
            <p className="text-xl font-black capitalize text-slate-950">{displayName}</p>
            <p className="mt-1 text-sm text-slate-500">{selection.uso ?? selection.tipo} · {selection.corte}</p>
            <p className="mt-2 text-xl font-black text-blue-950">S/ {estimatedPrice.toFixed(2)}</p>
          </div>
        </div>
        <dl className="mt-5 space-y-3">
          {Object.entries(selection).map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4 border-b border-slate-100 pb-2 text-sm">
              <dt className="font-bold capitalize text-slate-500">{key}</dt>
              <dd className="flex items-center gap-2 text-right font-semibold text-slate-900">
                {key === "color" ? <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colorHex }} /> : null}
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 rounded-lg bg-cyan-50 p-4 text-center">
          <p className="text-sm font-bold text-slate-600">Precio estimado</p>
          <p className="text-3xl font-black text-blue-950">S/ {estimatedPrice.toFixed(2)}</p>
          <p className="mt-1 text-xs text-slate-500">El precio final puede variar según el taller.</p>
        </div>
        <div className="mt-4 grid gap-3">
          <Link href="/medidas" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-black text-white hover:bg-blue-800">
            Continuar a medidas <Ruler size={17} />
          </Link>
          <Link href="/cotizaciones" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-black text-slate-950 hover:bg-slate-50">
            Ver cotizaciones <ClipboardList size={17} />
          </Link>
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
          <LockKeyhole size={14} /> Tus datos se guardan temporalmente en este dispositivo.
        </p>
      </div>
      <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
        La estructura queda lista para conectar clientes, proveedores y pedidos a Supabase más adelante.
      </div>
    </aside>
  );
}
