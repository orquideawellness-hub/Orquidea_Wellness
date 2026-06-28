require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const iaRoutes = require("./routes/ia.routes");
app.use("/api/ia", iaRoutes);

// 👉 SERVIR FRONTEND (HTML fuera del backend)
app.use(express.static(path.join(__dirname, "../")));

// PORT
const PORT = 4000;

app.listen(PORT, () => {
  console.log("Servidor Orquídea Wellness activo 🌿 en puerto", PORT);
});