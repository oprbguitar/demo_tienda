import type { GarmentType } from "@/data/garments";

type GarmentPreviewProps = {
  garment: GarmentType;
  colorName: string;
  colorHex: string;
  fabric?: string;
  variant?: string;
  productName?: string;
  large?: boolean;
};

export function GarmentPreview({ garment, colorName, colorHex, fabric, variant, productName, large = false }: GarmentPreviewProps) {
  const label = variant ?? (garment === "sport" ? "Vista sport" : "Vista frontal");

  return (
    <div className={large ? "" : "rounded-lg border border-slate-200 bg-white p-3 shadow-sm"}>
      <div className={`relative grid place-items-center overflow-hidden rounded-lg bg-[radial-gradient(circle_at_30%_20%,#ffffff,#f5f8ff_55%,#eef3fb)] ${large ? "min-h-[320px] sm:min-h-[420px]" : "aspect-[4/3]"}`}>
        <GarmentSvg garment={garment} color={colorHex} productName={productName} large={large} />
        <div className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-[11px] font-black text-slate-700 shadow-sm">
          {colorName}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm font-black text-slate-950">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{fabric ?? "Tela seleccionada"}</p>
      </div>
    </div>
  );
}

export function GarmentSvg({ garment, color, productName, large = false }: { garment: GarmentType; color: string; productName?: string; large?: boolean }) {
  const className = `${large ? "h-[86%] w-[86%]" : "h-[82%] w-[82%]"} drop-shadow-xl`;
  if (garment === "pantalon") return <PantsSvg color={color} className={className} />;
  if (garment === "sport") return <SportSvg color={color} productName={productName} className={className} />;
  return <ShirtSvg color={color} className={className} />;
}

function ShirtSvg({ color, className = "h-[82%] w-[82%] drop-shadow-xl" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} role="img" aria-label="Camisa previsualizada">
      <path d="M74 44 49 63 31 105l25 12 13-25v94h82V92l13 25 25-12-18-42-25-19-22 20H96L74 44Z" fill={color} />
      <path d="M96 64 82 47l-8-3 22 38 14-18 14 18 22-38-8 3-14 17H96Z" fill="#ffffff" opacity="0.78" />
      <path d="M110 66v120M72 92h76M58 117l-24-12M162 117l24-12" stroke="#0f1d3d" strokeOpacity="0.22" strokeWidth="4" strokeLinecap="round" />
      <circle cx="110" cy="94" r="3" fill="#fff" opacity="0.9" />
      <circle cx="110" cy="118" r="3" fill="#fff" opacity="0.9" />
      <circle cx="110" cy="142" r="3" fill="#fff" opacity="0.9" />
    </svg>
  );
}

function PantsSvg({ color, className = "h-[82%] w-[82%] drop-shadow-xl" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} role="img" aria-label="Pantalón previsualizado">
      <path d="M70 34h80l8 152h-39l-9-99-9 99H62L70 34Z" fill={color} />
      <path d="M70 34h80v24H70z" fill="#ffffff" opacity="0.18" />
      <path d="M110 58v126M75 72h30M145 72h-30M101 186h-39M119 186h39" stroke="#0f1d3d" strokeOpacity="0.25" strokeWidth="4" strokeLinecap="round" />
      <path d="M88 39v16M132 39v16" stroke="#fff" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function SportSvg({ color, productName, className = "h-[82%] w-[82%] drop-shadow-xl" }: { color: string; productName?: string; className?: string }) {
  if (productName === "Jogger" || productName === "Short") {
    return (
      <svg viewBox="0 0 300 220" className={className} role="img" aria-label="Conjunto sport previsualizado">
        <g transform="translate(18 5) scale(.92)">
          <path d="M82 42 52 58 31 99l27 15 14-24v95h76V90l14 24 27-15-21-41-30-16-13 20H95L82 42Z" fill={color} />
          <path d="M93 62c5 8 29 8 34 0" stroke="#fff" strokeOpacity="0.75" strokeWidth="8" strokeLinecap="round" />
          <path d="M72 102h76M72 185h76" stroke="#0f1d3d" strokeOpacity="0.2" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g transform="translate(160 10) scale(.92)">
          <path d="M50 28h70l8 148H92l-7-93-9 93H42L50 28Z" fill={color} />
          <path d="M51 28h68v22H51z" fill="#fff" opacity=".16" />
          <path d="M85 51v123M55 67h24M115 67H92" stroke="#0f1d3d" strokeOpacity=".23" strokeWidth="4" strokeLinecap="round" />
          <path d="M76 33c10 7 17 7 27 0" stroke="#111827" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 220" className={className} role="img" aria-label="Prenda sport previsualizada">
      <path d="M82 42 52 58 31 99l27 15 14-24v95h76V90l14 24 27-15-21-41-30-16-13 20H95L82 42Z" fill={color} />
      <path d="M93 62c5 8 29 8 34 0" stroke="#fff" strokeOpacity="0.75" strokeWidth="8" strokeLinecap="round" />
      <path d="M72 102h76M72 185h76M58 114l-25-14M162 114l25-14" stroke="#0f1d3d" strokeOpacity="0.22" strokeWidth="4" strokeLinecap="round" />
      <path d="M84 139h52v26H84z" fill="#ffffff" opacity="0.16" />
    </svg>
  );
}
