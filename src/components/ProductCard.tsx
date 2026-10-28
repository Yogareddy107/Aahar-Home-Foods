"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Product } from "@/data/initialData";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { storeInfo } = useStore();
  const [selectedPack, setSelectedPack] = useState(
    product.packageSizes && product.packageSizes.length > 0
      ? product.packageSizes[0]
      : `${product.unit} - ₹${product.price}`
  );

  const whatsappMessage = encodeURIComponent(
    `Hello ${storeInfo.name}, I want to order / enquire about: ${product.name} (${selectedPack}). Please share current availability and payment/pickup options in Kurnool.`
  );

  return (
    <article className="bg-white rounded-2xl border border-[#EADECF] overflow-hidden flex flex-col card-hover-effect relative group shadow-xs">
      
      {/* Top Image & Badges */}
      <div className="relative h-56 w-full overflow-hidden bg-[#FAF6F0]">
        <Image
          src={product.image || "/images/avakaya-pickle.jpg"}
          alt={`${product.name} - Traditional Andhra Food Aahar Home Foods Kurnool`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Product Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#8B1416] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wide">
            {product.badge}
          </span>
        )}

        {/* Stock Status Badge */}
        <span
          className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs ${
            product.inStock
              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {product.inStock ? "In Stock" : "Sold Out"}
        </span>

        {/* Category Label */}
        <div className="absolute bottom-3 left-3 glass-badge px-2.5 py-0.5 rounded-md text-[10px] font-semibold text-[#8B1416] border border-[#EADECF]">
          {product.categoryLabel}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Telugu Name if available */}
          {product.teluguName && (
            <span className="text-xs font-medium text-[#B45309] block mb-0.5">
              {product.teluguName}
            </span>
          )}

          <h3 className="text-lg font-bold text-[#1F1B18] font-serif group-hover:text-[#8B1416] transition-colors leading-snug">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-[#665E57] mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Package Size Options */}
          {product.packageSizes && product.packageSizes.length > 1 && (
            <div className="mt-3.5">
              <label className="text-[10px] font-bold text-[#8C8276] uppercase tracking-wider block mb-1">
                Select Pack Size:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.packageSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedPack(size)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-all ${
                      selectedPack === size
                        ? "bg-[#8B1416] text-white shadow-xs"
                        : "bg-[#F8F3EA] text-[#4A423D] hover:bg-[#EADECF]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Action CTA */}
        <div className="mt-5 pt-4 border-t border-[#EADECF] space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-[#8C8276] font-medium">Price: </span>
              <span className="text-xl font-bold text-[#8B1416]">
                ₹{product.price}
              </span>
              <span className="text-xs text-[#665E57] ml-1">/ {product.unit}</span>
            </div>

            <Link
              href={`/products/${product.slug}`}
              className="text-xs font-semibold text-[#8B1416] hover:text-[#a81c1f] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* 1-Click WhatsApp Enquiry Button */}
          <a
            href={`https://wa.me/${storeInfo.whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-all shadow-xs hover:shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Order on WhatsApp</span>
          </a>
        </div>

      </div>
    </article>
  );
}
