import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, UserRound } from "lucide-react";
import { publicPath } from "@/lib/publicPath";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/configurar/camisa", label: "Diseña tu prenda" },
  { href: "/proveedores", label: "Proveedores" },
  { href: "/cotizaciones", label: "Cotizaciones" },
  { href: "/seguimiento", label: "Seguimiento" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 text-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-lg border border-white/25 bg-white shadow-sm">
            <Image
              src={publicPath("/assets/brand-logo.svg")}
              alt="Logo PrendaExacta"
              width={34}
              height={34}
              priority
            />
          </span>
          <span>
            <span className="block text-lg font-black tracking-wide text-white">PrendaExacta</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-blue-100">Hecho en Lima</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-bold text-white/90 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="border-b-2 border-transparent py-5 transition hover:border-white hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cotizaciones" className="relative grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-white/10">
            <ShoppingBag size={21} />
            <span className="absolute right-1.5 top-1 grid h-4 w-4 place-items-center rounded-full bg-white text-[10px] font-bold text-blue-700">
              1
            </span>
          </Link>
          <Link href="/admin" className="hidden items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/15 sm:flex">
            <UserRound size={18} />
            Diego
          </Link>
          <button className="grid h-10 w-10 place-items-center rounded-lg text-white hover:bg-white/10 lg:hidden" aria-label="Abrir menu">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
