import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Palette, Ruler, Scissors, ShieldCheck, Sparkles, Star, type LucideIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { providers } from "@/data/providers";
import { publicPath } from "@/lib/publicPath";

const products = [
  { label: "Camisa", href: "/configurar/camisa", note: "Oficina y casual", color: "bg-blue-700 text-white" },
  { label: "Pantalón", href: "/configurar/pantalon", note: "Formal o chino", color: "bg-white text-slate-950" },
  { label: "Sport", href: "/configurar/sport", note: "Jogger, polo o polera", color: "bg-white text-slate-950" },
];

const steps: Array<[string, string, LucideIcon]> = [
  ["Prenda", "Elige tipo", Scissors],
  ["Tela", "Color y textura", Palette],
  ["Medidas", "Ajuste personal", Ruler],
  ["Taller", "Cotiza y sigue", CheckCircle2],
];

const metrics = [
  ["105", "vistas de prenda"],
  ["5", "colores activos"],
  ["3", "tipos de ropa"],
];

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <Header />
      <main className="mx-auto grid h-[calc(100vh-56px)] max-w-md grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-3 px-4 py-3 lg:hidden">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-blue-800">
            <ShieldCheck size={14} /> Hecho en Lima
          </span>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
            Ropa masculina a medida en minutos.
          </h1>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
            Elige prenda, color y tela. Compara talleres verificados de Lima.
          </p>
        </section>

        <div className="grid grid-cols-3 gap-2">
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className={`group rounded-lg border border-slate-200 px-3 py-2 shadow-sm ${product.color}`}
            >
              <span className="flex items-center justify-between gap-1 text-sm font-black">
                {product.label}
                <ArrowRight size={15} />
              </span>
              <span className={`mt-1 block text-[10px] font-bold leading-3 ${product.color.includes("bg-white") ? "text-slate-500" : "text-blue-100"}`}>
                {product.note}
              </span>
            </Link>
          ))}
        </div>

        <section className="relative min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <Image
            src={publicPath("/assets/prendaexacta-reference.png")}
            alt="Vista de configurador PrendaExacta"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-white/94 p-3 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-950">Vista pseudo-3D</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">Color, tela y prenda en vivo.</p>
              </div>
              <Sparkles className="shrink-0 text-blue-700" size={21} />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          {steps.map(([title, description, Icon], index) => (
            <div key={title} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-950 text-xs font-black text-white">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-black leading-4 text-slate-950">{title}</p>
                <p className="text-[10px] font-semibold leading-3 text-slate-500">{description}</p>
              </div>
              <Icon className="ml-auto shrink-0 text-blue-700" size={16} />
            </div>
          ))}
        </section>
      </main>

      <main className="mx-auto hidden h-[calc(100vh-56px)] max-w-7xl grid-rows-[1fr_auto] gap-4 px-4 py-4 sm:px-6 lg:grid lg:px-8">
        <section className="grid min-h-0 gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex min-h-0 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-blue-800">
                <ShieldCheck size={15} /> Hecho en Lima
              </span>
              <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight text-slate-950 lg:text-5xl">
                Diseña ropa masculina a medida en minutos.
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                Configura camisa, pantalón o sport, revisa tela y color, guarda medidas y compara talleres verificados sin complicarte.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="grid gap-2 sm:grid-cols-3">
                {products.map((product) => (
                  <Link
                    key={product.href}
                    href={product.href}
                    className={`group rounded-lg border border-slate-200 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 ${product.color}`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-base font-black">{product.label}</span>
                      <ArrowRight className="transition group-hover:translate-x-0.5" size={17} />
                    </span>
                    <span className={`mt-1 block text-xs font-semibold ${product.color.includes("bg-white") ? "text-slate-500" : "text-blue-100"}`}>
                      {product.note}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {metrics.map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <p className="text-xl font-black text-blue-950">{value}</p>
                    <p className="text-xs font-semibold text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid min-h-0 gap-4 lg:grid-rows-[minmax(0,1fr)_auto]">
            <div className="grid min-h-0 gap-4 lg:grid-cols-[1fr_0.72fr]">
              <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <Image
                  src={publicPath("/assets/prendaexacta-reference.png")}
                  alt="Vista de configurador PrendaExacta"
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/92 p-3 shadow-sm backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-slate-950">Vista pseudo-3D multivista</p>
                      <p className="mt-0.5 text-xs font-semibold text-slate-500">Gira la prenda y cambia color o textura.</p>
                    </div>
                    <Sparkles className="shrink-0 text-blue-700" size={22} />
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {steps.map(([title, description, Icon], index) => (
                  <div key={title} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-950 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-black text-slate-950">{title}</p>
                      <p className="text-xs font-semibold text-slate-500">{description}</p>
                    </div>
                    <Icon className="ml-auto shrink-0 text-blue-700" size={19} />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {providers.slice(0, 3).map((provider) => (
                <article key={provider.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-black leading-5 text-slate-950">{provider.name}</p>
                      <p className="mt-0.5 text-xs font-semibold text-slate-500">{provider.district}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-black text-amber-700">
                      <Star size={13} fill="currentColor" /> {provider.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-bold leading-4 text-blue-800">{provider.specialty}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Clock3 size={14} /> Entrega y ajustes verificados
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {[
            ["Telas explicadas", "Elige según clima, caída y uso diario."],
            ["Cotización comparable", "Precio, plazo y ajuste posterior en una sola vista."],
            ["Pedido protegido", "Datos temporales hoy, listo para Supabase después."],
          ].map(([title, description]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="font-black text-slate-950">{title}</p>
              <p className="mt-1 text-sm font-medium leading-5 text-slate-600">{description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
