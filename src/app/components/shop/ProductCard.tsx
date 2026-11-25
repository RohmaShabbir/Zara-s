"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useWishlist } from "@/store/wishlist";
import { useMounted } from "@/hooks/useMounted";
import { cn, formatPrice } from "@/lib/utils";
import Rating from "@/app/components/ui/Rating";

export default function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  const add = useCart((s) => s.add);
  const setCart = useUI((s) => s.setCart);
  const toggle = useWishlist((s) => s.toggle);
  const inWishlist = useWishlist((s) => s.ids.includes(p.id));
  const mounted = useMounted();
  const wished = mounted && inWishlist;
  const [picking, setPicking] = useState(false);

  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  const addToBag = (size?: string) => {
    add({ id: p.id, title: p.title, price: p.price, img: p.images[0], size });
    setPicking(false);
    setCart(true);
  };
  const onQuickAdd = () => (p.sizes?.length ? setPicking((v) => !v) : addToBag());

  const imgSizes = "(min-width: 1024px) 25vw, 50vw";

  return (
    <article className="group" onMouseLeave={() => setPicking(false)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
        <Link href={`/product/${p.slug}`} aria-label={p.title} className="absolute inset-0">
          <Image
            src={p.images[0]}
            alt={p.title}
            fill
            priority={priority}
            sizes={imgSizes}
            className={cn(
              "object-cover transition-all duration-700",
              p.images[1] ? "group-hover:opacity-0" : "group-hover:scale-105"
            )}
          />
          {p.images[1] && (
            <Image
              src={p.images[1]}
              alt=""
              fill
              sizes={imgSizes}
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {p.isNew && (
            <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] uppercase tracking-widest">New</span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-plum px-2.5 py-1 text-[10px] uppercase tracking-widest text-paper">
              -{discount}%
            </span>
          )}
        </div>

        {/* wishlist */}
        <button
          onClick={() => toggle(p.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-paper/90 backdrop-blur transition-transform hover:scale-110"
        >
          <motion.span
            key={String(wished)}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Heart size={18} className={cn(wished && "fill-plum text-plum")} />
          </motion.span>
        </button>

        {/* quick add (mobile par hamesha visible, desktop par hover par) */}
        <div className="absolute inset-x-3 bottom-3 lg:translate-y-[130%] lg:opacity-0 lg:transition-all lg:duration-300 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <AnimatePresence mode="wait" initial={false}>
            {picking ? (
              <motion.div
                key="sizes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex flex-wrap justify-center gap-1.5 rounded-2xl bg-paper/95 p-2 backdrop-blur"
              >
                {p.sizes!.map((s) => (
                  <button
                    key={s}
                    onClick={() => addToBag(s)}
                    className="min-w-9 rounded-full border border-ink/15 px-3 py-1.5 text-xs transition-colors hover:bg-ink hover:text-paper"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.button
                key="add"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                onClick={onQuickAdd}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-paper/95 py-3 text-xs uppercase tracking-[0.15em] backdrop-blur transition-colors hover:bg-ink hover:text-paper"
              >
                <Plus size={14} /> Quick add
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <Link href={`/product/${p.slug}`} className="block font-medium leading-snug hover:text-plum">
          {p.title}
        </Link>
        <p className="text-sm capitalize text-muted">{p.category}</p>
        <div className="flex items-center gap-2">
          <Rating value={p.rating} size={14} />
          <span className="text-xs text-muted">({p.reviewCount})</span>
        </div>
        <p className="flex items-baseline gap-2">
          <span className="font-medium">{formatPrice(p.price)}</span>
          {p.oldPrice && <span className="text-sm text-muted line-through">{formatPrice(p.oldPrice)}</span>}
        </p>
      </div>
    </article>
  );
}