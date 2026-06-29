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