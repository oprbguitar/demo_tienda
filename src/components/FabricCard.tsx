import { Check } from "lucide-react";

type FabricCardProps = {
  label: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
};

export function FabricCard({ label, description, selected, onClick }: FabricCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative min-h-28 rounded-lg border p-3 text-left shadow-sm transition ${
        selected ? "border-blue-700 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 bg-white hover:border-blue-300"
      }`}
    >
      <div className="mb-3 h-12 rounded-md bg-[linear-gradient(135deg,#ffffff,#d8e5fb_48%,#8caee7_49%,#f5f8ff)]" />
      <span className="block text-sm font-black text-slate-950">{label}</span>
      {description ? <span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span> : null}
      {selected ? (
        <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-blue-950 text-white">
          <Check size={15} />
        </span>
      ) : null}
    </button>
  );
}
