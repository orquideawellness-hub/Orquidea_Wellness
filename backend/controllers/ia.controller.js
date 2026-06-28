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