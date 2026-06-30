const API = {

    async enviarMensajeOrquia(mensaje) {

        const response = await fetch("https://orquideawellness.onrender.com/api/ia/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje })
        });

        // Validar errores HTTP
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error HTTP en chat");
        }

        const data = await response.json();

        console.log("BACKEND RAW:", data);

        if (!data.ok || !data.data) {
            throw new Error(data.error || "Respuesta inválida del backend");
        }

        return data.data;
    },

    async ejecutarSimulador(tratamientos) {

        const response = await fetch("http://localhost:4000/api/ia/simulador", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tratamientos })
        });

        // 👇 Este sí es el log correcto
        console.log("STATUS:", response.status);

        // Validar errores HTTP
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error HTTP en simulador");
        }

        const data = await response.json();

        console.log("BACKEND SIMULADOR:", data);

        if (!data.ok) {
            throw new Error(data.error || "Error en simulador");
        }

        return {
            imagen: data.imagen,
            resumen: data.resumen,
            recomendaciones: data.recomendaciones || []
        };
    }

};