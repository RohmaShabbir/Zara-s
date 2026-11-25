# 🛍️ Shopping Website — Modern E-commerce Storefront

An editorial-style online clothing and accessories store built with **Next.js 15**, **React 19**, **TypeScript** and **Tailwind CSS**. It focuses on a calm, premium look, smooth motion and a complete shopping flow, from browsing to a confirmed order.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-animations-0055FF?logo=framer&logoColor=white)

**🔗 Live demo:** https://shopping-website-pi-two.vercel.app

<!--
Add screenshots here once you have them, for example:

![Home](docs/screenshots/home.png)
![Shop](docs/screenshots/shop.png)
![Product](docs/screenshots/product.png)
-->

---

## ✨ Features

### Storefront
- **Editorial homepage:** animated hero with parallax, scrolling marquee, bento category grid, new arrivals, best sellers with animated tabs, "Shop the look" lookbook with hotspots, deal of the week with a live countdown, testimonials slider, Instagram grid and newsletter.
- **Navigation:** glass navbar that hides on scroll down, desktop mega menu, full-screen mobile menu, mobile bottom navigation and an announcement bar.
- **Search:** command-palette style overlay (`Ctrl/Cmd + K`) with live results and keyboard navigation, plus a full `/search` results page.

### Shopping
- **Shop and category pages** with URL-synced filters (category, price, size, rating, sale, in stock), sorting, active filter chips and a mobile bottom-sheet. Filtered links are shareable.
- **Product pages** with zoom gallery, lightbox, swipe, size selection, quantity stepper, Add to bag, Buy now, wishlist, share, stock indicator, mobile sticky add-to-bag bar, related products and recently viewed.
- **Persistent bag and wishlist** (Zustand + localStorage) with live count badges.
- **Cart drawer and cart page** with free-shipping progress and promo codes (try `WELCOME10`).
- **Multi-step checkout** (Contact → Shipping → Payment → Review) with validation, then an order confirmation page.

### Quality
- Fully responsive, mobile-first layout.
- Accessible: keyboard navigation, focus handling, ARIA labels, form error announcements and `prefers-reduced-motion` support.
- SEO-ready: per-page metadata, Open Graph, `sitemap.xml`, `robots.txt` and Product JSON-LD.
- Optimised images (`next/image`) and fonts (`next/font`).
- Extras: scroll progress bar, back-to-top button, desktop cursor follower, custom 404 and loading skeletons.

> **Note:** checkout is currently a **demo**. Payment is cash on delivery only, no payment is taken, no email is sent and orders are stored only in the browser session. See [Roadmap](#-roadmap).

---

## 🧰 Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS, CSS variables (design tokens) |
| Animation | Framer Motion |
| State | Zustand (with `persist`) |
| Icons | Lucide React, React Icons (brand logos) |
| Fonts | Fraunces (display) and Inter (body) via `next/font` |
| Hosting | Vercel |

---

## 🚀 Getting Started

**Requirements:** Node.js 18.18 or newer.

```bash
# 1. Clone the repository
git clone https://github.com/RohmaShabbir/Shopping-website.git
cd Shopping-website

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

### Environment variables

Create a `.env.local` file (optional for local development):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Set `NEXT_PUBLIC_SITE_URL` to your real domain in production. It is used for the sitemap, Open Graph and structured data.

---

## 📁 Project Structure

```
src/
├─ app/
│  ├─ layout.tsx · page.tsx · not-found.tsx · sitemap.ts · robots.ts
│  ├─ shop/ (listing, [category])      ├─ product/[slug]/
│  ├─ search/ · cart/ · wishlist/      ├─ checkout/ · order/success/
│  ├─ about/ · contact/ · faq/         └─ shipping-returns/ · privacy/ · terms/
│  └─ components/
│     ├─ layout/     Navbar, MobileMenu, CartDrawer, SearchOverlay, Footer...
│     ├─ home/       Hero, Marquee, CategoryGrid, Lookbook, DealOfWeek...
│     ├─ shop/       ProductCard, ProductGrid, ShopLayout (filters), WishlistView
│     ├─ product/    Gallery, PurchasePanel, ProductAccordion, RelatedProducts...
│     ├─ cart/       CartView, OrderSummary, PromoCode
│     ├─ checkout/   CheckoutView, OrderSuccess
│     ├─ effects/    ScrollProgress, BackToTop, CursorFollower, Magnetic
│     └─ ui/         Button, Rating, Reveal, Field, Breadcrumbs...
├─ data/             products, nav, deal, testimonials
├─ lib/              site config, pricing, shop filtering, utils
├─ store/            cart, wishlist, ui, checkout, recent (Zustand)
├─ hooks/            useMounted, useScrollDirection
└─ types/            product types
public/images/       product and banner images
```

---

## 🛠️ Customising

| What | Where |
|---|---|
| Brand name, tagline, email, social links | `src/lib/site.ts` |
| Products, prices, sizes, images | `src/data/products.ts` |
| Navigation and mega menu | `src/data/nav.ts` |
| Deal of the week (product and end date) | `src/data/deal.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Shipping fee, free-shipping threshold, promo codes | `src/lib/pricing.ts` |
| Colours and fonts | `:root` in `src/app/globals.css` and `tailwind.config.ts` |

**Adding a product:** add an image to `public/images/`, then add an entry to the `products` array in `src/data/products.ts`. The shop, search, sitemap and product page pick it up automatically. Provide two or more entries in `images` to enable the hover image swap and thumbnail gallery.

**Turning off the demo banner:** set `DEMO_CHECKOUT` to `false` in `src/lib/pricing.ts` once a real backend is connected.

---

## ☁️ Deployment

The project is deployed on [Vercel](https://vercel.com):

1. Push the repository to GitHub.
2. Import it in Vercel (settings are detected automatically).
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` with your production URL.
4. Deploy. Every push to `main` redeploys automatically.

---

## 🗺️ Roadmap

- [ ] Product management with a CMS (Sanity)
- [ ] Real orders in a database (MongoDB) and confirmation emails
- [ ] Online card payments (Stripe)
- [ ] Customer accounts and order history
- [ ] Product reviews and size guides
- [ ] Pagination or infinite scroll for large catalogues
- [ ] Dark mode
- [ ] Blog / journal

---

## 👩‍💻 Author

**Rohma Shabbir**, AI-focused full-stack developer.
GitHub: [@RohmaShabbir](https://github.com/RohmaShabbir)

---

⭐ If you like this project, consider giving it a star.
