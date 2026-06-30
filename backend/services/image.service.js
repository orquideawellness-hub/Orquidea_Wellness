require("dotenv").config();

const axios = require("axios");
const FormData = require("form-data");

exports.generarImagen = async (tratamientos, resumen) => {
    try {

        const tratamientosTexto = Array.isArray(tratamientos)
    ? tratamientos.join(", ")
    : String(tratamientos || "");

let prompt = "";

if (tratamientosTexto.includes("Antiage")) {

    prompt = `
Luxury beauty clinic.

Beautiful adult woman.

Younger-looking healthy skin.

Professional anti-aging facial.

Elegant spa.

Natural beauty.

Ultra realistic photography.

Soft lighting.

4K.
`;

} else if (tratamientosTexto.includes("Antiacné")) {

    prompt = `
Luxury beauty clinic.

Beautiful adult woman.

Clear healthy skin.

Professional facial cleansing.

Fresh natural beauty.

Ultra realistic photography.

Soft lighting.

4K.
`;

} else if (tratamientosTexto.includes("Pigmentación")) {

    prompt = `
Luxury beauty clinic.

Beautiful adult woman.

Even glowing skin tone.

Professional facial treatment.

Natural beauty.

Ultra realistic photography.

Soft lighting.

4K.
`;

} else if (tratamientosTexto.includes("Hydrafacial")) {

    prompt = `
Luxury beauty clinic.

Professional hydrafacial.

Hydrated glowing skin.

Beautiful adult woman.

Spa atmosphere.

Ultra realistic photography.

Soft lighting.

4K.
`;

} else if (tratamientosTexto.includes("Rosácea")) {

    prompt = `
Luxury beauty clinic.

Beautiful adult woman.

Healthy calm glowing skin.

Professional facial skincare.

Elegant spa.

Natural beauty.

Ultra realistic photography.

Soft lighting.

4K.
`;

} else {

    prompt = `
Luxury beauty clinic.

Beautiful adult woman.

Healthy glowing skin.

Professional skincare.

Elegant spa.

Ultra realistic photography.

Soft lighting.

4K.
`;

}

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