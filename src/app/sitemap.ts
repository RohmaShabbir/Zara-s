import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { categories } from "@/lib/shop";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/shop", "/about", "/contact", "/faq", "/shipping-returns", "/privacy", "/terms"];

  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now })),
    ...categories
      .filter((c) => products.some((p) => p.category === c.key))
      .map((c) => ({ url: `${site.url}/shop/${c.key}`, lastModified: now })),
    ...products.map((p) => ({ url: `${site.url}/product/${p.slug}`, lastModified: new Date(p.createdAt) })),
  ];
}