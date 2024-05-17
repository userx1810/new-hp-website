const express = require("express");
const usersController = require("../../controllers/UsersController");
const authController = require("../../controllers/AuthentificationController");
const authMiddleware = require("../../middlewares/auth");

const router = express.Router();

router.get("/users", usersController.index);
router.post("/users", usersController.store);
router.get("/users/:id", usersController.show);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.destroy);

router.post("/login", authController.login);

router.get(
  "/getMyProfile",
  authMiddleware.authenticate,
  usersController.getMyProfile,
);

module.exports = router;
