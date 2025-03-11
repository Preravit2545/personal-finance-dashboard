import mongoose, { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "categories", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  status: { type: String, enum: ["Success", "Pending", "Failed"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Transaction = models.Transaction || model("Transaction", TransactionSchema);
