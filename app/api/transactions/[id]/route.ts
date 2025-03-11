import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Transaction } from "@/app/models/Transaction";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const updatedTransaction = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updatedTransaction);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Transaction.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Transaction deleted" });
}
