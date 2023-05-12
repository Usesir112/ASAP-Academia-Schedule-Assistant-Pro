const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await prisma.subject.findUnique({
      where: { id: parseInt(id) },
    });

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSubject = async (req, res) => {
  const { code, name, unit, category, branch, descr } = req.body;
  const curID = parseInt(req.body.curID);
  const stuYear = parseInt(req.body.stuYear);

  try {
    const newSubject = await prisma.subject.create({
      data: {
        code,
        name,
        curID,
        unit,
        category,
        branch,
        stuYear,
        descr,
      },
    });

    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubject = async (req, res) => {
  const { id } = req.params;
  const { code, name, unit, category, branch, descr } = req.body;
  const curID = parseInt(req.body.curID);
  const stuYear = parseInt(req.body.stuYear);

  try {
    const updatedSubject = await prisma.subject.update({
      where: { id: parseInt(id) },
      data: {
        code,
        name,
        curID,
        unit,
        category,
        branch,
        stuYear,
        descr,
      },
    });

    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.subject.delete({ where: { id: parseInt(id) } });
    res.status(204).json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
