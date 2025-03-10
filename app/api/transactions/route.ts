import { NextResponse } from "next/server";
import { Transaction } from "@/app/models/Transaction";
import { connectDB } from "@/app/lib/mongodb";


export async function GET() {
  await connectDB();
  const transactions = await Transaction.find({});
  return NextResponse.json(transactions);
}

{/*
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "5");
  const skip = (page - 1) * limit;

  const transactions = await Transaction.find({}).skip(skip).limit(limit);
  const total = await Transaction.countDocuments();

  return NextResponse.json({ transactions, total });
}*/}


export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newTransaction = await Transaction.create(body);
  return NextResponse.json(newTransaction, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Transaction deleted" });
}

export async function PUT(req: Request) {
  await connectDB();
  const { id, name, amount, status } = await req.json();
  const updatedTransaction = await Transaction.findByIdAndUpdate(id, { name, amount, status }, { new: true });
  return NextResponse.json(updatedTransaction);
}
