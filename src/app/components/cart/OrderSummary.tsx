"use client";
import Image from "next/image";
import type { CartLine } from "@/store/cart";
import { useCheckout } from "@/store/checkout";
import { calcTotals, cartSubtotal } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";
import PromoCode from "@/app/components/cart/PromoCode";

export default function OrderSummary({
  items,
  showItems = false,
  children,
}: {
  items: CartLine[];
  showItems?: boolean;
  children?: React.ReactNode;
}) {
  const promo = useCheckout((s) => s.promo);
  const t = calcTotals(cartSubtotal(items), promo);

  return (
    <div className="rounded-3xl bg-surface p-6 md:p-8">
      <h2 className="font-display text-2xl">Order summary</h2>

      {showItems && (
        <ul className="mt-6 space-y-4">
          {items.map((i) => (
            <li key={`${i.id}-${i.size ?? ""}`} className="flex items-center gap-4">
              <div className="relative">
                <Image src={i.img} alt={i.title} width={56} height={70} className="h-[70px] w-[56px] rounded-lg object-cover" />
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] text-paper">
                  {i.qty}
                </span>
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium">{i.title}</p>
                {i.size && <p className="text-muted">Size {i.size}</p>}
              </div>
              <p className="text-sm font-medium">{formatPrice(i.price * i.qty)}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <PromoCode />
      </div>

      <dl className="mt-6 space-y-3 border-t border-ink/10 pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd>{formatPrice(t.subtotal)}</dd>
        </div>
        {t.discount > 0 && (
          <div className="flex justify-between text-plum">
            <dt>Discount ({promo})</dt>
            <dd>-{formatPrice(t.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd>{t.shipping === 0 ? "Free" : formatPrice(t.shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-ink/10 pt-4">
          <dt className="text-base">Total</dt>
          <dd className="font-display text-3xl">{formatPrice(t.total)}</dd>
        </div>
      </dl>

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}