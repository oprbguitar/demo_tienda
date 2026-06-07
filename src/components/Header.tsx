import Link from "next/link";
import { Menu, Ruler, ShoppingBag, UserRound } from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/configurar/camisa", label: "Diseña tu prenda" },
  { href: "/proveedores", label: "Proveedores" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/seguimiento", label: "Seguimiento" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-blue-100 bg-blue-50 text-blue-950">
            <Ruler size={24} strokeWidth={2.2} />
          </span>
          <span>
            <span className="block text-lg font-black tracking-wide text-slate-950">PrendaExacta</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Hecho en Lima</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-blue-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cotizaciones" className="relative grid h-10 w-10 place-items-center rounded-lg text-slate-800 hover:bg-slate-100">
            <ShoppingBag size={21} />
            <span className="absolute right-1.5 top-1 grid h-4 w-4 place-items-center rounded-full bg-blue-950 text-[10px] font-bold text-white">
              1
            </span>
          </Link>
          <Link href="/admin" className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:border-blue-200 hover:bg-blue-50 sm:flex">
            <UserRound size={18} />
            Diego
          </Link>
          <button className="grid h-10 w-10 place-items-center rounded-lg text-slate-800 hover:bg-slate-100 lg:hidden" aria-label="Abrir menu">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
