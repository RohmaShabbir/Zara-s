import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { categories } from "@/lib/shop";
import { site } from "@/lib/site";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import Gallery from "@/app/components/product/Gallery";
import PurchasePanel from "@/app/components/product/PurchasePanel";
import ProductAccordion from "@/app/components/product/ProductAccordion";
import RelatedProducts from "@/app/components/product/RelatedProducts";
import RecentlyViewed from "@/app/components/product/RecentlyViewed";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.shortDesc,
    openGraph: { title: p.title, description: p.shortDesc, images: [p.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const cat = categories.find((c) => c.key === p.category);

  // NOTE: aggregateRating jaan boojh kar nahi daala. Jab tak asli reviews na hon,
  // demo ratings structured data mein dena Google ki guidelines ke khilaf hai.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: p.description,
    image: p.images.map((i) => `${site.url}${i}`),
    category: p.category,
    offers: {
      "@type": "Offer",
      price: p.price.toFixed(2),
      priceCurrency: "USD",
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${site.url}/product/${p.slug}`,
    },
  };

  return (
    <main className="container pb-32 pt-8 md:pt-12 lg:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: cat?.label ?? p.category, href: `/shop/${p.category}` },
          { label: p.title },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Gallery images={p.images} title={p.title} />
        </div>

        <div>
          <PurchasePanel product={p} />
          <div className="mt-10">
            <ProductAccordion
              items={[
                { title: "Description", body: p.description },
                {
                  title: "Shipping & returns",
                  body: "Free standard shipping on orders over $55. Orders are packed within 1-2 business days. Unworn items with tags can be returned within 30 days of delivery.",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <RelatedProducts product={p} />
      <RecentlyViewed currentId={p.id} />
    </main>
  );
}