import { Suspense } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { allSizes, applyFilters, categories, type Filters } from "@/lib/shop";
import type { Category } from "@/types/product";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ProductGrid from "@/app/components/shop/ProductGrid";
import ProductGridSkeleton from "@/app/components/shop/ProductGridSkeleton";
import ShopLayout from "@/app/components/shop/ShopLayout";

type Props = {
  title: string;
  blurb: string;
  filters: Filters;
  basePath: string; // "Clear filters" is link par jata hai
  category?: Category;
};

export default function ShopView({ title, blurb, filters, basePath, category }: Props) {
  const items = applyFilters(products, filters);
  const pool = category ? products.filter((p) => p.category === category) : products;
  const sizes = allSizes(pool);
  const availableCategories = categories
    .filter((c) => products.some((p) => p.category === c.key))
    .map(({ key, label }) => ({ key, label }));
  const comingSoon = pool.length === 0;

  return (
    <main className="container pb-24 pt-8 md:pt-12">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, ...(category ? [{ label: "Shop", href: "/shop" }] : []), { label: title }]}
      />
      <header className="mb-10 mt-6 max-w-2xl">
        <h1 className="font-display text-5xl md:text-7xl">{title}</h1>
        <p className="mt-4 text-muted">{blurb}</p>
      </header>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ShopLayout total={items.length} sizes={sizes} categories={category ? [] : availableCategories}>
          {items.length > 0 ? (
            <ProductGrid items={items} />
          ) : (
            <div className="rounded-3xl bg-ink/5 px-6 py-20 text-center">
              <p className="font-display text-3xl">{comingSoon ? "Coming soon" : "No products match your filters"}</p>
              <p className="mx-auto mt-3 max-w-sm text-muted">
                {comingSoon
                  ? "We're still preparing this collection. Check back shortly."
                  : "Try removing a filter or two to see more."}
              </p>
              <Link
                href={comingSoon ? "/shop" : basePath}
                className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.15em] text-paper hover:bg-plum"
              >
                {comingSoon ? "Browse all products" : "Clear filters"}
              </Link>
            </div>
          )}
        </ShopLayout>
      </Suspense>
    </main>
  );
}