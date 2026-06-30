require("dotenv").config();

/**
 * 🧠 Generación de imagen con IA (Stable Diffusion API)
 * - Basado en tratamientos + resumen IA
 * - Con fallback seguro si falla la API
 */

exports.generarImagen = async (tratamientos, resumen) => {
    try {

        // ===============================
        // 1. NORMALIZAR INPUT
        // ===============================
        const tratamientosTexto = Array.isArray(tratamientos)
            ? tratamientos.join(", ")
            : String(tratamientos || "");

        // ===============================
        // 2. PROMPT OPTIMIZADO IA IMAGEN
        // ===============================
        const prompt = `
Fotografía dermatológica profesional ultra realista.

Paciente con tratamientos: ${tratamientosTexto}.
Condición: ${resumen}.

Estilo:
- iluminación suave de clínica estética
- piel humana realista
- enfoque en mejora facial
- calidad 4K
- estilo "before and after skincare"
`;

        // ===============================
        // 3. LLAMADA A STABILITY AI
        // ===============================
        const response = await fetch(
            "https://api.stability.ai/v2beta/stable-image/generate/core",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt,
                    output_format: "png"
                })
            }
        );

        const data = await response.json();

        console.log("🧠 STABILITY RAW RESPONSE:", data);

        // ===============================
        // 4. EXTRACCIÓN ROBUSTA DE IMAGEN
        // ===============================
        const imageBase64 =
            data?.image ||
            data?.artifacts?.[0]?.base64 ||
            data?.output?.[0]?.base64 ||
            null;

        if (!imageBase64) {
            throw new Error("No image returned from Stability API");
        }

        // ===============================
        // 5. FORMATO FINAL
        // ===============================
        return `data:image/png;base64,${imageBase64}`;

    } catch (error) {

        console.error("❌ ERROR IMAGE SERVICE:", error.message);

        // ===============================
        // 6. FALLBACK SEGURO
        // ===============================
        return `https://placehold.co/600x800?text=Sin+IA`;
    }
};