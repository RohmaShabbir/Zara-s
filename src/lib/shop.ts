import type { Category, Product } from "@/types/product";

export type Raw = Record<string, string | string[] | undefined>;

export const categories: { key: Category; label: string; blurb: string }[] = [
  { key: "women", label: "Women", blurb: "Dresses, outerwear and easy everyday pieces." },
  { key: "men", label: "Men", blurb: "Clean, comfortable essentials built to last." },
  { key: "accessories", label: "Accessories", blurb: "Watches, sunglasses and the finishing touches." },
  { key: "jewelry", label: "Jewelry", blurb: "Fine pieces, arriving soon." },
  { key: "perfume", label: "Perfume", blurb: "Signature scents, arriving soon." },
];

export const isCategory = (s: string): s is Category => categories.some((c) => c.key === s);

export const SORTS = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Top rated" },
] as const;
export type SortKey = (typeof SORTS)[number]["key"];

// min <= price < max
export const PRICE_RANGES: { key: string; label: string; min: number; max?: number }[] = [
  { key: "0-25", label: "Under $25", min: 0, max: 25 },
  { key: "25-50", label: "$25 – $49.99", min: 25, max: 50 },
  { key: "50-", label: "$50 and up", min: 50 },
];

export type Filters = {
  q?: string;
  category?: Category;
  sort: SortKey;
  price?: string;
  sizes: string[];
  sale: boolean;
  inStock: boolean;
  minRating?: number;
};

const arr = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const one = (v: string | string[] | undefined) => arr(v)[0];

export function parseFilters(raw: Raw, fixedCategory?: Category): Filters {
  const c = one(raw.category);
  const sort = one(raw.sort);
  const price = one(raw.price);
  const rating = Number(one(raw.rating));
  const q = one(raw.q)?.trim();

  return {
    q: q || undefined,
    category: fixedCategory ?? (c && isCategory(c) ? c : undefined),
    sort: SORTS.some((s) => s.key === sort) ? (sort as SortKey) : "featured",
    price: PRICE_RANGES.some((r) => r.key === price) ? price : undefined,
    sizes: arr(raw.size),
    sale: one(raw.sale) === "true",
    inStock: one(raw.stock) === "1",
    minRating: rating >= 1 && rating <= 5 ? rating : undefined,
  };
}

export function applyFilters(list: Product[], f: Filters): Product[] {
  const range = PRICE_RANGES.find((r) => r.key === f.price);
  const term = f.q?.toLowerCase();

  const out = list.filter((p) => {
    if (term) {
      const hay = [p.title, p.shortDesc, p.category, ...p.tags].join(" ").toLowerCase();
      if (!hay.includes(term)) return false;
    }
    if (f.category && p.category !== f.category) return false;
    if (range && (p.price < range.min || (range.max !== undefined && p.price >= range.max))) return false;
    if (f.sizes.length && !p.sizes?.some((s) => f.sizes.includes(s))) return false;
    if (f.sale && !(p.oldPrice && p.oldPrice > p.price)) return false;
    if (f.inStock && p.stock <= 0) return false;
    if (f.minRating && p.rating < f.minRating) return false;
    return true;
  });

  const sorted = [...out];
  switch (f.sort) {
    case "newest":
      sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    default:
      sorted.sort(
        (a, b) => Number(!!b.isBestSeller) - Number(!!a.isBestSeller) || b.reviewCount - a.reviewCount
      );
  }
  return sorted;
}

const SIZE_ORDER = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

export function allSizes(list: Product[]): string[] {
  const set = new Set(list.flatMap((p) => p.sizes ?? []));
  return [...set].sort((a, b) => {
    const ia = SIZE_ORDER.indexOf(a);
    const ib = SIZE_ORDER.indexOf(b);
    if (ia >= 0 && ib >= 0) return ia - ib;
    if (ia >= 0) return -1;
    if (ib >= 0) return 1;
    return Number(a) - Number(b);
  });
}

export function getRelated(product: Product, list: Product[], n = 4): Product[] {
  const others = list.filter((p) => p.id !== product.id);
  const same = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category).sort((a, b) => b.rating - a.rating);
  return [...same, ...rest].slice(0, n);
}