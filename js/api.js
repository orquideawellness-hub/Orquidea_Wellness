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

        console.log("BACKEND CHAT:", data);

        if (!data.ok || !data.data) {
            throw new Error(data.error || "Respuesta inválida del backend");
        }

        return data.data;
    },

    // =====================================================
    // 🧪 SIMULADOR CLÍNICO PRO (ANTES/DESPUÉS + SCORE)
    // =====================================================
    async ejecutarSimulador(tratamientos) {

        const response = await fetch(`${API_BASE}/api/ia/simulador`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tratamientos })
        });

        console.log("STATUS:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error HTTP en simulador");
        }

        const data = await response.json();

        console.log("BACKEND SIMULADOR:", data);

        if (!data.ok) {
            throw new Error(data.error || "Error en simulador");
        }

        // =====================================================
        // 🔁 NORMALIZACIÓN CLÍNICA COMPLETA
        // =====================================================
        return {
            // 🧠 IMÁGENES PRO
            imagenAntes: data.imagenAntes || null,
            imagenDespues: data.imagenDespues || data.imagen || null,

            // 📋 IA CLÍNICA
            resumen: data.resumen || "",
            recomendaciones: data.recomendaciones || [],

            // 🧬 MÉTRICAS PRO (NUEVAS DEL BACKEND)
            skinScore: data.skinScore ?? null,
            labels: data.labels || [],

            // 📊 METADATOS (fallback seguro)
            metadata: data.metadata || {
                model: "clinic-pro-v1",
                confidence: "media"
            }
        };
    }
};