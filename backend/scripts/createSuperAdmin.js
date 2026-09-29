import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/User.js";
dotenv.config();

const [,, name="Super Admin", email="admin@pashurakshak.ai", password="Admin@12345"] = process.argv;
await mongoose.connect(process.env.MONGODB_URL);
const exists = await User.findOne({ email });
if (exists) {
  console.log("Admin already exists:", email);
} else {
  await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12), role: "super_admin" });
  console.log("Super Admin created:", email);
}
await mongoose.disconnect();
