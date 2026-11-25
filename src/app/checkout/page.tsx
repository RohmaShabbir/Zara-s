import type { Metadata } from "next";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import CheckoutView from "@/app/components/checkout/CheckoutView";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <main className="container pb-24 pt-8 md:pt-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Your bag", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mb-10 mt-6 font-display text-5xl md:text-7xl">Checkout</h1>
      <CheckoutView />
    </main>
  );
}