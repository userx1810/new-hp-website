const prisma = require("../config/prisma");
const { hashPassword } = require("../utils/bcrypt");

class UsersController {
  async getMyProfile(req, res) {
    try {
      const user = req.user;
      return res.status(200).send(user);
    } catch (error) {
      console.error("Error in getMyProfile:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async index(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).send(users);
    } catch (error) {
      console.error("Error in index:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return res.status(201).send(user);
    } catch (error) {
      console.error("Error in store:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send(user);
    } catch (error) {
      console.error("Error in show:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { name, email } = req.body;

      let user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      user = await prisma.user.update({
        where: { id },
        data: { name, email },
      });

      return res.status(200).send(user);
    } catch (error) {
      console.error("Error in update:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const id = parseInt(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      await prisma.user.delete({
        where: { id },
      });
      return res.status(204).send();
    } catch (error) {
      console.error("Error in destroy:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}

module.exports = new UsersController();
