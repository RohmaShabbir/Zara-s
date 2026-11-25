import type { CartLine } from "@/store/cart";

export const FREE_SHIPPING_THRESHOLD = 55;
export const FLAT_SHIPPING = 5; // TODO: asli shipping policy ke mutabiq badlein
export const DEMO_CHECKOUT = true; // backend lag jaye to false kar dein

export const PROMOS: Record<string, { label: string; percent: number }> = {
  WELCOME10: { label: "10% off your order", percent: 10 },
};

export function findPromo(input: string) {
  const code = input.trim().toUpperCase();
  const promo = PROMOS[code];
  return promo ? { code, ...promo } : null;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export const cartSubtotal = (items: CartLine[]) => items.reduce((a, i) => a + i.price * i.qty, 0);

export function calcTotals(subtotal: number, promoCode?: string | null) {
  const promo = promoCode ? PROMOS[promoCode] : undefined;
  const discount = promo ? round2((subtotal * promo.percent) / 100) : 0;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = round2(subtotal - discount + shipping);
  return { subtotal: round2(subtotal), discount, shipping, total };
}