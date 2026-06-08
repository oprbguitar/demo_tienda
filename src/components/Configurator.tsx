"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, ClipboardList, LockKeyhole, Plus, Ruler } from "lucide-react";
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
  const [activeField, setActiveField] = useState(Object.keys(options)[0] ?? "");

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
  const visibleOptionEntries = getPrimaryOptionEntries(garment, options);

  function setValue(field: string, value: string) {
    setActiveField(field);
    setSelection((current) => ({ ...current, [field]: value }));
  }

  return (
    <main className="mx-auto min-h-[calc(100svh-64px)] max-w-[1500px] overflow-visible px-3 py-3 pb-20 sm:px-5 lg:px-6 xl:h-[calc(100vh-64px)] xl:overflow-hidden xl:pb-3">
      <div className="grid min-h-full gap-3 xl:h-full xl:grid-cols-[230px_minmax(0,1fr)_310px] xl:gap-4">
        <StepRail garment={garment} selection={selection} activeField={activeField} />

        <section className="min-h-0 overflow-visible rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4 xl:overflow-hidden">
          <div className="flex gap-4 border-b border-slate-200 pb-3 lg:items-start lg:justify-between">
            <div>
              <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-700">← Volver</Link>
              <h1 className="mt-2 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-2xl">{title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:leading-5">{subtitle}</p>
            </div>
            <button className="hidden h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-black text-blue-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 lg:inline-flex">
              <Bookmark size={17} /> Guardar
            </button>
          </div>

          <div className="grid min-h-0 gap-4 py-3 lg:grid-cols-[minmax(260px,0.86fr)_minmax(320px,1fr)] lg:gap-5 lg:py-4">
            <section className="lg:border-r lg:border-slate-200 lg:pr-7">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="text-[22px] font-black leading-tight text-slate-950 sm:text-lg">Vista previa</h2>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                  {selection.color}
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colorHex }} />
                </span>
              </div>
              <div className="mb-2">
                <ColorPalette options={colorOptions} selected={selection.color} onChange={(value) => setValue("color", value)} compact />
              </div>
              <Garment3DViewer
                garment={garment}
                colorHex={colorHex}
                colorName={selection.color}
                fabric={selection.tela}
                productName={selection.prenda}
              />
            </section>

            <section className="min-h-0 space-y-3">
              {visibleOptionEntries.map(([field, values]) => (
                <OptionGroup
                  key={field}
                  field={field}
                  values={values}
                  selected={selection[field]}
                  colorOptions={colorOptions}
                  colorHex={colorHex}
                  onChange={(value) => setValue(field, value)}
                  onActivate={() => setActiveField(field)}
                />
              ))}
            </section>
          </div>

          <div className="flex justify-center border-t border-slate-200 pt-3">
            <Link href="/medidas" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 text-sm font-black text-white shadow-sm hover:bg-blue-800 sm:w-auto sm:min-w-72 xl:h-10">
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

function getPrimaryOptionEntries(garment: GarmentType, options: Options) {
  const fieldsByGarment: Record<GarmentType, string[]> = {
    camisa: ["uso", "corte", "tela", "cuello"],
    pantalon: ["tipo", "corte", "tiro", "tela"],
    sport: ["prenda", "uso", "corte", "tela"],
  };

  return fieldsByGarment[garment]
    .filter((field) => options[field])
    .map((field) => [field, options[field]] as [string, string[]]);
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

function StepRail({ garment, selection, activeField }: { garment: GarmentType; selection: Selection; activeField: string }) {
  return (
    <aside className="hidden min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:block">
      <h2 className="font-black text-slate-950">Diseña tu {garment === "sport" ? "sport" : garment}</h2>
      <ol className="mt-4 space-y-2.5">
        {Object.entries(selection).map(([key, value], index) => (
          <li key={key} className="flex gap-2.5">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-black ${activeField === key ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-slate-50 text-slate-900"}`}>
              {index + 1}
            </span>
            <span className="min-w-0">
              <span className={`block text-sm font-black capitalize ${activeField === key ? "text-blue-800" : "text-slate-950"}`}>{key}</span>
              <span className="block truncate text-sm leading-4 text-slate-500">{value}</span>
            </span>
          </li>
        ))}
      </ol>
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
  onActivate,
}: {
  field: string;
  values: string[];
  selected: string;
  colorOptions: { name: string; hex: string }[];
  colorHex: string;
  onChange: (value: string) => void;
  onActivate: () => void;
}) {
  return (
    <section className="border-b border-slate-200 pb-3 last:border-b-0" onMouseEnter={onActivate}>
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2 className="text-base font-black capitalize text-slate-950">{field}</h2>
        <span className="text-sm font-semibold text-slate-500">{selected}</span>
      </div>
      {field === "color" ? (
        <div className="flex items-center gap-3">
          <ColorPalette options={colorOptions} selected={selected} onChange={onChange} compact />
          <button className="hidden h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-800">
            <Plus size={18} />
          </button>
        </div>
      ) : field === "tela" ? (
        <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-4">
          {values.slice(0, 4).map((value) => {
            const fabric = fabrics.find((item) => item.name === value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => onChange(value)}
                className={`min-w-0 rounded-lg border bg-white p-2 text-left text-[11px] font-bold leading-4 transition ${selected === value ? "border-blue-700 text-blue-700 ring-2 ring-blue-100" : "border-slate-200 text-slate-700 hover:border-blue-300"}`}
              >
                <span
                  className="mb-1.5 block h-9 rounded-md"
                  style={getFabricTextureStyle(colorHex, value)}
                />
                {value}
                <span className="mt-0.5 block truncate text-[10px] font-medium leading-3 text-slate-500">{fabric?.climate}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-4">
          {values.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              className={`min-h-10 min-w-0 overflow-hidden rounded-lg border px-2 py-1.5 text-center text-[12px] font-black leading-tight transition ${selected === value ? "border-blue-700 bg-white text-blue-700 ring-2 ring-blue-100" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50"}`}
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
    <aside className="hidden min-h-0 xl:block">
      <div className="max-h-full overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Resumen de tu prenda</h2>
        <div className="mt-3 flex gap-3 rounded-lg bg-slate-50 p-2.5">
          <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white shadow-sm">
            <Image
              src={summaryAsset.path}
              alt={`Vista resumida de ${displayName}`}
              fill
              sizes="112px"
              className="scale-125 object-contain"
            />
          </span>
          <div className="min-w-0 py-1">
            <p className="text-lg font-black capitalize text-slate-950">{displayName}</p>
            <p className="mt-1 text-sm text-slate-500">{selection.uso ?? selection.tipo} · {selection.corte}</p>
            <p className="mt-1 text-xl font-black text-blue-950">S/ {estimatedPrice.toFixed(2)}</p>
          </div>
        </div>
        <dl className="mt-3 space-y-1.5">
          {Object.entries(selection).map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4 border-b border-slate-100 pb-1.5 text-sm">
              <dt className="font-bold capitalize text-slate-500">{key}</dt>
              <dd className="flex items-center gap-2 text-right font-semibold text-slate-900">
                {key === "color" ? <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colorHex }} /> : null}
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 grid gap-2">
          <Link href="/medidas" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-black text-white hover:bg-blue-800">
            Continuar a medidas <Ruler size={17} />
          </Link>
          <Link href="/cotizaciones" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-black text-slate-950 hover:bg-slate-50">
            Ver cotizaciones <ClipboardList size={17} />
          </Link>
        </div>
        <p className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
          <LockKeyhole size={14} /> Tus datos se guardan temporalmente en este dispositivo.
        </p>
      </div>
    </aside>
  );
}
