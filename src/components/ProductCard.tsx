import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publicPath } from "@/lib/publicPath";

type ProductCardProps = {
  title: string;
  description: string;
  href: string;
  imagePosition: "left" | "center" | "right";
};

export function ProductCard({ title, description, href, imagePosition }: ProductCardProps) {
  const objectPosition = imagePosition === "left" ? "left center" : imagePosition === "right" ? "right center" : "center";

  return (
    <Link href={href} className="group grid min-h-40 grid-cols-[120px_1fr_auto] items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-lg">
      <div className="relative h-28 overflow-hidden rounded-lg bg-slate-50">
        <Image src={publicPath("/assets/prendaexacta-assets.png")} alt="" fill sizes="120px" className="object-cover" style={{ objectPosition }} />
      </div>
      <div>
        <h3 className="text-xl font-black text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-blue-950 transition group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">
        <ArrowRight size={20} />
      </span>
    </Link>
  );
}
