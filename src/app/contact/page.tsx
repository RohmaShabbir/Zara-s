import type { Metadata } from "next";
import { site } from "@/lib/site";
import InfoPage, { InfoSection } from "@/app/components/ui/InfoPage";
import ContactForm from "@/app/components/ui/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <InfoPage title="Contact" intro="Questions about an order, sizing or anything else? We'd love to help.">
      <InfoSection title="Get in touch">
        <p>
          Email us at{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
            {site.email}
          </a>
          . We aim to reply within 24 hours.
        </p>
      </InfoSection>
      <ContactForm />
    </InfoPage>
  );
}