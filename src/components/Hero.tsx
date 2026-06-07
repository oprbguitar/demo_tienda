import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { publicPath } from "@/lib/publicPath";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-12">
      <div className="flex flex-col justify-center">
        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Diseña ropa masculina a medida con talleres verificados de Lima.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Camisas, pantalones y ropa sport según tu cuerpo, tu clima y tu estilo. Configura tu prenda, compara cotizaciones y sigue el pedido desde una sola plataforma.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/configurar/camisa" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-black text-white shadow-sm hover:bg-blue-800">
            Crear camisa <ArrowRight size={18} />
          </Link>
          <Link href="/configurar/pantalon" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-black text-slate-950 hover:border-blue-400 hover:bg-blue-50">
            Crear pantalón
          </Link>
          <Link href="/configurar/sport" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-black text-slate-950 hover:border-blue-400 hover:bg-blue-50">
            Crear sport
          </Link>
          <Link href="/proveedores" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-black text-slate-950 hover:border-blue-400 hover:bg-blue-50">
            Ver proveedores
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <span className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700">
            <ShieldCheck className="text-emerald-600" size={22} /> Talleres con ranking y pedidos verificados
          </span>
          <span className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700">
            <Sparkles className="text-blue-700" size={22} /> Telas y colores pensados para Lima
          </span>
        </div>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
        <div className="relative aspect-[1.1] overflow-hidden rounded-lg bg-slate-50">
          <Image src={publicPath("/assets/prendaexacta-reference.png")} alt="Referencia visual de PrendaExacta" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
