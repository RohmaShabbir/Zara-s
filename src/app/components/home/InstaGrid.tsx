import Image from "next/image";
import { BsInstagram } from "react-icons/bs";
import { products } from "@/data/products";
import { site } from "@/lib/site";
import Reveal from "@/app/components/ui/Reveal";

export default function InstaGrid() {
  const items = products.slice(0, 6);

  return (
    <section className="pb-20 md:pb-28">
      <div className="container mb-8 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted">Follow along</p>
        <h2 className="font-display text-4xl md:text-6xl">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-plum">
            {site.instagramHandle}
          </a>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05}>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} on Instagram`}
              className="group relative block aspect-square overflow-hidden"
            >
              <Image
                src={p.images[0]}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-plum/60 text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <BsInstagram size={28} />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}