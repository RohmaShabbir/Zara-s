import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/app/components/ui/Reveal";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const tiles = [
  { title: "Women", href: "/shop/women", img: "/images/w-jacket.jpg", cls: "col-span-2 row-span-1 md:row-span-2" },
  { title: "Men", href: "/shop/men", img: "/images/men-j.jpg", cls: "" },
  { title: "Accessories", href: "/shop/accessories", img: "/images/watches.jpg", cls: "" },
];

export default function CategoryGrid() {
  return (
    <section className="container py-20 md:py-28">
      <SectionHeading eyebrow="Browse" title="Shop by category" href="/shop" linkLabel="All products" />

      <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
        {tiles.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.08} className={cn("relative", t.cls)}>
            <Link href={t.href} className="group absolute inset-0 overflow-hidden rounded-2xl">
              <Image
                src={t.img}
                alt={t.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-paper">
                <h3 className="font-display text-3xl">{t.title}</h3>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}

        <Reveal delay={0.3} className="relative col-span-2">
          <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-blush p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-ink/60">Coming soon</p>
            <h3 className="font-display text-3xl leading-tight md:text-4xl">
              Perfume &amp; <em>Jewelry</em>
            </h3>
          </div>
        </Reveal>
      </div>
    </section>
  );
}