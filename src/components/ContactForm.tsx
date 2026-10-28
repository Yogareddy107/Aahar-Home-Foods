"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageCircle, AlertCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ContactForm() {
  const { storeInfo, products } = useStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    locality: "",
    selectedProduct: "",
    quantity: "500g",
    enquiryType: "Product Enquiry & Price",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg("Please provide your name and contact phone number.");
      return;
    }

    if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const whatsappDirectMessage = encodeURIComponent(
    `Hello ${storeInfo.name},\nMy Name: ${formData.name}\nContact: ${formData.phone}\nArea: ${formData.locality || "Kurnool"}\nEnquiry: ${formData.enquiryType}\nProduct: ${formData.selectedProduct || "General Inquiry"} (${formData.quantity})\nMessage: ${formData.message || "Please confirm availability and store timings."}`
  );

  return (
    <div className="bg-white rounded-3xl border border-[#EADECF] p-6 sm:p-10 shadow-sm">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
          Direct Customer Service
        </span>
        <h3 className="text-2xl font-bold text-[#8B1416] font-serif mt-1">
          Send an Enquiry / Order Request
        </h3>
        <p className="text-xs sm:text-sm text-[#665E57] mt-1">
          Have questions about product availability, prices, festival sweets, or bulk orders? Fill the form below or chat directly on WhatsApp.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-bold text-emerald-900 font-serif">
            Thank you, {formData.name}!
          </h4>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
            We have received your enquiry for <strong>{formData.selectedProduct || "traditional food products"}</strong>. Our Kurnool store team will review availability and call you back at <strong>{formData.phone}</strong> shortly.
          </p>

          <div className="pt-2">
            <a
              href={`https://wa.me/${storeInfo.whatsappNumber}?text=${whatsappDirectMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Forward Enquiry to WhatsApp for Instant Reply</span>
            </a>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  phone: "",
                  locality: "",
                  selectedProduct: "",
                  quantity: "500g",
                  enquiryType: "Product Enquiry & Price",
                  message: "",
                });
              }}
              className="text-xs text-[#665E57] hover:underline"
            >
              Send Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#1F1B18] mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. S. Venkatesh"
                className="w-full p-3 rounded-xl border border-[#EADECF] bg-[#FCFBF7] focus:outline-hidden focus:border-[#8B1416]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#1F1B18] mb-1">
                Mobile / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 94901 23456"
                className="w-full p-3 rounded-xl border border-[#EADECF] bg-[#FCFBF7] focus:outline-hidden focus:border-[#8B1416]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#1F1B18] mb-1">
                Your Area / Colony in Kurnool
              </label>
              <input
                type="text"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                placeholder="e.g. Venkataramana Colony / Budhawarpet"
                className="w-full p-3 rounded-xl border border-[#EADECF] bg-[#FCFBF7] focus:outline-hidden focus:border-[#8B1416]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#1F1B18] mb-1">
                Enquiry Type
              </label>
              <select
                value={formData.enquiryType}
                onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#EADECF] bg-[#FCFBF7] focus:outline-hidden focus:border-[#8B1416]"
              >
                <option value="Product Enquiry & Price">Product Enquiry & Price</option>
                <option value="Pickle Availability (Avakaya/Gongura)">Pickle Availability (Avakaya/Gongura)</option>
                <option value="Festival Sweets Order">Festival Sweets Order</option>
                <option value="Bulk / Function Order">Bulk / Function Order</option>
                <option value="Store Visit & Timings">Store Visit & Timings</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#1F1B18] mb-1">
                Interested Product (Optional)
              </label>
              <select
                value={formData.selectedProduct}
                onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#EADECF] bg-[#FCFBF7] focus:outline-hidden focus:border-[#8B1416]"
              >
                <option value="">-- Select a product or browse all --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} (₹{p.price}/{p.unit})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-[#1F1B18] mb-1">
                Estimated Quantity
              </label>
              <select
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full p-3 rounded-xl border border-[#EADECF] bg-[#FCFBF7] focus:outline-hidden focus:border-[#8B1416]"
              >
                <option value="250g">250 grams</option>
                <option value="500g">500 grams</option>
                <option value="1 kg">1 Kilogram</option>
                <option value="2 kg or more">2 Kilograms or more</option>
                <option value="Bulk / Party order">Bulk / Function quantity</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-[#1F1B18] mb-1">
              Your Message or Specific Instructions
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. Please let me know if fresh Avakaya pickle and Sunnundalu are in stock for today's pickup."
              className="w-full p-3 rounded-xl border border-[#EADECF] bg-[#FCFBF7] focus:outline-hidden focus:border-[#8B1416]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8C8276]">
              * Your privacy is respected. No spam; used solely for order enquiry.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3 bg-[#8B1416] hover:bg-[#a81c1f] text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <span>Sending Enquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Order Enquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
