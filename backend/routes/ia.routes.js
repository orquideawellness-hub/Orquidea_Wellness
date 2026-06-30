const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const controller = require("../controllers/ia.controller");

// ✔ TEST
router.get("/chat", (req, res) => {
  res.json({ ok: true, message: "Endpoint chat activo (GET test)" });
});

// ✔ CHAT IA
router.post("/chat", controller.chat);

// ✔ SIMULADOR (SOLO TEXTO - mantiene compatibilidad)
router.post("/simulador", controller.simulador);

// ✔ SIMULADOR PRO (CON IMAGEN)
router.post(
  "/simulador-img",
  upload.single("foto"),
  controller.simulador
);

module.exports = router;