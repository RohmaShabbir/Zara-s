"use client";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="flex items-center gap-2 py-3 text-paper">
        <Check size={18} className="text-blush" /> You&apos;re in. Watch your inbox.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (/^\S+@\S+\.\S+$/.test(email)) setDone(true); // TODO: backend / email service
      }}
      className="flex items-center border-b border-paper/30 focus-within:border-blush"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="h-12 flex-1 bg-transparent text-paper outline-none placeholder:text-paper/50"
      />
      <button type="submit" aria-label="Subscribe" className="p-2 text-paper transition-colors hover:text-blush">
        <ArrowRight size={20} />
      </button>
    </form>
  );
}