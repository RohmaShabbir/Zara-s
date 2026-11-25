import Hero from "@/app/components/home/Hero";
import Marquee from "@/app/components/home/Marquee";
import CategoryGrid from "@/app/components/home/CategoryGrid";
import NewArrivals from "@/app/components/home/NewArrivals";
import EditorialBanner from "@/app/components/home/EditorialBanner";
import BestSellers from "@/app/components/home/BestSellers";
import Lookbook from "@/app/components/home/Lookbook";
import DealOfWeek from "@/app/components/home/DealOfWeek";
import Values from "@/app/components/home/Values";
import Testimonials from "@/app/components/home/Testimonials";
import InstaGrid from "@/app/components/home/InstaGrid";
import NewsletterBanner from "@/app/components/home/NewsletterBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <CategoryGrid />
      <NewArrivals />
      <EditorialBanner />
      <BestSellers />
      <Lookbook />
      <DealOfWeek />
      <Values />
      <Testimonials />
      <InstaGrid />
      <NewsletterBanner />
    </main>
  );
}