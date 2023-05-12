const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllSemesters = async (req, res) => {
  try {
    const semesters = await prisma.semester.findMany();
    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSemesterById = async (req, res) => {
  const { id } = req.params;

  try {
    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(id) },
    });

    if (!semester) {
      return res.status(404).json({ error: "Semester not found" });
    }

    res.status(200).json(semester);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSemester = async (req, res) => {
  const name = req.body.name;
  const year = parseInt(req.body.year);

  try {
    const newsemester = await prisma.semester.create({
      data: {
        name: name,
        year: year,
      },
    });

    res.status(201).json(newsemester);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSemester = async (req, res) => {
  const { id } = req.params;
  const name = req.body.name;
  const year = parseInt(req.body.year);

  try {
    const updatedsemester = await prisma.semester.update({
      where: { id: parseInt(id) },
      data: { name, year },
    });

    res.status(200).json(updatedsemester);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSemester = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.semester.delete({ where: { id: parseInt(id) } });
    res.status(204).json({ message: "Semester deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
