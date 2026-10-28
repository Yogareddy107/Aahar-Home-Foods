import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Sparkles, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { initialStoreInfo } from "@/data/initialData";

export const metadata: Metadata = {
  title: "About AAHAR HOME FOODS | Kurnool, Andhra Pradesh",
  description:
    "Learn about AAHAR HOME FOODS in Kurnool, Andhra Pradesh. Our commitment to authentic Rayalaseema culinary traditions, cold-pressed oils, pure ingredients, and handcrafted homemade food products.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const whatsappMsg = encodeURIComponent(
    `Hello ${initialStoreInfo.name}, I read your story on your website and would like to visit your shop in Venkataramana Colony, Kurnool.`
  );

  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#8C8276]">
          <Link href="/" className="hover:text-[#8B1416]">Home</Link>
          <span>/</span>
          <span className="text-[#8B1416] font-medium">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1416]/10 text-[#8B1416] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Our Culinary Heritage</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1F1B18] leading-tight">
              Honouring Andhra Culinary Heritage at{" "}
              <span className="text-[#8B1416]">AAHAR HOME FOODS</span>
            </h1>

            <p className="text-base text-[#524943] leading-relaxed">
              Rooted in the historic city of Kurnool, Andhra Pradesh, <strong>AAHAR HOME FOODS</strong> was founded with a singular purpose: to bring back the unadulterated flavours, pure aromas, and authentic joy of traditional home-style cooking.
            </p>

            <p className="text-sm text-[#524943] leading-relaxed">
              In a world dominated by mass-produced foods filled with artificial preservatives, synthetic vinegars, and commercial palm oils, our kitchen stands for old-world integrity. Every jar of Avakaya, every Sunnundalu laddoo, and every crunchy Chekodi is crafted using time-honoured recipes passed down across generations in Rayalaseema.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${initialStoreInfo.whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Connect with Us on WhatsApp</span>
              </a>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B1416] hover:bg-[#a81c1f] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
              >
                <span>Browse Products</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/store-ambiance.jpg"
                alt="AAHAR HOME FOODS store interior in Kurnool, Andhra Pradesh"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Our Three Core Pillars: PURE • FRESH • TRADITIONAL */}
        <div className="bg-white rounded-3xl border border-[#EADECF] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              The Guiding Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F1B18] mt-1">
              Pure • Fresh • Traditional
            </h2>
            <p className="text-xs sm:text-sm text-[#665E57] mt-1">
              Three pillars that guide every single recipe prepared under the Aahar name.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center font-bold text-lg font-serif">
                1
              </div>
              <h3 className="text-lg font-bold font-serif text-[#1F1B18]">
                PURE Ingredients
              </h3>
              <p className="text-xs text-[#524943] leading-relaxed">
                We use cold-pressed gingelly (sesame) oil for pickles, pure cultured desi ghee for our traditional sweets, and locally sourced Guntur red chillies. Zero chemical preservatives or artificial colourings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center font-bold text-lg font-serif">
                2
              </div>
              <h3 className="text-lg font-bold font-serif text-[#1F1B18]">
                FRESH Daily Batches
              </h3>
              <p className="text-xs text-[#524943] leading-relaxed">
                Our snacks like Chekodilu, Janthikalu, and Ribbon Pakoda are made in small, continuous batches right here in Kurnool, ensuring maximum crunch and optimum freshness for every customer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center font-bold text-lg font-serif">
                3
              </div>
              <h3 className="text-lg font-bold font-serif text-[#1F1B18]">
                TRADITIONAL Methods
              </h3>
              <p className="text-xs text-[#524943] leading-relaxed">
                Our pickles are sun-cured in traditional ceramic jars (bharani jaadi) to allow natural fermentation and deep maturation. Spice powders are dry-roasted on low flame and stone-ground.
              </p>
            </div>
          </div>
        </div>

        {/* Local Community Presence in Kurnool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-[340px] w-full rounded-3xl overflow-hidden border border-[#EADECF]">
            <Image
              src="/images/avakaya-pickle.jpg"
              alt="Traditional Avakaya Pickle in Ceramic Jaadi - Aahar Home Foods"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
              Community & Neighbourhood Roots
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F1B18]">
              A Welcoming Presence in Venkataramana Colony, Kurnool
            </h2>
            <p className="text-xs sm:text-sm text-[#524943] leading-relaxed">
              Conveniently situated on <strong>Road No. 3, Venkataramana Colony Main Road, Kurnool – 518001</strong>, AAHAR HOME FOODS has become a trusted household name for residents in Venkataramana Colony, Teachers Colony, Budhawarpet, and throughout Kurnool.
            </p>
            <p className="text-xs sm:text-sm text-[#524943] leading-relaxed">
              Whether you are preparing for a festival like Sankranti or Diwali, packing authentic pickles for family travelling abroad, or seeking comforting everyday podis, our store welcomes you with warmth and genuine Rayalaseema hospitality.
            </p>

            <div className="p-4 rounded-xl bg-white border border-[#EADECF] flex items-center gap-4">
              <MapPin className="w-5 h-5 text-[#8B1416] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[#1F1B18] block">Store Address</span>
                <span className="text-[#665E57]">
                  Road No. 3, Venkataramana Colony Main Road, Kurnool – 518001
                </span>
              </div>
            </div>

            {/* Intrasphere Labs Partner Badge */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex items-center justify-between gap-3">
              <div className="text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Digital Experience Partner</span>
                <p className="text-[#524943] text-xs mt-0.5">
                  Web Architecture & Local SEO crafted by <strong className="text-[#8B1416]">Intrasphere Labs</strong>.
                </p>
              </div>
              <a
                href="https://intraspherelabs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Intrasphere Labs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
