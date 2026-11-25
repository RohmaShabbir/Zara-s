"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import Rating from "@/app/components/ui/Rating";
import SectionHeading from "@/app/components/ui/SectionHeading";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const t = testimonials[i];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <section className="container pb-20 md:pb-28">
      <SectionHeading eyebrow="Kind words" title="What our customers say" />

      <div
        className="relative mx-auto max-w-3xl text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="min-h-[300px] md:min-h-[260px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="mb-6 flex justify-center">
                <Rating value={t.rating} size={20} />
              </div>
              <blockquote className="font-display text-2xl leading-snug md:text-4xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-plum font-display text-paper">
                  {t.name[0]}
                </span>
                <span className="text-left">
                  <span className="block font-medium">{t.name}</span>
                  <span className="text-sm text-muted">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() => setI((v) => (v - 1 + n) % n)}
            aria-label="Previous review"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Show review ${k + 1}`}
                aria-current={k === i}
                className={cn("h-2 rounded-full transition-all", k === i ? "w-6 bg-plum" : "w-2 bg-ink/20")}
              />
            ))}
          </div>
          <button
            onClick={() => setI((v) => (v + 1) % n)}
            aria-label="Next review"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}