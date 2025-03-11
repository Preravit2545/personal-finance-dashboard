import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  provider: { type: String, enum: ["email", "google", "facebook"], default: "email" },
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model("User", UserSchema);
