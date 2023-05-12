const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await prisma.schedule.findMany();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getScheduleById = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: parseInt(id) },
    });
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSchedule = async (req, res) => {
  const subjectId = parseInt(req.body.subjectId);
  const lecturerId = parseInt(req.body.lecturerId);
  const semesterId = parseInt(req.body.semesterId);
  const roomId = parseInt(req.body.roomId);

  const { dayOfWeek, startTime, endTime, section, type } = req.body;

  try {
    const newSchedule = await prisma.schedule.create({
      data: {
        subjectId,
        lecturerId,
        semesterId,
        roomId,
        dayOfWeek,
        startTime,
        endTime,
        section,
        type,
      },
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSchedule = async (req, res) => {
  const { id } = req.params;
  const subjectId = parseInt(req.body.subjectId);
  const lecturerId = parseInt(req.body.lecturerId);
  const semesterId = parseInt(req.body.semesterId);
  const roomId = parseInt(req.body.roomId);

  const { dayOfWeek, startTime, endTime, section, type } = req.body;

  try {
    const updateSchedule = await prisma.schedule.update({
      where: { id: parseInt(id) },
      data: {
        subjectId,
        lecturerId,
        semesterId,
        roomId,
        dayOfWeek,
        startTime,
        endTime,
        section,
        type,
      },
    });

    res.status(200).json(updateSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.schedule.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json({ message: "Schedule deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
