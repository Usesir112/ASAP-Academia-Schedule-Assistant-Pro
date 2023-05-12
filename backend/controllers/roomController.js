const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await prisma.room.findUnique({ where: { id: parseInt(id) } });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRoom = async (req, res) => {
  const { name, type } = req.body;
  const amount = parseInt(req.body.amount);

  try {
    const newRoom = await prisma.room.create({
      data: { name, amount, type },
    });

    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;
  const amount = parseInt(req.body.amount);

  try {
    const updatedRoom = await prisma.room.update({
      where: { id: parseInt(id) },
      data: { name, amount, type },
    });

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.room.delete({ where: { id: parseInt(id) } });
    res.status(204).json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
