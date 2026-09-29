import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true },
  farmType: String,
  address: String,
  village: String,
  city: String,
  state: String,
  pincode: String,
  contact: String,
  latitude: Number,
  longitude: Number,
  photoUrl: String
}, { timestamps: true });

export default mongoose.model("Farm", farmSchema);
