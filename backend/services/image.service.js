require("dotenv").config();
const axios = require("axios");

// 🔥 MODELO (puedes cambiarlo luego)
const HF_MODEL = "black-forest-labs/FLUX.1-dev";

exports.generarImagen = async (tratamientos, resumen) => {
    try {

        const prompt = `
Professional dermatology skincare photography.

Patient treatments: ${tratamientos.join(", ")}.
Skin condition: ${resumen}.

Ultra realistic clinic portrait, soft lighting, high detail, 4k, natural skin texture, before and after aesthetic.
`;

        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${HF_MODEL}`,
            {
                inputs: prompt
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                responseType: "arraybuffer"
            }
        );

        console.log("STATUS HF:", response.status);

        const base64 = Buffer.from(response.data).toString("base64");

        return `data:image/png;base64,${base64}`;

    } catch (error) {
        console.error("❌ HUGGING FACE ERROR:", error.response?.data || error.message);

        return "https://placehold.co/600x800?text=Sin+IA";
    }
};