import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Calculator,
  ChevronRight,
  ClipboardList,
  Eye,
  Grid2X2,
  Palette,
  Ruler,
  Scissors,
  Shirt,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/Header";
import { providers } from "@/data/providers";
import { publicPath } from "@/lib/publicPath";

const categories = [
  { label: "Camisas", href: "/configurar/camisa", note: "Formal o casual", icon: Shirt, image: "/assets/garments/shirt/sky-blue/front.png", active: true },
  { label: "Pantalones", href: "/configurar/pantalon", note: "Formal o chino", icon: Scissors, image: "/assets/garments/pants/navy/front.png" },
  { label: "Sport", href: "/configurar/sport", note: "Jogger, polo o polera", icon: Shirt, image: "/assets/garments/sport/terracotta/front.png" },
];

const steps: Array<[string, string, LucideIcon]> = [
  ["Prenda", "Elige el tipo de prenda", Shirt],
  ["Tela y color", "Selecciona tela y color", Grid2X2],
  ["Medidas", "Ajuste personalizado", Ruler],
  ["Taller", "Cotiza y sigue tu pedido", ClipboardList],
];

const metrics: Array<[string, string, LucideIcon]> = [
  ["105", "vistas de prenda", Eye],
  ["5", "colores activos", Palette],
  ["3", "tipos de ropa", Shirt],
];

