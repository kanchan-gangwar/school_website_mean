const express = require("express");
const router = express.Router();
const { createTeacher, getTeachers, deleteTeacher, updateTeacher } = require("../controllers/teacher");
const authenticateJWt = require("../middleware/auth.middleware");
router.post("/",authenticateJWt, createTeacher);

router.get("/", getTeachers)

router.delete("/:id", authenticateJWt,deleteTeacher)

router.put("/:id", authenticateJWt,updateTeacher)

module.exports = router;