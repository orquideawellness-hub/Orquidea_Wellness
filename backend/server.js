require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Configuración necesaria para trabajar detrás del proxy de Render
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// ROUTES
const iaRoutes = require("./routes/ia.routes");
app.use("/api/ia", iaRoutes);

// 👉 SERVIR FRONTEND (Archivos HTML/CSS/JS fuera de la carpeta backend)
app.use(express.static(path.join(__dirname, "../")));

// RUTA COMODÍN (SPA)
// Asegura que si el usuario navega a una URL interna del frontend, 
// el servidor siempre entregue el index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// PORT
// Render inyecta automáticamente la variable de entorno PORT. 
// Si no, el servidor usará el puerto 4000 localmente.
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Servidor Orquídea Wellness activo 🌿 en puerto", PORT);
});