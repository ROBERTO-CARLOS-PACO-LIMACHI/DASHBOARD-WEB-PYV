/* const { Sequelize, DataTypes } =require("sequelize");
import sequelize from "../config/pg.js";
 const   Sensor = sequelize.define("Sensor", {
  nro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
  },
  x: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  y: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  z: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}); */
//console.log(Sensor === sequelize.models.Sensor);
//console.log("definiendo esquema de sensor");
//import { username, password } from "../pssw.js";
import dbLocal from "db-local";
const { Schema } = new dbLocal({ path: "./db" });
import { METHODS } from "node:http";
import { verifitoken } from "../config/verifitoken.js";
import { login } from "../prueba_http.js";

import { auditoria } from "../middlewares/auditoria.js";
import { Audit } from "./AuditTrail.js";
import { timeStamp } from "node:console";
import { mongoose } from "mongoose";

export const eventoSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  nodo_id: { type: String, required: true },
  trigger: { type: Number, required: true },
  timestamp: { type: String, required: true },
  direccion: { type: String, required: true },
  eje_x: { type: Array, required: true },
  eje_y: { type: Array, required: true },
  eje_z: { type: Array, required: true },
  vector_suma: { type: Array, required: true },
  sample_rate_detected: { type: Number, required: false },
});
export const eventos = mongoose.model("eventos", eventoSchema);

const obtenerUltimoTrigger = async () => {
  const lista = await eventos.find();

  if (lista.length === 0) return null;

  // Ordenar descendente por trigger
  lista.sort((a, b) => b.trigger - a.trigger);

  // Retornar solo el trigger
  return lista[0].trigger;
};

const guardarDB = async (evento) => {
  const existe = await eventos.findOne({
    trigger: evento.metadata.event_trigger_id,
  });
  //console.log('el evento existe: ');
  console.log("existe: ", existe);
  if (existe) {
    console.log("el evento ya existe");
    return;
  }
  const id = crypto.randomUUID();
  const añadirEvento = eventos.create({
    _id: id,
    trigger: evento.metadata.event_trigger_id,
    nodo_id: evento.metadata.node_name,
    timestamp: evento.metadata.trigger_datetime,
    direccion: evento.metadata.trigger_direction,
    eje_x: evento.signals.RADIAL,
    eje_y: evento.signals.TRANSVERSAL,
    vector_suma: evento.signals["VECTOR SUMA"],
    eje_z: evento.signals.VERTICAL,
    sample_rate_detected: evento.metadata.sample_rate_detected,
  });
};

export class NodeModel {
  static async getAll() {
    try {
      const token = await verifitoken();

      console.log(token);
      const res = await fetch(
        "https://cosmosblastingtools.com/pulsaronline/api/v1/data/nodes/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      //console.log("datos del modelo:", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async gettriggers(initialdate, lastdate) {
    const initial = new Date(initialdate).toISOString();
    const last = new Date(lastdate).toISOString();

    console.log("modelo fechas: ", initialdate, lastdate);

    const evento = await eventos.find({
      timestamp: {
        $gte: initialdate,
        $lte: lastdate,
      },
    });

    console.log("eventos: ", typeof evento);
    return evento.map((ev) => ({
      _id: ev._id,
      id: ev._id,
      trigger: ev.trigger,
      nodo_id: ev.nodo_id,
      timestamp: ev.timestamp,
      direccion: ev.direccion,
    }));
    /* const token = await verifitoken();
    try {
      const res = await fetch(
        `https://cosmosblastingtools.com/pulsaronline/api/v1/data/triggers?offset=0&limit=20&start_time=${initialdate}&end_time=${lastdate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log("modelo fechas: ", initialdate, lastdate);
      const data = await res.json();
      // console.log("datos del modelo:", data);
      return data;
    } catch (err) {
      console.log(err);
    } */
  }
  static async start(uuid) {
    console.log("hola mundo");
    const token = await verifitoken();
    try {
      const respuesta = await fetch(
        `https://api.cosmosblastingtools.com/cloud/ad7606/api/v1/ad7606/start/${uuid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!respuesta.ok) {
        throw new Error(
          `Error en la consulta: ${respuesta.status} ${respuesta.statusText}`,
        );
      }
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.error("error en iniciar el nodo: ", error);
      throw error;
    }
  }
  static async stop(uuid) {
    console.log("hola mundo");
    const token = await verifitoken();
    try {
      const respuesta = await fetch(
        `https://api.cosmosblastingtools.com/cloud/ad7606/api/v1/ad7606/stop/${uuid}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!respuesta.ok) {
        throw new Error(
          `Error en la consulta: ${respuesta.status} ${respuesta.statusText}`,
        );
      }
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.error("error en iniciar el nodo: ", error);
      throw error;
    }
  }

  static async update(req, res) {
    let ultimoId = await obtenerUltimoTrigger();
    console.log("utimo trigger: ", ultimoId);
    const token = await verifitoken();
    try {
      const respuesta = await fetch(
        "https://cosmosblastingtools.com/pulsaronline/api/v1/data/triggers?offset=0&limit=1",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (!respuesta.ok) {
        throw new Error(
          `Error en la consulta: ${respuesta.status} ${respuesta.statusText}`,
        );
      }
      const data = await respuesta.json();
      if (!data.results || data.results.length === 0) {
        console.log("No hay eventos.");
        return;
      }
      const nuevoEvento = data.results[0];
      const nuevoId = nuevoEvento.id;
      if (nuevoId > ultimoId) {
        console.log("Nuevo evento detectado:", nuevoId);
        const resDetalle = await fetch(
          `https://cosmosblastingtools.com/pulsaronline/api/v1/data/geofonos-event?triggerId=${nuevoId}&rangeSeconds=10&version=v2.0`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const eventoCompleto = await resDetalle.json();
        console.log("nuevo evento: ", eventoCompleto);
        await guardarDB(eventoCompleto);
        ultimoId = nuevoId;
      } else {
        console.log("no hay nuevos eventos");
      }

      return data;
    } catch (error) {
      console.error("error al obtener eventos nuevos: ", error);
    }
  }

  static async event(id) {
    const formula = (v) => (v / 28) * 1000;
    const convertir = (arr) =>
      Array.isArray(arr)
        ? arr.map((item) => ({
            ...item,
            value: formula(item.value),
          }))
        : [];
    const res = await eventos.findOne({ trigger: Number(id) });
    console.log;
    return {
      ...res,
      eje_x: res.eje_x,
      eje_y: res.eje_y,
      eje_z: res.eje_z,
      vector_suma: res.vector_suma,
    };
  }
  
  static async EliminarEvento(id) {
    console.log("id del evento a eliminar: ", typeof id);
    const res = await eventos.deleteOne({ trigger: Number(id) });
    console.log("res: ", res);
    if (res) {
      console.log("evento eliminado", res);
    }
    return res;
  }
  static async getLast() {
    console.log("gelast: ");
    const res = await eventos.findOne();
    if (res) {
      console.log("ultimo evento: ", res);
    } else {
      console.log("no hay eventos", res);
    }
    return res;
  }
  static async addEvento(data){
    const datos=data;
    console.log('conectado al endpoint de agregar datos')
    console.log(datos)
    return json("nodo conectado :)")
  }
}
