import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import ProductCard from "@/app/components/shop/ProductCard";

export default function ProductGrid({ items, className }: { items: Product[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6", className)}>
      {items.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 3} />
      ))}
    </div>
  );
}