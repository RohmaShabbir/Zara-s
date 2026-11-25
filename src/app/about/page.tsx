import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import InfoPage, { InfoSection } from "@/app/components/ui/InfoPage";

export const metadata: Metadata = { title: "About" };

// TODO: apni asli brand story yahan likhein, neeche ka text sirf placeholder hai.
export default function AboutPage() {
  return (
    <InfoPage title="About" intro={`${site.name} is built around timeless pieces, soft colours and easy silhouettes.`}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-ink/5">
        <Image src="/images/frocks.jpg" alt="" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
      </div>
      <InfoSection title="Our story">
        <p>
          We believe getting dressed should feel effortless. Every piece in the collection is chosen for how it looks,
          how it feels and how long it lasts.
        </p>
      </InfoSection>
      <InfoSection title="What we stand for">
        <p>Considered design, honest pricing and a shopping experience that respects your time.</p>
      </InfoSection>
    </InfoPage>
  );
}