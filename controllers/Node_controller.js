import { NodeModel } from "../models/nodoModel.js";
import { processData } from "../utils/fft.js";
export class NodeController {
    static async getInfo(req, res) {
        const result = await NodeModel.getAll();
        //console.log(result)
        return res.json(result);
        // if(result) return res.json(result)
    }

    static async getTriggers(req, res) {
        console.log("req.query: ", req.query);
        // console.log("req.params: ", req.params);
        //console.log("req.body: ", req.body);
        const { start_time, end_time } = req.query;

        console.log("fechas controlador: ", start_time, end_time);
        const result = await NodeModel.gettriggers(start_time, end_time);
        //console.log(result);
        return res.json(result);
    }
    static async start(req, res) {
        const nodos = {
            16: "7f6cb4b4-387d-4687-a543-ab8e1b328cde",
            17: "9410fdea-3cd1-40ab-a1af-11906c6c12c1",
            18: "d1821eb7-a9e8-43aa-b68a-410a324b864c",
        };

        const { uuid } = req.params;
        console.log("nodo uuid: ", nodos[uuid]);
        const numeronodo = nodos[uuid];
        try {
            const result = await NodeModel.start(numeronodo);
            return res.json({
                ok: true,
                message: "nodo iniciado",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: "error al iniciar el nodo",
                error: error.message,
            });
        }
    }

    static async stop(req, res) {
        const nodos = {
            16: "7f6cb4b4-387d-4687-a543-ab8e1b328cde",
            17: "9410fdea-3cd1-40ab-a1af-11906c6c12c1",
            18: "d1821eb7-a9e8-43aa-b68a-410a324b864c",
        };

        const { uuid } = req.params;
        console.log("nodo uuid: ", nodos[uuid]);
        const numeronodo = nodos[uuid];
        try {
            const result = await NodeModel.stop(numeronodo);
            return res.json({
                ok: true,
                message: "nodo detenido",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: "error al detener el nodo",
                error: error.message,
            });
        }
    }
    static async update(req, res) {
        const result = await NodeModel.update();
        return res.json(result);
    }
    static async spectro(req, res) {
        let id = req.query.triggerid;

        console.log("tipo de dato id: ", typeof id);
        console.log("id spectro model: ", id);
        id = Number(id);
        const result = await processData(id);
        //console.log("result: ", result);
        return res.json(result);
    }
    static async event(req, res) {
        const id = req.query.triggerid;

        const result = await NodeModel.event(id);
        // console.log(result);
        return res.json(result);
    }
    static async EliminarEvento(req, res) {
        const { id } = req.params;
        const result = await NodeModel.EliminarEvento(id);
        return res.json(result);
    }
    static async getLast(req, res) {
        const result = await NodeModel.getLast();
        return res.json(result);
    }
    static async addEvento(req, res) {
        const data = req.body;
        console.log("data prueba CONTROLLER : ", data);
        return res.json('mensaje del  controlador de addevent')
    }
}
