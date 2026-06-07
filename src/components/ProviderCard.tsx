import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import type { Provider } from "@/data/providers";

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="relative h-40 bg-slate-100">
        <Image src="/assets/prendaexacta-assets.png" alt="" fill sizes="360px" className="object-cover" style={{ objectPosition: "right center" }} />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-black text-slate-950">{provider.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin size={14} /> {provider.district}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-sm font-black text-amber-700">
            <Star size={15} fill="currentColor" /> {provider.rating}
          </span>
        </div>
        <p className="mt-3 text-sm font-semibold text-blue-800">{provider.specialty}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{provider.comment}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <Metric label="Acabado" value={provider.quality} />
          <Metric label="Ajuste" value={provider.fit} />
          <Metric label="Puntualidad" value={provider.punctuality} />
          <Metric label="Comunicación" value={provider.communication} />
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-slate-50 p-2">
      <span className="block font-bold text-slate-950">{value}</span>
      <span>{label}</span>
    </div>
  );
}
