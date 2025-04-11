import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Matcha from "@/models/Matcha";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const newMatcha = await Matcha.create(data);
  return NextResponse.json(newMatcha);
}

export async function GET() {
  await dbConnect();
  const matchaList = await Matcha.find();
  return NextResponse.json(matchaList);
}
