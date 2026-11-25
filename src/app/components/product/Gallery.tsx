"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [open, setOpen] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = images.length;

  const next = () => setI((v) => (v + 1) % n);
  const prev = () => setI((v) => (v - 1 + n) % n);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setI((v) => (v + 1) % n);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, n]);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        onMouseMove={onMove}
        onMouseLeave={() => setZoom(null)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null || n < 2) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
          touchX.current = null;
        }}
        aria-label="Open image full screen"
        className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-3xl bg-ink/5"
      >
        <Image
          src={images[i]}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-transform duration-200"
          style={{
            transform: zoom ? "scale(1.8)" : "scale(1)",
            transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "center",
          }}
        />
      </button>

      {n > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((src, k) => (
            <button
              key={src}
              onClick={() => setI(k)}
              aria-label={`Show image ${k + 1}`}
              aria-current={k === i}
              className={cn(
                "relative h-24 w-[76px] shrink-0 overflow-hidden rounded-xl ring-offset-2 ring-offset-paper transition",
                k === i ? "ring-2 ring-ink" : "opacity-60 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="76px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} images`}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full bg-paper/10 p-2 text-paper hover:bg-paper/20"
            >
              <X size={22} />
            </button>
            {n > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 rounded-full bg-paper/10 p-3 text-paper hover:bg-paper/20"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-4 rounded-full bg-paper/10 p-3 text-paper hover:bg-paper/20"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <div className="relative h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <Image src={images[i]} alt={title} fill sizes="90vw" className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}