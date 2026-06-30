require("dotenv").config();

const HF_MODEL = "stabilityai/stable-diffusion-xl-base-1.0";

exports.generarImagen = async (tratamientos, resumen) => {
    try {

        const prompt = `
Professional dermatology skincare photography.

Patient treatments: ${tratamientos.join(", ")}.
Skin condition: ${resumen}.

Ultra realistic, clinic lighting, high detail, 4k, portrait.
`;

        const response = await fetch(
            `https://api-inference.huggingface.co/models/${HF_MODEL}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    inputs: prompt
                })
            }
        );

        console.log("STATUS HF:", response.status);

        if (!response.ok) {
            const err = await response.text();
            console.log("HF ERROR:", err);
            throw new Error(err);
        }

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");

        return `data:image/png;base64,${base64}`;

    } catch (error) {
        console.error("❌ HF IMAGE ERROR:", error.message);
        return "https://placehold.co/600x800?text=Sin+IA";
    }
};