import mongoose, { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, enum: ["Success", "Pending", "Failed"], required: true },
});

export const Transaction = models.Transaction || model("Transaction", TransactionSchema);
