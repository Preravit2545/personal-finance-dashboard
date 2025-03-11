import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Category } from "@/app/models/Category";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newCategory = await Category.create(body);
  return NextResponse.json(newCategory, { status: 201 });
}
