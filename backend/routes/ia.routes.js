const express = require("express");
const router = express.Router();
const controller = require("../controllers/ia.controller");
// ✔ PRUEBA GET (para verificar en navegador)
router.get("/chat", (req, res) => {
  res.json({ ok: true, message: "Endpoint chat activo (GET test)" });
});
router.post("/chat", controller.chat);

module.exports = router;