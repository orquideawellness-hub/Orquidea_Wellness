const service = require("../services/ia.service");

exports.chat = async (req, res) => {

  try {
    const { mensaje } = req.body;

    const respuesta = await service.generarRespuesta(mensaje);

    res.json({
      ok: true,
      data: respuesta
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Error en IA"
    });
  }
};