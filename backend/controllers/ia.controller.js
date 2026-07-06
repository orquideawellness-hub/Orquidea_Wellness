const service = require("../services/ia.service");
const imageService = require("../services/image.service");
const sharp = require("sharp");
const axios = require("axios");
const FormData = require("form-data");

// =====================================================
// CHAT IA
// =====================================================
exports.chat = async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje) {
      return res.status(400).json({
        ok: false,
        error: "Mensaje vacío"
      });
    }

    const respuesta = await service.generarRespuesta(mensaje);

    return res.json({
      ok: true,
      data: respuesta
    });

  } catch (error) {
    console.error("Error IA:", error);
    return res.status(500).json({
      ok: false,
      error: "Error en IA"
    });
  }
};

// =====================================================
// SIMULADOR CLÍNICO PRO
// =====================================================
/*exports.simulador = async (req, res) => {
  try {
    // Parseo de tratamientos (maneja tanto JSON directo como FormData)
    const tratamientos = typeof req.body.tratamientos === 'string'
      ? JSON.parse(req.body.tratamientos)
      : req.body.tratamientos;

    const file = req.file || null;

    if (!tratamientos?.length) {
      return res.status(400).json({
        ok: false,
        error: "Debe seleccionar al menos un tratamiento."
      });
    }

    // 1. IA (DIAGNÓSTICO)
    const respuestaIA = await service.generarSimulacion(tratamientos);
    console.log("RAW IA:", respuestaIA);

    // 🔒 PARSEO SEGURO
    let data;
    try {
      const inicio = respuestaIA.indexOf("{");
      const fin = respuestaIA.lastIndexOf("}");
      if (inicio === -1 || fin === -1) throw new Error("IA no devolvió JSON válido");
      data = JSON.parse(respuestaIA.substring(inicio, fin + 1));
    } catch (err) {
      console.error("❌ Error parse IA:", err);
      return res.status(500).json({ ok: false, error: "Error procesando respuesta de IA" });
    }

    // 2. SKIN SCORE Y CONDICIÓN CLÍNICA
    // Lógica corregida: 
    // - Edad < 30: Score > 80, Valoración "Muy alta"
    // - Edad 30-39: Score 60-80, Valoración "Alta/Media"
    // - Edad >= 40: Score < 60, Valoración "Baja/Muy baja"

    const edadAparente = Math.floor(Math.random() * 20) + 20; // Rango 20-40 años para este ejemplo
    let skinScore;
    let condicionTexto;
    let valoracion;

    if (edadAparente < 30) {
      skinScore = 95 - (edadAparente - 20); // 86 a 95
      condicionTexto = "Piel radiante y luminosa";
      valoracion = "Muy alta";
    } else if (edadAparente < 40) {
      skinScore = 70 - ((edadAparente - 30) * 1); // 61 a 70
      condicionTexto = "Piel con textura equilibrada";
      valoracion = "Alta";
    } else {
      skinScore = 60 - ((edadAparente - 40) * 2);
      condicionTexto = "Envejecimiento moderado";
      valoracion = "Media";
    }

    // Asegurar que no baje de un mínimo lógico si es joven
    skinScore = Math.max(10, Math.min(100, skinScore));

    const map = { "Acné": "acné", "Rosácea": "rosácea", "Pigmentación": "manchas", "Antiage": "envejecimiento" };
    const labels = tratamientos.map(t => map[t]).filter(Boolean);

    // 3. IMAGEN (ANTES / DESPUÉS)
    let imagenAntes = null;
    let imagenDespues = null;

    try {
      if (file) {
        imagenAntes = `data:image/jpeg;base64,${file.buffer.toString("base64")}`;
        const processed = await sharp(file.buffer)
          .resize(900, 900, { fit: "cover" })
          .modulate({ brightness: 1.08, saturation: 1.1, hue: 1 })
          .normalise()
          .median(2)
          .sharpen(0.6)
          .blur(0.3)
          .jpeg({ quality: 90 })
          .toBuffer();
        imagenDespues = `data:image/jpeg;base64,${processed.toString("base64")}`;
      }
    } catch (imgError) {
      console.error("❌ IMAGE ERROR:", imgError);
      imagenDespues = "https://placehold.co/600x800?text=Sin+IA";
    }

    // 4. RESPUESTA FINAL
    return res.json({
      ok: true,
      imagenAntes,
      imagenDespues,
      resumen: data.resumen,
      recomendaciones: data.recomendaciones || [],
      skinScore,
      condicion: condicionTexto,
      valoracion: valoracion, // <--- ESTO ES LO QUE FALTA
      labels,
      metadata: {
        model: "clinic-pro-v1",
        edadAparente: edadAparente,
        confidence: skinScore > 60 ? "alta" : "media"
      }
    });

  } catch (error) {
    console.error("ERROR SIMULADOR PRO:", error);
    return res.status(500).json({ ok: false, error: "Error en simulador clínico PRO" });
  }
};
*/
exports.simulador = async (req, res) => {
  try {
    const tratamientos = typeof req.body.tratamientos === 'string'
      ? JSON.parse(req.body.tratamientos)
      : req.body.tratamientos;
    const file = req.file;

    if (!file) return res.status(400).json({ ok: false, error: "No se subió imagen" });

    // 1. Preparamos el FormData para enviarlo a Python
    const form = new FormData();
    form.append('foto', file.buffer, { filename: 'paciente.jpg' });
    form.append('tratamiento', JSON.stringify(tratamientos));

    // 2. Enviamos la foto al servidor de Python (IA Real)
    const responseIA = await axios.post('https://orquidea-wellness-ia-py.onrender.com/procesar-simulacion', form, {
      headers: form.getHeaders()
    });

    // 3. Recibimos la respuesta de la IA
    const dataIA = responseIA.data;

    // 4. Respondemos a tu frontend con la imagen procesada por la IA
    return res.json({
      ok: true,
      imagenAntes: `data:image/jpeg;base64,${file.buffer.toString("base64")}`,
      imagenDespues: dataIA.imagen_url,
      skinScore: dataIA.skinScore, // Viene de Python
      condicion: dataIA.condicion, // Viene de Python
      valoracion: dataIA.valoracion,   
      edadAparente: dataIA.edadAparente,
      recomendaciones: dataIA.recomendaciones // Vienen de Python
    });

  } catch (error) {
    console.error("❌ ERROR EN EL PUENTE IA:", error.message);
    return res.status(500).json({ ok: false, error: "Error de comunicación con el motor de IA" });
  }
};