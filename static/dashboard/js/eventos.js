async function DatosTabla() {
  try {
    const InitialDate = document.getElementById("InitialDate").value;

    const LastDate = document.getElementById("LastDate").value;

    const initialdate = new Date(InitialDate).toISOString();
    const lastdate = new Date(LastDate).toISOString();
    console.log("fechas: ", InitialDate, LastDate);

    if (!initialdate || !lastdate) {
      alert("Por favor seleccione un rango de fechas");
    }
    const url = `/dashboard/triggers?start_time=${InitialDate}&end_time=${LastDate}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener datos de los eventos 1");
    }
    const data = await response.json();
    console.log("response data ", response);
    const filtro = data.results.map(({ id, nodo_name, date_received }) => ({
      id,
      nodo_name,
      date_received,
    }));

    const tbody = document.querySelector("#tablaEventos tbody");
    tbody.innerHTML = "";
    filtro.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nodo_name}</td>
      <td>${new Date(item.date_received).toLocaleString()}</td>
      <td><button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModalLong ">
                                            Ver
                                            </button></td>
      <td>
          <button type="button" class="btn btn-link">Eliminar</button>
      </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error al obtener datos de los eventos:", error);
  }
}
//DatosTabla();
