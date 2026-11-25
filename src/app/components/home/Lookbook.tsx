"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";
import SectionHeading from "@/app/components/ui/SectionHeading";
import Reveal from "@/app/components/ui/Reveal";

// x / y = pin ki position image par (percent). Apni photo ke hisaab se adjust karein.
const look = {
  image: "/images/w-jacket.jpg",
  alt: "Styled outfit with trench jacket",
  pins: [
    { productId: "p4", x: 50, y: 44 },
    { productId: "p3", x: 30, y: 74 },
    { productId: "p7", x: 62, y: 20 },
  ],
};

export default function Lookbook() {
  const [active, setActive] = useState<string | null>(null);

  const pinned = look.pins
    .map((pin) => ({ ...pin, product: products.find((p) => p.id === pin.productId)! }))
    .filter((p) => p.product);

  return (
    <section className="container pb-20 md:pb-28">
      <SectionHeading eyebrow="Shop the look" title="The lookbook" />

      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* image + pins */}
        <Reveal>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-lg overflow-hidden rounded-3xl bg-ink/5">
            <Image
              src={look.image}
              alt={look.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            {pinned.map(({ productId, x, y, product }) => {
              const on = active === productId;
              return (
                <div key={productId} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                  <button
                    onClick={() => setActive(on ? null : productId)}
                    onMouseEnter={() => setActive(productId)}
                    aria-label={`Show ${product.title}`}
                    aria-expanded={on}
                    className="relative grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center"
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-paper/70 motion-reduce:animate-none" />
                    <span
                      className={cn(
                        "relative h-4 w-4 rounded-full border-2 border-paper shadow transition-colors",
                        on ? "bg-plum" : "bg-blush"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {on && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl bg-paper px-3 py-2 text-sm shadow-xl"
                      >
                        <span className="font-medium">{product.title}</span>
                        <span className="ml-2 text-muted">{formatPrice(product.price)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* product list */}
        <Reveal delay={0.1}>
          <p className="mb-6 max-w-md text-lg text-muted">
            Tap the dots to see what goes into the look, or pick a piece from the list.
          </p>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {pinned.map(({ productId, product }) => (
              <li key={productId}>
                <Link
                  href={`/product/${product.slug}`}
                  onMouseEnter={() => setActive(productId)}
                  onMouseLeave={() => setActive(null)}
                  className={cn(
                    "group flex items-center gap-4 py-4 pr-2 transition-colors",
                    active === productId && "bg-ink/[0.03]"
                  )}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    width={64}
                    height={80}
                    className="h-20 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm capitalize text-muted">{product.category}</p>
                  </div>
                  <p className="font-medium">{formatPrice(product.price)}</p>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}