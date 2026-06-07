"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { ProviderCard } from "@/components/ProviderCard";
import { SectionTitle } from "@/components/SectionTitle";
import { providers } from "@/data/providers";

const filters = ["Todos", "Camisas", "Pantalones", "Entrega rápida", "Mejor acabado", "Mejor precio"];

export default function ProvidersPage() {
  const [filter, setFilter] = useState("Todos");
  const filteredProviders = useMemo(() => {
    return providers
      .filter((provider) => {
        if (filter === "Entrega rápida") return provider.fastDelivery;
        if (filter === "Mejor acabado") return provider.bestFinish;
        if (filter === "Mejor precio") return provider.bestPrice;
        if (filter === "Camisas") return provider.specialty.toLowerCase().includes("camisa") || provider.specialty.toLowerCase().includes("sastreria");
        if (filter === "Pantalones") return provider.specialty.toLowerCase().includes("pantal");
        return true;
      })
      .sort((a, b) => b.rating - a.rating);
  }, [filter]);

  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle
          title="Ranking de proveedores"
          description="Costureros y talleres de Lima ordenados por rating, pedidos, acabado, precisión de ajuste y puntualidad."
        />
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`h-10 shrink-0 rounded-lg px-4 text-sm font-black ${
                filter === item ? "bg-blue-700 text-white" : "border border-slate-200 bg-white text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </main>
    </div>
  );
}
