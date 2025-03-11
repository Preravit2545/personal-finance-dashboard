import mongoose, { Schema, model, models } from "mongoose";

const BudgetSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  category: { type: Schema.Types.ObjectId, ref: "categories", required: true },
  amount: { type: Number, required: true },
  period: { type: String, enum: ["weekly", "monthly", "yearly"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Budget = models.Budget || model("Budget", BudgetSchema);
