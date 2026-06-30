const service = require("../services/ia.service");

exports.chat = async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje) {
      return res.status(400).json({ ok: false, error: "Mensaje vacío" });
    }

    const respuesta = await service.generarRespuesta(mensaje);

    res.json({
      ok: true,
      data: respuesta
    });

  } catch (error) {
    console.error("Error IA:", error);
    res.status(500).json({ ok: false, error: "Error en IA" });
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

    const respuestaIA = await service.generarSimulacion(tratamientos);

    console.log("RAW IA:", respuestaIA);

    // 🔴 EXTRAER JSON SIN ROMPERSE
    const inicio = respuestaIA.indexOf("{");
    const fin = respuestaIA.lastIndexOf("}");

    if (inicio === -1 || fin === -1) {
      return res.status(500).json({
        ok: false,
        error: "La IA no devolvió JSON válido"
      });
    }

    const jsonLimpio = respuestaIA.substring(inicio, fin + 1);

    let data;

    try {
      data = JSON.parse(jsonLimpio);
    } catch (e) {
      return res.status(500).json({
        ok: false,
        error: "Error parseando JSON de IA"
      });
    }

    // imagen simulada (esto está bien por ahora)
    const imagen = "https://placehold.co/600x800?text=" + encodeURIComponent(tratamientos.join("+"));

    return res.json({
      ok: true,
      imagen,
      resumen: data.resumen,
      recomendaciones: data.recomendaciones
    });

  } catch (error) {
    console.error("ERROR SIMULADOR:", error);

    return res.status(500).json({
      ok: false,
      error: "Error en simulador IA"
    });
  }
};