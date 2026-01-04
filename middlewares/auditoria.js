import { Audit, auditoriadb } from "../models/AuditTrail.js";
import dbLocal from "db-local";
const { Schema } = new dbLocal({ path: "./db" });

export const auditoria = async (req, res, next) => {
  const userId =
    req.user?.id ||
    req.session?.user?.id ||
    "Usuario Desconocido / No Autenticado";
  const userEmail = req.user?.email || req.session?.user?.email || "N/A";

  console.log("--- Registro de Auditoría ---");
  console.log("nodo: ", req.params.uuid);
  console.log("Usuario ID:", userId);
  console.log("Email:", userEmail);
  console.log("Método:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("req.body:", req.body);
  console.log("req.query:", req.query);
  console.log("header: ", req.headers);
  console.log("req.params:", req.params);
  console.log("ip: ", req.ip);
  console.log("req.session:", req.session);
  res.on("finish", () => {
    console.log("status:", res.statusCode);
  });
  console.log("----------------------------");
  let data;
  if (
    req.method === "POST" &&
    req.originalUrl === `/dashboard/ad7606/start/${req.params.uuid}`
  ) {
    data = {
      usuario_id: userId,
      accion: `iniciar nodo`,
      registro_id: req.params.uuid,
      detalle: `node ${req.params.uuid} iniciado`,
    };
    await auditoriadb(data);
  }
  if (
    req.method === "POST" &&
    req.originalUrl === `/dashboard/ad7606/stop/${req.params.uuid}`
  ) {
    console.log("llego hasta aui:");
    data = {
      usuario_id: userId,
      accion: `detener nodo`,
      registro_id: req.params.uuid,
      detalle: `nodo ${req.params.uuid} detenido`,
    };
    console.log("data: ", data);
    await auditoriadb(data);
  }
  if (
    req.method === "DELETE" &&
    req.originalUrl === `/dashboard/deleteEvent/${req.params.id}`
  ) {
    data = {
      usuario_id: userId,
      accion: `eliminar evento`,
      registro_id: req.params.id,
      detalle: `evento ${req.params.id} eliminado `,
    };
    await auditoriadb(data);
  }
  next();
};
