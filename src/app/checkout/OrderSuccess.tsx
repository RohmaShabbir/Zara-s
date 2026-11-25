"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCheckout } from "@/store/checkout";
import { useMounted } from "@/hooks/useMounted";
import { DEMO_CHECKOUT } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";
import ButtonLink from "@/app/components/ui/ButtonLink";

export default function OrderSuccess() {
  const mounted = useMounted();
  const order = useCheckout((s) => s.lastOrder);

  if (!mounted) return <div className="h-96 animate-pulse rounded-3xl bg-ink/5" aria-hidden="true" />;

  if (!order) {
    return (
      <div className="rounded-3xl bg-ink/5 px-6 py-24 text-center">
        <p className="font-display text-3xl">No recent order found</p>
        <p className="mx-auto mt-3 max-w-sm text-muted">Orders are only shown right after you place them.</p>
        <div className="mt-6">
          <ButtonLink href="/shop">Continue shopping</ButtonLink>
        </div>
      </div>
    );
  }

  const { totals: t, shipping: s } = order;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 15 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-plum text-paper"
        >
          <Check size={36} />
        </motion.span>
        <h1 className="mt-6 font-display text-5xl md:text-7xl">
          Thank you, <em className="text-plum">{s.fullName.split(" ")[0]}</em>
        </h1>
        <p className="mt-4 text-muted">
          Your order <strong className="text-ink">{order.id}</strong> has been placed.
        </p>
        {DEMO_CHECKOUT && (
          <p className="mx-auto mt-4 max-w-md rounded-2xl bg-blush/30 p-4 text-sm">
            Demo store: no payment was taken and no confirmation email was sent.
          </p>
        )}
      </div>

      <div className="mt-12 rounded-3xl bg-surface p-6 md:p-8">
        <ul className="divide-y divide-ink/10">
          {order.items.map((i) => (
            <li key={`${i.id}-${i.size ?? ""}`} className="flex items-center gap-4 py-4">
              <Image src={i.img} alt={i.title} width={56} height={70} className="h-[70px] w-[56px] rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium">{i.title}</p>
                <p className="text-sm text-muted">
                  Qty {i.qty}
                  {i.size && ` · Size ${i.size}`}
                </p>
              </div>
              <p className="font-medium">{formatPrice(i.price * i.qty)}</p>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPrice(t.subtotal)}</dd>
          </div>
          {t.discount > 0 && (
            <div className="flex justify-between text-plum">
              <dt>Discount ({order.promo})</dt>
              <dd>-{formatPrice(t.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-muted">Shipping</dt>
            <dd>{t.shipping === 0 ? "Free" : formatPrice(t.shipping)}</dd>
          </div>
          <div className="flex items-baseline justify-between pt-2">
            <dt className="text-base">Total (pay on delivery)</dt>
            <dd className="font-display text-3xl">{formatPrice(t.total)}</dd>
          </div>
        </dl>

        <div className="mt-8 grid gap-6 border-t border-ink/10 pt-6 text-sm sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">Shipping to</p>
            <p>{s.fullName}</p>
            <p>{[s.address, s.apartment].filter(Boolean).join(", ")}</p>
            <p>{[s.city, s.region, s.postalCode].filter(Boolean).join(", ")}</p>
            <p>{s.country}</p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">Contact</p>
            <p>{order.contact.email}</p>
            <p>{order.contact.phone}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop">Continue shopping</ButtonLink>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-ink/25 px-7 py-3.5 text-sm uppercase tracking-[0.15em] hover:bg-ink hover:text-paper"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}