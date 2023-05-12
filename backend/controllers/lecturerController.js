const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllLecturers = async (req, res) => {
  try {
    const lecturers = await prisma.lecturer.findMany();
    res.status(200).json(lecturers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLecturerById = async (req, res) => {
  const { id } = req.params;

  try {
    const lecturer = await prisma.lecturer.findUnique({
      where: { id: parseInt(id) },
    });

    if (!lecturer) {
      return res.status(404).json({ error: "Lecturer not found" });
    }

    res.status(200).json(lecturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLecturer = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newLecturer = await prisma.lecturer.create({
      data: { name, email },
    });

    res.status(201).json(newLecturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLecturer = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedLecturer = await prisma.lecturer.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });

    res.status(200).json(updatedLecturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLecturer = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.lecturer.delete({ where: { id: parseInt(id) } });
    res.status(204).json({ message: "Lecturer deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
