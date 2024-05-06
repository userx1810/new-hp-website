const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthentificationController = require("../controllers/AuthentificationController");
const AuthMiddleware = require("../middlewares/auth");
const mysql = require("mysql");

const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

router.get("/getMyProfile", AuthMiddleware.authenticate, (req, res) => {
  const userId = req.session.userId;
  const sql = `SELECT * FROM utilisateurs WHERE id = ${userId}`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête SQL :", err);
      return;
    }
    res.json(result[0]);
  });
});

module.exports = router;
