import { CheckCircle2, Palette, Ruler, Scissors, Shirt, Star, ThermometerSun } from "lucide-react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProviderCard } from "@/components/ProviderCard";
import { SectionTitle } from "@/components/SectionTitle";
import { providers } from "@/data/providers";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="app-band">
        <Hero />

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <SectionTitle title="Diseña tu prenda en pocos pasos" description="Elige camisa, pantalón o sport, configura materiales y deja que talleres verificados coticen tu pedido." align="center" />
          <div className="mt-7 grid gap-4 md:grid-cols-5">
            {[
              ["Elige prenda", Shirt],
              ["Selecciona tela, color y corte", Palette],
              ["Registra tus medidas", Ruler],
              ["Recibe cotizaciones", Star],
              ["Elige proveedor y sigue tu pedido", CheckCircle2],
            ].map(([label, Icon], index) => (
              <div key={String(label)} className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-blue-950 text-white">
                  <Icon size={20} />
                </span>
                <p className="mt-3 text-sm font-black text-slate-950">
                  {index + 1}. {String(label)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            <InfoPanel
              title="El problema"
              tone="danger"
              items={[
                ["Colores repetidos", "Opciones masculinas limitadas y poco combinables."],
                ["Telas incómodas", "Prendas que abrigan de más o no respiran bien en Lima."],
                ["Mal ajuste", "Cortes genéricos que no respetan contextura ni postura."],
                ["Poca personalización", "Detalles de cuello, basta o bolsillo casi nunca se pueden elegir."],
              ]}
            />
            <InfoPanel
              title="La solución"
              tone="success"
              items={[
                ["Tela y color", "Materiales explicados por comodidad, clima y uso."],
                ["Corte y medidas", "Ajuste pensado para tu cuerpo y estilo."],
                ["Cotización", "Comparas precio, plazo, tela incluida y ajuste posterior."],
                ["Ranking", "Talleres ordenados por calidad, puntualidad y comunicación."],
              ]}
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <SectionTitle title="Beneficios pensados para hombres en Lima" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Ajuste según tu cuerpo", Ruler],
              ["Telas explicadas por comodidad", ThermometerSun],
              ["Colores menos comunes", Palette],
              ["Talleres verificados", Scissors],
              ["Ranking por calidad", Star],
            ].map(([label, Icon]) => (
              <div key={String(label)} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="text-blue-700" size={24} />
                <p className="mt-3 text-sm font-black leading-6 text-slate-950">{String(label)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <SectionTitle title="Talleres recomendados para ti" description="Costureros y talleres verificados con buenas calificaciones y entregas a tiempo." />
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {providers.slice(0, 3).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoPanel({ title, items, tone }: { title: string; items: string[][]; tone: "danger" | "success" }) {
  const styles = tone === "danger" ? "border-red-200 bg-red-50/40" : "border-emerald-200 bg-emerald-50/40";
  return (
    <div className={`rounded-lg border p-5 shadow-sm ${styles}`}>
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map(([name, description]) => (
          <div key={name} className="rounded-lg border border-white/70 bg-white/80 p-4">
            <p className="font-black text-slate-950">{name}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
