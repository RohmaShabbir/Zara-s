"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/store/cart";
import { useMounted } from "@/hooks/useMounted";
import { cartSubtotal, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";
import OrderSummary from "@/app/components/cart/OrderSummary";

export default function CartView() {
  const mounted = useMounted();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  if (!mounted) return <div className="h-72 animate-pulse rounded-3xl bg-ink/5" aria-hidden="true" />;

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-ink/5 px-6 py-24 text-center">
        <ShoppingBag size={40} className="mx-auto text-muted" />
        <p className="mt-5 font-display text-3xl">Your bag is empty</p>
        <p className="mx-auto mt-3 max-w-sm text-muted">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.15em] text-paper hover:bg-plum"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  const subtotal = cartSubtotal(items);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
      <div>
        <div className="mb-8 rounded-2xl bg-blush/30 p-5">
          <p className="mb-3 text-sm">
            {remaining > 0
              ? `Add ${formatPrice(remaining)} more to get free shipping`
              : "You've unlocked free shipping 🎉"}
          </p>
          <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full rounded-full bg-plum transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {items.map((i) => {
            const product = products.find((p) => p.id === i.id);
            const href = product ? `/product/${product.slug}` : "/shop";
            const maxQty = product?.stock ?? 10;
            return (
              <li key={`${i.id}-${i.size ?? ""}`} className="flex gap-5 py-6">
                <Link href={href} className="shrink-0">
                  <Image
                    src={i.img}
                    alt={i.title}
                    width={110}
                    height={138}
                    className="h-[138px] w-[110px] rounded-2xl object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link href={href} className="font-medium hover:text-plum">
                        {i.title}
                      </Link>
                      {i.size && <p className="mt-1 text-sm text-muted">Size: {i.size}</p>}
                      <p className="mt-1 text-sm text-muted">{formatPrice(i.price)} each</p>
                    </div>
                    <button
                      onClick={() => remove(i.id, i.size)}
                      aria-label={`Remove ${i.title}`}
                      className="h-fit p-1 text-muted hover:text-plum"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-ink/20">
                      <button
                        className="p-2.5"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(i.id, i.qty - 1, i.size)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center text-sm">{i.qty}</span>
                      <button
                        className="p-2.5 disabled:opacity-30"
                        aria-label="Increase quantity"
                        disabled={i.qty >= maxQty}
                        onClick={() => setQty(i.id, i.qty + 1, i.size)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-medium">{formatPrice(i.price * i.qty)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4">
          <ArrowLeft size={16} /> Continue shopping
        </Link>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <OrderSummary items={items}>
          <Link
            href="/checkout"
            className="block rounded-full bg-ink py-3.5 text-center text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-plum"
          >
            Checkout
          </Link>
        </OrderSummary>
      </aside>
    </div>
  );
}