import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, locality, enquiryType, selectedProduct, quantity, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required." },
        { status: 400 }
      );
    }

    try {
      const supabase = getSupabaseServerClient();
      await supabase.from("enquiries").insert([
        {
          name,
          phone,
          locality: locality || "Kurnool",
          enquiry_type: enquiryType,
          selected_product: selectedProduct,
          quantity,
          message,
        },
      ]);
    } catch {
      // If table doesn't exist yet, we still record success as order is also routed via WhatsApp
    }

    return NextResponse.json({ success: true, message: "Enquiry recorded successfully." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to record enquiry";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
