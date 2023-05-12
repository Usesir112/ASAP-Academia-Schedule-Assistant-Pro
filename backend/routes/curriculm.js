const express = require("express");
const router = express.Router();
const curriculumController = require("../controllers/curriculumController");

router.get("/", curriculumController.getAllCurriculum);
router.get("/:id", curriculumController.getCurriculumById);
router.post("/", curriculumController.createCurriculum);
router.put("/:id", curriculumController.updateCurriculum);
router.delete("/:id", curriculumController.deleteCurriculum);

module.exports = router;
