const express = require("express");
const router = express.Router();

const iaController = require("../controllers/ia.controller");

router.post("/simulador", iaController.simulador);
router.post("/orquia", iaController.orquia);

module.exports = router;