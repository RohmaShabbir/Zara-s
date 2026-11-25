import { products } from "@/data/products";
import ProductCard from "@/app/components/shop/ProductCard";
import Reveal from "@/app/components/ui/Reveal";
import SectionHeading from "@/app/components/ui/SectionHeading";

export default function NewArrivals() {
  const items = [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);

  return (
    <section className="container pb-20 md:pb-28">
      <SectionHeading eyebrow="Just landed" title="New arrivals" href="/shop?sort=newest" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <ProductCard product={p} priority={i < 2} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}