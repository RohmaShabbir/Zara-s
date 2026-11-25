import type { Metadata } from "next";
import OrderSuccess from "@/app/components/checkout/OrderSuccess";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default function OrderSuccessPage() {
  return (
    <main className="container pb-24 pt-12 md:pt-20">
      <OrderSuccess />
    </main>
  );
}