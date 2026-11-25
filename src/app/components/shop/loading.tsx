import ProductGridSkeleton from "@/app/components/shop/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="container pb-24 pt-12">
      <div className="mb-10 h-16 w-64 animate-pulse rounded bg-ink/10" />
      <ProductGridSkeleton />
    </main>
  );
}