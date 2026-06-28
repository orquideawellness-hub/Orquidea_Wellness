const axios = require("axios");
require("dotenv").config();

const servicios = require("../data/servicios");

exports.generarRespuesta = async (mensaje) => {

    try {

        const systemPrompt = `
Eres OrquIA, asistente virtual de bienestar.

Tu objetivo:
- ayudar en temas emocionales, físicos y de bienestar
- responder de forma clara, empática y profesional
- NO inventar diagnósticos médicos

Servicios disponibles:
${JSON.stringify(servicios)}

Si el usuario pregunta por tratamientos, recomienda opciones reales del listado.
    `;

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: mensaje }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const respuesta = response.data?.choices?.[0]?.message?.content;

        if (!respuesta) {
            return "Lo siento, no pude generar una respuesta en este momento.";
        }

        return respuesta;

    } catch (error) {
        console.error("🔥 ERROR COMPLETO OPENAI:");
        console.error(error.response?.data || error.message);

        return "Error al conectar con el servicio de IA.";
    }
};