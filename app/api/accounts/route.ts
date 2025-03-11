import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Account } from "@/app/models/Account";

export async function GET(req: Request) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    const accounts = await Account.find({ userId });
    return NextResponse.json(accounts);
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const newAccount = await Account.create(body);
    return NextResponse.json(newAccount, { status: 201 });
}
