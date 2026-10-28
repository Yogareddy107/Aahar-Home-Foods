"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function GalleryPage() {
  const { storeInfo, gallery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Pickles", "Sweets", "Snacks", "Spices", "Store"];

  const filtered =
    selectedCategory === "All"
      ? gallery
      : gallery.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="py-10 sm:py-16 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#8C8276]">
          <Link href="/" className="hover:text-[#8B1416]">Home</Link>
          <span>/</span>
          <span className="text-[#8B1416] font-medium">Photo Gallery</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
            Visual Showcase
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1F1B18] font-serif mt-1">
            AAHAR HOME FOODS Photo Gallery
          </h1>
          <p className="text-sm text-[#665E57] mt-2">
            A glimpse into our authentic preparations, freshly made Andhra sweets, sun-cured pickles in traditional ceramic jaadis, and our welcoming Kurnool storefront.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#8B1416] text-white shadow-xs"
                  : "bg-white text-[#524943] hover:bg-[#F8F3EA] border border-[#EADECF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#EADECF] overflow-hidden shadow-xs flex flex-col justify-between group card-hover-effect"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 glass-badge px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#8B1416] uppercase border border-[#EADECF]">
                  {item.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1F1B18] font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#665E57] mt-1.5 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2EAE0]">
                  <a
                    href={`https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(`Hello ${storeInfo.name}, I saw the photo of "${item.title}" in your gallery and would like to order or ask about it.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire About This Item</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
