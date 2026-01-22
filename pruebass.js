//mport fetch from 'node-fetch'; // o en Node 18+ solo import fetch
import dbLocal from "db-local";
const { Schema } = new dbLocal({ path: "./db" });
import crypto from "node:crypto";
import { FLOAT } from "sequelize";
import { array } from "zod";

/* const eventos = Schema("eventos", {
  nodo_id: { type: String, required: true },
  timestamp: { type: String, required: true },
  direccion: { type: String, required: true },
  eje_x: { type: Array, required: true },
  eje_y: { type: Array, required: true },
  eje_z: { type: Array, required: true },
  vector_suma: { type: Array, required: true },
  /* espectro_x: { type: Array, required: true },
  espectro_y: { type: Array, required: true },
  espectro_z: { type: Array, required: true }, 
}); */

async function obtenerDatosDeApi() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl9TQyIsImp0aSI6IjFhM2U5MDFkLTdkNTYtNGVkYS05MGQ1LWY4MTQzNTU0ZWVmZiIsInVzZXJJZCI6ImE5ZDliYjI5LTUwMmYtNDcwOC1iZTg5LTRhNGI3ZTk1NmUxYiIsImNsaWVudGVJZCI6IjFhYWJjZjFmLTViYTEtNDBkNy04YjgzLWYwYWNlNjViODlhMCIsImVtYWlsIjoiYWRtaW5Ac2MuY29tIiwicm9sZSI6InVzZXIiLCJFbnRlcnByaXNlIjoiU2FuIENyaXN0b2JhbCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NjQ0MTk4NDYsImV4cCI6MTc2NDQ2MzA0NiwiaWF0IjoxNzY0NDE5ODQ2LCJpc3MiOiJwdWxzYXJ1c2VycyIsImF1ZCI6InB1bHNhcmF1ZGllbmNlIn0.cah4xsOSnb2tvSxx5v-7v2nR1Oor2gjP0T8_tiwgWyc";
  /* "https://api.cosmosblastingtools.com/cloud/ad7606/api/v1/ad7606/status/7f6cb4b4-387d-4687-a543-ab8e1b328cde" 
  https://api.cosmosblastingtools.com/cloud/ad7606/api/v1/ad7606/start/7f6cb4b4-387d-4687-a543-ab8e1b328cde
  https://cosmosblastingtools.com/pulsaronline/api/v1/data/spectrum-event?triggerId=${id}&rangeSeconds=10&version=v2.0
  https://cosmosblastingtools.com/pulsaronline/api/v1/data/triggers?offset=0&limit=20&start_time=2025-11-01T17&end_time=2025-11-18T17
  */
  try {
    const respuesta = await fetch(
      "https://cosmosblastingtools.com/pulsaronline/api/v2/analytics/events/waveform/compact?triggerId=768&version=v2.0&rangeSeconds=10&applyLowpass=true",
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
    console.log("Datos recibidos:", data);
    console.log("len:", data.signals.channels.X.values);
    /* const id = crypto.randomUUID();
    const evento = eventos
      .create({
        _id: id,
        nodo_id: data.metadata.node_name,
        timestamp: data.metadata.trigger_datetime,
        direccion: data.metadata.trigger_direction,
        eje_x: data.signals.RADIAL,
        eje_y: data.signals.TRANSVERSAL,
        vector_suma: data.signals["VECTOR SUMA"],
        eje_z: data.signals.VERTICAL,
      })
      .save(); */
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

// Llamar a la función
obtenerDatosDeApi();

//import { WebSocketError } from "undici-types";
/* import { WebSocket } from "ws";

//import websocket from "ws";
const ws = new WebSocket("wss://cosmosblastingtools.com/ws");

ws.onopen = () => {
  const authMessage = {
    type: "AUTH",
    token:
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl9TQyIsImp0aSI6IjE1MTY1ZDRhLTVhMTAtNGU2NC1iNWQxLTdlZDFjYzU3MDljMSIsInVzZXJJZCI6ImE5ZDliYjI5LTUwMmYtNDcwOC1iZTg5LTRhNGI3ZTk1NmUxYiIsImVtYWlsIjoiYWRtaW5Ac2MuY29tIiwicm9sZSI6InVzZXIiLCJFbnRlcnByaXNlIjoiU2FuIENyaXN0b2JhbCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NTkxNTEwNDEsImV4cCI6MTc1OTE5NDI0MSwiaWF0IjoxNzU5MTUxMDQxLCJpc3MiOiJwdWxzYXJ1c2VycyIsImF1ZCI6InB1bHNhcmF1ZGllbmNlIn0.--2kHOtcYqrvef3FpvegdQB4_j_vha-WATZicgVeIPw",
    clientType: "WEB",
    timestamp: 1759155447886,
  };

  ws.send(JSON.stringify(authMessage));
};
//console.log(process.env.JWT_SECRET);
ws.onmessage = (event) => {
  const message = event.data;
  console.log("Mensaje recibido d", typeof message.type);
  console.log("Mensaje recibido desde servidor:", message, "\n");
}; */
