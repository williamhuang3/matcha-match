import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Matcha from "@/models/Matcha";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: Request) {
  const user = getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

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
