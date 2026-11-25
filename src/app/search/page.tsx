import type { Metadata } from "next";
import ShopView from "@/app/components/shop/ShopView";
import { parseFilters, type Raw } from "@/lib/shop";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<Raw> }) {
  const raw = await searchParams;
  const filters = parseFilters(raw);
  const q = filters.q ?? "";

  return (
    <ShopView
      title={q ? `Results for “${q}”` : "Search"}
      blurb={q ? "Refine your results with the filters." : "Type something in the search bar to find products."}
      filters={filters}
      basePath={q ? `/search?q=${encodeURIComponent(q)}` : "/search"}
    />
  );
}