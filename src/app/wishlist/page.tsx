import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import WishlistView from "@/app/components/shop/WishlistView";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return (
    <main className="container pb-24 pt-8 md:pt-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <h1 className="mb-10 mt-6 font-display text-5xl md:text-7xl">Wishlist</h1>
      <WishlistView />
    </main>
  );
}