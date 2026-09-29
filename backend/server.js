import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import authRoutes from "./src/routes/auth.js";
import farmRoutes from "./src/routes/farms.js";
import animalRoutes from "./src/routes/animals.js";
import healthRoutes from "./src/routes/health.js";
import adminRoutes from "./src/routes/admin.js";
import aiRoutes from "./src/routes/ai.js";
import User from "./src/models/User.js";

dotenv.config();
const app = express();
const isProd = process.env.NODE_ENV === "production";
const allowed = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map(x=>x.trim()).filter(Boolean);
app.use(cors({ origin: (origin, cb) => !origin || allowed.includes("*") || allowed.includes(origin) ? cb(null,true) : cb(new Error("CORS blocked")), credentials:true }));
app.use(express.json({ limit: "3mb" }));

let dbPromise;
async function connectDB(){
  if(!process.env.MONGODB_URL) throw new Error("MONGODB_URL is not configured");
  if(mongoose.connection.readyState === 1) return mongoose.connection;
  if(!dbPromise) dbPromise = mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 10000 });
  await dbPromise;
  return mongoose.connection;
}

async function ensureAdmin(){
  if(!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return;
  const email = process.env.ADMIN_EMAIL.toLowerCase();
  const exists = await User.findOne({ email });
  if(!exists) await User.create({ name: process.env.ADMIN_NAME || "Super Admin", email, passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD,12), role:"super_admin" });
}

app.get("/api/health", async (_,res)=>{
  try { await connectDB(); res.json({ok:true,service:"PASHU-RAKSHAK AI",database:"connected"}); }
  catch(e){ res.status(503).json({ok:false,service:"PASHU-RAKSHAK AI",database:"disconnected",message:e.message}); }
});

app.use("/api/auth", authRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/health-records", healthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use((err,req,res,next)=>{ console.error(err); if(res.headersSent) return next(err); res.status(500).json({message:err.message||"Server error"}); });

export async function bootstrap(){ await connectDB(); await ensureAdmin(); return app; }

if(process.env.VERCEL !== "1"){
  const PORT = process.env.PORT || 5000;
  bootstrap().then(()=>app.listen(PORT,()=>console.log(`Backend running on http://localhost:${PORT}`))).catch(err=>{ console.error("Startup failed:",err.message); process.exit(1); });
}

export default app;
