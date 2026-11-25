import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm uppercase tracking-[0.15em] transition-colors";
const variants = {
  solid: "bg-ink text-paper hover:bg-plum",
  outline: "border border-ink/25 hover:bg-ink hover:text-paper",
  blush: "bg-blush text-ink hover:bg-paper",
};

export default function ButtonLink({
  href,
  variant = "solid",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}