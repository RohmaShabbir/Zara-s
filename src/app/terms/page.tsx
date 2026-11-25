import type { Metadata } from "next";
import { site } from "@/lib/site";
import InfoPage, { InfoSection } from "@/app/components/ui/InfoPage";

export const metadata: Metadata = { title: "Terms of Service" };

// TODO: ye sirf ek basic template hai. Launch se pehle asli terms likhein / review karwayein.
export default function TermsPage() {
  return (
    <InfoPage title="Terms of Service" intro={`By using ${site.name} you agree to the terms below.`}>
      <InfoSection title="Orders">
        <p>
          Placing an order is an offer to buy. We may decline or cancel an order, for example if an item is out of
          stock or a price was listed in error.
        </p>
      </InfoSection>
      <InfoSection title="Pricing and payment">
        <p>Prices are shown in USD. Payment methods are listed at checkout.</p>
      </InfoSection>
      <InfoSection title="Returns">
        <p>Returns are handled according to our Shipping &amp; Returns page.</p>
      </InfoSection>
      <InfoSection title="Contact">
        <p>Questions about these terms? Email {site.email}.</p>
      </InfoSection>
    </InfoPage>
  );
}