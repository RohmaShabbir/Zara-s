import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import AnnouncementBar from "@/app/components/layout/AnnouncementBar";
import Navbar from "@/app/components/layout/Navbar";
import MobileMenu from "@/app/components/layout/MobileMenu";
import CartDrawer from "@/app/components/layout/CartDrawer";
import BottomNav from "@/app/components/layout/BottomNav";
import SearchOverlay from "@/app/components/layout/SearchOverlay";
import Footer from "@/app/components/layout/Footer";
import ScrollProgress from "@/app/components/effects/ScrollProgress";
import BackToTop from "@/app/components/effects/BackToTop";
import CursorFollower from "@/app/components/effects/CursorFollower";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <ScrollProgress />
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
        <MobileMenu />
        <CartDrawer />
        <SearchOverlay />
        <BottomNav />
        <BackToTop />
        <CursorFollower />
      </body>
    </html>
  );
}