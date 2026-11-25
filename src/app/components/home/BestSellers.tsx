"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import type { Category } from "@/types/product";
import ProductCard from "@/app/components/shop/ProductCard";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const tabs: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "accessories", label: "Accessories" },
];

export default function BestSellers() {
  const [tab, setTab] = useState<"all" | Category>("all");

  const items = useMemo(
    () =>
      products
        .filter((p) => tab === "all" || p.category === tab)
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, 8),
    [tab]
  );

  return (
    <section className="container py-20 md:py-28">
      <SectionHeading eyebrow="Most loved" title="Best sellers" href="/shop" />

      <div role="tablist" aria-label="Filter best sellers" className="mb-10 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm transition-colors",
                active ? "text-paper" : "hover:text-plum"
              )}
            >
              {active && (
                <motion.span
                  layoutId="best-tab"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        <AnimatePresence mode="popLayout">
          {items.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}