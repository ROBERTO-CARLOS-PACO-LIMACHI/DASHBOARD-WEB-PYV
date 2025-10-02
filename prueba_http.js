import { password,username } from "./pssw.js";
export async function login() {
  try {
    const response = await fetch(
      "https://cosmosblastingtools.com/pulsaronline/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Error en el login: ${response.status}`);
    }

    const data = await response.json();
    const token=data.token;
    console.log('token: ',token)
    
    console.log("Respuesta del login:", data);
    return token;
  } catch (error) {
    console.error("Error en la petición:", error.message);
  }
}
//module.exports = login;
//login();
