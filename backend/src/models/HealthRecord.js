import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animal", required: true, index: true },
  date: { type: Date, default: Date.now },
  symptoms: [String],
  disease: String,
  temperatureC: Number,
  weightKg: Number,
  medicalHistory: String,
  treatment: String,
  medicines: String,
  vaccination: String,
  nextVaccinationDate: Date,
  veterinarianNotes: String,
  riskLevel: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Low" },
  aiResult: String
}, { timestamps: true });

export default mongoose.model("HealthRecord", healthRecordSchema);
