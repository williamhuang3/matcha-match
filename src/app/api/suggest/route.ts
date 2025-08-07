import { NextResponse } from "next/server";
import { SuggestedMatcha } from "@/models/SuggestedMatcha";
import dbConnect from "@/lib/mongodb";

interface SuggestedMatchaInput {
  brand: string;
  name: string;
  link: string;
  notes?: string;
}

function validateSuggestedMatcha(data: unknown): data is SuggestedMatchaInput {
  if (!data || typeof data !== "object") return false;
  const { brand, name, link, notes } = data as Record<string, unknown>;
  if (typeof brand !== "string" || !brand.trim()) return false;
  if (typeof name !== "string" || !name.trim()) return false;
  if (typeof link !== "string") return false;
  try {
    new URL(link);
  } catch {
    return false;
  }
  if (notes !== undefined && typeof notes !== "string") return false;
  return true;
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!validateSuggestedMatcha(body)) {
    return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
  }

  try {
    await dbConnect();
  } catch (err) {
    console.error("❌ Database connection error:", err);
    return NextResponse.json(
      { success: false, error: "Database connection error" },
      { status: 500 }
    );
  }

  try {
    const matcha = await SuggestedMatcha.create(body);
    return NextResponse.json({ success: true, matcha });
  } catch (err) {
    console.error("❌ Error saving matcha suggestion:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
