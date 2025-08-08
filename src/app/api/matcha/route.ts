import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Matcha from "@/models/Matcha";

function findUnknownFields(
  original: Record<string, unknown>,
  parsed: Record<string, unknown>,
  path = ""
): string[] {
  const unknown: string[] = [];
  for (const key of Object.keys(original)) {
    if (!(key in parsed)) {
      unknown.push(path ? `${path}.${key}` : key);
      continue;
    }
    const origVal = original[key];
    const parsedVal = parsed[key];
    if (
      origVal &&
      typeof origVal === "object" &&
      parsedVal &&
      typeof parsedVal === "object"
    ) {
      unknown.push(
        ...findUnknownFields(
          origVal as Record<string, unknown>,
          parsedVal as Record<string, unknown>,
          path ? `${path}.${key}` : key
        )
      );
    }
  }
  return unknown;
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  try {
    const parsed = await Matcha.validate(body);
    const unknown = findUnknownFields(body, parsed);
    if (unknown.length > 0) {
      return NextResponse.json(
        { error: `Unknown fields: ${unknown.join(", ")}` },
        { status: 400 }
      );
    }
    const newMatcha = await Matcha.create(parsed);
    return NextResponse.json(newMatcha);
  } catch {
    return NextResponse.json(
      { error: "Invalid matcha data" },
      { status: 400 }
    );
  }
}

export async function GET() {
  await dbConnect();
  const matchaList = await Matcha.find();
  return NextResponse.json(matchaList);
}
