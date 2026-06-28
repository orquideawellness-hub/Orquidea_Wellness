const axios = require("axios");

const servicios = require("../data/servicios"); // opcional pero útil

exports.generarRespuesta = async (mensaje) => {

  const systemPrompt = `
Eres OrquIA, asistente virtual de bienestar.

Tu objetivo:
- ayudar en temas emocionales, físicos y de bienestar
- responder de forma empática, clara y profesional
- no inventar diagnósticos médicos

Servicios disponibles:
${JSON.stringify(servicios)}

Si el usuario pregunta por tratamientos, sugiere los servicios disponibles.
  `;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: mensaje }
      ]
    },
    {
      headers: {
        Authorization: `Bearer TU_API_KEY`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
};