require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generarImagen = async (tratamientos, resumen, base64Image = null) => {
    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const prompt = `
Eres un editor de imágenes dermatológicas profesionales.

Tarea:
Mejorar la apariencia de la piel del paciente manteniendo exactamente la misma persona.

Tratamientos aplicados:
${tratamientos.join(", ")}

Condición:
${resumen}

Instrucciones:
- Mantén la identidad facial intacta
- Mejora textura de piel
- Reduce rojeces o imperfecciones
- Resultado tipo clínica estética profesional
`;

        // 🔴 SI NO HAY IMAGEN, FALLBACK
        if (!base64Image) {
            return "https://placehold.co/600x800?text=Sin+Imagen";
        }

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: "image/jpeg"
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        // Gemini devuelve instrucciones o descripción, no imagen directa
        // (esto lo ajustamos después con endpoint de imagen si lo activas)

        console.log("GEMINI RESPONSE:", text);

        return "https://placehold.co/600x800?text=Gemini+OK";

    } catch (error) {
        console.error("❌ GEMINI ERROR:", error.message);
        return "https://placehold.co/600x800?text=Error";
    }
};