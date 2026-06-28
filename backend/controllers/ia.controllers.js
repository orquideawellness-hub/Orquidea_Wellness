const iaService = require("../services/ia.service");

exports.simulador = (req, res) => {
  const { texto } = req.body;

  const respuesta = iaService.simulador(texto);

  res.json({
    ok: true,
    data: respuesta
  });
};

exports.orquia = (req, res) => {
  const { mensaje } = req.body;

  const respuesta = iaService.orquia(mensaje);

  res.json({
    ok: true,
    data: respuesta
  });
};