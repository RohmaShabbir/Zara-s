import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import CartView from "@/app/components/cart/CartView";

export const metadata: Metadata = { title: "Your bag", robots: { index: false } };

export default function CartPage() {
  return (
    <main className="container pb-24 pt-8 md:pt-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Your bag" }]} />
      <h1 className="mb-10 mt-6 font-display text-5xl md:text-7xl">Your bag</h1>
      <CartView />
    </main>
  );
}