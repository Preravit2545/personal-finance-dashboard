import mongoose, { Schema, model, models } from "mongoose";

const AccountSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true }, // เช่น "SCB", "True Wallet"
    balance: { type: Number, default: 0 }, // ยอดเงินคงเหลือ
    type: { type: String, enum: ["bank", "wallet", "cash"], required: true }
});

export const Account = models.Account || model("Account", AccountSchema);