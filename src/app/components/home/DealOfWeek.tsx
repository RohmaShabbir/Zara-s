"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { deal } from "@/data/deal";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { cn, formatPrice } from "@/lib/utils";
import Reveal from "@/app/components/ui/Reveal";

const ENDS_AT = new Date(deal.endsAt).getTime();
const pad = (n: number) => String(n).padStart(2, "0");

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    Days: Math.floor(s / 86400),
    Hours: Math.floor((s % 86400) / 3600),
    Mins: Math.floor((s % 3600) / 60),
    Secs: s % 60,
  };
}

export default function DealOfWeek() {
  const product = products.find((p) => p.id === deal.productId);
  const add = useCart((s) => s.add);
  const setCart = useUI((s) => s.setCart);
  const [now, setNow] = useState<number | null>(null);
  const [size, setSize] = useState<string | undefined>(product?.sizes?.[0]);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!product) return null;
  const left = now === null ? null : ENDS_AT - now;
  if (left !== null && left <= 0) return null; // deal khatam, section hide

  const time = split(left ?? 0);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <section className="bg-blush/40 py-20 md:py-28">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-paper">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 grid h-20 w-20 place-items-center rounded-full bg-plum text-center font-display text-xl leading-none text-paper">
                -{discount}%
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-plum">Deal of the week</p>
          <h2 className="font-display text-4xl leading-none md:text-6xl">{product.title}</h2>
          <p className="mt-4 max-w-md text-muted">{product.description}</p>

          <p className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </p>

          {/* countdown */}
          <div className="mt-8" role="timer" aria-label="Time left on this deal">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Offer ends in</p>
            <div className="flex gap-3">
              {Object.entries(time).map(([label, v]) => (
                <div key={label} className="w-[72px] rounded-2xl bg-paper py-3 text-center">
                  <p className="font-display text-3xl tabular-nums">{left === null ? "--" : pad(v)}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* sizes */}
          {product.sizes && (
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={cn(
                      "min-w-11 rounded-full border px-4 py-2 text-sm transition-colors",
                      size === s ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                add({ id: product.id, title: product.title, price: product.price, img: product.images[0], size });
                setCart(true);
              }}
              className="rounded-full bg-ink px-8 py-3.5 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-plum"
            >
              Add to bag
            </button>
            <Link href={`/product/${product.slug}`} className="text-sm underline underline-offset-4">
              View details
            </Link>
          </div>
          {product.stock <= 10 && <p className="mt-4 text-sm text-plum">Only {product.stock} left in stock</p>}
        </Reveal>
      </div>
    </section>
  );
}