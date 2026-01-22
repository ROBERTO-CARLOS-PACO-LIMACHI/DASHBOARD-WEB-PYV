console.log("hola mundo");
const url = "https://cosmosblastingtools.com/pulsaronline/api/v1/data/nodes/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbl9TQyIsImp0aSI6ImQxZmUzMDQxLTk3ZGEtNDNhNy1hZWUxLTM1Y2E2Mjk1NzZjNyIsInVzZXJJZCI6ImE5ZDliYjI5LTUwMmYtNDcwOC1iZTg5LTRhNGI3ZTk1NmUxYiIsImVtYWlsIjoiYWRtaW5Ac2MuY29tIiwicm9sZSI6InVzZXIiLCJFbnRlcnByaXNlIjoiU2FuIENyaXN0b2JhbCIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJuYmYiOjE3NTgxMDg0NTUsImV4cCI6MTc1ODE1MTY1NSwiaWF0IjoxNzU4MTA4NDU1LCJpc3MiOiJwdWxzYXJ1c2VycyIsImF1ZCI6InB1bHNhcmF1ZGllbmNlIn0.WaPLtijUqkPTg1QldW7FcTWPMzCxJAySpFt6D2VHTuY";
fetch(url, {
  method: "GET",
  headers: {
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data.connectivity_summary.active_connections))
  .catch((error) => console.error("Error:", error));

/* data.results.map((item) => item.gnss) */
/* const obj = JSON.parse(data);
const frecuencia = obj.metadata.node_name;
console.log(frecuencia); */
