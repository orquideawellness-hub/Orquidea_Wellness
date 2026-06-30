require("dotenv").config();
const axios = require("axios");

const HF_MODEL = "stabilityai/stable-diffusion-xl-base-1.0";

exports.generarImagen = async (tratamientos, resumen) => {
    try {

        const prompt = `
Professional dermatology skincare photography.

Patient treatments: ${tratamientos.join(", ")}.
Condition: ${resumen}.

ultra realistic, clinic lighting, high detail, 4k portrait
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
                responseType: "arraybuffer",
                timeout: 60000
            }
        );

        console.log("STATUS HF:", response.status);

        const base64 = Buffer.from(response.data).toString("base64");

        return `data:image/png;base64,${base64}`;

    } catch (error) {
        console.error("❌ HF IMAGE ERROR:");
        console.error(error.code || error.message);

        return "https://placehold.co/600x800?text=Sin+IA";
    }
};