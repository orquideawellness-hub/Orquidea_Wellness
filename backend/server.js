const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const iaRoutes = require("./routes/ia.routes");
app.use("/api/ia", iaRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor Orquídea Wellness activo 🌿 en puerto", PORT);
});