"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const messages = [
  "Free shipping on orders over $55",
  "New drop: the Summer Collection is live",
  "Use code WELCOME10 for 10% off your first order",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);

  if (!open) return null;

  return (
    <div className="relative bg-ink text-xs uppercase tracking-[0.2em] text-paper">
      <div className="flex h-9 items-center justify-center overflow-hidden px-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {messages[i]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={() => setOpen(false)}
        aria-label="Close announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
      >
        <X size={14} />
      </button>
    </div>
  );
}