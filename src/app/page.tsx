"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Navigation,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  UtensilsCrossed,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import DirectionsGuide from "@/components/DirectionsGuide";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  const { storeInfo, products, reviews, gallery } = useStore();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "traditional-pickles", label: "Pickles (Pachadi)" },
    { id: "traditional-sweets", label: "Traditional Sweets" },
    { id: "homemade-snacks", label: "Snacks (Pindi Vantalu)" },
    { id: "spice-powders", label: "Spice Powders (Podis)" },
    { id: "other-products", label: "Pure Ghee & Specialities" },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  const generalWhatsapp = encodeURIComponent(
    `Hello ${storeInfo.name}, I would like to enquire about your available traditional Andhra food products, prices, and store timings in Kurnool.`
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ==================================================
          1. HERO SECTION
          ================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF4EC] via-[#FCFBF7] to-[#FCFBF7] pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-[#EADECF]">
        
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#8B1416]/5 pointer-events-none blur-2xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/5 pointer-events-none blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1416]/10 border border-[#8B1416]/20 text-[#8B1416] text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
                <span>{storeInfo.tagline}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1F1B18] tracking-tight leading-tight">
                Discover Traditional Food Flavours at{" "}
                <span className="text-[#8B1416] block sm:inline">
                  {storeInfo.name}
                </span>
              </h1>

              {/* Verified Location Bar */}
              <div className="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#EADECF] text-xs text-[#524943] shadow-xs text-left">
                <MapPin className="w-4 h-4 text-[#8B1416] shrink-0" />
                <span>
                  <strong>Road No. 3, Venkataramana Colony Main Road</strong>, Kurnool, Andhra Pradesh – 518001
                </span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#524943] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Welcome to AAHAR HOME FOODS in Kurnool, Andhra Pradesh. Explore our range of authentic food products, discover traditional flavours, and contact us for product availability, pricing, and orders.
              </p>

              {/* Action Buttons Grid */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/products"
                  className="px-6 py-3.5 rounded-xl bg-[#8B1416] hover:bg-[#a81c1f] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  <span>Explore Our Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${storeInfo.whatsappNumber}?text=${generalWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Order on WhatsApp</span>
                </a>

                <a
                  href={`tel:${storeInfo.primaryPhone}`}
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#8B1416] text-sm font-semibold border border-[#EADECF] transition-all shadow-xs inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#8B1416]" />
                  <span>Call the Store</span>
                </a>

                <a
                  href={storeInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#524943] text-sm font-semibold border border-[#EADECF] transition-all shadow-xs inline-flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-[#8B1416]" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 border-t border-[#EADECF] grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                <div className="flex items-center gap-2 text-xs text-[#524943]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cold-Pressed Sesame Oils</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#524943]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Pure Desi Ghee Sweets</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#524943]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Open 7 Days in Kurnool</span>
                </div>
              </div>

            </div>

            {/* Right Visual Image Card Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Visual Card */}
                <div className="relative h-[380px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/images/store-ambiance.jpg"
                    alt="AAHAR HOME FOODS Store in Kurnool - Pickles, Sweets, and Homemade Savouries"
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Overlaid Banner info */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      Handcrafted in Kurnool
                    </span>
                    <h2 className="text-xl font-bold font-serif mt-0.5">
                      Authentic Rayalaseema Flavours
                    </h2>
                    <p className="text-xs text-stone-200 mt-1">
                      Traditional Avakaya, Gongura Pachadi, Sunnundalu, Chekodilu & Stone-ground Podis.
                    </p>
                  </div>
                </div>

                {/* Floating Official Logo Badge */}
                <div className="absolute -top-6 -left-4 sm:-left-6 bg-white p-2.5 rounded-2xl shadow-xl border border-[#EADECF] flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white">
                    <Image
                      src="/images/aahar-logo.jpg"
                      alt="Aahar Official Emblem"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="pr-2">
                    <p className="text-xs font-bold text-[#8B1416] uppercase font-serif">
                      AAHAR
                    </p>
                    <p className="text-[10px] text-[#B45309] font-semibold">
                      HOME FOODS
                    </p>
                  </div>
                </div>

                {/* Floating Store Timing Pill */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white py-2 px-3.5 rounded-xl shadow-lg border border-[#EADECF] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8B1416]" />
                  <div className="text-[11px]">
                    <span className="font-bold text-[#1F1B18] block">Today&apos;s Hours</span>
                    <span className="text-[#665E57]">{storeInfo.openingHoursShort}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          2. FEATURED BESTSELLERS TEASER
          ================================================== */}
      <section className="py-12 bg-white border-b border-[#EADECF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                  Customer Favourites in Kurnool
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1B18] font-serif mt-1">
                  Most Loved Traditional Specialties
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs sm:text-sm font-semibold text-[#8B1416] hover:text-[#a81c1f] inline-flex items-center gap-1 group"
              >
                <span>View All 20+ Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================================================
          3. FULL PRODUCT DISCOVERY SECTION
          ================================================== */}
      <section id="products-section" className="py-16 sm:py-20 bg-[#FCFBF7] border-b border-[#EADECF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Authentic Rayalaseema & Andhra Catalogue
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F1B18] font-serif mt-1">
                Explore Our Products
              </h2>
              <p className="text-sm text-[#665E57] mt-2">
                Every item at AAHAR HOME FOODS is prepared using verified traditional recipes, cold-pressed oils, and farm-fresh ingredients. Available for immediate pickup at our Venkataramana Colony store or WhatsApp ordering.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-[#8B1416] text-white shadow-md scale-102"
                      : "bg-white text-[#524943] hover:bg-[#F8F3EA] border border-[#EADECF]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs text-[#665E57] mb-3">
                Looking for custom weights, bulk festival orders, or specific dietary preparations?
              </p>
              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}?text=${generalWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Ask About Custom Orders on WhatsApp</span>
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ==================================================
          4. WHY CHOOSE AAHAR HOME FOODS
          ================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#EADECF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                The Aahar Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F1B18] font-serif mt-1">
                Traditional Taste. A Local Favourite.
              </h2>
              <p className="text-sm text-[#665E57] mt-2">
                We take pride in preserving authentic culinary methods, offering Kurnool families pure flavours reminiscent of grandmothers&apos; kitchens.
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1F1B18] font-serif">
                Traditional Food Flavours
              </h3>
              <p className="text-xs text-[#665E57] leading-relaxed">
                Recipes handed down through generations. Our Avakaya pickles are sun-cured in ceramic jaadis with stone-crushed mustard and Guntur red chillies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1F1B18] font-serif">
                Comprehensive Variety
              </h3>
              <p className="text-xs text-[#665E57] leading-relaxed">
                From tangy Gongura pachadi and spicy Chekodilu snacks to pure desi ghee Sunnundalu and aromatic Kandi Podi — all in one local shop.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1F1B18] font-serif">
                Convenient Local Access
              </h3>
              <p className="text-xs text-[#665E57] leading-relaxed">
                Centrally located on Road No. 3, Venkataramana Colony Main Road, just 500m from Teachers Colony with easy roadside parking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-3 card-hover-effect">
              <div className="w-12 h-12 rounded-xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1F1B18] font-serif">
                Customer-Focused Service
              </h3>
              <p className="text-xs text-[#665E57] leading-relaxed">
                Personalized care, fresh packaging for travellers, transparent pricing, and direct WhatsApp enquiry response by the store team.
              </p>
            </div>

          </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ==================================================
          5. CUSTOMER CONVERSION ACTION CALLOUT
          ================================================== */}
      <section className="py-14 bg-gradient-to-r from-[#8B1416] to-[#660C0E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Fresh Batches Ready Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif mt-1">
              Looking for Your Favourite Food Products?
            </h2>
            <p className="text-xs sm:text-base text-stone-200 mt-2 max-w-2xl mx-auto">
              Explore our available products or contact AAHAR HOME FOODS to enquire about prices, availability, and ordering.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/products"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                Browse Products
              </Link>

              <a
                href={`tel:${storeInfo.primaryPhone}`}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call Us ({storeInfo.phoneDisplay})</span>
              </a>

              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}?text=${generalWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={storeInfo.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <Navigation className="w-4 h-4 text-amber-300" />
                <span>Get Directions</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================================================
          6. PHOTO GALLERY PREVIEW
          ================================================== */}
      <section className="py-16 sm:py-20 bg-[#FCFBF7] border-b border-[#EADECF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                  Visual Showcase
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1F1B18] font-serif mt-1">
                  Authentic Food & Store Photography
                </h2>
              </div>
              <Link
                href="/gallery"
                className="text-xs sm:text-sm font-semibold text-[#8B1416] hover:text-[#a81c1f] inline-flex items-center gap-1 group"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#EADECF] overflow-hidden shadow-xs group"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 glass-badge px-2.5 py-0.5 rounded text-[10px] font-bold text-[#8B1416] uppercase border border-[#EADECF]">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-[#1F1B18] font-serif">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#665E57] mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================================================
          7. GENUINE CUSTOMER REVIEWS
          ================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#EADECF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Local Community Trust
              </span>
              <h2 className="text-3xl font-bold text-[#1F1B18] font-serif mt-1">
                What Kurnool Customers Say
              </h2>
              <p className="text-xs sm:text-sm text-[#665E57] mt-2">
                Genuine feedback from local patrons who enjoy our pickles, sweets, and snacks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href={storeInfo.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1416] hover:underline"
              >
                <span>Read more reviews on Google Maps listing</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================================================
          8. STORE DIRECTIONS & GOOGLE MAPS EMBED
          ================================================== */}
      <section className="py-16 sm:py-20 bg-[#FCFBF7] border-b border-[#EADECF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Visit Us in Person
              </span>
              <h2 className="text-3xl font-bold text-[#1F1B18] font-serif mt-1">
                Find Our Store in Kurnool
              </h2>
              <p className="text-xs sm:text-sm text-[#665E57] mt-2">
                Located at Road No. 3, Venkataramana Colony Main Road, Kurnool, Andhra Pradesh 518001. Open 7 days a week.
              </p>
            </div>

            {/* Detailed Directions Component */}
            <DirectionsGuide />

            {/* Google Maps Iframe */}
            <div className="mt-8 rounded-3xl overflow-hidden border-2 border-[#EADECF] shadow-md bg-stone-100">
              <div className="p-4 bg-white border-b border-[#EADECF] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8B1416]" />
                  <span className="text-xs font-bold text-[#1F1B18]">
                    Verified Google Maps View — Venkataramana Colony, Kurnool
                  </span>
                </div>
                <a
                  href={storeInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8B1416] font-semibold hover:underline flex items-center gap-1"
                >
                  Open Fullscreen Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <iframe
                src={storeInfo.googleMapsEmbedUrl}
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AAHAR HOME FOODS Location on Google Maps in Kurnool"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================================================
          9. FINAL CALL TO ACTION
          ================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="up">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF4EC] border border-[#EADECF] space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1416]">
                {storeInfo.tagline}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1F1B18] font-serif">
                Experience AAHAR HOME FOODS
              </h2>
              <p className="text-xs sm:text-sm text-[#524943] max-w-xl mx-auto">
                Visit us in Kurnool or contact us to learn more about our available products, fresh pickle seasons, and festival sweet bookings.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <a
                  href={storeInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#8B1416] hover:bg-[#a81c1f] text-white text-xs sm:text-sm font-semibold transition-all shadow-md inline-flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Find Our Location</span>
                </a>

                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#1F1B18] text-xs sm:text-sm font-semibold border border-[#EADECF] transition-all shadow-xs inline-flex items-center gap-2"
                >
                  <span>Contact Us</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
