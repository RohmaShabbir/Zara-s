import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  id: string;
  title: string;
  price: number;
  img: string;
  qty: number;
  size?: string;
};

type CartState = {
  items: CartLine[];
  add: (item: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (id: string, size?: string) => void;
  setQty: (id: string, qty: number, size?: string) => void;
  clear: () => void;
};

const same = (a: CartLine, id: string, size?: string) => a.id === id && a.size === size;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, qty = 1) =>
        set((s) => {
          const existing = s.items.find((i) => same(i, item.id, item.size));
          if (existing) {
            return { items: s.items.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i)) };
          }
          return { items: [...s.items, { ...item, qty }] };
        }),
      remove: (id, size) => set((s) => ({ items: s.items.filter((i) => !same(i, id, size)) })),
      setQty: (id, qty, size) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => !same(i, id, size))
              : s.items.map((i) => (same(i, id, size) ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "cart" }
  )
);