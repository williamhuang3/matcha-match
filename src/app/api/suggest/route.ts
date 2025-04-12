import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { SuggestedMatcha } from "@/models/SuggestedMatcha";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const matcha = await SuggestedMatcha.create(body);
    return NextResponse.json({ success: true, matcha });
  } catch (err) {
    console.error("❌ Error saving matcha suggestion:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
