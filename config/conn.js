export  async function obtenerToken() {
  try {
    const respuesta = await fetch(
     const username=process.env.username

     const password1=process.env.password
    const password=password1.replace(/$/g, '$$');
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
   console.log("datos del respuesta usuariocontraseña:", process.env.username," ",process.env.password)
console.log("respuesta ",respuesta)
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
