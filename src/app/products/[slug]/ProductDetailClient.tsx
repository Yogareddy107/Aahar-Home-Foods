"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Product } from "@/data/initialData";
import { useStore } from "@/context/StoreContext";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { storeInfo, products } = useStore();
  const [selectedPack, setSelectedPack] = useState(
    product.packageSizes && product.packageSizes.length > 0
      ? product.packageSizes[0]
      : `${product.unit} - ₹${product.price}`
  );
  const [quantity, setQuantity] = useState(1);

  const whatsappMessage = encodeURIComponent(
    `Hello ${storeInfo.name}, I want to order from your Kurnool shop:\nProduct: ${product.name}\nPack Size: ${selectedPack}\nQuantity: ${quantity}\nPlease confirm today's availability and pickup/delivery options.`
  );

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="py-10 sm:py-16 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8C8276]">
          <Link href="/" className="hover:text-[#8B1416]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#8B1416]">Our Products</Link>
          <span>/</span>
          <span className="text-[#8B1416] font-medium truncate">{product.name}</span>
        </nav>

        {/* Main Product Details Card */}
        <div className="bg-white rounded-3xl border border-[#EADECF] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Product Image */}
            <div className="lg:col-span-6">
              <div className="relative h-[340px] sm:h-[420px] w-full rounded-2xl overflow-hidden border border-[#EADECF] bg-[#FAF6F0]">
                <Image
                  src={product.image || "/images/avakaya-pickle.jpg"}
                  alt={`${product.name} - Traditional Andhra Home Food Aahar Home Foods Kurnool`}
                  fill
                  priority
                  className="object-cover"
                />

                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#8B1416] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}

                <span
                  className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full shadow-xs ${
                    product.inStock
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {product.inStock ? "Available at Kurnool Store" : "Temporarily Sold Out"}
                </span>
              </div>

              {/* Verified Trust Badges */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#524943]">
                <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#EADECF] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B1416] shrink-0" />
                  <span>No Artificial Flavours</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#EADECF] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Fresh Batch Packed Daily</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Order Generator */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                {product.teluguName && (
                  <span className="text-sm font-semibold text-[#B45309] block">
                    {product.teluguName}
                  </span>
                )}

                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F1B18]">
                  {product.name}
                </h1>

                <div className="inline-block px-2.5 py-0.5 rounded-md bg-[#F8F3EA] text-[#8B1416] text-xs font-semibold border border-[#EADECF]">
                  Category: {product.categoryLabel}
                </div>

                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-bold text-[#8B1416]">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-[#665E57]">
                    Starting per {product.unit}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#524943] leading-relaxed">
                  {product.longDescription || product.description}
                </p>

                {/* Package Size Picker */}
                {product.packageSizes && product.packageSizes.length > 0 && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1B18] mb-2">
                      Available Package Sizes:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.packageSizes.map((pack) => (
                        <button
                          key={pack}
                          type="button"
                          onClick={() => setSelectedPack(pack)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                            selectedPack === pack
                              ? "bg-[#8B1416] text-white shadow-xs font-semibold"
                              : "bg-[#F8F3EA] text-[#4A423D] hover:bg-[#EADECF]"
                          }`}
                        >
                          {pack}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1F1B18]">
                    Number of Packs:
                  </label>
                  <div className="flex items-center border border-[#EADECF] rounded-lg overflow-hidden bg-[#FCFBF7]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-sm font-bold text-[#8B1416] hover:bg-[#EADECF]"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-[#1F1B18]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-sm font-bold text-[#8B1416] hover:bg-[#EADECF]"
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>

              {/* Order CTAs */}
              <div className="pt-4 border-t border-[#EADECF] space-y-3">
                <a
                  href={`https://wa.me/${storeInfo.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-[#15803D] hover:bg-[#166534] transition-all shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Order on WhatsApp: {product.name}</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${storeInfo.primaryPhone}`}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#8B1416] bg-[#8B1416]/10 hover:bg-[#8B1416]/15 border border-[#8B1416]/20 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#8B1416]" />
                    <span>Call Store</span>
                  </a>

                  <a
                    href={storeInfo.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#524943] bg-[#F8F3EA] hover:bg-[#EADECF] border border-[#EADECF] transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-[#8B1416]" />
                    <span>Pickup in Kurnool</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Detailed Product Specifications */}
          <div className="mt-12 pt-10 border-t border-[#EADECF] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-2">
              <h3 className="font-bold text-[#8B1416] font-serif uppercase tracking-wider text-xs">
                Pure Ingredients
              </h3>
              <ul className="space-y-1 text-[#524943] list-disc list-inside">
                {product.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-2">
              <h3 className="font-bold text-[#8B1416] font-serif uppercase tracking-wider text-xs">
                Shelf Life & Freshness
              </h3>
              <p className="text-[#524943] leading-relaxed">
                {product.shelfLife}
              </p>
              {product.spiceLevel && (
                <p className="text-[#8B1416] font-medium pt-1">
                  Spice Profile: <strong>{product.spiceLevel}</strong>
                </p>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-2">
              <h3 className="font-bold text-[#8B1416] font-serif uppercase tracking-wider text-xs">
                Storage Instructions
              </h3>
              <p className="text-[#524943] leading-relaxed">
                {product.storage}
              </p>
            </div>

          </div>
        </div>

        {/* Related Products in this Category */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#1F1B18]">
                More from {product.categoryLabel}
              </h2>
              <Link
                href={`/products?category=${product.category}`}
                className="text-xs font-semibold text-[#8B1416] hover:underline"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#EADECF] p-4 flex flex-col justify-between card-hover-effect"
                >
                  <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 bg-[#FAF6F0]">
                    <Image
                      src={p.image || "/images/avakaya-pickle.jpg"}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm font-serif text-[#1F1B18] line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#8B1416] font-semibold mt-1">
                      ₹{p.price} / {p.unit}
                    </p>
                  </div>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-3 text-center py-2 px-3 rounded-lg bg-[#FAF6F0] hover:bg-[#EADECF] text-[#8B1416] text-xs font-semibold transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
