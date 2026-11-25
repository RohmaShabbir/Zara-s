import Image from "next/image";
import Reveal from "@/app/components/ui/Reveal";
import ButtonLink from "@/app/components/ui/ButtonLink";

export default function EditorialBanner() {
  return (
    <section className="container">
      <Reveal>
        <div className="grid overflow-hidden rounded-3xl md:grid-cols-2">
          <div className="relative min-h-[380px] md:min-h-[560px]">
            <Image
              src="/images/frocks.jpg"
              alt="Summer collection dress"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 bg-plum p-8 text-paper md:p-16">
            <p className="text-xs uppercase tracking-[0.25em] text-blush">Limited time</p>
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
              Summer collection, up to <em className="text-blush">25% off</em>
            </h2>
            <p className="max-w-sm text-paper/70">
              Light fabrics, easy silhouettes and colours that feel like sunshine. While stock lasts.
            </p>
            <div>
              <ButtonLink href="/shop?sale=true" variant="blush">
                Shop the sale
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}