import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { initialStoreInfo } from "@/data/initialData";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact AAHAR HOME FOODS | Kurnool",
  description:
    "Contact AAHAR HOME FOODS in Kurnool, Andhra Pradesh. Call +91 94901 23456 or WhatsApp us for product availability, prices, festival sweets, and store directions to Venkataramana Colony.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const whatsappMsg = encodeURIComponent(
    `Hello ${initialStoreInfo.name}, I would like to contact your Kurnool store regarding traditional food products and availability.`
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is AAHAR HOME FOODS located in Kurnool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AAHAR HOME FOODS is located at Road No. 3, Venkataramana Colony Main Road, Kurnool, Andhra Pradesh – 518001, India, close to Teachers Colony and Children's Park.",
        },
      },
      {
        "@type": "Question",
        name: "What are the store opening hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The store is open 7 days a week from 8:30 AM to 9:30 PM for in-person pickup and telephone enquiries.",
        },
      },
      {
        "@type": "Question",
        name: "How can I order on WhatsApp or enquire about product prices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can click the WhatsApp button on our website or message +91 94901 23456. Simply let us know the items and quantities you require, and our team will confirm availability.",
        },
      },
      {
        "@type": "Question",
        name: "Do you prepare festival sweets and bulk party snacks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we prepare authentic Andhra festival sweets like Sunnundalu, Mysore Pak, Bobbatlu, and savoury snacks for weddings, housewarmings, and festive occasions. Please enquire a few days in advance for bulk orders.",
        },
      },
    ],
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FCFBF7]">
      <JsonLd data={faqSchema} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#8C8276]">
          <Link href="/" className="hover:text-[#8B1416]">Home</Link>
          <span>/</span>
          <span className="text-[#8B1416] font-medium">Contact Us</span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
            Customer Support & Store Visits
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1F1B18] font-serif mt-1">
            Contact AAHAR HOME FOODS | Kurnool
          </h1>
          <p className="text-sm text-[#665E57] mt-2">
            Reach out to our team in Kurnool for product availability, prices, festival sweets, or directions. We are always happy to assist you.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-[#EADECF] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1F1B18] font-serif">
              Call the Store
            </h3>
            <p className="text-xs text-[#665E57]">
              Speak directly with our store counter team for quick enquiries.
            </p>
            <a
              href={`tel:${initialStoreInfo.primaryPhone}`}
              className="inline-block text-sm font-bold text-[#8B1416] hover:underline pt-1"
            >
              {initialStoreInfo.phoneDisplay}
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EADECF] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#15803D]/10 text-[#15803D] flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1F1B18] font-serif">
              WhatsApp Order
            </h3>
            <p className="text-xs text-[#665E57]">
              Send product list or ask for today&apos;s fresh sweet menu.
            </p>
            <a
              href={`https://wa.me/${initialStoreInfo.whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-bold text-[#15803D] hover:underline pt-1"
            >
              WhatsApp: {initialStoreInfo.whatsappDisplay}
            </a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EADECF] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#B45309]/10 text-[#B45309] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1F1B18] font-serif">
              Store Timings
            </h3>
            <p className="text-xs text-[#665E57]">
              Open all 7 days a week:
            </p>
            <p className="text-xs font-bold text-[#1F1B18] pt-1">
              {initialStoreInfo.openingHours}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#EADECF] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1F1B18] font-serif">
              Store Location
            </h3>
            <p className="text-xs text-[#665E57] leading-relaxed">
              Road No. 3, Venkataramana Colony Main Road, Kurnool – 518001
            </p>
            <Link
              href="/directions"
              className="inline-block text-xs font-bold text-[#8B1416] hover:underline pt-1"
            >
              View Route Directions →
            </Link>
          </div>

        </div>

        {/* Contact & Enquiry Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 space-y-6">
            
            {/* Store Map Card */}
            <div className="bg-white rounded-3xl border border-[#EADECF] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#1F1B18] font-serif">
                  Google Maps Store View
                </h3>
                <a
                  href={initialStoreInfo.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8B1416] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Open Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#EADECF]">
                <iframe
                  src={initialStoreInfo.googleMapsEmbedUrl}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AAHAR HOME FOODS Location on Google Maps"
                />
              </div>

              <div className="text-xs text-[#665E57] space-y-1">
                <p>
                  <strong>Address:</strong> {initialStoreInfo.addressLine1}, {initialStoreInfo.addressLine2}, Kurnool – 518001.
                </p>
                <p>
                  <strong>Landmark:</strong> {initialStoreInfo.landmark}
                </p>
              </div>
            </div>

            {/* Quality & Hygiene Guarantee */}
            <div className="bg-[#FAF4EC] rounded-3xl border border-[#EADECF] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#8B1416] font-bold text-sm font-serif">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Our Freshness & Packing Guarantee</span>
              </div>
              <p className="text-xs text-[#524943] leading-relaxed">
                All food products are hygienically sealed in food-grade airtight containers. If you are travelling interstate or abroad, let us know and we will provide leak-proof vacuum bubble wrap packaging.
              </p>
            </div>

          </div>
        </div>

        {/* Local Kurnool FAQ Section */}
        <div className="bg-white rounded-3xl border border-[#EADECF] p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309]">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-2xl font-bold text-[#1F1B18] font-serif">
            Common Questions from Kurnool Customers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#EADECF] space-y-2">
              <h3 className="font-bold text-[#1F1B18]">
                Can I taste the pickles before buying at the shop?
              </h3>
              <p className="text-[#665E57] leading-relaxed">
                Yes! We welcome you to visit our Venkataramana Colony store and sample our fresh batches of Avakaya, Gongura, and spicy Podis to choose your favourite heat level.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#EADECF] space-y-2">
              <h3 className="font-bold text-[#1F1B18]">
                Do you deliver across Kurnool city?
              </h3>
              <p className="text-[#665E57] leading-relaxed">
                Yes, we support home delivery across major colonies in Kurnool (Venkataramana Colony, Teachers Colony, Budhawarpet, Raj Vihar, Collectorate area). Message us on WhatsApp to check today&apos;s delivery slots.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#EADECF] space-y-2">
              <h3 className="font-bold text-[#1F1B18]">
                What is the shelf life of your pickles and snacks?
              </h3>
              <p className="text-[#665E57] leading-relaxed">
                Our traditional pickles have a natural shelf life of 9 to 12 months when stored using dry spoons. Fresh snacks like Chekodilu remain crisp for up to 45 days in airtight containers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFBF7] border border-[#EADECF] space-y-2">
              <h3 className="font-bold text-[#1F1B18]">
                How do I order in bulk for weddings or functions?
              </h3>
              <p className="text-[#665E57] leading-relaxed">
                Please contact us via phone or WhatsApp 3 to 5 days before your event. We prepare fresh custom batches of Sunnundalu, Mysore Pak, Bobbatlu, and savoury snack hampers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
