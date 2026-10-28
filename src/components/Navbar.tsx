"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, MapPin, Menu, X, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { storeInfo } = useStore();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Our Products" },
    { href: "/about", label: "About Us" },
    { href: "/gallery", label: "Gallery" },
    { href: "/directions", label: "Directions" },
    { href: "/contact", label: "Contact" },
  ];

  const whatsappMessage = encodeURIComponent(
    `Hello ${storeInfo.name}, I visited your website and would like to know today's available fresh sweets, pickles, and snacks at your Kurnool store.`
  );

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Notification Announcement Bar */}
      {storeInfo.isAnnouncementActive && storeInfo.announcementText && (
        <div className="bg-[#8B1416] text-[#FFF9F2] px-4 py-2 text-xs md:text-sm font-medium text-center flex items-center justify-center gap-2 border-b border-[#6d0f11]">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{storeInfo.announcementText}</span>
          <span className="hidden sm:inline-block opacity-75">|</span>
          <a
            href={`tel:${storeInfo.primaryPhone}`}
            className="hidden sm:inline-flex items-center underline hover:text-amber-200 transition-colors ml-1"
          >
            Call {storeInfo.phoneDisplay}
          </a>
        </div>
      )}

      {/* Main Navbar */}
      <div className="glass-nav border-b border-[#EADECF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Brand Logo & Tagline */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-lg bg-white border border-[#EADECF] p-1 shadow-xs transition-transform group-hover:scale-105">
                <Image
                  src="/images/aahar-logo.jpg"
                  alt="AAHAR HOME FOODS Official Logo - Kurnool"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-[#8B1416] font-serif uppercase">
                  {storeInfo.name}
                </span>
                <span className="text-[10px] md:text-xs font-semibold tracking-widest text-[#B45309] uppercase">
                  {storeInfo.tagline}
                </span>
                <span className="text-[10px] text-[#665E57] hidden md:inline-flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#8B1416]" />
                  Venkataramana Colony, Kurnool – 518001
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors relative py-1 ${
                      isActive
                        ? "text-[#8B1416]"
                        : "text-[#4A423D] hover:text-[#8B1416]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1416] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${storeInfo.primaryPhone}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold text-[#8B1416] bg-[#8B1416]/10 hover:bg-[#8B1416]/15 transition-colors border border-[#8B1416]/20"
                title="Call store directly"
              >
                <Phone className="w-4 h-4 text-[#8B1416]" />
                <span className="hidden xl:inline">Call:</span>
                <span>{storeInfo.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${storeInfo.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-all shadow-xs hover:shadow-md"
                title="Order on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${storeInfo.primaryPhone}`}
                className="p-2 text-[#8B1416] hover:bg-[#8B1416]/10 rounded-lg sm:hidden"
                aria-label="Call store"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#4A423D] hover:text-[#8B1416] hover:bg-[#F8F3EA] rounded-lg focus:outline-hidden"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFBF7] border-b border-[#EADECF] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-[#8B1416] text-white"
                      : "text-[#2C2723] hover:bg-[#F8F3EA] hover:text-[#8B1416]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#EADECF] flex flex-col gap-2.5">
            <a
              href={`tel:${storeInfo.primaryPhone}`}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-[#8B1416] bg-[#8B1416]/10 border border-[#8B1416]/20"
            >
              <Phone className="w-4 h-4" />
              <span>Call Store: {storeInfo.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${storeInfo.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#15803D]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>
            <a
              href={storeInfo.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-[#665E57] bg-white border border-[#EADECF]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#8B1416]" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
