const express = require("express");
const usersController = require("../../controllers/UsersController");
const authController = require("../../controllers/AuthentificationController");
const authMiddleware = require("../../middlewares/auth");
const CardController = require("../../controllers/CardController");

const router = express.Router();

// Routes pour les utilisateurs
router.get("/users", usersController.index);
router.post("/users", usersController.store);
router.get("/users/:id", usersController.show);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.destroy);

// Route de connexion
router.post("/login", authController.login);

// Route pour récupérer le profil de l'utilisateur
router.get(
  "/getMyProfile",
  authMiddleware.authenticate,
  usersController.getMyProfile,
);

// Routes pour les cartes
router.get("/cards/:id", CardController.getMyCards);
router.post("/cards", CardController.store);
router.get("/cards/:id", CardController.show);
router.put("/cards/:id", CardController.update);
router.delete("/cards/:id", CardController.destroy);

module.exports = router;
