"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import { useUI } from "@/store/ui";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { cn } from "@/lib/utils";
import CountBadge from "../ui/CountBadge";

const tab = "relative flex flex-col items-center gap-0.5 py-2 text-[10px] uppercase tracking-wider";

export default function BottomNav() {
  const pathname = usePathname();
  const { setCart, setSearch } = useUI();
  const cartCount = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const active = (href: string) => (pathname === href ? "text-plum" : "text-ink");

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-ink/10 bg-paper/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <Link href="/" className={cn(tab, active("/"))}>
        <Home size={20} /> Home
      </Link>
      <Link href="/shop" className={cn(tab, active("/shop"))}>
        <LayoutGrid size={20} /> Shop
      </Link>
      <button className={tab} onClick={() => setSearch(true)}>
        <Search size={20} /> Search
      </button>
      <Link href="/wishlist" className={cn(tab, active("/wishlist"))}>
        <span className="relative">
          <Heart size={20} />
          <CountBadge n={wishCount} />
        </span>
        Saved
      </Link>
      <button className={tab} onClick={() => setCart(true)}>
        <span className="relative">
          <ShoppingBag size={20} />
          <CountBadge n={cartCount} />
        </span>
        Bag
      </button>
    </nav>
  );
}