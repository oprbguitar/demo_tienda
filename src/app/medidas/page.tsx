"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { MeasurementGuide } from "@/components/MeasurementGuide";
import { SectionTitle } from "@/components/SectionTitle";
import { readLocal, storageKeys, writeLocal } from "@/lib/storage";

const shirtFields = ["Cuello", "Hombros", "Pecho", "Cintura", "Cadera", "Largo de manga", "Largo total", "Bíceps", "Muñeca"];
const pantsFields = ["Cintura", "Cadera", "Tiro delantero", "Tiro posterior", "Muslo", "Rodilla", "Basta", "Largo exterior", "Largo interior"];

export default function MeasuresPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setValues(readLocal(storageKeys.medidas, {}));
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) writeLocal(storageKeys.medidas, values);
  }, [hydrated, values]);

  function update(field: string, value: string) {
    setValues((current) => ({ ...current, [field]: value.replace(/[^\d.,]/g, "") }));
  }

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle
          title="Registra tus medidas"
          description="Ingresa medidas en centímetros. Puedes completar solo las necesarias y pedir validación asistida al proveedor."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <MeasurementGuide title="Medidas para camisa" fields={shirtFields} values={values} onChange={update} />
            <MeasurementGuide title="Medidas para pantalón" fields={pantsFields} values={values} onChange={update} />
          </div>
          <aside className="space-y-4">
            {[
              ["Medición corporal casera", "Usa una cinta métrica flexible y toma medidas frente a un espejo, sin ajustar demasiado."],
              ["Medición con prenda existente", "Mide una camisa o pantalón que ya te quede bien y úsalo como referencia."],
              ["Medición asistida por proveedor", "El taller puede revisar proporciones antes de cortar la tela."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-black text-slate-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
            <Link href="/cotizaciones" className="flex h-12 items-center justify-center rounded-lg bg-blue-700 px-5 text-sm font-black text-white hover:bg-blue-800">
              Continuar a cotizaciones
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
}
