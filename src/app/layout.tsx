import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileQuickBar from "@/components/MobileQuickBar";
import AdminModal from "@/components/AdminModal";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    default: "AAHAR HOME FOODS | Traditional Food Products in Kurnool",
    template: "%s | AAHAR HOME FOODS Kurnool",
  },
  description:
    "Discover authentic traditional Andhra food products, Avakaya & Gongura pickles, pure ghee Sunnundalu sweets, crispy Chekodilu snacks, and stone-ground spice powders at AAHAR HOME FOODS, Road No. 3, Venkataramana Colony, Kurnool – 518001, Andhra Pradesh.",
  keywords: [
    "AAHAR HOME FOODS",
    "Aahar Home Foods Kurnool",
    "Aahar Home Foods in Kurnool",
    "Aahar Home Foods contact number",
    "Aahar Home Foods address",
    "Aahar Home Foods products",
    "food products shop in Kurnool",
    "traditional food products in Kurnool",
    "food store in Kurnool",
    "homemade food products in Kurnool",
    "traditional pickles in Kurnool",
    "Andhra pickles in Kurnool",
    "homemade pickles in Kurnool",
    "traditional sweets in Kurnool",
    "homemade snacks in Kurnool",
    "traditional spice powders in Kurnool",
    "food shops near Venkataramana Colony Kurnool",
    "food products near Teachers Colony Kurnool",
    "Andhra food products in Kurnool",
  ],
  authors: [{ name: "AAHAR HOME FOODS" }],
  creator: "AAHAR HOME FOODS",
  publisher: "AAHAR HOME FOODS",
  metadataBase: new URL("https://www.aaharhomefoods.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AAHAR HOME FOODS | Pure • Fresh • Traditional — Kurnool",
    description:
      "Handcrafted Andhra pickles, pure ghee sweets, crispy snacks, and traditional spice powders in Kurnool, Andhra Pradesh.",
    url: "https://www.aaharhomefoods.com",
    siteName: "AAHAR HOME FOODS",
    images: [
      {
        url: "/images/store-ambiance.jpg",
        width: 1200,
        height: 630,
        alt: "AAHAR HOME FOODS Store - Kurnool, Andhra Pradesh",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-AP",
    "geo.placename": "Kurnool",
    "geo.position": "15.8281;78.0373",
    ICBM: "15.8281, 78.0373",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment", "GroceryStore"],
    name: "AAHAR HOME FOODS",
    image: "https://www.aaharhomefoods.com/images/aahar-logo.jpg",
    logo: "https://www.aaharhomefoods.com/images/aahar-logo.jpg",
    description:
      "Authentic traditional Andhra homemade food business in Kurnool, offering Avakaya & Gongura pickles, pure ghee sweets, homemade snacks, and traditional spice powders.",
    telephone: "+919490123456",
    email: "enquiry@aaharhomefoods.com",
    url: "https://www.aaharhomefoods.com",
    priceRange: "₹₹",
    servesCuisine: "Andhra, Rayalaseema, South Indian Traditional",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Road No. 3, Venkataramana Colony Main Road",
      addressLocality: "Kurnool",
      addressRegion: "Andhra Pradesh",
      postalCode: "518001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 15.8281,
      longitude: 78.0373,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:30",
        closes: "21:30",
      },
    ],
    hasMap:
      "https://maps.google.com/?q=Road+No.+3+Venkataramana+Colony+Main+Road+Kurnool+Andhra+Pradesh+518001",
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/aahar-logo.jpg" />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#1F1B18] antialiased">
        <StoreProvider>
          <Navbar />
          <main className="flex-1 pb-16 sm:pb-0">{children}</main>
          <Footer />
          <MobileQuickBar />
          <AdminModal />
        </StoreProvider>
      </body>
    </html>
  );
}
