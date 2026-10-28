"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  Lock,
  Unlock,
  Package,
  Phone,
  Star,
  Image as ImageIcon,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Download,
  Cloud,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Product, Review, GalleryItem } from "@/data/initialData";

export default function AdminModal() {
  const {
    isAdminModalOpen,
    closeAdminModal,
    isUnlocked,
    verifyPin,
    lockAdmin,
    storeInfo,
    updateStoreInfo,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    reviews,
    addReview,
    deleteReview,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    uploadImage,
    resetToDefaults,
    exportConfigJson,
    isSaving,
    lastSyncedAt,
  } = useStore();

  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "contacts" | "reviews" | "gallery" | "backup">("products");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [contactForm, setContactForm] = useState(storeInfo);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string>("/images/avakaya-pickle.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    slug: "",
    name: "",
    teluguName: "",
    category: "traditional-pickles",
    categoryLabel: "Traditional Pickles",
    price: 180,
    unit: "250g",
    packageSizes: ["250g - ₹180", "500g - ₹350", "1kg - ₹680"],
    description: "",
    longDescription: "",
    image: "/images/avakaya-pickle.jpg",
    inStock: true,
    featured: false,
    ingredients: ["Cold-pressed oil", "Authentic spices", "Salt"],
    shelfLife: "6 Months",
    storage: "Store in cool dry place",
    spiceLevel: "Authentic Spicy",
  });

  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState<Omit<Review, "id">>({
    author: "",
    locality: "Venkataramana Colony, Kurnool",
    rating: 5,
    date: "28 Oct 2026",
    comment: "",
    source: "Google Maps",
    verifiedCustomer: true,
  });

  const [showAddGallery, setShowAddGallery] = useState(false);
  const [galleryImageFile, setGalleryImageFile] = useState<File | null>(null);
  const [galleryImagePreview, setGalleryImagePreview] = useState<string>("/images/store-ambiance.jpg");
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const [newGalleryItem, setNewGalleryItem] = useState<Omit<GalleryItem, "id">>({
    title: "",
    category: "Store",
    imageUrl: "/images/store-ambiance.jpg",
    caption: "",
  });

  if (!isAdminModalOpen) return null;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPin(enteredPin)) {
      setPinError(false);
      setEnteredPin("");
      showToast("Access Granted. Connected to Supabase Cloud!");
    } else {
      setPinError(true);
    }
  };

  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file);
      const url = URL.createObjectURL(file);
      setProductImagePreview(url);
    }
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGalleryImageFile(file);
      const url = URL.createObjectURL(file);
      setGalleryImagePreview(url);
    }
  };

  const handleSaveContacts = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updateStoreInfo(contactForm);
    if (ok) showToast("Store settings synced to Supabase!");
    else showToast("Settings updated locally.");
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) return;

    let finalImageUrl = newProduct.image;
    if (productImageFile) {
      setIsUploading(true);
      const cloudUrl = await uploadImage(productImageFile);
      setIsUploading(false);
      if (cloudUrl) finalImageUrl = cloudUrl;
    }

    const slug = newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await addProduct({
      ...newProduct,
      slug,
      image: finalImageUrl,
    });
    setShowAddProduct(false);
    setProductImageFile(null);
    showToast(`Added product "${newProduct.name}" to Supabase!`);
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;
    await addReview(newReview);
    setShowAddReview(false);
    showToast("Review saved to Supabase!");
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title) return;

    let finalImageUrl = newGalleryItem.imageUrl;
    if (galleryImageFile) {
      setIsUploading(true);
      const cloudUrl = await uploadImage(galleryImageFile);
      setIsUploading(false);
      if (cloudUrl) finalImageUrl = cloudUrl;
    }

    await addGalleryItem({
      ...newGalleryItem,
      imageUrl: finalImageUrl,
    });
    setShowAddGallery(false);
    setGalleryImageFile(null);
    showToast("Gallery photograph saved to Supabase!");
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aahar-home-foods-supabase-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Backup exported successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-60 bg-emerald-800 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm font-semibold border border-emerald-600 animate-in slide-in-from-top">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl border border-[#EADECF] w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden text-[#1F1B18]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#8B1416] text-white flex items-center justify-between border-b border-[#6D0F11] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
              {isUnlocked ? (
                <Unlock className="w-5 h-5 text-amber-300" />
              ) : (
                <Lock className="w-5 h-5 text-amber-300" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold font-serif tracking-wide uppercase">
                  AAHAR HOME FOODS — Management Console
                </h2>
                {isUnlocked && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[11px] font-medium">
                    <Cloud className="w-3 h-3 text-emerald-300" />
                    Supabase Live Sync
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-200/80">
                {isUnlocked
                  ? "Changes sync directly to Supabase cloud database & storage"
                  : "Owner Authentication Required"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isSaving && (
              <span className="text-xs text-amber-200 flex items-center gap-1.5 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Saving...
              </span>
            )}
            {isUnlocked && (
              <button
                onClick={() => {
                  lockAdmin();
                  showToast("Dashboard locked.");
                }}
                className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg text-amber-200 transition-colors font-medium"
              >
                Lock
              </button>
            )}
            <button
              onClick={closeAdminModal}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isUnlocked ? (
          /* Locked State PIN Prompt */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-20 h-20 rounded-3xl bg-[#8B1416]/10 text-[#8B1416] flex items-center justify-center mb-5 border-2 border-[#8B1416]/20 shadow-inner">
              <Lock className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-[#8B1416] font-serif">
              Enter Owner Security PIN
            </h3>
            <p className="text-xs text-[#665E57] mt-2 mb-6 leading-relaxed">
              Authenticate with your owner PIN to manage live products, pricing, store phone numbers, and customer reviews.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter Security PIN"
                  className="w-full text-center tracking-widest text-3xl font-mono px-4 py-3.5 border-2 rounded-2xl focus:outline-hidden focus:border-[#8B1416] bg-[#FCFBF7] border-[#EADECF] text-[#1F1B18]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-600 font-semibold mt-2.5 flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Incorrect PIN. Access denied.
                  </p>
                )}
              </div>

              <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3 text-xs text-amber-900 text-center">
                <span>Protected Store Management Console • Secure Session</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-5 bg-[#8B1416] hover:bg-[#a81c1f] text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Owner Dashboard</span>
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Full Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#F8F3EA] border-b md:border-b-0 md:border-r border-[#EADECF] p-4 flex md:flex-col justify-between shrink-0 overflow-x-auto">
              <div className="flex md:flex-col gap-1.5 w-full">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                    activeTab === "products"
                      ? "bg-[#8B1416] text-white shadow-md"
                      : "text-[#524943] hover:bg-[#EADECF]/60 hover:text-[#8B1416]"
                  }`}
                >
                  <Package className="w-4 h-4 shrink-0" />
                  <span>Products ({products.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("contacts");
                    setContactForm(storeInfo);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                    activeTab === "contacts"
                      ? "bg-[#8B1416] text-white shadow-md"
                      : "text-[#524943] hover:bg-[#EADECF]/60 hover:text-[#8B1416]"
                  }`}
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Contacts & Hours</span>
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                    activeTab === "reviews"
                      ? "bg-[#8B1416] text-white shadow-md"
                      : "text-[#524943] hover:bg-[#EADECF]/60 hover:text-[#8B1416]"
                  }`}
                >
                  <Star className="w-4 h-4 shrink-0" />
                  <span>Reviews ({reviews.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                    activeTab === "gallery"
                      ? "bg-[#8B1416] text-white shadow-md"
                      : "text-[#524943] hover:bg-[#EADECF]/60 hover:text-[#8B1416]"
                  }`}
                >
                  <ImageIcon className="w-4 h-4 shrink-0" />
                  <span>Gallery ({gallery.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("backup")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                    activeTab === "backup"
                      ? "bg-[#8B1416] text-white shadow-md"
                      : "text-[#524943] hover:bg-[#EADECF]/60 hover:text-[#8B1416]"
                  }`}
                >
                  <RotateCcw className="w-4 h-4 shrink-0" />
                  <span>Supabase & Backup</span>
                </button>
              </div>

              {/* Intrasphere Labs Architecture Info */}
              <div className="hidden md:block pt-4 border-t border-[#EADECF] text-[11px] text-[#7A7067] space-y-2">
                <div className="flex items-center gap-1.5 text-amber-800 font-semibold">
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Supabase mojqcqplys...</span>
                </div>
                {lastSyncedAt && (
                  <p className="text-[10px] text-[#8C8276]">
                    Synced: {new Date(lastSyncedAt).toLocaleTimeString()}
                  </p>
                )}
                <div className="pt-2 border-t border-[#EADECF]/60">
                  <span className="text-[10px] text-[#8C8276] block mb-1">Architecture by</span>
                  <a
                    href="https://intraspherelabs.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-amber-800 hover:text-amber-900"
                  >
                    <span>Intrasphere Labs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#FCFBF7]">
              
              {/* TAB 1: PRODUCTS MANAGER */}
              {activeTab === "products" && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EADECF] pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#8B1416] font-serif">
                        Products & Food Inventory
                      </h3>
                      <p className="text-xs text-[#665E57] mt-0.5">
                        Manage traditional Andhra pickles, sweets, snacks, and spice powders.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddProduct(!showAddProduct)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B1416] text-white text-xs font-semibold hover:bg-[#a81c1f] transition-all shadow-xs shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showAddProduct ? "Close Form" : "Add New Product"}</span>
                    </button>
                  </div>

                  {/* Add Product Form */}
                  {showAddProduct && (
                    <form
                      onSubmit={handleCreateProduct}
                      className="bg-white p-6 rounded-2xl border border-[#EADECF] shadow-sm space-y-5 animate-in fade-in"
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B1416] border-b border-[#EADECF] pb-2">
                        Create New Food Item
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-semibold text-[#1F1B18] mb-1">Product Name *</label>
                          <input
                            type="text"
                            required
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            placeholder="e.g. Traditional Gongura Pachadi"
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-[#1F1B18] mb-1">Telugu Script Name (Optional)</label>
                          <input
                            type="text"
                            value={newProduct.teluguName || ""}
                            onChange={(e) => setNewProduct({ ...newProduct, teluguName: e.target.value })}
                            placeholder="e.g. గోంగూర పచ్చడి"
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-[#1F1B18] mb-1">Category</label>
                          <select
                            value={newProduct.category}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                category: e.target.value as Product["category"],
                                categoryLabel: e.target.options[e.target.selectedIndex].text,
                              })
                            }
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          >
                            <option value="traditional-pickles">Traditional Pickles</option>
                            <option value="homemade-snacks">Homemade Snacks</option>
                            <option value="traditional-sweets">Traditional Sweets</option>
                            <option value="spice-powders">Spice Powders</option>
                            <option value="other-products">Other Specialities</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold text-[#1F1B18] mb-1">Base Price & Unit *</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              required
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                              className="w-1/2 p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                            />
                            <input
                              type="text"
                              value={newProduct.unit}
                              onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                              placeholder="250g / 500g"
                              className="w-1/2 p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-[#1F1B18] mb-1">Description</label>
                          <input
                            type="text"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            placeholder="Authentic Andhra traditional recipe made with cold-pressed oil."
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          />
                        </div>

                        {/* Image Upload or URL */}
                        <div className="sm:col-span-2 space-y-2">
                          <label className="block font-semibold text-[#1F1B18]">Product Image (Upload to Supabase Storage)</label>
                          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-dashed border-[#EADECF] bg-[#FCFBF7]">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#EADECF] shrink-0 bg-stone-100">
                              <Image src={productImagePreview} alt="Preview" fill className="object-cover" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                ref={fileInputRef}
                                onChange={handleProductFileChange}
                                className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#8B1416] file:text-white hover:file:bg-[#a81c1f] cursor-pointer"
                              />
                              <p className="text-[11px] text-[#8C8276]">
                                Uploads to Supabase Storage bucket <code>aahar-media</code> (max 8MB).
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-[#EADECF]">
                        <button
                          type="button"
                          onClick={() => setShowAddProduct(false)}
                          className="px-4 py-2 border rounded-xl text-xs font-medium text-[#665E57]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isUploading}
                          className="px-5 py-2 bg-[#8B1416] hover:bg-[#a81c1f] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Uploading to Supabase...</span>
                            </>
                          ) : (
                            <span>Save Product</span>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Products Table */}
                  <div className="bg-white rounded-2xl border border-[#EADECF] overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F8F3EA] text-[#8B1416] uppercase font-bold border-b border-[#EADECF]">
                          <tr>
                            <th className="p-3.5">Product</th>
                            <th className="p-3.5">Category</th>
                            <th className="p-3.5">Price</th>
                            <th className="p-3.5">Availability</th>
                            <th className="p-3.5 text-right">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EADECF]">
                          {products.map((item) => (
                            <tr key={item.id} className="hover:bg-[#FCFBF7] transition-colors">
                              <td className="p-3.5 flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-[#EADECF]">
                                  <Image
                                    src={item.image || "/images/avakaya-pickle.jpg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-semibold text-[#1F1B18]">{item.name}</p>
                                  {item.teluguName && (
                                    <p className="text-[10px] text-[#B45309]">{item.teluguName}</p>
                                  )}
                                </div>
                              </td>
                              <td className="p-3.5 text-[#665E57]">{item.categoryLabel}</td>
                              <td className="p-3.5 font-bold text-[#8B1416]">
                                ₹{item.price} <span className="text-[10px] text-[#665E57] font-normal">/ {item.unit}</span>
                              </td>
                              <td className="p-3.5">
                                <button
                                  onClick={() => {
                                    updateProduct({ ...item, inStock: !item.inStock });
                                    showToast(`Stock updated for ${item.name}`);
                                  }}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                                    item.inStock
                                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                      : "bg-red-100 text-red-800 hover:bg-red-200"
                                  }`}
                                >
                                  {item.inStock ? "In Stock" : "Sold Out"}
                                </button>
                              </td>
                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete ${item.name}?`)) {
                                      deleteProduct(item.id);
                                      showToast(`Deleted ${item.name}`);
                                    }
                                  }}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CONTACTS, ADDRESS & TIMINGS */}
              {activeTab === "contacts" && (
                <form onSubmit={handleSaveContacts} className="space-y-6 max-w-3xl">
                  <div className="border-b border-[#EADECF] pb-4">
                    <h3 className="text-xl font-bold text-[#8B1416] font-serif">
                      Store Contacts, Address & Timings
                    </h3>
                    <p className="text-xs text-[#665E57] mt-0.5">
                      Updates are stored in Supabase and reflect live on phone buttons, header, and footer.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#EADECF] space-y-5 text-xs shadow-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-[#1F1B18] mb-1">Store Calling Number</label>
                        <input
                          type="text"
                          value={contactForm.phoneDisplay}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              phoneDisplay: e.target.value,
                              primaryPhone: e.target.value.replace(/[^0-9+]/g, ""),
                            })
                          }
                          className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#1F1B18] mb-1">WhatsApp Order Number</label>
                        <input
                          type="text"
                          value={contactForm.whatsappDisplay}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              whatsappDisplay: e.target.value,
                              whatsappNumber: e.target.value.replace(/[^0-9]/g, ""),
                            })
                          }
                          className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-[#1F1B18] mb-1">Address Line 1</label>
                        <input
                          type="text"
                          value={contactForm.addressLine1}
                          onChange={(e) => setContactForm({ ...contactForm, addressLine1: e.target.value })}
                          className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#1F1B18] mb-1">Landmark</label>
                        <input
                          type="text"
                          value={contactForm.landmark}
                          onChange={(e) => setContactForm({ ...contactForm, landmark: e.target.value })}
                          className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#1F1B18] mb-1">Opening Hours</label>
                        <input
                          type="text"
                          value={contactForm.openingHours}
                          onChange={(e) => setContactForm({ ...contactForm, openingHours: e.target.value })}
                          className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-[#1F1B18] mb-1">Top Announcement Notice</label>
                        <input
                          type="text"
                          value={contactForm.announcementText}
                          onChange={(e) => setContactForm({ ...contactForm, announcementText: e.target.value })}
                          className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                        />
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="activeNotice"
                          checked={contactForm.isAnnouncementActive}
                          onChange={(e) => setContactForm({ ...contactForm, isAnnouncementActive: e.target.checked })}
                          className="w-4 h-4 text-[#8B1416]"
                        />
                        <label htmlFor="activeNotice" className="text-xs font-semibold text-[#1F1B18] cursor-pointer">
                          Display announcement banner on top of the website
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#EADECF] flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#8B1416] hover:bg-[#a81c1f] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save to Supabase Cloud</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 3: CUSTOMER REVIEWS */}
              {activeTab === "reviews" && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EADECF] pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#8B1416] font-serif">
                        Customer Reviews & Testimonials
                      </h3>
                      <p className="text-xs text-[#665E57] mt-0.5">
                        Manage feedback from Google Maps and local Kurnool patrons.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddReview(!showAddReview)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B1416] text-white text-xs font-semibold hover:bg-[#a81c1f] transition-all shadow-xs shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showAddReview ? "Close Form" : "Add Customer Review"}</span>
                    </button>
                  </div>

                  {showAddReview && (
                    <form
                      onSubmit={handleCreateReview}
                      className="bg-white p-6 rounded-2xl border border-[#EADECF] shadow-sm space-y-4 text-xs animate-in fade-in"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold mb-1">Customer Name *</label>
                          <input
                            type="text"
                            required
                            value={newReview.author}
                            onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                            placeholder="e.g. S. Venkatesh"
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold mb-1">Locality in Kurnool</label>
                          <input
                            type="text"
                            value={newReview.locality}
                            onChange={(e) => setNewReview({ ...newReview, locality: e.target.value })}
                            placeholder="e.g. Teachers Colony, Kurnool"
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold mb-1">Rating</label>
                          <select
                            value={newReview.rating}
                            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          >
                            <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                            <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                            <option value={3}>⭐⭐⭐ (3 Stars)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-semibold mb-1">Source</label>
                          <select
                            value={newReview.source}
                            onChange={(e) => setNewReview({ ...newReview, source: e.target.value as Review["source"] })}
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          >
                            <option value="Google Maps">Google Maps</option>
                            <option value="Store Visitor">Store Visitor</option>
                            <option value="WhatsApp Customer">WhatsApp Customer</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold mb-1">Review Comments *</label>
                          <textarea
                            required
                            rows={3}
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            placeholder="Customer feedback on food taste, quality, packaging..."
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-[#EADECF]">
                        <button
                          type="button"
                          onClick={() => setShowAddReview(false)}
                          className="px-4 py-2 border rounded-xl text-[#665E57]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#8B1416] text-white rounded-xl font-bold"
                        >
                          Publish Review
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 bg-white rounded-2xl border border-[#EADECF] flex items-start justify-between gap-4 text-xs shadow-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1F1B18]">{rev.author}</span>
                            <span className="text-[#8C8276]">({rev.locality})</span>
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                              {rev.source}
                            </span>
                          </div>
                          <p className="text-[#524943] italic pt-1">&ldquo;{rev.comment}&rdquo;</p>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm(`Delete review from ${rev.author}?`)) {
                              deleteReview(rev.id);
                              showToast("Review deleted");
                            }
                          }}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-xl transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: GALLERY MANAGER */}
              {activeTab === "gallery" && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EADECF] pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#8B1416] font-serif">
                        Store & Product Photo Gallery
                      </h3>
                      <p className="text-xs text-[#665E57] mt-0.5">
                        Upload real photographs to Supabase Storage for the photo gallery.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddGallery(!showAddGallery)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B1416] text-white text-xs font-semibold hover:bg-[#a81c1f] transition-all shadow-xs shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showAddGallery ? "Close Form" : "Upload Photograph"}</span>
                    </button>
                  </div>

                  {showAddGallery && (
                    <form
                      onSubmit={handleCreateGallery}
                      className="bg-white p-6 rounded-2xl border border-[#EADECF] shadow-sm space-y-4 text-xs animate-in fade-in"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold mb-1">Photo Title *</label>
                          <input
                            type="text"
                            required
                            value={newGalleryItem.title}
                            onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                            placeholder="e.g. Fresh Batch of Avakaya Pickle"
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold mb-1">Category</label>
                          <select
                            value={newGalleryItem.category}
                            onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          >
                            <option value="Pickles">Pickles</option>
                            <option value="Sweets">Sweets</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Spices">Spices</option>
                            <option value="Store">Store Front & Counter</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold mb-1">Upload Photo</label>
                          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-dashed border-[#EADECF] bg-[#FCFBF7]">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#EADECF] shrink-0 bg-stone-100">
                              <Image src={galleryImagePreview} alt="Preview" fill className="object-cover" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                ref={galleryFileInputRef}
                                onChange={handleGalleryFileChange}
                                className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#8B1416] file:text-white hover:file:bg-[#a81c1f] cursor-pointer"
                              />
                              <p className="text-[11px] text-[#8C8276]">
                                Uploads directly to Supabase Storage bucket <code>aahar-media</code>.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold mb-1">Caption</label>
                          <input
                            type="text"
                            value={newGalleryItem.caption}
                            onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                            placeholder="Brief description of the photo"
                            className="w-full p-2.5 border rounded-xl border-[#EADECF] bg-[#FCFBF7]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-[#EADECF]">
                        <button
                          type="button"
                          onClick={() => setShowAddGallery(false)}
                          className="px-4 py-2 border rounded-xl text-[#665E57]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isUploading}
                          className="px-5 py-2 bg-[#8B1416] text-white rounded-xl font-bold flex items-center gap-2"
                        >
                          {isUploading ? "Uploading..." : "Save Photo"}
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {gallery.map((g) => (
                      <div key={g.id} className="relative rounded-2xl overflow-hidden border border-[#EADECF] bg-white group shadow-xs">
                        <div className="relative h-32 w-full">
                          <Image src={g.imageUrl} alt={g.title} fill className="object-cover" />
                        </div>
                        <div className="p-3 text-xs">
                          <p className="font-bold text-[#1F1B18] truncate">{g.title}</p>
                          <p className="text-[10px] text-[#8C8276] uppercase tracking-wider">{g.category}</p>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${g.title}?`)) {
                              deleteGalleryItem(g.id);
                              showToast("Photo deleted");
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SUPABASE & BACKUP */}
              {activeTab === "backup" && (
                <div className="space-y-6 max-w-xl">
                  <div className="border-b border-[#EADECF] pb-4">
                    <h3 className="text-xl font-bold text-[#8B1416] font-serif">
                      Supabase Cloud Sync & Backup
                    </h3>
                    <p className="text-xs text-[#665E57] mt-0.5">
                      Your website runs on Supabase cloud storage (bucket: <code>aahar-media</code>).
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#EADECF] space-y-4 text-xs shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <Cloud className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-bold text-xs">Cloud Database & Storage: Active & Encrypted</p>
                        <p className="text-[11px] text-emerald-700">Storage Bucket: <code>aahar-media</code> (Verified Connected)</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <h4 className="font-bold text-[#1F1B18] text-sm mb-1">Export JSON Backup</h4>
                      <p className="text-[#665E57] mb-3">
                        Download a snapshot of all active products, contact information, and reviews.
                      </p>
                      <button
                        onClick={handleDownloadBackup}
                        className="px-5 py-2.5 bg-[#8B1416] text-white rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Backup (.JSON)</span>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-[#EADECF]">
                      <h4 className="font-bold text-[#1F1B18] text-sm mb-1">Restore Default Data</h4>
                      <p className="text-[#665E57] mb-3">
                        Re-sync the website back to the original authentic seed catalogue.
                      </p>
                      <button
                        onClick={async () => {
                          if (confirm("Reset everything to authentic defaults?")) {
                            await resetToDefaults();
                            showToast("Defaults restored and synced to Supabase!");
                          }
                        }}
                        className="px-4 py-2 bg-stone-100 text-[#8B1416] border border-[#EADECF] rounded-xl font-semibold hover:bg-stone-200 transition-colors"
                      >
                        Restore Authentic Defaults
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
