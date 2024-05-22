const express = require("express");
const bodyParser = require("body-parser");
const prisma = require("../config/prisma"); // Assurez-vous d'avoir configuré Prisma correctement
const CardController = require("../controllers/CardController");
const app = express();

app.use(bodyParser.json());

// Routes pour les utilisateurs (existant dans votre code)
app.use("/api", require("./routes/userRoutes"));

// Route pour enregistrer la carte dans la base de données
app.post("/save-card", CardController.store);

// Port sur lequel le serveur écoutera les requêtes
const port = 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
