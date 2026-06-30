require("dotenv").config();
const OpenAI = require("openai");

const servicios = require("../data/servicios");

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

exports.generarRespuesta = async (mensaje) => {
    try {
        const completion = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            temperature: 0.8,
            max_tokens: 500,
            messages: [
                {
                    role: "system",
                    content: `
Eres OrquIA, un asistente virtual especializado en bienestar físico, emocional y hábitos saludables.

PERSONALIDAD:
- Eres cálida, empática y profesional
- Hablas de forma natural, como un coach humano
- Evitas respuestas cortas y demasiado extensas, redundantes o robóticas
- Ser muy afectuosa

REGLAS:
- Nunca inventes diagnósticos médicos
- Si no tienes certeza, lo indicas claramente
- Explicas paso a paso cuando sea necesario
- Das consejos prácticos y aplicables
- Todos los precios son en soles peruanos
- Mensajes ordenados respetando las reglas de puntuacion

OBJETIVO:
Ayudar al usuario a mejorar su bienestar emocional y físico con orientación clara y útil.

SERVICIOS DISPONIBLES:
${JSON.stringify(servicios)}
`,
                },
                { role: "user", content: mensaje },
            ],
        });

        return completion.choices[0].message.content;

    } catch (error) {
        console.log("OPENROUTER ERROR:", error);
        return "Error al conectar con IA.";
    }
};
// =====================================================
// 🧠 SIMULADOR IA (CORREGIDO)
// =====================================================
exports.generarSimulacion = async (tratamientos) => {

    try {

        // 🔧 FIX 1: normalización segura
        const tratamientosTexto = Array.isArray(tratamientos)
            ? tratamientos.join(", ")
            : String(tratamientos || "");

        const prompt = `
Eres una IA experta en estética, cosmetología y bienestar.

El usuario seleccionó estos tratamientos:
${tratamientosTexto}

Responde únicamente con un objeto JSON válido.
No incluyas texto adicional bajo ninguna circunstancia.
La respuesta debe empezar con { y terminar con }.

Formato obligatorio:

{
  "resumen": "explicación breve del estado de la piel o cuerpo según tratamientos",
  "recomendaciones": [
    "consejo personalizado 1",
    "consejo personalizado 2",
    "consejo personalizado 3",
    "consejo personalizado 4"
  ]
}

REGLAS IMPORTANTES:
- Responde SOLO en JSON válido
- No uses markdown
- No uses backticks
- No agregues texto antes o después del JSON
`;

        const completion = await client.chat.completions.create({
            model: "openai/gpt-4o-mini",
            temperature: 0.6, // estabilidad para JSON
            max_tokens: 500,
            messages: [
                {
                    role: "system",
                    content: `
Eres una IA especializada en estética.
Tu única salida válida es un JSON estricto.
Está prohibido cualquier texto fuera del JSON.
                    `.trim()
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
        });

        // 🔧 FIX 2: limpieza defensiva
        let response = completion.choices[0].message.content?.trim();

        if (!response) {
            throw new Error("Respuesta vacía de la IA");
        }

        response = response
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        return response;

    } catch (error) {

        console.log("OPENROUTER SIMULADOR ERROR:", error);

        return JSON.stringify({
            resumen: "Error generando simulación",
            recomendaciones: []
        });
    }
};