export type MegaItem = { title: string; href: string; img: string };
export type NavItem = { label: string; href: string; mega?: MegaItem[] };

export const navLinks: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    mega: [
      { title: "Women", href: "/shop/women", img: "/images/w-jacket.jpg" },
      { title: "Men", href: "/shop/men", img: "/images/men-j.jpg" },
      { title: "Accessories", href: "/shop/accessories", img: "/images/watches.jpg" },
      { title: "New Arrivals", href: "/shop?sort=newest", img: "/images/frocks.jpg" },
    ],
  },
  { label: "Women", href: "/shop/women" },
  { label: "Men", href: "/shop/men" },
  { label: "Accessories", href: "/shop/accessories" },
];