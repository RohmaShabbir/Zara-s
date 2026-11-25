"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { navLinks } from "@/data/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useUI } from "@/store/ui";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import CountBadge from "@/app/components/ui/CountBadge";

const iconBtn = "relative p-2 transition-colors hover:text-plum";

export default function Navbar() {
  const { dir, scrolled } = useScrollDirection();
  const { setMenu, setCart, setSearch } = useUI();
  const cartCount = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const [mega, setMega] = useState<string | null>(null);

  const activeItem = navLinks.find((l) => l.label === mega && l.mega);

  return (
    <motion.header
      animate={{ y: dir === "down" ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseLeave={() => setMega(null)}
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || mega ? "border-ink/10 bg-paper/80 backdrop-blur-xl" : "border-transparent bg-paper"
      )}
    >
      <div
        className={cn(
          "container grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-300",
          scrolled ? "h-14" : "h-20"
        )}
      >
        {/* left */}
        <div className="flex items-center">
          <button className={cn(iconBtn, "-ml-2 lg:hidden")} aria-label="Open menu" onClick={() => setMenu(true)}>
            <Menu size={22} />
          </button>
          <nav className="hidden gap-7 lg:flex" aria-label="Main">
            {navLinks.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                onMouseEnter={() => setMega(l.mega ? l.label : null)}
                onFocus={() => setMega(l.mega ? l.label : null)}
                className="group relative text-sm uppercase tracking-[0.15em]"
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-300",
                    mega === l.label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* center */}
        <Link href="/" className="font-display text-2xl tracking-tight lg:text-3xl">
          {site.name}
        </Link>

        {/* right */}
        <div className="flex items-center justify-end gap-1">
          <button className={iconBtn} aria-label="Search (Ctrl K)" onClick={() => setSearch(true)}>
            <Search size={20} />
          </button>
          <Link href="/wishlist" className={cn(iconBtn, "hidden lg:inline-flex")} aria-label="Wishlist">
            <Heart size={20} />
            <CountBadge n={wishCount} />
          </Link>
          <button className={cn(iconBtn, "-mr-2 lg:mr-0")} aria-label="Open bag" onClick={() => setCart(true)}>
            <ShoppingBag size={20} />
            <CountBadge n={cartCount} />
          </button>
        </div>
      </div>

      {/* mega menu */}
      <AnimatePresence>
        {activeItem?.mega && (
          <motion.div
            key="mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-paper/95 backdrop-blur-xl lg:block"
          >
            <div className="container grid grid-cols-4 gap-6 py-8">
              {activeItem.mega.map((m) => (
                <Link key={m.href} href={m.href} onClick={() => setMega(null)} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink/5">
                    <Image
                      src={m.img}
                      alt={m.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 flex items-center justify-between font-display text-xl">
                    {m.title}
                    <ArrowUpRight
                      size={18}
                      className="-translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}