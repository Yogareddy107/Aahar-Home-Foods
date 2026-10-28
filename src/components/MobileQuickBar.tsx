"use client";

import React from "react";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function MobileQuickBar() {
  const { storeInfo } = useStore();

  const whatsappMessage = encodeURIComponent(
    `Hello ${storeInfo.name}, I am visiting your website on my mobile and would like to order fresh pickles / sweets / snacks from your Kurnool shop.`
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EADECF] p-2.5 sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${storeInfo.primaryPhone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#8B1416]/10 text-[#8B1416] font-semibold text-[11px] border border-[#8B1416]/20 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span>Call Store</span>
        </a>

        <a
          href={`https://wa.me/${storeInfo.whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#15803D] text-white font-semibold text-[11px] shadow-sm active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 fill-white/20" />
          <span>WhatsApp</span>
        </a>

        <a
          href={storeInfo.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F8F3EA] text-[#4A423D] font-semibold text-[11px] border border-[#EADECF] active:scale-95 transition-transform"
        >
          <MapPin className="w-4 h-4 mb-0.5 text-[#8B1416]" />
          <span>Directions</span>
        </a>
      </div>
    </div>
  );
}
