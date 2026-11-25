import type { Metadata } from "next";
import ShopView from "@/app/components/shop/ShopView";
import { parseFilters, type Raw } from "@/lib/shop";

export const metadata: Metadata = { title: "Shop all" };

export default async function ShopPage({ searchParams }: { searchParams: Promise<Raw> }) {
  const filters = parseFilters(await searchParams);
  return (
    <ShopView
      title="Shop all"
      blurb="Everything in one place. Filter by category, size or price to find your piece."
      filters={filters}
      basePath="/shop"
    />
  );
}