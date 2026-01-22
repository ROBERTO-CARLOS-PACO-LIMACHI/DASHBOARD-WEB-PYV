export async function obtenerToken() {
  
  try {
    
    const respuesta = await fetch(
      "https://cosmosblastingtools.com/pulsaronline/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: process.env.username,
          password: process.env.password,
        }),
      },
    );
    if (!respuesta.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await respuesta.json();
    console.log("Token obtenido: ", data.token);
    return data.token;
  } catch (error) {
    console.error("error al obtener el token: ", error);
    throw error;
  }
  
}
//obtenerToken();
