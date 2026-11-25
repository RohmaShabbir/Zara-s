"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useUI } from "@/store/ui";
import { useCart } from "@/store/cart";
import { useMounted } from "@/hooks/useMounted";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING = 55;

export default function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const setCart = useUI((s) => s.setCart);
  const { items, setQty, remove } = useCart();
  const mounted = useMounted();

  const lines = mounted ? items : [];
  const subtotal = lines.reduce((a, i) => a + i.price * i.qty, 0);
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCart(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setCart]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCart(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-paper shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-2xl">Your bag ({lines.reduce((a, i) => a + i.qty, 0)})</h2>
              <button onClick={() => setCart(false)} aria-label="Close bag" className="p-1">
                <X size={22} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={40} className="text-muted" />
                <p className="font-display text-xl">Your bag is empty</p>
                <Link
                  href="/shop"
                  onClick={() => setCart(false)}
                  className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-plum"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                {/* free shipping progress */}
                <div className="px-6 pt-5">
                  <p className="mb-2 text-sm text-muted">
                    {remaining > 0
                      ? `Add ${formatPrice(remaining)} more for free shipping`
                      : "You've unlocked free shipping 🎉"}
                  </p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <motion.div
                      className="h-full rounded-full bg-blush"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
                  {lines.map((i) => (
                    <li key={`${i.id}-${i.size ?? ""}`} className="flex gap-4 py-5">
                      <Image
                        src={i.img}
                        alt={i.title}
                        width={80}
                        height={100}
                        className="h-[100px] w-[80px] rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="font-medium">{i.title}</p>
                            {i.size && <p className="text-sm text-muted">Size: {i.size}</p>}
                          </div>
                          <button
                            onClick={() => remove(i.id, i.size)}
                            aria-label={`Remove ${i.title}`}
                            className="text-muted hover:text-plum"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-ink/15">
                            <button
                              className="p-2"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(i.id, i.qty - 1, i.size)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm">{i.qty}</span>
                            <button
                              className="p-2"
                              aria-label="Increase quantity"
                              onClick={() => setQty(i.id, i.qty + 1, i.size)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-medium">{formatPrice(i.price * i.qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 border-t border-ink/10 px-6 py-5">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-xs text-muted">Shipping and taxes calculated at checkout.</p>
                  <Link
                    href="/checkout"
                    onClick={() => setCart(false)}
                    className="block rounded-full bg-ink py-3.5 text-center text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-plum"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setCart(false)}
                    className="block text-center text-sm underline underline-offset-4"
                  >
                    View full bag
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}