import { bootstrap } from "../backend/server.js";

let ready;
export default async function handler(req,res){
  try{
    ready ||= bootstrap();
    await ready;
    const { default: app } = await import("../backend/server.js");
    return app(req,res);
  }catch(err){
    console.error(err);
    res.status(503).json({message:"Database connection unavailable",detail:err.message});
  }
}
