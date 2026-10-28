import { createClient } from "@supabase/supabase-js";
import {
  StoreInfo,
  Product,
  Review,
  GalleryItem,
  initialStoreInfo,
  initialProducts,
  initialReviews,
  initialGallery,
} from "@/data/initialData";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseServerClient() {
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined on server.");
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

const BUCKET_NAME = "aahar-media";
const DATA_FILE_PATH = "data/aahar_store_master.json";

export interface MasterStoreData {
  storeInfo: StoreInfo;
  products: Product[];
  reviews: Review[];
  gallery: GalleryItem[];
  updatedAt: string;
}

export async function fetchStoreMasterFromSupabase(): Promise<MasterStoreData> {
  const defaultData: MasterStoreData = {
    storeInfo: initialStoreInfo,
    products: initialProducts,
    reviews: initialReviews,
    gallery: initialGallery,
    updatedAt: new Date().toISOString(),
  };

  try {
    const supabase = getSupabaseServerClient();

    // Check if table products exists in public schema
    const { data: tableProducts, error: prodErr } = await supabase
      .from("products")
      .select("*")
      .limit(100);

    if (!prodErr && tableProducts && tableProducts.length > 0) {
      const { data: tableStore } = await supabase.from("store_info").select("*").limit(1);
      const { data: tableReviews } = await supabase.from("reviews").select("*");
      const { data: tableGallery } = await supabase.from("gallery").select("*");

      return {
        storeInfo: tableStore && tableStore[0] ? (tableStore[0] as StoreInfo) : initialStoreInfo,
        products: tableProducts as Product[],
        reviews: (tableReviews as Review[]) || initialReviews,
        gallery: (tableGallery as GalleryItem[]) || initialGallery,
        updatedAt: new Date().toISOString(),
      };
    }

    // Try reading master file from Supabase Storage
    const { data: fileData, error: downloadErr } = await supabase.storage
      .from(BUCKET_NAME)
      .download(DATA_FILE_PATH);

    if (!downloadErr && fileData) {
      const text = await fileData.text();
      const parsed = JSON.parse(text);
      return {
        storeInfo: parsed.storeInfo || initialStoreInfo,
        products: parsed.products || initialProducts,
        reviews: parsed.reviews || initialReviews,
        gallery: parsed.gallery || initialGallery,
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      };
    }

    // If master file does not exist yet in bucket, seed it to bucket
    await saveStoreMasterToSupabase(defaultData);
    return defaultData;
  } catch (err) {
    console.error("fetchStoreMasterFromSupabase error, returning initial seed:", err);
    return defaultData;
  }
}

export async function saveStoreMasterToSupabase(data: MasterStoreData): Promise<boolean> {
  try {
    const supabase = getSupabaseServerClient();
    const payload = JSON.stringify(data, null, 2);

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(DATA_FILE_PATH, payload, {
        contentType: "application/json",
        upsert: true,
      });

    if (error) {
      console.error("Supabase Storage save error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("saveStoreMasterToSupabase unexpected error:", err);
    return false;
  }
}

export async function uploadImageToSupabaseStorage(
  fileBuffer: Buffer,
  filename: string,
  contentType: string
): Promise<string | null> {
  try {
    const supabase = getSupabaseServerClient();
    const cleanName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = `uploads/${cleanName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error in Supabase:", uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error("uploadImageToSupabaseStorage error:", err);
    return null;
  }
}
