import { GeofonoModel } from "../models/GeofonoModel.js";
export class GeofonoController{
    static async  getInfo(req,res){
        const result=await GeofonoModel.getInfo()
        console.log(result)
        return res.render("home",{node:result})
       // if(result) return res.json(result)
        
    }
    static async  getSpectro(req,res){
        const result=await GeofonoModel.getevent()
        console.log(result)
        return res.render("home",{node:result})
       // if(result) return res.json(result)
        
    }
    static async  getEvent(req,res){
        const result=await GeofonoModel.getspectro()
        console.log(result)
        return res.render("home",{node:result})
       // if(result) return res.json(result)
        
    }
    
}