import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Budget } from "@/app/models/Budget";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  const budgets = await Budget.find({ userId }).populate("category");
  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newBudget = await Budget.create(body);
  return NextResponse.json(newBudget, { status: 201 });
}
