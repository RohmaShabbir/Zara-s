export type Category = "men" | "women" | "jewelry" | "perfume" | "accessories";

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  category: Category;
  tags: string[];
  price: number;
  oldPrice?: number;
  images: string[]; // [main, hover, ...gallery]
  sizes?: string[];
  stock: number;
  rating: number; // 0-5, decimals allowed
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  createdAt: string; // ISO date
}