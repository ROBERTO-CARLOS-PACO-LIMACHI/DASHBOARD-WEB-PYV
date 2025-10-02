import { NodeModel } from "../models/nodoModel.js";
export class NodeController {
    static async getall(req, res) {
        const result = await NodeModel.getAll();
        //console.log(result.success);
        //return res.render("home");
        if (result) return res.json(result);
    }
    static async getInfo(req, res) {
        const result = await NodeModel.getAll();
        //console.log(result)
        return res.json(result);
        // if(result) return res.json(result)
    }

    static async getspectro(req, res) {
        console.log(" nodo controlador req.query: ", req.query);
        const { triggerid } = req.query;
        //console.log("nodocontroller id: ", id);
        const result = await NodeModel.getspectro(triggerid);
        //console.log(result)
        return res.json(result);
        // if(result) return res.json(result)
    }

    static async getEvent(req, res) {
        const { triggerid } = req.query;

        const result = await NodeModel.getevent(triggerid);
        // console.log(result);
        return res.json(result);
        // if(result) return res.json(result)
    }
    static async getTriggers(req, res) {
        console.log("req.query: ", req.query);
        // console.log("req.params: ", req.params);
        //console.log("req.body: ", req.body);
        const { start_time, end_time } = req.query;

        console.log("fechas: ", start_time, end_time);
        const result = await NodeModel.gettriggers(start_time, end_time);
        //console.log(result);
        return res.json(result);
    }
}
