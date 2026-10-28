"use client";

import React from "react";
import { MapPin, Navigation, Car, Bike, Footprints, ExternalLink } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function DirectionsGuide() {
  const { storeInfo } = useStore();

  const landmarkRoutes = [
    {
      from: "Kurnool Railway Station",
      distance: "Approx 3.6 km (10-12 mins)",
      mode: "Auto-Rickshaw / Car / Bike",
      steps: [
        "Exit Railway Station toward Railway Station Road / Birla Compound Road.",
        "Proceed past Birla Gate towards Venkataramana Colony Main Arch.",
        "Enter Venkataramana Colony Main Road and take Road No. 3.",
        "AAHAR HOME FOODS is located on Road No. 3, clearly visible with the red cottage emblem board.",
      ],
    },
    {
      from: "Raj Vihar Circle (City Centre)",
      distance: "Approx 2.8 km (8-10 mins)",
      mode: "Two-Wheeler / Auto",
      steps: [
        "Head south-east from Raj Vihar towards Budhawarpet Road.",
        "Cross towards Venkataramana Colony intersection.",
        "Turn onto Venkataramana Colony Main Road and reach Road No. 3 near Children's Park.",
      ],
    },
    {
      from: "Kurnool Collectorate / GGH Area",
      distance: "Approx 4.2 km (12-15 mins)",
      mode: "Four-Wheeler / Bike",
      steps: [
        "Take Nandyal Road / Collectorate junction towards Bellary Road bypass link.",
        "Turn towards Venkataramana Colony / Teachers Colony.",
        "Follow Main Road to Road No. 3.",
      ],
    },
    {
      from: "Teachers Colony & Children's Park",
      distance: "500 metres (3-5 mins)",
      mode: "Walking / Two-Wheeler",
      steps: [
        "Head straight along the colony road connecting Teachers Colony to Venkataramana Colony.",
        "Turn into Road No. 3.",
        "Store is situated with ample street parking for quick shopping.",
      ],
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#EADECF] p-6 sm:p-10 shadow-sm space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EADECF] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
            Local Navigation Guide • Kurnool
          </span>
          <h3 className="text-2xl font-bold text-[#8B1416] font-serif mt-1">
            How to Reach AAHAR HOME FOODS
          </h3>
          <p className="text-sm text-[#665E57] mt-1">
            Located in peaceful, well-connected Venkataramana Colony, Kurnool, Andhra Pradesh 518001.
          </p>
        </div>

        <a
          href={storeInfo.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#8B1416] hover:bg-[#a81c1f] text-white text-sm font-semibold transition-all shadow-md shrink-0"
        >
          <Navigation className="w-4 h-4" />
          <span>Start Navigation on Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {landmarkRoutes.map((route, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#EADECF] space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#8C8276] uppercase tracking-wider">
                  From Landmark
                </span>
                <h4 className="text-base font-bold text-[#1F1B18] font-serif">
                  {route.from}
                </h4>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                {route.distance}
              </span>
            </div>

            <p className="text-xs font-medium text-[#8B1416] flex items-center gap-1.5">
              <Bike className="w-3.5 h-3.5" />
              <span>Recommended Travel: {route.mode}</span>
            </p>

            <ol className="space-y-1.5 text-xs text-[#524943] list-decimal list-inside leading-relaxed pt-1">
              {route.steps.map((step, sIdx) => (
                <li key={sIdx}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Parking & Visitor Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EADECF] text-xs">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F3EA]">
          <Car className="w-5 h-5 text-[#8B1416] shrink-0" />
          <div>
            <p className="font-bold text-[#1F1B18]">Street Parking</p>
            <p className="text-[#665E57] text-[11px]">Free roadside parking for cars & two-wheelers.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F3EA]">
          <MapPin className="w-5 h-5 text-[#8B1416] shrink-0" />
          <div>
            <p className="font-bold text-[#1F1B18]">Pin Code</p>
            <p className="text-[#665E57] text-[11px]">Kurnool 518001 (Andhra Pradesh).</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F3EA]">
          <Footprints className="w-5 h-5 text-[#8B1416] shrink-0" />
          <div>
            <p className="font-bold text-[#1F1B18]">Neighbourhoods</p>
            <p className="text-[#665E57] text-[11px]">Close to Teachers Colony & Children&apos;s Park.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
