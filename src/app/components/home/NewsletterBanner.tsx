import Reveal from "@/app/components/ui/Reveal";
import NewsletterForm from "@/app/components/ui/NewsletterForm";

export default function NewsletterBanner() {
  return (
    <section className="container">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-plum px-6 py-16 text-center text-paper md:py-24">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blush/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-blush/20 blur-3xl" />
          <div className="relative">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-blush">Stay in the loop</p>
            <h2 className="mx-auto max-w-2xl font-display text-4xl leading-none md:text-6xl">
              Style notes, <em className="text-blush">straight to your inbox</em>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-paper/70">
              Early access to new drops, subscriber-only offers and a little inspiration. No spam, ever.
            </p>
            <div className="mx-auto mt-8 max-w-md text-left">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}