import type { Metadata } from "next";
import { site } from "@/lib/site";
import InfoPage, { InfoSection } from "@/app/components/ui/InfoPage";

export const metadata: Metadata = { title: "Privacy Policy" };

// TODO: launch se pehle isay apne asli data practices (analytics, payment, email service)
// ke mutabiq update karein, aur ho sake to kisi professional se review karwa lein.
export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy" intro="What this site stores about you, in plain language.">
      <InfoSection title="What stays in your browser">
        <p>
          Your bag, wishlist and recently viewed products are saved in your browser so they are there when you come
          back. Details you type during checkout are kept only for the current browser session.
        </p>
      </InfoSection>
      <InfoSection title="Messages you send us">
        <p>
          If you contact us by email, we use your message and email address only to reply to you.
        </p>
      </InfoSection>
      <InfoSection title="Questions">
        <p>Write to us at {site.email} and we'll be happy to help.</p>
      </InfoSection>
    </InfoPage>
  );
}