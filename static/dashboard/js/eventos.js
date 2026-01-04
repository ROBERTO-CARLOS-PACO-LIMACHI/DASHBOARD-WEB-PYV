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
    const filtro = data.map(
      ({ _id, trigger, nodo_id, timestamp, direccion }) => ({
        _id,
        trigger,
        nodo_id,
        timestamp,
        direccion,
      }),
    );

    const tbody = document.querySelector("#tablaEventos tbody");
    tbody.innerHTML = "";
    filtro.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${item.trigger}</td>
      <td>${item.nodo_id}</td>
      <td>${new Date(item.timestamp).toLocaleString()}</td>
      <td>${item.direccion}</td>
      <td><button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModalLong ">
                                            Ver
                                            </button></td>
      <td>
          <button type="button" class="btn btn-link btn-eliminar-evento" data-id="${item._id}" data-trigger=${item.trigger}>Eliminar</button>
      </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error al obtener datos de los eventos:", error);
  }
}
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".btn-eliminar-evento");
  if (!btn) return;

  e.preventDefault();

  const id = btn.dataset.trigger;
  console.log("id del evento a eliminar: ", id);

  try {
    const response = await fetch(`/dashboard/deleteEvent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Evento eliminado correctamente");
      // Eliminar la fila directamente del DOM
      btn.closest("tr").remove();
    } else {
      console.log("Error al eliminar evento");
    }

    // Recargar o refrescar los datos de la tabla si lo necesitas
  } catch (err) {
    console.error("Error en la petición:", err);
  }
});

//DatosTabla();
