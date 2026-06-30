const API_BASE =
    location.hostname === "localhost"
        ? "http://localhost:4000"
        : "https://orquideawellness.onrender.com";

// =====================================================
// 🧠 API CENTRAL
// =====================================================
const API = {

    // =====================================================
    // 💬 CHAT IA
    // =====================================================
    async enviarMensajeOrquia(mensaje) {
        const response = await fetch(`${API_BASE}/api/ia/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error HTTP en chat");
        }

        const data = await response.json();
        if (!data.ok || !data.data) {
            throw new Error(data.error || "Respuesta inválida del backend");
        }

        return data.data;
    },

    // =====================================================
    // 🧪 SIMULADOR CLÍNICO PRO (MODIFICADO PARA FormData)
    // =====================================================
    async ejecutarSimulador(formData) {
        // Al enviar FormData, NO se debe definir el Content-Type, 
        // el navegador lo calcula automáticamente con el boundary correcto.
        const response = await fetch(`${API_BASE}/api/ia/simulador-img`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error HTTP en simulador");
        }

        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.error || "Error en simulador");
        }

        return {
            imagenAntes: data.imagenAntes || null,
            imagenDespues: data.imagenDespues || data.imagen || null,
            resumen: data.resumen || "",
            recomendaciones: data.recomendaciones || [],
            skinScore: data.skinScore ?? null,
            labels: data.labels || [],
            metadata: data.metadata || {
                model: "clinic-pro-v1",
                confidence: "media"
            }
        };
    }
};