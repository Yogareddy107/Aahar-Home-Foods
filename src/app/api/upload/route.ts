import { NextResponse } from "next/server";
import { uploadImageToSupabaseStorage } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pin = formData.get("pin") as string;

    if (pin !== "1234") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Invalid owner PIN." },
        { status: 401 }
      );
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    // Validate size (max 8MB) and type
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Image file exceeds 8MB limit." },
        { status: 400 }
      );
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid image format. Please upload JPG, PNG, or WebP." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const publicUrl = await uploadImageToSupabaseStorage(
      buffer,
      file.name,
      file.type
    );

    if (!publicUrl) {
      return NextResponse.json(
        { success: false, error: "Failed to upload image to Supabase Storage." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
