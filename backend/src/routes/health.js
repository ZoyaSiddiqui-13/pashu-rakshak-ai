import express from "express";
import HealthRecord from "../models/HealthRecord.js";
import Animal from "../models/Animal.js";
import {auth,requireRole} from "../middleware/auth.js";
const router=express.Router();
router.get("/",auth,async(req,res)=>{const filter=req.user.role==="farmer"?{owner:req.user._id}:{};res.json(await HealthRecord.find(filter).populate("animal","tagId name species photoUrl").sort({date:-1}));});
router.post("/",auth,async(req,res)=>{const animal=await Animal.findOne({_id:req.body.animal,...(req.user.role==="farmer"?{owner:req.user._id}:{})});if(!animal)return res.status(403).json({message:"Animal not accessible"});const record=await HealthRecord.create({owner:animal.owner,animal:animal._id,date:req.body.date||new Date(),symptoms:Array.isArray(req.body.symptoms)?req.body.symptoms:String(req.body.symptoms||"").split(",").map(s=>s.trim()).filter(Boolean),disease:req.body.disease,temperatureC:req.body.temperatureC?Number(req.body.temperatureC):undefined,weightKg:req.body.weightKg?Number(req.body.weightKg):undefined,medicalHistory:req.body.medicalHistory,treatment:req.body.treatment,medicines:req.body.medicines,vaccination:req.body.vaccination,nextVaccinationDate:req.body.nextVaccinationDate||undefined,veterinarianNotes:req.body.veterinarianNotes,riskLevel:req.body.riskLevel||"Low",aiResult:req.body.aiResult});res.status(201).json(await record.populate("animal","tagId name species photoUrl"));});
router.delete("/:id",auth,async(req,res)=>{const filter=req.user.role==="farmer"?{_id:req.params.id,owner:req.user._id}:{_id:req.params.id};const r=await HealthRecord.findOneAndDelete(filter);if(!r)return res.status(404).json({message:"Record not found"});res.json({ok:true});});
export default router;
