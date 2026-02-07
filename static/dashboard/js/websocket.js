let ws;

function initWebSocket(token) {
    const apagar = document.getElementById("apagar");
    if (ws && ws.readyState === WebSocket.OPEN) return; // ya está conectado

    //ws = new WebSocket("wss://realtimepulsar.cosmosblastingtools.com/");
    ws=new WebSocket("wss://dashboard-web-pyv-13gs.onrender.com/ws")
    ws.onopen = () => {
        console.log("Conectado al servidor WebSocket");

        const authMessage = {
            type: "AUTH",
            token,
            nodeIds: [
                "7f6cb4b4-387d-4687-a543-ab8e1b328cde",
                "524dbea7-4bad-40e3-8d34-0adf92538429",
                "81924341-44c6-423a-a6fd-f671055b3bf3",
            ],
            clientType: "WEB",
            timestamp: Date.now(),
        };
        ws.send(JSON.stringify(authMessage));
    };
    ws.onerror = (err) => {
        console.log("ERROR WS:", err);
    };
    const btnIniciar = document.getElementById("iniciarNodo16");
    const btnDetener = document.getElementById("detenerNodo16");
    if (btnIniciar) {
        btnIniciar.addEventListener("click", () => {
            ws.send(
                JSON.stringify({
                    data: { cmd: "start", params: {} },
                    nodeId: "7f6cb4b4-387d-4687-a543-ab8e1b328cde",
                    type: "COMMAND",
                }),
            );
        });
    }

    if (btnDetener) {
        btnDetener.addEventListener("click", () => {
            ws.send(
                JSON.stringify({
                    data: { cmd: "stop", params: {} },
                    nodeId: "7f6cb4b4-387d-4687-a543-ab8e1b328cde",
                    type: "COMMAND",
                }),
            );
        });
    }

    ws.onmessage = (event) => {
        console.log("WebSocket message received:");
        console.log("Mensaje recibido:", event.data);
        let parsedData;
        try {
            parsedData = JSON.parse(event.data);
        } catch (error) {
            if (event.data.startsWith("WEB_NOTIFICATION:")) {
                const cleaned = event.data
                    .substring("WEB_NOTIFICATION:".length)
                    .replace(/\\"/g, '"');
                parsedData = JSON.parse(cleaned);
            } else {
                console.warn("Mensaje desconocido:", event.data);
                return;
            }
        }

        if (parsedData?.Data) {
            const nodeId = parsedData.NodeId;
            const map = {
                "7f6cb4b4-387d-4687-a543-ab8e1b328cde": "16",
                "524dbea7-4bad-40e3-8d34-0adf92538429": "17",
                "81924341-44c6-423a-a6fd-f671055b3bf3": "18",
            };

            const n = map[nodeId];
            const estado = parsedData.Data.ad7606.sampling_active;
            const sampling = document.getElementById(`estado${n}`);
            console.log("nodo: ", n);
            console.log(
                "estado de nodo: ",
                parsedData.Data.ad7606.sampling_active,
            );

            const timestampCell = document.getElementById(`timestamp${n}`);
            const statusCell = document.getElementById(`statusw${n}`);
            const signalCell = document.getElementById(`quality${n}`);

            if (timestampCell || statusCell || signalCell) {
                console.log("timestap");
                timestampCell.textContent = new Date(
                    parsedData.Timestamp * 1000,
                ).toLocaleString();

                statusCell.innerHTML = `<span class="badge bg-success">${parsedData.Status === 200 ? "Conectado" : parsedData.Status}</span>`;

                signalCell.textContent = parsedData.Data.modem.signal_quality;
            }

            if (sampling) {
                if (estado === false) sampling.textContent = "detenido";
                if (estado === true) sampling.textContent = "activo";
            }
        }
    };

    ws.onclose = () => {
        console.warn("Conexión WebSocket cerrada, reintentando...");
        setTimeout(() => initWebSocket(token), 3000);
    };
}
