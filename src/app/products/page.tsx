"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const { storeInfo, products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "traditional-pickles", label: "Traditional Pickles (Pachadi)" },
    { id: "traditional-sweets", label: "Traditional Sweets (Mithai)" },
    { id: "homemade-snacks", label: "Homemade Snacks (Pindi Vantalu)" },
    { id: "spice-powders", label: "Spice Powders (Podis)" },
    { id: "other-products", label: "Pure Ghee & Specialities" },
  ];

  const filtered = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.teluguName && item.teluguName.includes(searchQuery)) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const generalWhatsapp = encodeURIComponent(
    `Hello ${storeInfo.name}, I am looking at your complete product catalog on your website and would like to ask about availability and home delivery in Kurnool.`
  );

  return (
    <div className="py-10 sm:py-16 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="border-b border-[#EADECF] pb-8">
          <div className="flex items-center gap-2 text-xs text-[#8C8276] mb-2">
            <Link href="/" className="hover:text-[#8B1416]">Home</Link>
            <span>/</span>
            <span className="text-[#8B1416] font-medium">Our Products</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                Authentic Rayalaseema & Andhra Delicacies
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1F1B18] font-serif mt-1">
                Food Products in Kurnool | {storeInfo.name}
              </h1>
              <p className="text-sm text-[#665E57] mt-2 max-w-2xl">
                Explore our authentic pickles, pure ghee sweets, crispy snacks, and traditional stone-ground spice powders made in Kurnool, Andhra Pradesh.
              </p>
            </div>

            <a
              href={`https://wa.me/${storeInfo.whatsappNumber}?text=${generalWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Bulk Order on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#EADECF] shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-[#8B1416] text-white shadow-xs"
                    : "bg-[#F8F3EA] text-[#524943] hover:bg-[#EADECF]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C8276] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Avakaya, Sunnundalu, Podi..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#EADECF] bg-[#FCFBF7] focus:outline-hidden focus:border-[#8B1416]"
            />
          </div>
        </div>

        {/* Results Count & Product Grid */}
        <div>
          <div className="flex items-center justify-between text-xs text-[#665E57] mb-6">
            <span>
              Showing <strong>{filtered.length}</strong> available traditional products
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-[#8B1416] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#EADECF] p-8 space-y-3">
              <p className="text-base font-bold text-[#1F1B18] font-serif">
                No products found matching &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-[#665E57]">
                Try searching for other items like Gongura, Chekodilu, Mysore Pak, or Podi.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 bg-[#8B1416] text-white rounded-xl text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
