//mport fetch from 'node-fetch'; // o en Node 18+ solo import fetch

async function obtenerDatosDeApi() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl9TQyIsImp0aSI6ImE5ZDJkZTcyLTRkNDktNGQxMS05ODVjLWMzODM5NTgwZjliNSIsInVzZXJJZCI6ImE5ZDliYjI5LTUwMmYtNDcwOC1iZTg5LTRhNGI3ZTk1NmUxYiIsImVtYWlsIjoiYWRtaW5Ac2MuY29tIiwicm9sZSI6InVzZXIiLCJFbnRlcnByaXNlIjoiU2FuIENyaXN0b2JhbCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NTkzMjYyMTIsImV4cCI6MTc1OTM2OTQxMiwiaWF0IjoxNzU5MzI2MjEyLCJpc3MiOiJwdWxzYXJ1c2VycyIsImF1ZCI6InB1bHNhcmF1ZGllbmNlIn0.y-9TzVMzuYhMd8Nm2wJ1WCobP2oxQk3nhO3LPj0MJLU";

  try {
    const respuesta = await fetch(
      "https://cosmosblastingtools.com/pulsaronline/api/v1/nodes/signal/chart-data?time_range=today&chart_type=network&group_by=hour&timezone=America%2FLima&page=1&limit=100",
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
