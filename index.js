// index.js

const express = require("express");
const routes = require("./config/routes/start");
const cors = require("cors");
const app = express();
const ip = require("ip");
const ipAdress = ip.address();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
let lastHouseVisited = "Gryffindor";
// Connexion à la base de données
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

// Enregistrer les données de la carte de l'utilisateur
app.post("/save-card", (req, res) => {
  const cardData = req.body;
  const query = "INSERT INTO user_cards SET ?";
  connection.query(query, cardData, (error, results) => {
    if (error) {
      console.error("Erreur lors de l'enregistrement de la carte :", error);
      res.status(500).send("Erreur lors de l'enregistrement de la carte");
    } else {
      console.log("Carte enregistrée avec succès :", results);
      res.status(200).send("Carte enregistrée avec succès");
    }
  });
});
app.get("/", (req, res) => {
  res.json({ lastHouseVisited: lastHouseVisited });
});
app.post("/", (req, res) => {
  lastHouseVisited = req.body.house;
  res.json({ lastHouseVisited: lastHouseVisited });
});

// Récupérer les données des cartes de l'utilisateur
app.get("/user-cards/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM user_cards WHERE user_id = ?";
  connection.query(query, userId, (error, results) => {
    if (error) {
      console.error(
        "Erreur lors de la récupération des cartes de l'utilisateur :",
        error,
      );
      res
        .status(500)
        .send("Erreur lors de la récupération des cartes de l'utilisateur");
    } else {
      console.log("Cartes de l'utilisateur récupérées avec succès :", results);
      res.status(200).json(results);
    }
  });
});

try {
  app.listen(port, () => {
    console.log(`Example app listening on port http://${ipAdress}:${port}`);
  });
} catch (error) {
  console.error(`Failed to start server: ${error}`);
  process.exit(1);
}
