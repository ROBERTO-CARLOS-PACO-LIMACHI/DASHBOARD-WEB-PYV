import { NodeModel } from "../models/nodoModel.js" 
export class NodeController{
    static async  getall(req,res){
        const result=await NodeModel.getAll()
        console.log(result)
        return res.render("home")
       // if(result) return res.json(result)
        
    }
    static async  getInfo(req,res){
        const result=await NodeModel.getAll()
        console.log(result)
        return res.json(result)
       // if(result) return res.json(result)
        
    }
    
}