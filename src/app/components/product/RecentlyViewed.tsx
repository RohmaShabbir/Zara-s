"use client";
import { useEffect } from "react";
import { products } from "@/data/products";
import type { Product } from "@/types/product";
import { useRecent } from "@/store/recent";
import { useMounted } from "@/hooks/useMounted";
import ProductGrid from "@/app/components/shop/ProductGrid";
import SectionHeading from "@/app/components/ui/SectionHeading";

export default function RecentlyViewed({ currentId }: { currentId: string }) {
  const mounted = useMounted();
  const ids = useRecent((s) => s.ids);
  const push = useRecent((s) => s.push);

  useEffect(() => {
    push(currentId);
  }, [currentId, push]);

  const items = mounted
    ? ids
        .filter((id) => id !== currentId)
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => !!p)
        .slice(0, 4)
    : [];

  if (items.length === 0) return null;

  return (
    <section className="mt-24">
      <SectionHeading eyebrow="Pick up where you left off" title="Recently viewed" />
      <ProductGrid items={items} className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4" />
    </section>
  );
}