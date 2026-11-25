"use client";
import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { PRICE_RANGES, SORTS } from "@/lib/shop";
import { cn } from "@/lib/utils";

type Props = {
  total: number;
  sizes: string[];
  categories: { key: string; label: string }[];
  children: React.ReactNode;
};

const chip = (on: boolean) =>
  cn(
    "rounded-full border px-4 py-1.5 text-sm transition-colors",
    on ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
  );

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-ink/10 py-6 first:pt-0">
      <legend className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">{title}</legend>
      {children}
    </fieldset>
  );
}

export default function ShopLayout({ total, sizes, categories, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [pending, start] = useTransition();
  const [sheet, setSheet] = useState(false);

  const category = sp.get("category");
  const price = sp.get("price");
  const selSizes = sp.getAll("size");
  const sale = sp.get("sale") === "true";
  const stock = sp.get("stock") === "1";
  const rating = sp.get("rating");
  const sort = sp.get("sort") ?? "featured";

  const push = (mut: (p: URLSearchParams) => void) => {
    const p = new URLSearchParams(sp.toString());
    mut(p);
    const qs = p.toString();
    start(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  };
  const setOne = (k: string, v?: string) => push((p) => (v ? p.set(k, v) : p.delete(k)));
  const toggleSize = (s: string) =>
    push((p) => {
      const cur = p.getAll("size");
      p.delete("size");
      (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]).forEach((x) => p.append("size", x));
    });
  const clearAll = () =>
    push((p) => ["category", "price", "size", "sale", "stock", "rating"].forEach((k) => p.delete(k)));

  const chips: { label: string; clear: () => void }[] = [];
  const cat = categories.find((c) => c.key === category);
  if (cat) chips.push({ label: cat.label, clear: () => setOne("category") });
  const pr = PRICE_RANGES.find((r) => r.key === price);
  if (pr) chips.push({ label: pr.label, clear: () => setOne("price") });
  selSizes.forEach((s) => chips.push({ label: `Size ${s}`, clear: () => toggleSize(s) }));
  if (rating) chips.push({ label: `${rating}+ stars`, clear: () => setOne("rating") });
  if (sale) chips.push({ label: "On sale", clear: () => setOne("sale") });
  if (stock) chips.push({ label: "In stock", clear: () => setOne("stock") });

  useEffect(() => {
    if (!sheet) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const panel = (
    <div>
      {categories.length > 0 && (
        <Group title="Category">
          <div className="flex flex-wrap gap-2">
            <button className={chip(!category)} aria-pressed={!category} onClick={() => setOne("category")}>
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.key}
                className={chip(category === c.key)}
                aria-pressed={category === c.key}
                onClick={() => setOne("category", c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Group>
      )}

      <Group title="Price">
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((r) => (
            <button
              key={r.key}
              className={chip(price === r.key)}
              aria-pressed={price === r.key}
              onClick={() => setOne("price", price === r.key ? undefined : r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </Group>

      {sizes.length > 0 && (
        <Group title="Size">
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                className={cn(chip(selSizes.includes(s)), "min-w-11 px-3")}
                aria-pressed={selSizes.includes(s)}
                onClick={() => toggleSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </Group>
      )}

      <Group title="Rating">
        <div className="flex flex-wrap gap-2">
          {[4, 3].map((n) => (
            <button
              key={n}
              className={chip(rating === String(n))}
              aria-pressed={rating === String(n)}
              onClick={() => setOne("rating", rating === String(n) ? undefined : String(n))}
            >
              {n}+ stars
            </button>
          ))}
        </div>
      </Group>

      <Group title="Availability">
        <label className="flex cursor-pointer items-center gap-3 py-1">
          <input
            type="checkbox"
            checked={sale}
            onChange={() => setOne("sale", sale ? undefined : "true")}
            className="h-4 w-4 accent-plum"
          />
          On sale
        </label>
        <label className="flex cursor-pointer items-center gap-3 py-1">
          <input
            type="checkbox"
            checked={stock}
            onChange={() => setOne("stock", stock ? undefined : "1")}
            className="h-4 w-4 accent-plum"
          />
          In stock only
        </label>
      </Group>

      {chips.length > 0 && (
        <button onClick={clearAll} className="mt-6 text-sm underline underline-offset-4">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
      <aside className="hidden lg:block">
        <div className="sticky top-28">{panel}</div>
      </aside>

      <div>
        {/* toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            {total} {total === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSheet(true)}
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filters{chips.length > 0 && ` (${chips.length})`}
            </button>
            <label htmlFor="sort" className="sr-only">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setOne("sort", e.target.value === "featured" ? undefined : e.target.value)}
              className="rounded-full border border-ink/20 bg-transparent px-4 py-2 text-sm"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* active chips */}
        {chips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button
                key={c.label}
                onClick={c.clear}
                aria-label={`Remove filter ${c.label}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 text-sm hover:bg-ink/10"
              >
                {c.label} <X size={14} />
              </button>
            ))}
            <button onClick={clearAll} className="px-2 text-sm underline underline-offset-4">
              Clear all
            </button>
          </div>
        )}

        <div className={cn("transition-opacity duration-200", pending && "opacity-50")}>{children}</div>
      </div>

      {/* mobile bottom sheet */}
      <AnimatePresence>
        {sheet && (
          <>
            <motion.div
              key="sheet-bg"
              className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheet(false)}
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="fixed inset-x-0 bottom-0 z-[75] flex max-h-[85vh] flex-col rounded-t-3xl bg-paper lg:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-4">
                <h2 className="font-display text-2xl">Filters</h2>
                <button onClick={() => setSheet(false)} aria-label="Close filters" className="p-1">
                  <X size={22} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">{panel}</div>
              <div className="border-t border-ink/10 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button
                  onClick={() => setSheet(false)}
                  className="w-full rounded-full bg-ink py-3.5 text-sm uppercase tracking-[0.15em] text-paper"
                >
                  Show {total} {total === 1 ? "product" : "products"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}