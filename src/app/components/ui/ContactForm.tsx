"use client";
import { useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import Field from "@/app/components/ui/Field";

export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) er.email = "Enter a valid email address.";
    if (f.message.trim().length < 10) er.message = "Please write a short message.";
    setErrors(er);
    if (Object.keys(er).length) return;

    const subject = encodeURIComponent(`Message from ${f.name.trim()}`);
    const body = encodeURIComponent(`${f.message.trim()}\n\n${f.name.trim()}\n${f.email.trim()}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Field id="c-name" label="Your name" autoComplete="name" value={f.name} error={errors.name}
        onChange={(e) => setF({ ...f, name: e.target.value })} />
      <Field id="c-email" label="Email" type="email" autoComplete="email" value={f.email} error={errors.email}
        onChange={(e) => setF({ ...f, email: e.target.value })} />
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm">Message</label>
        <textarea
          id="c-message"
          rows={6}
          value={f.message}
          onChange={(e) => setF({ ...f, message: e.target.value })}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "c-message-error" : undefined}
          className={cn(
            "w-full rounded-xl border bg-surface p-4 outline-none transition-colors focus:border-ink",
            errors.message ? "border-plum" : "border-ink/15"
          )}
        />
        {errors.message && (
          <p id="c-message-error" role="alert" className="mt-1.5 text-sm text-plum">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="rounded-full bg-ink px-8 py-3.5 text-sm uppercase tracking-[0.15em] text-paper transition-colors hover:bg-plum"
      >
        Send message
      </button>
      <p className="text-sm text-muted">This opens your email app with your message ready to send.</p>
    </form>
  );
}