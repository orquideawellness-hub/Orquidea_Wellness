require("dotenv").config();
const FormData = require("form-data"); // 🔴 FALTABA ESTO

exports.generarImagen = async (tratamientos, resumen) => {
    try {

        const tratamientosTexto = Array.isArray(tratamientos)
            ? tratamientos.join(", ")
            : String(tratamientos || "");

        const prompt = `
Fotografía dermatológica profesional ultra realista.

Paciente con tratamientos: ${tratamientosTexto}.
Condición: ${resumen}.

Estilo:
- iluminación suave de clínica estética
- piel humana realista
- antes y después skincare
- ultra detallado 4K
`;

        const form = new FormData();
        form.append("prompt", prompt);
        form.append("output_format", "png");

        const response = await fetch(
            "https://api.stability.ai/v2beta/stable-image/generate/core",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
                    "Accept": "image/*"
                },
                body: form
            }
        );

        console.log("STATUS:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.log("ERROR RAW:", errorText);
            throw new Error(`Stability error: ${errorText}`);
        }

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");

        return `data:image/png;base64,${base64}`;

    } catch (error) {
        console.error("❌ ERROR IMAGE SERVICE:", error.message);

        return `https://placehold.co/600x800?text=Sin+IA`;
    }
};