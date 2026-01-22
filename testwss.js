/* const socket = new WebSocket("wss://cosmosblastingtools.com/ws/nodes", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl9TQyIsImp0aSI6IjE5YjU4OThmLTRjNDUtNDE1Ni1iODhjLWM0ZDRlMjYzNjA0MCIsInVzZXJJZCI6ImE5ZDliYjI5LTUwMmYtNDcwOC1iZTg5LTRhNGI3ZTk1NmUxYiIsImVtYWlsIjoiYWRtaW5Ac2MuY29tIiwicm9sZSI6InVzZXIiLCJFbnRlcnByaXNlIjoiU2FuIENyaXN0b2JhbCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NTg4ODQ0MDMsImV4cCI6MTc1ODkyNzYwMywiaWF0IjoxNzU4ODg0NDAzLCJpc3MiOiJwdWxzYXJ1c2VycyIsImF1ZCI6InB1bHNhcmF1ZGllbmNlIn0.132_nUUfYBBwfHKPaQXiw0369D-Ye_AfFDM2_VjtQOw",
  },
});
socket.onopen = () => console.log("conectado");
socket.onmessage = (msg) => console.log("data: ", msg.data);
socket.onerror = (err) => console.error("error", err);
socket.onclose = () => console.log("cerrado");
 */
const url = "http://localhost:3000/register"; // Cambia el puerto y ruta si es necesario

const data = {
  username: "usuarioPrueba",
    password: "contraseñaSegura123",
};

fetch(url, {
  method: "POST", // Método POST
  headers: {
    "Content-Type": "application/json", // Enviamos JSON
  },
  body: JSON.stringify(data), // Convertimos el objeto a JSON string
})
  .then((response) => response.json()) // Parsear JSON de respuesta
  .then((data) => {
    console.log("Respuesta del servidor:", data);
  })
  .catch((error) => {
    console.error("Error en la petición:", error);
  });
