import { NextResponse } from "next/server";
import {
  fetchStoreMasterFromSupabase,
  saveStoreMasterToSupabase,
  MasterStoreData,
} from "@/lib/supabaseServer";

export async function GET() {
  try {
    const data = await fetchStoreMasterFromSupabase();
    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch store data";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin, data } = body;

    // Security check: Only allow updates with the correct PIN (1234)
    if (pin !== "1234") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Invalid owner PIN." },
        { status: 401 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: "No data payload provided." },
        { status: 400 }
      );
    }

    const payload: MasterStoreData = {
      storeInfo: data.storeInfo,
      products: data.products,
      reviews: data.reviews,
      gallery: data.gallery,
      updatedAt: new Date().toISOString(),
    };

    const ok = await saveStoreMasterToSupabase(payload);
    if (!ok) {
      return NextResponse.json(
        { success: false, error: "Failed to persist to Supabase storage." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Saved to Supabase cloud successfully." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
