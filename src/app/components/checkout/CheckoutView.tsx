"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useCart, type CartLine } from "@/store/cart";
import { useCheckout, type Contact, type OrderRecord, type Shipping } from "@/store/checkout";
import { useMounted } from "@/hooks/useMounted";
import { calcTotals, cartSubtotal, DEMO_CHECKOUT } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import Field from "@/app/components/ui/Field";
import OrderSummary from "@/app/components/cart/OrderSummary";

const STEPS = ["Contact", "Shipping", "Payment", "Review"];
type Errors = Record<string, string>;

function validateContact(c: Contact): Errors {
  const e: Errors = {};
  if (!/^\S+@\S+\.\S+$/.test(c.email.trim())) e.email = "Enter a valid email address.";
  if (c.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid phone number.";
  return e;
}

function validateShipping(s: Shipping): Errors {
  const e: Errors = {};
  if (s.fullName.trim().length < 2) e.fullName = "Enter your full name.";
  if (s.address.trim().length < 5) e.address = "Enter your street address.";
  if (!s.city.trim()) e.city = "Enter your city.";
  if (!s.region.trim()) e.region = "Enter your state or province.";
  if (!s.country.trim()) e.country = "Enter your country.";
  return e;
}

const makeOrderId = () =>
  `ORD-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

/* ---------- outer: mount + empty cart ---------- */
export default function CheckoutView() {
  const mounted = useMounted();
  const items = useCart((s) => s.items);
  const [placed, setPlaced] = useState(false);

  if (!mounted || placed) return <div className="h-96 animate-pulse rounded-3xl bg-ink/5" aria-hidden="true" />;

  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-ink/5 px-6 py-24 text-center">
        <p className="font-display text-3xl">Your bag is empty</p>
        <p className="mx-auto mt-3 max-w-sm text-muted">Add something to your bag before checking out.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.15em] text-paper hover:bg-plum"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  return <CheckoutFlow items={items} onPlaced={() => setPlaced(true)} />;
}

/* ---------- inner: the steps ---------- */
function CheckoutFlow({ items, onPlaced }: { items: CartLine[]; onPlaced: () => void }) {
  const router = useRouter();
  const clearCart = useCart((s) => s.clear);
  const promo = useCheckout((s) => s.promo);
  const savedContact = useCheckout((s) => s.contact);
  const savedShipping = useCheckout((s) => s.shipping);
  const setSavedContact = useCheckout((s) => s.setContact);
  const setSavedShipping = useCheckout((s) => s.setShipping);
  const completeOrder = useCheckout((s) => s.completeOrder);

  const [step, setStep] = useState(0);
  const [contact, setContact] = useState<Contact>(savedContact);
  const [ship, setShip] = useState<Shipping>(savedShipping);
  const [errors, setErrors] = useState<Errors>({});
  const [placing, setPlacing] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const goTo = (n: number) => {
    setErrors({});
    setStep(n);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const next = () => {
    if (step === 0) {
      const e = validateContact(contact);
      if (Object.keys(e).length) return setErrors(e);
      setSavedContact(contact);
    }
    if (step === 1) {
      const e = validateShipping(ship);
      if (Object.keys(e).length) return setErrors(e);
      setSavedShipping(ship);
    }
    goTo(step + 1);
  };

  const place = () => {
    if (placing) return;
    setPlacing(true);
    const order: OrderRecord = {
      id: makeOrderId(),
      placedAt: new Date().toISOString(),
      items,
      totals: calcTotals(cartSubtotal(items), promo),
      promo,
      contact,
      shipping: ship,
      payment: "cod",
    };
    completeOrder(order);
    onPlaced();
    clearCart();
    router.push("/order/success");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) place();
    else next();
  };

  const setC = (k: keyof Contact) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setContact((c) => ({ ...c, [k]: e.target.value }));
  const setS = (k: keyof Shipping) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setShip((s) => ({ ...s, [k]: e.target.value }));

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* stepper */}
      <ol className="flex items-center gap-2 text-sm md:gap-4" aria-label="Checkout steps">
        {STEPS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label} className="flex items-center gap-2 md:gap-4">
              <button
                type="button"
                disabled={!done}
                onClick={() => goTo(i)}
                aria-current={current ? "step" : undefined}
                className={cn("flex items-center gap-2", !done && !current && "text-muted", done && "hover:text-plum")}
              >
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full border text-xs",
                    current && "border-ink bg-ink text-paper",
                    done && "border-plum bg-plum text-paper",
                    !done && !current && "border-ink/20"
                  )}
                >
                  {done ? <Check size={14} /> : i + 1}
                </span>
                <span className={cn("hidden sm:inline", current && "font-medium")}>{label}</span>
              </button>
              {i < STEPS.length - 1 && <span className="h-px w-5 bg-ink/20 md:w-10" />}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
        <form onSubmit={onSubmit} noValidate>
          {/* step 0 */}
          {step === 0 && (
            <section className="space-y-5">
              <h2 className="font-display text-3xl">Contact details</h2>
              <Field id="email" label="Email" type="email" autoComplete="email" value={contact.email} onChange={setC("email")} error={errors.email} />
              <Field id="phone" label="Phone number" type="tel" autoComplete="tel" value={contact.phone} onChange={setC("phone")} error={errors.phone} />
            </section>
          )}

          {/* step 1 */}
          {step === 1 && (
            <section className="space-y-5">
              <h2 className="font-display text-3xl">Shipping address</h2>
              <Field id="fullName" label="Full name" autoComplete="name" value={ship.fullName} onChange={setS("fullName")} error={errors.fullName} />
              <Field id="address" label="Street address" autoComplete="address-line1" value={ship.address} onChange={setS("address")} error={errors.address} />
              <Field id="apartment" label="Apartment, suite, etc." optional autoComplete="address-line2" value={ship.apartment} onChange={setS("apartment")} />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="city" label="City" autoComplete="address-level2" value={ship.city} onChange={setS("city")} error={errors.city} />
                <Field id="region" label="State / Province" autoComplete="address-level1" value={ship.region} onChange={setS("region")} error={errors.region} />
                <Field id="postalCode" label="Postal code" optional autoComplete="postal-code" value={ship.postalCode} onChange={setS("postalCode")} />
                <Field id="country" label="Country" autoComplete="country-name" value={ship.country} onChange={setS("country")} error={errors.country} />
              </div>
            </section>
          )}

          {/* step 2 */}
          {step === 2 && (
            <section className="space-y-4">
              <h2 className="font-display text-3xl">Payment</h2>
              <div role="radiogroup" aria-label="Payment method" className="space-y-3">
                <label className="flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-ink p-5">
                  <input type="radio" name="payment" defaultChecked className="mt-1 accent-plum" />
                  <span>
                    <span className="block font-medium">Cash on delivery</span>
                    <span className="text-sm text-muted">Pay in cash when your order arrives.</span>
                  </span>
                </label>
                <label className="flex items-start gap-4 rounded-2xl border border-ink/15 p-5 opacity-50">
                  <input type="radio" name="payment" disabled className="mt-1" />
                  <span>
                    <span className="block font-medium">Credit / debit card</span>
                    <span className="text-sm text-muted">Coming soon.</span>
                  </span>
                </label>
              </div>
            </section>
          )}

          {/* step 3 */}
          {step === 3 && (
            <section className="space-y-6">
              <h2 className="font-display text-3xl">Review your order</h2>

              {DEMO_CHECKOUT && (
                <p className="rounded-2xl bg-blush/30 p-4 text-sm">
                  <strong>Demo store.</strong> No payment is taken and no email is sent. Your order is saved only in
                  this browser session.
                </p>
              )}

              <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-surface">
                {[
                  { title: "Contact", edit: 0, lines: [contact.email, contact.phone] },
                  {
                    title: "Ship to",
                    edit: 1,
                    lines: [
                      ship.fullName,
                      [ship.address, ship.apartment].filter(Boolean).join(", "),
                      [ship.city, ship.region, ship.postalCode].filter(Boolean).join(", "),
                      ship.country,
                    ],
                  },
                  { title: "Payment", edit: 2, lines: ["Cash on delivery"] },
                ].map((b) => (
                  <div key={b.title} className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">{b.title}</p>
                      {b.lines.map((l, k) => (
                        <p key={k}>{l}</p>
                      ))}
                    </div>
                    <button type="button" onClick={() => goTo(b.edit)} className="text-sm underline underline-offset-4">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* nav buttons */}
          <div className="mt-10 flex items-center justify-between gap-4">
            {step > 0 ? (
              <button type="button" onClick={() => goTo(step - 1)} className="text-sm underline underline-offset-4">
                Back
              </button>
            ) : (
              <Link href="/cart" className="text-sm underline underline-offset-4">
                Back to bag
              </Link>
            )}
            <button
              type="submit"
              disabled={placing}
              className="rounded-full bg-ink px-10 py-3.5 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-plum disabled:opacity-50"
            >
              {step === 3 ? (placing ? "Placing order..." : "Place order") : "Continue"}
            </button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <OrderSummary items={items} showItems />
        </aside>
      </div>
    </div>
  );
}