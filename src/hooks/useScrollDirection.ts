"use client";
import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 10) {
  const [dir, setDir] = useState<"up" | "down">("up");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (Math.abs(y - last) > threshold) {
        setDir(y > last && y > 120 ? "down" : "up");
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { dir, scrolled };
}