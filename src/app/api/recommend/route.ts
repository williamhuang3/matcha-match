import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import MatchaModel from "@/models/Matcha";
import { getTopMatchas } from "@/lib/recommend";
import type { Matcha } from "@/types/Matcha";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await dbConnect();
    const matchas: Matcha[] = (await MatchaModel.find().lean()).map((doc) => ({
      _id: doc._id?.toString(), // optional, but helpful if you want to use it as a key
      brand: doc.brand,
      name: doc.name,
      price: doc.price ?? null,
      profile: doc.profile,
      usage: doc.usage,
      cultivars: doc.cultivars,
    }));
    

    const top3 = getTopMatchas(body, matchas);

    return NextResponse.json({ results: top3 });
  } catch (err) {
    console.error("Error in recommend API:", err);
    return NextResponse.json({ error: "Failed to recommend matchas" }, { status: 500 });
  }
}
