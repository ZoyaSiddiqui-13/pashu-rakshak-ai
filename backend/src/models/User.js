import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  mobile: { type: String, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["farmer", "super_admin", "veterinarian", "staff"], default: "farmer" },
  active: { type: Boolean, default: true },
  language: { type: String, enum: ["en", "hi", "mr"], default: "en" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
