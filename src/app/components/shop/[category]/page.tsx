import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopView from "@/app/components/shop/ShopView";
import { categories, isCategory, parseFilters, type Raw } from "@/lib/shop";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = categories.find((x) => x.key === category);
  return { title: c ? c.label : "Shop" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Raw>;
}) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const meta = categories.find((c) => c.key === category)!;
  const filters = parseFilters(await searchParams, category);

  return (
    <ShopView
      title={meta.label}
      blurb={meta.blurb}
      filters={filters}
      category={category}
      basePath={`/shop/${category}`}
    />
  );
}