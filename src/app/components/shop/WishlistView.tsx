"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { useWishlist } from "@/store/wishlist";
import { useMounted } from "@/hooks/useMounted";
import ProductGrid from "@/app/components/shop/ProductGrid";
import ProductGridSkeleton from "@/app/components/shop/ProductGridSkeleton";

export default function WishlistView() {
  const mounted = useMounted();
  const ids = useWishlist((s) => s.ids);

  if (!mounted) return <ProductGridSkeleton count={4} />;

  const items = ids.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => !!p);

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-ink/5 px-6 py-24 text-center">
        <Heart size={40} className="mx-auto text-muted" />
        <p className="mt-5 font-display text-3xl">Nothing saved yet</p>
        <p className="mx-auto mt-3 max-w-sm text-muted">Tap the heart on any product to save it here for later.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.15em] text-paper hover:bg-plum"
        >
          Discover products
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mb-6 text-sm text-muted">
        {items.length} saved {items.length === 1 ? "item" : "items"}
      </p>
      <ProductGrid items={items} className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4" />
    </>
  );
}