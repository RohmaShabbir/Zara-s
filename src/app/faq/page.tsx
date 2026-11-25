import type { Metadata } from "next";
import InfoPage from "@/app/components/ui/InfoPage";
import ProductAccordion from "@/app/components/product/ProductAccordion";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  { title: "Which payment methods do you accept?", body: "Right now we offer cash on delivery. Card payments are coming soon." },
  { title: "How much is shipping?", body: "Shipping is free on orders over $55. Below that, a flat $5 shipping fee applies." },
  { title: "How do I use a promo code?", body: "Enter your code in the promo field on the bag or checkout page and press Apply. The discount shows in your order summary." },
  { title: "What is your return policy?", body: "Unworn items with tags can be returned within 30 days of delivery. See the Shipping & Returns page for details." },
  { title: "How do I find my size?", body: "Each product page lists the available sizes. If you're between sizes, we suggest sizing up for a relaxed fit." },
  { title: "Can I change my order after placing it?", body: "Contact us as soon as possible and we'll do our best to update it before it ships." },
];

export default function FaqPage() {
  return (
    <InfoPage title="FAQ" intro="Quick answers to the questions we hear most.">
      <ProductAccordion items={faqs} />
    </InfoPage>
  );
}