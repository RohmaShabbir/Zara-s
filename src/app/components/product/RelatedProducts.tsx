import { products } from "@/data/products";
import { getRelated } from "@/lib/shop";
import type { Product } from "@/types/product";
import ProductGrid from "@/app/components/shop/ProductGrid";
import SectionHeading from "@/app/components/ui/SectionHeading";

export default function RelatedProducts({ product }: { product: Product }) {
  const items = getRelated(product, products, 4);
  if (items.length === 0) return null;

  return (
    <section className="mt-24">
      <SectionHeading eyebrow="You may also like" title="Complete the look" href="/shop" />
      <ProductGrid items={items} className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4" />
    </section>
  );
}