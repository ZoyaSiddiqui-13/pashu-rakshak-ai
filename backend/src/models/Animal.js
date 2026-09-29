import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true, index: true },
  tagId: { type: String, required: true },
  name: String,
  species: { type: String, required: true },
  breed: String,
  gender: { type: String, enum: ["Male", "Female", "Unknown"], default: "Unknown" },
  dateOfBirth: Date,
  age: String,
  weightKg: Number,
  colorMarkings: String,
  photoUrl: String,
  vaccinationStatus: { type: String, default: "Not recorded" },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Animal", animalSchema);
