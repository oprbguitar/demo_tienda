"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { QuoteCard } from "@/components/QuoteCard";
import { SectionTitle } from "@/components/SectionTitle";
import { quotes } from "@/data/quotes";
import { readLocal, storageKeys, writeLocal } from "@/lib/storage";

export default function QuotesPage() {
  const [selected, setSelected] = useState("q-diaz");

  useEffect(() => {
    queueMicrotask(() => {
      setSelected(readLocal(storageKeys.cotizacion, "q-diaz"));
    });
  }, []);

  function selectQuote(id: string) {
    setSelected(id);
    writeLocal(storageKeys.cotizacion, id);
  }

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle
          title="Compara cotizaciones de talleres"
          description="Revisa precio, plazo, tela incluida, ajuste posterior y zona antes de seleccionar un proveedor."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} selected={selected === quote.id} onSelect={() => selectQuote(quote.id)} />
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-5">
          <p className="font-black text-blue-950">Mejor relación calidad/plazo/precio</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Confecciones Diaz queda destacado por su equilibrio entre precio competitivo, plazo corto y ajuste posterior incluido.
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <Link href="/seguimiento" className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-700 px-6 text-sm font-black text-white hover:bg-blue-800">
            Ver seguimiento del pedido
          </Link>
        </div>
      </main>
    </div>
  );
}
