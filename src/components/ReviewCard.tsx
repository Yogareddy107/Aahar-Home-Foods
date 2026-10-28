import React from "react";
import { Star, CheckCircle, MapPin } from "lucide-react";
import { Review } from "@/data/initialData";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#EADECF] p-6 flex flex-col justify-between card-hover-effect shadow-xs">
      <div>
        {/* Star Rating & Source */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-stone-200 text-stone-200"
                }`}
              />
            ))}
          </div>

          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#F8F3EA] text-[#665E57] border border-[#EADECF]">
            {review.source}
          </span>
        </div>

        {/* Comment */}
        <p className="text-sm text-[#3E3833] leading-relaxed italic">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      {/* Author & Verification */}
      <div className="mt-5 pt-4 border-t border-[#F2EAE0] flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#1F1B18] font-serif">
            {review.author}
          </h4>
          <p className="text-[11px] text-[#8C8276] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-[#8B1416]" />
            {review.locality}
          </p>
        </div>

        {review.verifiedCustomer && (
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-medium">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Verified
          </span>
        )}
      </div>
    </div>
  );
}
