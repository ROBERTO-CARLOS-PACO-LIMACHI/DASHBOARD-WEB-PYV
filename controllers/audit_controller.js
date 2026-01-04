import { Auditoria } from "../models/AuditTrail.js";
export class AuditController {
  static async getAuditoria(req, res) {
    const offset = parseInt(req.query.offse) || 5;
    const limit = parseInt(req.query.limit) || 100;
    console.log("offset: ", req.query);
    console.log("limit: ", limit);
    const data = await Auditoria.find();
    const registros = data.slice(offset, offset + limit);
    //console.log("llego hasta el model: ", data);
    const response = await res.json(data);
    //console.log("response: ", response);
    return response;
  }
}
