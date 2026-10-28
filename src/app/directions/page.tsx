import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Phone, Clock, Navigation, ExternalLink } from "lucide-react";
import { initialStoreInfo } from "@/data/initialData";
import DirectionsGuide from "@/components/DirectionsGuide";

export const metadata: Metadata = {
  title: "AAHAR HOME FOODS Location | Kurnool, Andhra Pradesh",
  description:
    "Find directions, address, landmark routes, and visiting hours for AAHAR HOME FOODS, Road No. 3, Venkataramana Colony Main Road, Kurnool – 518001, Andhra Pradesh.",
  alternates: {
    canonical: "/directions",
  },
};

export default function DirectionsPage() {
  return (
    <div className="py-10 sm:py-16 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#8C8276]">
          <Link href="/" className="hover:text-[#8B1416]">Home</Link>
          <span>/</span>
          <span className="text-[#8B1416] font-medium">Store Location & Directions</span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
            Local Store Visit Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1F1B18] font-serif mt-1">
            AAHAR HOME FOODS Location | Kurnool, Andhra Pradesh
          </h1>
          <p className="text-sm text-[#665E57] mt-2">
            Visit our shop to browse and taste fresh traditional Andhra pickles, pure ghee sweets, crispy snacks, and spice powders. Conveniently located on Road No. 3, Venkataramana Colony Main Road, Kurnool.
          </p>
        </div>

        {/* Quick Contact & Address Card */}
        <div className="bg-white rounded-3xl border border-[#EADECF] p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#8B1416] shrink-0 mt-0.5" />
            <div className="text-xs">
              <h3 className="font-bold text-[#1F1B18] text-sm mb-1">Store Address</h3>
              <p className="text-[#524943] leading-relaxed">
                <strong>{initialStoreInfo.name}</strong><br />
                {initialStoreInfo.addressLine1},<br />
                {initialStoreInfo.addressLine2},<br />
                {initialStoreInfo.city}, {initialStoreInfo.state} – {initialStoreInfo.pincode}.
              </p>
              <p className="text-[#8C8276] mt-1">Landmark: {initialStoreInfo.landmark}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#8B1416] shrink-0 mt-0.5" />
            <div className="text-xs">
              <h3 className="font-bold text-[#1F1B18] text-sm mb-1">Visiting Hours</h3>
              <p className="text-[#524943] leading-relaxed">
                {initialStoreInfo.openingHours}
              </p>
              <p className="text-emerald-700 font-semibold mt-1">
                Open all 7 days for fresh pickup
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#8B1416] shrink-0 mt-0.5" />
            <div className="text-xs">
              <h3 className="font-bold text-[#1F1B18] text-sm mb-1">Assistance on Call</h3>
              <p className="text-[#524943]">
                Need help finding the store? Call us directly:
              </p>
              <a
                href={`tel:${initialStoreInfo.primaryPhone}`}
                className="font-bold text-[#8B1416] hover:underline block mt-1 text-sm"
              >
                {initialStoreInfo.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${initialStoreInfo.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-medium hover:underline block mt-0.5"
              >
                WhatsApp: {initialStoreInfo.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Turn-by-Turn Directions Guide */}
        <DirectionsGuide />

        {/* Live Google Maps Embed */}
        <div className="bg-white rounded-3xl border border-[#EADECF] overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-[#EADECF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#8B1416]" />
              <h2 className="text-sm font-bold text-[#1F1B18]">
                Interactive Google Maps Navigation
              </h2>
            </div>
            <a
              href={initialStoreInfo.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1416] hover:underline"
            >
              <span>Open in Google Maps Application</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <iframe
            src={initialStoreInfo.googleMapsEmbedUrl}
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AAHAR HOME FOODS Location Map Kurnool"
          />
        </div>

      </div>
    </div>
  );
}
