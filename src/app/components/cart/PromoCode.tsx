"use client";
import { useState } from "react";
import { Check, Tag, X } from "lucide-react";
import { findPromo, PROMOS } from "@/lib/pricing";
import { useCheckout } from "@/store/checkout";

export default function PromoCode() {
  const promo = useCheckout((s) => s.promo);
  const setPromo = useCheckout((s) => s.setPromo);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const applied = promo ? PROMOS[promo] : null;

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    const found = findPromo(value);
    if (!found) {
      setError("That code isn't valid.");
      return;
    }
    setPromo(found.code);
    setValue("");
    setError("");
  };

  if (promo && applied) {
    return (
      <div className="flex items-center justify-between rounded-xl bg-sage/30 px-4 py-3 text-sm">
        <span className="flex items-center gap-2">
          <Check size={16} /> <strong>{promo}</strong> &middot; {applied.label}
        </span>
        <button onClick={() => setPromo(null)} aria-label="Remove promo code" className="p-1">
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={apply}>
      <label htmlFor="promo" className="sr-only">
        Promo code
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="promo"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            placeholder="Promo code"
            autoComplete="off"
            className="h-12 w-full rounded-xl border border-ink/15 bg-surface pl-10 pr-3 uppercase outline-none focus:border-ink"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-ink px-5 text-sm uppercase tracking-[0.1em] text-paper transition-colors hover:bg-plum"
        >
          Apply
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-plum">
          {error}
        </p>
      )}
    </form>
  );
}