import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartLine } from "@/store/cart";

export type Contact = { email: string; phone: string };
export type Shipping = {
  fullName: string;
  address: string;
  apartment: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};
export type OrderRecord = {
  id: string;
  placedAt: string;
  items: CartLine[];
  totals: { subtotal: number; discount: number; shipping: number; total: number };
  promo: string | null;
  contact: Contact;
  shipping: Shipping;
  payment: "cod";
};

export const emptyContact: Contact = { email: "", phone: "" };
export const emptyShipping: Shipping = {
  fullName: "",
  address: "",
  apartment: "",
  city: "",
  region: "",
  postalCode: "",
  country: "",
};

type CheckoutState = {
  promo: string | null;
  contact: Contact;
  shipping: Shipping;
  lastOrder: OrderRecord | null;
  setPromo: (code: string | null) => void;
  setContact: (c: Contact) => void;
  setShipping: (s: Shipping) => void;
  completeOrder: (o: OrderRecord) => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      promo: null,
      contact: emptyContact,
      shipping: emptyShipping,
      lastOrder: null,
      setPromo: (promo) => set({ promo }),
      setContact: (contact) => set({ contact }),
      setShipping: (shipping) => set({ shipping }),
      completeOrder: (lastOrder) =>
        set({ lastOrder, promo: null, contact: emptyContact, shipping: emptyShipping }),
    }),
    { name: "checkout", storage: createJSONStorage(() => sessionStorage) }
  )
);