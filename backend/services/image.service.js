require("dotenv").config();

const axios = require("axios");
const FormData = require("form-data");

exports.generarImagen = async (tratamientos, resumen) => {
    try {

        const tratamientosTexto = Array.isArray(tratamientos)
            ? tratamientos.join(", ")
            : String(tratamientos || "");

        const prompt = `
Fotografía dermatológica profesional ultra realista.

Paciente con tratamientos: ${tratamientosTexto}.

Condición:
${resumen}

Iluminación clínica estética.
Piel humana realista.
Antes y después skincare.
Alta calidad 4K.
`;

        // ==========================
        // FORM DATA
        // ==========================
        const form = new FormData();

        form.append("prompt", prompt);
        form.append("output_format", "png");

        console.log("API KEY:", process.env.STABILITY_API_KEY?.slice(0, 12));
        console.log("Prompt:", prompt);

        const response = await axios.post(
            "https://api.stability.ai/v2beta/stable-image/generate/core",
            form,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                    Accept: "image/*",
                    ...form.getHeaders()
                },

                responseType: "arraybuffer",

                validateStatus: () => true
            }
        );

        console.log("STATUS:", response.status);

        if (response.status !== 200) {

            console.log(
                "STABILITY ERROR:",
                Buffer.from(response.data).toString()
            );

            throw new Error("Error de Stability");
        }

        const base64 = Buffer
            .from(response.data)
            .toString("base64");

        console.log("✅ Imagen generada correctamente");

        return `data:image/png;base64,${base64}`;

    } catch (error) {

        console.error("❌ IMAGE SERVICE:", error.message);

        return "https://placehold.co/600x800?text=Sin+IA";
    }
};