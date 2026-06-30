const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const controller = require("../controllers/ia.controller");


// =====================================================
// ✔ TEST ROUTE
// =====================================================
router.get("/chat", (req, res) => {
  res.json({
    ok: true,
    message: "Endpoint chat activo (GET test)"
  });
});


// =====================================================
// ✔ CHAT IA (texto puro)
// =====================================================
router.post("/chat", controller.chat);


// =====================================================
// ✔ SIMULADOR BASE (SIN IMAGEN)
// =====================================================
router.post("/simulador", controller.simulador);


// =====================================================
// ✔ SIMULADOR PRO (CON IMAGEN + MULTER)
// =====================================================
// 🔥 usa el MISMO controller pero ahora recibe req.file
router.post(
  "/simulador-img",
  upload.single("foto"),
  controller.simulador
);

module.exports = router;