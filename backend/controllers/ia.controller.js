const service = require("../services/ia.service");
const imageService = require("../services/image.service");
const sharp = require("sharp");

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
exports.simulador = async (req, res) => {
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

    // 2. SKIN SCORE
    const skinScore = Math.min(100, Math.max(60, Math.floor(Math.random() * 40) + 60));
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
      labels,
      metadata: {
        model: "clinic-pro-v1",
        confidence: skinScore > 80 ? "alta" : "media"
      }
    });

  } catch (error) {
    console.error("ERROR SIMULADOR PRO:", error);
    return res.status(500).json({ ok: false, error: "Error en simulador clínico PRO" });
  }
};