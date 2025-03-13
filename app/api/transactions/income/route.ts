import { NextResponse } from "next/server";
import { Transaction } from "@/app/models/Transaction";
import { connectDB } from "@/app/lib/mongodb";
import mongoose from "mongoose";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const userObjectId = new mongoose.Types.ObjectId(userId); // ✅ แปลงเป็น ObjectId

  const [incomes] = await Promise.all([
    Transaction.aggregate([
      { $match: { userId: userObjectId, type: "income" } }, // ✅ ใช้ ObjectId
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          totalIncome: { $sum: "$amount" } // ✅ คงเดิม (ค่าเป็นบวกอยู่แล้ว)
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalIncome: 1
        }
      },
      { $sort: { year: 1, month: 1 } }
    ])
  ]);

  return NextResponse.json({  
    incomes: incomes 
  });
}

