import { obtenerToken } from "./conn.js";
import jwt from "jsonwebtoken";
let tokenCache = null;
let tokenExpiration = 0;

export const verifitoken = async () => {
  const ahora = Math.floor(Date.now() / 1000);

  // Usar token cacheado si sigue válido (p.ej. 30 seg antes de expirar)
  if (tokenCache && tokenExpiration > ahora + 30) {
    return tokenCache;
  }

  // Obtener nuevo token haciendo la petición a la API externa
  const nuevoToken = await obtenerToken(); // función que hace el POST a la API externa y obtiene token
  console.log("nuevo token: ", nuevoToken);
  console.log("jwt: ", jwt);
  const decoded = jwt.decode(nuevoToken);

  tokenExpiration = decoded.exp || ahora + 3600;
  tokenCache = nuevoToken;

  return nuevoToken;
};
