require("dotenv").config();

exports.generarImagen = async (tratamientos, resumen) => {

    try {

        const prompt = `
dermatology clinical photography, realistic human portrait,
neutral adult patient, professional clinic lighting,
skin analysis aesthetic, ultra realistic 4k,

condition: ${resumen},
treatments: ${Array.isArray(tratamientos) ? tratamientos.join(", ") : tratamientos}
`;

        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
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

        console.log("STATUS IMAGE:", response.status);

        if (!response.ok) {
            const err = await response.text();
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