const prisma = require("../config/prisma");

class CardController {
  async getMyCards(req, res) {
    try {
      const cards = await prisma.card.findMany({
        where: {
          ownerId: req.params.id,
        },
      });
      return res.status(200).json(cards);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async store(req, res) {
    try {
      const card = await prisma.card.create({
        data: req.body,
      });
      return res.status(201).json(card);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async show(req, res) {
    const id = parseInt(req.params.id);
    try {
      const card = await prisma.card.findUnique({
        where: {
          id: id,
        },
      });
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }
      return res.status(200).json(card);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    try {
      const updatedCard = await prisma.card.update({
        where: { id: id },
        data: req.body,
      });
      return res.status(200).json(updatedCard);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async destroy(req, res) {
    const id = parseInt(req.params.id);
    try {
      await prisma.card.delete({
        where: { id: id },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CardController();
