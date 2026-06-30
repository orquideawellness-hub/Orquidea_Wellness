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

    if (!tratamientos || tratamientos.length === 0) {
      return res.status(400).json({
        ok: false,
        error: "Debe seleccionar al menos un tratamiento."
      });
    }

    // Por ahora solo devolvemos datos de prueba
    res.json({
      ok: true,
      imagen: "https://placehold.co/600x800?text=Resultado+IA",
      recomendaciones: [
        "Dormir entre 7 y 8 horas.",
        "Beber al menos 2 litros de agua al día.",
        "Usar protector solar diariamente.",
        "Mantener una alimentación equilibrada."
      ]
    });

  } catch (error) {

    console.error("Error Simulador:", error);

    res.status(500).json({
      ok: false,
      error: "Error en simulador IA."
    });

  }

};