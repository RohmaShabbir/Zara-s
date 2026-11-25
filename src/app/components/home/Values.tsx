import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Reveal from "@/app/components/ui/Reveal";

const items = [
  { Icon: Truck, title: "Free shipping", text: "On every order over $55" },
  { Icon: RotateCcw, title: "Easy returns", text: "30 days, no questions asked" },
  { Icon: ShieldCheck, title: "Secure payment", text: "Your details stay protected" },
  { Icon: Headphones, title: "Friendly support", text: "We reply within 24 hours" },
];

export default function Values() {
  return (
    <section className="container pb-20 md:pb-28">
      <div className="grid grid-cols-2 gap-8 border-y border-ink/10 py-12 lg:grid-cols-4">
        {items.map(({ Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.08} className="flex flex-col items-center text-center">
            <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-blush/50">
              <Icon size={24} />
            </span>
            <h3 className="font-display text-xl">{title}</h3>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}