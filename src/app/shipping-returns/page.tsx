import type { Metadata } from "next";
import InfoPage, { InfoSection } from "@/app/components/ui/InfoPage";
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";

export const metadata: Metadata = { title: "Shipping & Returns" };

// TODO: neeche ke din/policy apni asli policy se match karein.
export default function ShippingReturnsPage() {
  return (
    <InfoPage title="Shipping & Returns" intro="Simple, clear policies so you can shop with confidence.">
      <InfoSection title="Shipping">
        <p>
          Orders over ${FREE_SHIPPING_THRESHOLD} ship free. Smaller orders have a flat ${FLAT_SHIPPING} shipping fee.
        </p>
        <p>Orders are packed within 1-2 business days of being placed.</p>
      </InfoSection>
      <InfoSection title="Returns">
        <p>Unworn items with tags can be returned within 30 days of delivery.</p>
        <p>To start a return, contact us with your order number and the items you'd like to send back.</p>
      </InfoSection>
    </InfoPage>
  );
}