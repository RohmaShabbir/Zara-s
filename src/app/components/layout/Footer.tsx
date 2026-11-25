import Link from "next/link";
import { BsFacebook, BsInstagram, BsPinterest, BsTiktok } from "react-icons/bs";
import { site } from "@/lib/site";
import NewsletterForm from "@/app/components/ui/NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Women", href: "/shop/women" },
      { label: "Men", href: "/shop/men" },
      { label: "Accessories", href: "/shop/accessories" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/blog" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: site.instagram, Icon: BsInstagram },
  { label: "Facebook", href: site.facebook, Icon: BsFacebook },
  { label: "TikTok", href: site.tiktok, Icon: BsTiktok },
  { label: "Pinterest", href: site.pinterest, Icon: BsPinterest },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="mt-24 overflow-hidden bg-ink pb-24 text-paper lg:pb-0">
      <div className="container grid gap-12 pt-20 lg:grid-cols-[1.4fr_2fr]">
        <div className="max-w-md">
          <h2 className="font-display text-3xl leading-tight md:text-4xl">Join the list. Get 10% off your first order.</h2>
          <p className="mt-3 text-sm text-paper/60">New drops, style notes and early access. No spam.</p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="mb-4 font-body text-xs uppercase tracking-[0.2em] text-paper/50">{c.title}</h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-paper/80 transition-colors hover:text-blush">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-6 text-sm text-paper/50 sm:flex-row sm:items-center">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ label, href, Icon }) => (
            <a key={label} href={href} aria-label={label} className="transition-colors hover:text-blush">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* giant wordmark */}
      <p
        aria-hidden="true"
        className="select-none whitespace-nowrap text-center font-display text-[24vw] leading-[0.8] tracking-tighter text-paper/[0.06]"
      >
        {site.name}
      </p>
    </footer>
  );
}