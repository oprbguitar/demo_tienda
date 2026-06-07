import { Header } from "@/components/Header";
import { SectionTitle } from "@/components/SectionTitle";
import { providers } from "@/data/providers";
import { quotes } from "@/data/quotes";

const orders = [
  { id: "PX-1042", client: "Diego R.", garment: "Camisa", provider: "Confecciones Diaz", status: "Tela confirmada", amount: "S/ 129.90" },
  { id: "PX-1043", client: "Luis M.", garment: "Pantalón", provider: "Taller el Roble", status: "En corte", amount: "S/ 149.90" },
  { id: "PX-1044", client: "Carlos A.", garment: "Camisa", provider: "Sastreria Anaya", status: "Cotización enviada", amount: "S/ 159.90" },
];

export default function AdminPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionTitle title="Panel administrativo simulado" description="Vista de prototipo sin autenticación real para monitorear pedidos, proveedores y cotizaciones." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Pedidos simulados" value="42" />
          <Kpi label="Pedidos pendientes" value="11" />
          <Kpi label="Proveedores activos" value={String(providers.length)} />
          <Kpi label="Reclamos simulados" value="3" />
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Table title="Tabla de pedidos" headers={["Pedido", "Cliente", "Prenda", "Estado", "Monto"]} rows={orders.map((order) => [order.id, order.client, order.garment, order.status, order.amount])} />
          <Table title="Tabla de proveedores" headers={["Proveedor", "Distrito", "Rating", "Pedidos"]} rows={providers.map((provider) => [provider.name, provider.district, String(provider.rating), String(provider.orders)])} />
        </div>
        <div className="mt-5">
          <Table title="Estado de cotizaciones" headers={["Taller", "Precio", "Plazo", "Estado"]} rows={quotes.map((quote) => [quote.providerName, `S/ ${quote.price.toFixed(2)}`, quote.deliveryDays, quote.highlighted ? "Recomendada" : "Disponible"])} />
        </div>
      </main>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-blue-950">{value}</p>
    </div>
  );
}

function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <h2 className="border-b border-slate-100 p-4 font-black text-slate-950">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-black">{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join("-")} className="border-t border-slate-100">
                {row.map((cell) => <td key={cell} className="px-4 py-3 font-semibold text-slate-700">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
