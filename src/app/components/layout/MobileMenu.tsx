"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUI } from "@/store/ui";
import { navLinks } from "@/data/nav";
import { site } from "@/lib/site";

export default function MobileMenu() {
  const open = useUI((s) => s.menuOpen);
  const setMenu = useUI((s) => s.setMenu);
  const pathname = usePathname();

  useEffect(() => setMenu(false), [pathname, setMenu]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setMenu]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden"
          initial={{ clipPath: "circle(0% at 10% 5%)" }}
          animate={{ clipPath: "circle(150% at 10% 5%)" }}
          exit={{ clipPath: "circle(0% at 10% 5%)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container flex h-20 items-center justify-between">
            <span className="font-display text-2xl">{site.name}</span>
            <button onClick={() => setMenu(false)} aria-label="Close menu" className="-mr-2 p-2">
              <X size={24} />
            </button>
          </div>

          <ul className="container flex flex-1 flex-col justify-center gap-4">
            {navLinks.map((l, i) => (
              <motion.li
                key={l.href}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.5 }}
              >
                <Link href={l.href} className="font-display text-5xl tracking-tight hover:text-plum">
                  {l.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <p className="container pb-8 text-xs uppercase tracking-[0.2em] text-muted">{site.tagline}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}