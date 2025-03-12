import { NextResponse } from "next/server";
import { Transaction } from "@/app/models/Transaction";
import { connectDB } from "@/app/lib/mongodb";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "User ID is required" },{ status: 400 });

  const transactions = await Transaction.find({ userId });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newTransaction = await Transaction.create(body);
  return NextResponse.json(newTransaction, { status: 201 });
}


