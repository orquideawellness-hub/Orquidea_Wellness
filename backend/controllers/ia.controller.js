const service = require("../services/ia.service");

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

    if (!respuesta) {
      return res.status(500).json({
        ok: false,
        error: "Respuesta vacía de IA"
      });
    }

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
// 🧠 SIMULADOR IA (CORREGIDO Y ROBUSTO)
// =====================================================
exports.simulador = async (req, res) => {

  try {

    const { tratamientos } = req.body;

    if (!tratamientos?.length) {
      return res.status(400).json({
        ok: false,
        error: "Debe seleccionar al menos un tratamiento."
      });
    }

    // ===============================
    // 1. IA: análisis
    // ===============================
    const respuestaIA = await service.generarSimulacion(tratamientos);

    if (!respuestaIA) {
      return res.status(500).json({
        ok: false,
        error: "La IA no devolvió respuesta"
      });
    }

    // ===============================
    // 2. LIMPIEZA ROBUSTA
    // ===============================
    let jsonLimpio = respuestaIA
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // extraer solo JSON real
    const match = jsonLimpio.match(/\{[\s\S]*\}/);

    if (!match) {
      console.error("❌ IA inválida:", respuestaIA);

      return res.status(500).json({
        ok: false,
        error: "La IA no devolvió JSON válido"
      });
    }

    let data;

    try {
      data = JSON.parse(match[0]);
    } catch (err) {

      console.error("❌ Error parseando JSON:", respuestaIA);

      return res.status(500).json({
        ok: false,
        error: "Error interpretando respuesta IA"
      });
    }

    // ===============================
    // 3. IMAGEN (SIMULADA O FUTURA IA VISUAL)
    // ===============================
    const imagenGenerada = await service.generarImagenSimulada?.(
      tratamientos,
      data.resumen
    ) || "https://placehold.co/600x800?text=Resultado+IA";

    // ===============================
    // 4. RESPUESTA FINAL
    // ===============================
    return res.json({
      ok: true,
      imagen: imagenGenerada,
      recomendaciones: data.recomendaciones || [],
      resumen: data.resumen || ""
    });

  } catch (error) {

    console.error("Error Simulador:", error);

    return res.status(500).json({
      ok: false,
      error: "Error en simulador IA"
    });
  }
};