const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllCurriculum = async (req, res) => {
  try {
    const curriculum = await prisma.curriculum.findMany();
    res.status(200).json(curriculum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurriculumById = async (req, res) => {
  const { id } = req.params;

  try {
    const curriculum = await prisma.curriculum.findUnique({
      where: { id: parseInt(id) },
    });

    if (!curriculum) {
      return res.status(404).json({ error: "Curriculum not found" });
    }

    res.status(200).json(curriculum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCurriculum = async (req, res) => {
  const { code, name, calYear, descr } = req.body;

  try {
    const newCurriculum = await prisma.curriculum.create({
      data: { code, name, calYear: parseInt(calYear), descr },
    });

    res.status(201).json(newCurriculum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCurriculum = async (req, res) => {
  const { id } = req.params;
  const { code, name, calYear, descr } = req.body;

  try {
    const updateCurriculum = await prisma.curriculum.update({
      where: { id: parseInt(id) },
      data: { code, name, calYear: parseInt(calYear), descr },
    });
    res.status(200).json(updateCurriculum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCurriculum = async (req, res) => {
  const id = parseInt(req.params.id);

  // Check if the curriculum has any related subjects
  const subjects = await prisma.subject.findMany({
    where: {
      curID: id,
    },
  });

  if (subjects.length > 0) {
    // Send an error message if there are related subjects
    return res
      .status(400)
      .send("Cannot delete curriculum with related subjects");
  }

  try {
    const curriculum = await prisma.curriculum.findUnique({
      where: {
        id: id,
      },
    });

    if (!curriculum) {
      res.status(404).json({ message: "Curriculum not found" });
    } else {
      await prisma.curriculum.delete({
        where: {
          id: id,
        },
      });
      res
        .status(200)
        .json({ message: `Curriculum ${id} deleted successfully` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

