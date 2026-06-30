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

    res.json({
      ok: true,
      data: respuesta
    });

  } catch (error) {

    console.error("Error IA:", error);

    res.status(500).json({
      ok: false,
      error: "Error en IA"
    });
  }
};

exports.simulador = async (req, res) => {

  try {

    const { tratamientos } = req.body;

    if (!tratamientos?.length) {
      return res.status(400).json({
        ok: false,
        error: "Debe seleccionar al menos un tratamiento."
      });
    }

    // 1. IA análisis
    const respuestaIA = await service.generarSimulacion(tratamientos);

    const jsonLimpio = respuestaIA
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(jsonLimpio);

    // 2. 🔴 AQUÍ FALTA TU PIEZA CLAVE (IMAGEN IA)
    // esto NO lo tienes aún implementado
    const imagenGenerada = await service.generarImagenSimulada(tratamientos, data.resumen);

    return res.json({
      ok: true,
      imagen: imagenGenerada,
      recomendaciones: data.recomendaciones
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      error: "Error en simulador IA"
    });
  }
};