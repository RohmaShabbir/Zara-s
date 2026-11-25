"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useUI } from "@/store/ui";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const popular = ["Jacket", "Shoes", "Watch", "Dress", "Sunglasses"];

export default function SearchOverlay() {
  const open = useUI((s) => s.searchOpen);
  const setSearch = useUI((s) => s.setSearch);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return products
      .filter((p) => [p.title, p.shortDesc, p.category, ...p.tags].join(" ").toLowerCase().includes(t))
      .slice(0, 6);
  }, [q]);

  // Ctrl/Cmd + K and Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(!useUI.getState().searchOpen);
      } else if (e.key === "Escape") {
        setSearch(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearch]);

  // lock scroll + focus input when opened
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    setQ("");
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setSearch(false);
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const r = results[active];
      if (r) go(`/product/${r.slug}`);
      else if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/50 px-4 pt-[10vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSearch(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-paper shadow-2xl"
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-5">
              <Search size={20} className="text-muted" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search jackets, shoes, watches..."
                aria-label="Search"
                className="h-14 flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
              />
              <button onClick={() => setSearch(false)} aria-label="Close search" className="p-1 text-muted hover:text-ink">
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3">
              {!q.trim() && (
                <div className="p-2">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {popular.map((p) => (
                      <button
                        key={p}
                        onClick={() => setQ(p)}
                        className="rounded-full border border-ink/15 px-4 py-1.5 text-sm transition-colors hover:bg-ink hover:text-paper"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {q.trim() && results.length === 0 && (
                <p className="p-6 text-center text-muted">No products found for &ldquo;{q}&rdquo;</p>
              )}

              {results.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => go(`/product/${p.slug}`)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-4 rounded-xl p-2 text-left transition-colors ${
                    i === active ? "bg-ink/5" : ""
                  }`}
                >
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    width={56}
                    height={70}
                    className="h-[70px] w-[56px] rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm capitalize text-muted">{p.category}</p>
                  </div>
                  <p className="font-medium">{formatPrice(p.price)}</p>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-ink/10 px-5 py-2.5 text-xs text-muted">
              <span>↑ ↓ to navigate · Enter to open</span>
              <span>Esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}