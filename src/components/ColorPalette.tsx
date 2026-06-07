import { Check } from "lucide-react";

type ColorPaletteProps = {
  options: { name: string; hex: string }[];
  selected: string;
  onChange: (value: string) => void;
  compact?: boolean;
};

export function ColorPalette({ options, selected, onChange, compact = false }: ColorPaletteProps) {
  return (
    <div className={compact ? "flex flex-wrap gap-2" : "grid grid-cols-2 gap-3 sm:grid-cols-4"}>
      {options.map((color) => (
        <button
          key={color.name}
          type="button"
          onClick={() => onChange(color.name)}
          aria-label={color.name}
          className={`rounded-lg border text-left transition ${
            selected === color.name ? "border-blue-700 ring-2 ring-blue-100" : "border-slate-200 hover:border-blue-300"
          } ${compact ? "h-12 w-12 p-1" : "p-2"}`}
        >
          <span className={`grid place-items-center rounded-md ${compact ? "h-full" : "h-16"}`} style={{ backgroundColor: color.hex }}>
            {selected === color.name ? <Check className="text-blue-950 drop-shadow" size={20} /> : null}
          </span>
          {compact ? null : <span className="mt-2 block text-xs font-bold text-slate-800">{color.name}</span>}
        </button>
      ))}
    </div>
  );
}
