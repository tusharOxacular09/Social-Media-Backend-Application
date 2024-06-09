import mongoose from "mongoose";

// Schema for otp storage
export const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiaryDate: { type: Date, required: true },
});
