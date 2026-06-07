import { Clock, Scissors, ShieldCheck, Star } from "lucide-react";
import type { Quote } from "@/data/quotes";

type QuoteCardProps = {
  quote: Quote;
  selected?: boolean;
  onSelect?: () => void;
};

export function QuoteCard({ quote, selected, onSelect }: QuoteCardProps) {
  return (
    <article className={`rounded-lg border bg-white p-5 shadow-sm ${selected ? "border-blue-700 ring-2 ring-blue-100" : "border-slate-200"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-950">{quote.providerName}</h3>
            {quote.highlighted ? <span className="rounded-full bg-cyan-50 px-2 py-1 text-xs font-black text-cyan-800">Mejor balance</span> : null}
          </div>
          <p className="mt-1 text-sm text-slate-500">{quote.zone}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-blue-950">S/ {quote.price.toFixed(2)}</p>
          <p className="text-xs font-semibold text-slate-500">{quote.deliveryDays}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{quote.comment}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
        <span className="flex items-center gap-2"><Star size={16} className="text-amber-500" /> {quote.rating}</span>
        <span className="flex items-center gap-2"><Clock size={16} /> {quote.deliveryDays}</span>
        <span className="flex items-center gap-2"><Scissors size={16} /> {quote.includesFabric ? "Incluye tela" : "Tela aparte"}</span>
        <span className="flex items-center gap-2"><ShieldCheck size={16} /> {quote.includesAdjustment ? "Incluye ajuste" : "Sin ajuste"}</span>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className="mt-5 h-11 w-full rounded-lg bg-blue-700 px-4 text-sm font-black text-white shadow-sm transition hover:bg-blue-800"
      >
        {selected ? "Cotización seleccionada" : "Seleccionar cotización"}
      </button>
    </article>
  );
}
