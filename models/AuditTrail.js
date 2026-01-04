import DBlocal from "db-local";
import crypto from "node:crypto";
import conectarDB from "../config/db.js";
import { getDefaultSettings } from "node:http2";
import mongoose from "mongoose";
await conectarDB();
const { Schema } = new DBlocal({ path: "./db" });
export const Audit = new mongoose.Schema({
  _id: { type: String, required: true },
  usuario_id: { type: String, required: true },
  accion: { type: String, required: true },
  registro_id: { type: String, required: true },
  detalle: { type: String, required: true },
  fecha: { type: Number, default: Date.now },
});
export const Auditoria = mongoose.model("Auditoria", Audit);
export const auditoriadb = async (registro) => {
  const data = Date.now();
  console.log("fecha: ", data);
  console.log("date: ", typeof data);
  const id = crypto.randomUUID();
  console.log("Auditoria", typeof registro);
  try {
    const audit = await Auditoria.create({
      _id: id,
      usuario_id: registro.usuario_id,
      accion: registro.accion,
      registro_id: registro.registro_id,
      detalle: registro.detalle,
    });
    return audit;
  } catch (err) {
    console.log(err);
  }
};
export const getAuditoria = async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 5;
  console.log("offset: ", offset);
  console.log("limit: ", limit);
  const data = await Auditoria.find().skip(offset).limit(limit);
  //console.log("llego hasta el model: ", data);

  return data;
};