const benefits: Array<[string, string, LucideIcon]> = [
  ["Telas explicadas", "Elige según clima, caída y uso diario.", CalendarDays],
  ["Cotización comparable", "Precio, plazo y ajuste posterior en una sola vista.", Calculator],
  ["Pedido protegido", "Datos temporales hoy, listo para Supabase después.", BadgeCheck],
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto hidden h-[calc(100vh-104px)] max-w-[1440px] grid-rows-[minmax(0,1fr)_minmax(0,236px)_auto] gap-3 px-8 py-3 lg:grid">
        <section className="grid min-h-0 gap-7 xl:grid-cols-[minmax(0,1fr)_310px]">
          <HeroPanel />
          <StepRail />
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.98fr_1.02fr]">
          <div className="grid gap-3">
            <CategoryPanel />
            <MetricPanel />
          </div>
          <ProviderPanel />
        </section>

        <section className="grid grid-cols-3 gap-4 rounded-lg border border-slate-200 bg-white px-8 py-2 shadow-sm">
          {benefits.map(([title, description, Icon], index) => (
            <div key={title} className={`flex items-center gap-4 ${index > 0 ? "border-l border-slate-200 pl-8" : ""}`}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-sm font-black text-slate-950">{title}</p>
                <p className="mt-0.5 text-[11px] font-medium leading-4 text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <main className="mx-auto grid max-w-md gap-3 px-4 py-4 lg:hidden">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h1 className="pb-1 text-[34px] font-black leading-[1.08] tracking-tight text-slate-950">
            Diseña tu ropa masculina a medida en minutos.
          </h1>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
            Personaliza tela, color, medidas y taller desde tu teléfono.
          </p>
          <Link href="/configurar/camisa" className="mt-4 inline-flex h-11 items-center gap-3 rounded-lg bg-blue-700 px-5 text-sm font-black text-white shadow-sm">
            Comenzar a diseñar <ArrowRight size={17} />
          </Link>
        </section>

        <section className="relative h-72 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <Image
            src={publicPath("/assets/home-tailor-hero.svg")}
            alt="Pantalón, telas y herramientas de confección"
            fill
            priority
            sizes="100vw"
            className="object-contain p-3"
          />
        </section>

        <section className="grid grid-cols-3 gap-2">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className={`rounded-lg border p-2 shadow-sm ${category.active ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"}`}
            >
              <category.icon className="text-blue-700" size={20} />
              <p className="mt-1 text-sm font-black text-slate-950">{category.label}</p>
              <p className="text-[10px] font-semibold leading-3 text-slate-500">{category.note}</p>
            </Link>
          ))}
        </section>

        <section className="grid grid-cols-2 gap-2">
          {steps.map(([title, description, Icon], index) => (
            <div key={title} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-700 text-xs font-black text-white">{index + 1}</span>
              <Icon className="shrink-0 text-slate-500" size={18} />
              <div className="min-w-0">
                <p className="text-sm font-black leading-4 text-slate-950">{title}</p>
                <p className="text-[10px] font-semibold leading-3 text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}

function HeroPanel() {
  return (
    <section className="grid min-h-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm xl:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col justify-center px-12 py-9">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-blue-700">
            <BadgeCheck size={14} /> Hecho en Lima
          </span>
          <h1 className="max-w-xl pb-2 text-[50px] font-black leading-[1.06] tracking-tight text-slate-950">
            Diseña tu ropa masculina a medida en minutos.
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">
            Personaliza cada detalle: tela, color, medidas y más. Recibe tu prenda con la calidad de siempre.
          </p>
          <Link href="/configurar/camisa" className="mt-7 inline-flex h-12 items-center gap-4 rounded-lg bg-blue-700 px-7 text-base font-black text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800">
            Comenzar a diseñar <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <div className="relative min-h-0 bg-gradient-to-r from-white via-blue-50/40 to-white">
        <Image
          src={publicPath("/assets/home-tailor-hero.svg")}
          alt="Pantalón, telas, cinta métrica y paleta de colores"
          fill
          priority
          sizes="620px"
          className="object-contain object-center p-4"
        />
      </div>
    </section>
  );
}

function StepRail() {
  const stepColors = ["bg-blue-600", "bg-emerald-500", "bg-amber-500", "bg-violet-500"];
  return (
    <aside className="grid min-h-0 gap-3">
      {steps.map(([title, description, Icon], index) => (
        <Link key={title} href={index === 2 ? "/medidas" : index === 3 ? "/cotizaciones" : "/configurar/camisa"} className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black text-white shadow-sm ${stepColors[index]}`}>{index + 1}</span>
          <Icon className="shrink-0 text-slate-500 transition group-hover:text-blue-700" size={31} strokeWidth={1.7} />
          <div className="min-w-0">
            <p className="text-base font-black text-slate-950">{title}</p>
            <p className="mt-1 text-sm font-medium leading-5 text-slate-500">{description}</p>
          </div>
          <ChevronRight className="ml-auto shrink-0 text-slate-500" size={20} />
        </Link>
      ))}
    </aside>
  );
}

function CategoryPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">Explora por categoría</h2>
      <div className="mt-2 grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 ${category.active ? "border-blue-600 bg-blue-50/30" : "border-slate-200 bg-white"}`}
          >
            <category.icon className="shrink-0 text-blue-700" size={27} />
            <div className="min-w-0">
              <p className="text-sm font-black text-blue-700">{category.label}</p>
              <p className="mt-1 text-xs font-semibold leading-4 text-slate-500">{category.note}</p>
            </div>
            <ArrowRight className="ml-auto shrink-0 text-blue-700" size={18} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function MetricPanel() {
  const tones = ["bg-blue-50 text-blue-700", "bg-emerald-50 text-emerald-700", "bg-orange-50 text-orange-600"];
  return (
    <section className="grid grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
      {metrics.map(([value, label, Icon], index) => (
        <div key={label} className={`flex items-center gap-4 rounded-lg px-4 py-2 ${tones[index]}`}>
          <Icon className="shrink-0" size={30} />
          <div>
            <p className="text-2xl font-black text-slate-950">{value}</p>
            <p className="text-sm font-medium text-slate-600">{label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function ProviderPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-slate-950">Talleres destacados</h2>
        <Link href="/proveedores" className="text-sm font-black text-blue-700">
          Ver todos
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-3">
        {providers.slice(0, 3).map((provider) => (
          <article key={provider.id} className="rounded-lg border border-slate-200 bg-white p-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-black leading-5 text-slate-950">{provider.name}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{provider.district}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-black text-orange-500">
                <Star size={13} fill="currentColor" /> {provider.rating}
              </span>
            </div>
            <p className="mt-3 min-h-8 text-sm font-bold leading-4 text-blue-700">{provider.specialty}</p>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold leading-4 text-slate-500">
              <BadgeCheck className="text-blue-700" size={14} /> Entrega y ajustes verificados
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HomeFooter() {
  return (
    <footer className="bg-slate-950 px-4 py-3 text-sm text-white lg:h-10 lg:py-0">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-2 lg:h-full lg:flex-row lg:items-center lg:justify-between">
        <span>Creado por Pierre R.</span>
        <span>
          ¿Asunto de contacto para prototipo? Contáctanos al correo:{" "}
          <a className="font-black text-white" href="mailto:peru.labs.pe@gmail.com">
            peru.labs.pe@gmail.com
          </a>
        </span>
      </div>
    </footer>
  );
}
