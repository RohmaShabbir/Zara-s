"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Heart, Minus, Plus, RotateCcw, Share2, Truck } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/store/cart";
import { useUI } from "@/store/ui";
import { useWishlist } from "@/store/wishlist";
import { useMounted } from "@/hooks/useMounted";
import { cn, formatPrice } from "@/lib/utils";
import Rating from "@/app/components/ui/Rating";

export default function PurchasePanel({ product: p }: { product: Product }) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const setCart = useUI((s) => s.setCart);
  const toggle = useWishlist((s) => s.toggle);
  const inWishlist = useWishlist((s) => s.ids.includes(p.id));
  const mounted = useMounted();
  const wished = mounted && inWishlist;

  const [size, setSize] = useState<string>();
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sticky, setSticky] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);

  const soldOut = p.stock <= 0;
  const needsSize = !!p.sizes?.length;
  const maxQty = Math.max(1, Math.min(p.stock, 10));
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  // mobile sticky bar: tab dikhao jab main buttons screen ke upar nikal jayein
  useEffect(() => {
    const el = actionsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setSticky(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const commit = () => {
    if (needsSize && !size) {
      setError(true);
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    add({ id: p.id, title: p.title, price: p.price, img: p.images[0], size }, qty);
    return true;
  };
  const onAdd = () => commit() && setCart(true);
  const onBuy = () => commit() && router.push("/checkout");

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: p.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user ne share cancel kar diya */
    }
  };

  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted">{p.category}</p>
      <h1 className="font-display text-4xl leading-none md:text-6xl">{p.title}</h1>

      <div className="mt-4 flex items-center gap-3">
        <Rating value={p.rating} size={18} />
        <span className="text-sm text-muted">
          {p.rating} &middot; {p.reviewCount} reviews
        </span>
      </div>

      <p className="mt-6 flex items-baseline gap-3">
        <span className="font-display text-4xl">{formatPrice(p.price)}</span>
        {p.oldPrice && <span className="text-lg text-muted line-through">{formatPrice(p.oldPrice)}</span>}
        {discount > 0 && (
          <span className="rounded-full bg-plum px-2.5 py-1 text-xs uppercase tracking-widest text-paper">
            Save {discount}%
          </span>
        )}
      </p>

      <p className="mt-5 max-w-lg text-muted">{p.shortDesc}</p>

      {/* size */}
      {needsSize && (
        <div ref={sizeRef} className="mt-8">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">
            Size {size && <span className="text-ink">&middot; {size}</span>}
          </p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
            {p.sizes!.map((s) => (
              <button
                key={s}
                role="radio"
                aria-checked={size === s}
                onClick={() => {
                  setSize(s);
                  setError(false);
                }}
                className={cn(
                  "min-w-12 rounded-full border px-4 py-2.5 text-sm transition-colors",
                  size === s ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          {error && (
            <p role="alert" className="mt-3 text-sm text-plum">
              Please select a size first.
            </p>
          )}
        </div>
      )}

      {/* qty + actions */}
      <div ref={actionsRef} className="mt-8 space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-full border border-ink/20">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="p-3"
              disabled={soldOut}
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center" aria-live="polite">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
              aria-label="Increase quantity"
              className="p-3"
              disabled={soldOut}
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={onAdd}
            disabled={soldOut}
            className="flex-1 rounded-full bg-ink py-3.5 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-plum disabled:cursor-not-allowed disabled:opacity-40"
          >
            {soldOut ? "Sold out" : "Add to bag"}
          </button>
        </div>
        <button
          onClick={onBuy}
          disabled={soldOut}
          className="w-full rounded-full border border-ink py-3.5 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          Buy now
        </button>
      </div>

      <div className="mt-5 flex items-center gap-6 text-sm">
        <button
          onClick={() => toggle(p.id)}
          aria-pressed={wished}
          className="inline-flex items-center gap-2 hover:text-plum"
        >
          <Heart size={18} className={cn(wished && "fill-plum text-plum")} />
          {wished ? "Saved" : "Save for later"}
        </button>
        <button onClick={share} className="inline-flex items-center gap-2 hover:text-plum">
          {copied ? <Check size={18} /> : <Share2 size={18} />}
          {copied ? "Link copied" : "Share"}
        </button>
      </div>

      <p className={cn("mt-6 text-sm", p.stock <= 10 ? "text-plum" : "text-muted")}>
        {soldOut ? "Currently out of stock" : p.stock <= 10 ? `Only ${p.stock} left in stock` : "In stock and ready to ship"}
      </p>

      <ul className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm text-muted">
        <li className="flex items-center gap-3">
          <Truck size={18} className="text-ink" /> Free shipping on orders over $55
        </li>
        <li className="flex items-center gap-3">
          <RotateCcw size={18} className="text-ink" /> Easy 30-day returns
        </li>
      </ul>

      {/* mobile sticky bar */}
      <div
        className={cn(
          "fixed inset-x-0 z-30 flex items-center gap-3 border-t border-ink/10 bg-paper/90 px-4 py-3 backdrop-blur-xl transition-transform duration-300 lg:hidden",
          "bottom-[calc(3.75rem+env(safe-area-inset-bottom))]",
          sticky ? "translate-y-0" : "translate-y-[200%]"
        )}
        aria-hidden={!sticky}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{p.title}</p>
          <p className="text-sm text-muted">{formatPrice(p.price)}</p>
        </div>
        <button
          onClick={onAdd}
          disabled={soldOut}
          tabIndex={sticky ? 0 : -1}
          className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.15em] text-paper disabled:opacity-40"
        >
          {soldOut ? "Sold out" : "Add to bag"}
        </button>
      </div>
    </div>
  );
}