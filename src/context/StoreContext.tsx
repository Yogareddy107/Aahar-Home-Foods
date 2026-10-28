"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Product,
  Review,
  GalleryItem,
  StoreInfo,
  initialStoreInfo,
  initialProducts,
  initialReviews,
  initialGallery,
} from "@/data/initialData";

interface StoreContextType {
  storeInfo: StoreInfo;
  products: Product[];
  reviews: Review[];
  gallery: GalleryItem[];
  isAdminModalOpen: boolean;
  isUnlocked: boolean;
  isLoading: boolean;
  isSaving: boolean;
  lastSyncedAt: string | null;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  verifyPin: (pin: string) => boolean;
  lockAdmin: () => void;
  updateStoreInfo: (info: Partial<StoreInfo>) => Promise<boolean>;
  addProduct: (product: Omit<Product, "id">) => Promise<boolean>;
  updateProduct: (product: Product) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  addReview: (review: Omit<Review, "id">) => Promise<boolean>;
  deleteReview: (id: string) => Promise<boolean>;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;
  uploadImage: (file: File) => Promise<string | null>;
  resetToDefaults: () => Promise<boolean>;
  refreshFromCloud: () => Promise<void>;
  exportConfigJson: () => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(initialStoreInfo);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  // Fetch initial master data from Supabase backend on load (NO localStorage!)
  const refreshFromCloud = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/store");
      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.storeInfo) setStoreInfo(json.data.storeInfo);
        if (Array.isArray(json.data.products) && json.data.products.length > 0) {
          setProducts(json.data.products);
        }
        if (Array.isArray(json.data.reviews)) setReviews(json.data.reviews);
        if (Array.isArray(json.data.gallery)) setGallery(json.data.gallery);
        setLastSyncedAt(json.data.updatedAt || new Date().toISOString());
      }
    } catch (err) {
      console.warn("Failed to sync from Supabase, using verified defaults:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchCloud = async () => {
      try {
        const res = await fetch("/api/store");
        const json = await res.json();
        if (!ignore && json?.success && json?.data) {
          if (json.data.storeInfo) setStoreInfo(json.data.storeInfo);
          if (Array.isArray(json.data.products) && json.data.products.length > 0) {
            setProducts(json.data.products);
          }
          if (Array.isArray(json.data.reviews)) setReviews(json.data.reviews);
          if (Array.isArray(json.data.gallery)) setGallery(json.data.gallery);
          setLastSyncedAt(json.data.updatedAt || new Date().toISOString());
        }
      } catch (err) {
        console.warn("Failed to sync from Supabase on mount:", err);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    fetchCloud();
    return () => {
      ignore = true;
    };
  }, []);

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => setIsAdminModalOpen(false);

  const verifyPin = (pin: string): boolean => {
    if (pin.trim() === "1234") {
      setIsUnlocked(true);
      return true;
    }
    return false;
  };

  const lockAdmin = () => {
    setIsUnlocked(false);
  };

  // Helper to persist current state to Supabase
  const persistToSupabase = async (
    nextStoreInfo: StoreInfo,
    nextProducts: Product[],
    nextReviews: Review[],
    nextGallery: GalleryItem[]
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: "1234",
          data: {
            storeInfo: nextStoreInfo,
            products: nextProducts,
            reviews: nextReviews,
            gallery: nextGallery,
          },
        }),
      });
      const result = await res.json();
      if (result.success) {
        setLastSyncedAt(new Date().toISOString());
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to persist to Supabase:", err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateStoreInfo = async (info: Partial<StoreInfo>): Promise<boolean> => {
    const updated = { ...storeInfo, ...info };
    setStoreInfo(updated);
    return await persistToSupabase(updated, products, reviews, gallery);
  };

  const addProduct = async (productData: Omit<Product, "id">): Promise<boolean> => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    return await persistToSupabase(storeInfo, updated, reviews, gallery);
  };

  const updateProduct = async (product: Product): Promise<boolean> => {
    const updated = products.map((p) => (p.id === product.id ? product : p));
    setProducts(updated);
    return await persistToSupabase(storeInfo, updated, reviews, gallery);
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    return await persistToSupabase(storeInfo, updated, reviews, gallery);
  };

  const addReview = async (reviewData: Omit<Review, "id">): Promise<boolean> => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    return await persistToSupabase(storeInfo, products, updated, gallery);
  };

  const deleteReview = async (id: string): Promise<boolean> => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    return await persistToSupabase(storeInfo, products, updated, gallery);
  };

  const addGalleryItem = async (itemData: Omit<GalleryItem, "id">): Promise<boolean> => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`,
    };
    const updated = [...gallery, newItem];
    setGallery(updated);
    return await persistToSupabase(storeInfo, products, reviews, updated);
  };

  const deleteGalleryItem = async (id: string): Promise<boolean> => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    return await persistToSupabase(storeInfo, products, reviews, updated);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pin", "1234");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        return json.url;
      }
      return null;
    } catch (err) {
      console.error("Failed to upload image:", err);
      return null;
    }
  };

  const resetToDefaults = async (): Promise<boolean> => {
    setStoreInfo(initialStoreInfo);
    setProducts(initialProducts);
    setReviews(initialReviews);
    setGallery(initialGallery);
    return await persistToSupabase(
      initialStoreInfo,
      initialProducts,
      initialReviews,
      initialGallery
    );
  };

  const exportConfigJson = () => {
    return JSON.stringify(
      {
        storeInfo,
        products,
        reviews,
        gallery,
        lastSyncedAt,
        source: "Supabase Cloud Database",
      },
      null,
      2
    );
  };

  return (
    <StoreContext.Provider
      value={{
        storeInfo,
        products,
        reviews,
        gallery,
        isAdminModalOpen,
        isUnlocked,
        isLoading,
        isSaving,
        lastSyncedAt,
        openAdminModal,
        closeAdminModal,
        verifyPin,
        lockAdmin,
        updateStoreInfo,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        deleteReview,
        addGalleryItem,
        deleteGalleryItem,
        uploadImage,
        resetToDefaults,
        refreshFromCloud,
        exportConfigJson,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
