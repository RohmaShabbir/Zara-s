"use client";
import { useMounted } from "@/hooks/useMounted";

export default function CountBadge({ n }: { n: number }) {
  const mounted = useMounted();
  if (!mounted || n <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-plum px-1 text-[10px] font-medium text-white">
      {n}
    </span>
  );
}