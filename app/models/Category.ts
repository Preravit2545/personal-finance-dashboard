import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  icon: { type: String, required: true },
});

export const Category = models.Category || model("Category", CategorySchema);
