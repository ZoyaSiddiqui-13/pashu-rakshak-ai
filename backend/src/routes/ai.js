import express from "express";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/analyze", auth, (req, res) => {
  const text = `${req.body.symptoms || ""} ${req.body.history || ""}`.toLowerCase();
  const severe = ["collapse", "unable to stand", "severe bleeding", "breathing difficulty", "convulsion", "seizure"].some(x => text.includes(x));
  const high = ["high fever", "not eating", "diarrhea", "vomiting", "swelling", "cough", "nasal discharge", "weakness"].some(x => text.includes(x));
  const riskLevel = severe ? "Critical" : high ? "High" : text.trim() ? "Medium" : "Low";
  const possible = severe ? "Urgent veterinary assessment required" :
    high ? "Possible infectious or systemic illness; veterinary review recommended" :
    "No high-risk symptom pattern detected from the supplied information";
  res.json({
    riskLevel,
    possibleDisease: possible,
    recommendation: riskLevel === "Critical" ? "Seek veterinary assistance immediately." :
      riskLevel === "High" ? "Arrange veterinary review and monitor the animal closely." :
      "Continue routine monitoring and record any new symptoms.",
    disclaimer: "AI output is an early-warning aid, not a veterinary diagnosis."
  });
});

export default router;
