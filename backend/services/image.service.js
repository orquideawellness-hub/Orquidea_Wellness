require("dotenv").config();
const FormData = require("form-data");

exports.generarImagen = async (tratamientos, resumen) => {
    try {

        const tratamientosTexto = Array.isArray(tratamientos)
            ? tratamientos.join(", ")
            : String(tratamientos || "");

        const prompt = `
Fotografía dermatológica profesional ultra realista.
Paciente con: ${tratamientosTexto}.
Condición: ${resumen}.
Iluminación clínica estética, piel realista, estilo before/after skincare.
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

        const raw = await response.arrayBuffer();

        if (!response.ok) {
            const errorText = Buffer.from(raw).toString();
            console.log("STABILITY ERROR:", errorText);
            throw new Error(errorText);
        }

        const base64 = Buffer.from(raw).toString("base64");

        return `data:image/png;base64,${base64}`;

    } catch (error) {
        console.error("❌ IMAGE ERROR:", error.message);
        return "https://placehold.co/600x800?text=Sin+IA";
    }
};