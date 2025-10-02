/* //mport fetch from 'node-fetch'; // o en Node 18+ solo import fetch

async function obtenerDatosDeApi() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl9TQyIsImp0aSI6ImI4YjExOTEzLTQzZWMtNDkwMC1iYzkxLTZjNjE1NTUyMzhmYSIsInVzZXJJZCI6ImE5ZDliYjI5LTUwMmYtNDcwOC1iZTg5LTRhNGI3ZTk1NmUxYiIsImVtYWlsIjoiYWRtaW5Ac2MuY29tIiwicm9sZSI6InVzZXIiLCJFbnRlcnByaXNlIjoiU2FuIENyaXN0b2JhbCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NTkwNjM4MTAsImV4cCI6MTc1OTEwNzAxMCwiaWF0IjoxNzU5MDYzODEwLCJpc3MiOiJwdWxzYXJ1c2VycyIsImF1ZCI6InB1bHNhcmF1ZGllbmNlIn0.sro3x8FOhm12o2Yxg7q2gM8ECx-GOfLnSB_Au1rHTc8";

  try {
    const respuesta = await fetch(
      "https://cosmosblastingtools.com/pulsaronline/api/v1/data/triggers?offset=0&limit=20&start_time=&end_time=",
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

    const datos = await respuesta.json();
    console.log("Datos recibidos:", datos);
    return datos;
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

// Llamar a la función
obtenerDatosDeApi();
 */

//import { WebSocketError } from "undici-types";
import { verifitoken } from "./verifitoken.js";
import { WebSocket } from "ws";
//const token = verifitoken();

//import websocket from "ws";
export async function socket() {
  const ws = new WebSocket("wss://cosmosblastingtools.com/ws");
  const token = verifitoken();
  ws.onopen = () => {
    const authMessage = {
      type: "AUTH",
      token: token,
      clientType: "WEB",
      timestamp: Date.now(),
    };

    ws.send(JSON.stringify(authMessage));
  };
  ws.onmessage = (event) => {
    const message = event.data;
    console.log("Mensaje recibido d", typeof message.type);
    console.log("Mensaje recibido desde servidor:", message, "\n");
  };
}
//console.log(process.env.JWT_SECRET);
