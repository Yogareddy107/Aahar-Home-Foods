"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, MapPin, Clock, Mail, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Footer() {
  const { storeInfo, openAdminModal } = useStore();

  const currentYear = 2026;

  return (
    <footer className="bg-[#1C1715] text-[#E8E1D9] pt-16 pb-12 border-t-4 border-[#8B1416]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-md p-1 overflow-hidden shrink-0">
                <Image
                  src="/images/aahar-logo.jpg"
                  alt="AAHAR HOME FOODS"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide font-serif uppercase">
                  {storeInfo.name}
                </h3>
                <p className="text-xs font-semibold text-amber-400 tracking-wider">
                  {storeInfo.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#BDB5AB] leading-relaxed">
              Bringing authentic Rayalaseema & traditional Andhra culinary heritage to Kurnool. Crafted with cold-pressed oils, pure spices, and zero chemical preservatives.
            </p>

            <div className="pt-2 flex flex-col gap-1 text-xs text-[#9E958A]">
              <span className="flex items-center gap-1.5 text-amber-300/90 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Fresh Daily Batches & Hygienic Kitchen
              </span>
              <span>Local Pride of Kurnool, Andhra Pradesh</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#3B322D] pb-2">
              Explore Our Store
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C9BFB4]">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-300 transition-colors">
                  All Food Products & Pickles
                </Link>
              </li>
              <li>
                <Link href="/products?category=traditional-pickles" className="hover:text-amber-300 transition-colors">
                  Traditional Andhra Pickles (Pachadi)
                </Link>
              </li>
              <li>
                <Link href="/products?category=traditional-sweets" className="hover:text-amber-300 transition-colors">
                  Pure Ghee Sweets (Mithai)
                </Link>
              </li>
              <li>
                <Link href="/products?category=homemade-snacks" className="hover:text-amber-300 transition-colors">
                  Homemade Andhra Snacks (Chekodilu & Murukku)
                </Link>
              </li>
              <li>
                <Link href="/products?category=spice-powders" className="hover:text-amber-300 transition-colors">
                  Authentic Spice Powders (Podis)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  Our Traditional Heritage
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-300 transition-colors">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Store Timings & Local Directions */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#3B322D] pb-2">
              Visiting The Shop
            </h4>
            
            <div className="space-y-3 text-sm text-[#C9BFB4]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Opening Hours:</p>
                  <p className="text-xs text-[#AEA498] mt-0.5">{storeInfo.openingHours}</p>
                  <p className="text-[11px] text-emerald-400 font-medium mt-0.5">Open all 7 days for fresh pickup</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Landmark:</p>
                  <p className="text-xs text-[#AEA498] mt-0.5">{storeInfo.landmark}</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/directions"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 underline"
                >
                  View Step-by-Step Directions Guide →
                </Link>
              </div>
            </div>
          </div>

          {/* Col 4: Verified Contact & Google Maps */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#3B322D] pb-2">
              Contact & Location
            </h4>

            <address className="not-italic space-y-3 text-sm text-[#C9BFB4]">
              <p className="text-xs leading-relaxed">
                <strong className="text-white block mb-0.5">{storeInfo.name}</strong>
                {storeInfo.addressLine1},<br />
                {storeInfo.addressLine2},<br />
                {storeInfo.city}, {storeInfo.state} – {storeInfo.pincode}, {storeInfo.country}.
              </p>

              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={`tel:${storeInfo.primaryPhone}`}
                  className="inline-flex items-center gap-2 text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: {storeInfo.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(`Hello ${storeInfo.name}, I would like to place an order.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {storeInfo.whatsappDisplay}</span>
                </a>

                <a
                  href={`mailto:${storeInfo.email}`}
                  className="inline-flex items-center gap-2 text-xs text-[#AEA498] hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{storeInfo.email}</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={storeInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-md bg-[#8B1416] hover:bg-[#a81c1f] text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-75" />
                </a>
              </div>
            </address>
          </div>

        </div>

        {/* Local Area SEO Footer Paragraph */}
        <div className="mt-12 pt-6 border-t border-[#2E2622] text-[11px] text-[#8C8276] leading-relaxed">
          <p>
            <strong>AAHAR HOME FOODS Kurnool:</strong> Serving authentic Rayalaseema traditional homemade foods, Andhra Avakaya pachadi, Gongura pickle, Sunnundalu sweets, Bellam Gavvalu, Chekodilu snacks, Kandi Podi and spice powders across Kurnool city. Conveniently situated on Road No. 3, Venkataramana Colony Main Road, near Teachers Colony, Kurnool, Andhra Pradesh 518001. Pickup available at store; doorstep enquiry service across Kurnool.
          </p>
        </div>

        {/* Bottom Bar: Copyright, Intrasphere Labs Highlight & Owner Admin Access */}
        <div className="mt-8 pt-6 border-t border-[#2E2622] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8C8276]">
          <p>© {currentYear} {storeInfo.name}. All rights reserved. Handcrafted in Kurnool, Andhra Pradesh.</p>

          {/* Intrasphere Labs Highlight Badge */}
          <div className="flex items-center gap-2">
            <span className="text-[#A89E92] text-xs">Crafted by</span>
            <a
              href="https://intraspherelabs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 hover:from-amber-500/30 hover:to-red-500/30 border border-amber-400/40 hover:border-amber-400 text-amber-300 hover:text-white transition-all shadow-sm hover:shadow-md"
              title="Visit Intrasphere Labs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-bold tracking-wide text-xs bg-gradient-to-r from-amber-200 via-orange-200 to-amber-100 bg-clip-text text-transparent group-hover:text-white">
                Intrasphere Labs
              </span>
              <ExternalLink className="w-3 h-3 text-amber-300 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Discreet Owner Access via Sweet Emoji */}
          <div className="flex items-center">
            <button
              onClick={openAdminModal}
              id="admin-dashboard-footer-btn"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#29221F] hover:bg-[#382E2A] text-amber-300 hover:text-amber-200 border border-[#443833] hover:border-amber-400/50 transition-all text-sm cursor-pointer shadow-xs hover:scale-110 active:scale-95"
              title="Authentic Andhra Delicacies"
              aria-label="Owner Access"
            >
              🍯
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
