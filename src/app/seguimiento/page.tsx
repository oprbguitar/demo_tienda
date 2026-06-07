"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { OrderTimeline } from "@/components/OrderTimeline";
import { SectionTitle } from "@/components/SectionTitle";
import { orderStatuses } from "@/data/garments";
import { quotes } from "@/data/quotes";
import { readLocal, storageKeys } from "@/lib/storage";

export default function TrackingPage() {
  const [shirt, setShirt] = useState<Record<string, string>>({});
  const [pants, setPants] = useState<Record<string, string>>({});
  const [sport, setSport] = useState<Record<string, string>>({});
  const [quoteId, setQuoteId] = useState("q-diaz");

  useEffect(() => {
    queueMicrotask(() => {
      setShirt(readLocal(storageKeys.camisa, {}));
      setPants(readLocal(storageKeys.pantalon, {}));
      setSport(readLocal(storageKeys.sport, {}));
      setQuoteId(readLocal(storageKeys.cotizacion, "q-diaz"));
    });
  }, []);

  const quote = quotes.find((item) => item.id === quoteId) ?? quotes[0];
  const order = useMemo(() => {
    const candidates = [shirt, pants, sport];
    return candidates.sort((a, b) => Object.keys(b).length - Object.keys(a).length)[0] ?? {};
  }, [pants, shirt, sport]);

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle title="Seguimiento del pedido" description="Estado simulado del pedido guardado en este navegador." />
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
          <OrderTimeline statuses={orderStatuses} currentIndex={3} />
          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">Resumen guardado</h2>
            <div className="mt-4 rounded-lg bg-blue-50 p-4">
              <p className="text-sm font-bold text-slate-500">Proveedor seleccionado</p>
              <p className="mt-1 text-xl font-black text-blue-950">{quote.providerName}</p>
              <p className="text-sm text-slate-600">{quote.zone} · S/ {quote.price.toFixed(2)}</p>
            </div>
            <dl className="mt-5 space-y-3">
              {Object.entries(order).slice(0, 10).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 border-b border-slate-100 pb-2 text-sm">
                  <dt className="font-bold capitalize text-slate-500">{key}</dt>
                  <dd className="text-right font-semibold text-slate-900">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </main>
    </div>
  );
}
