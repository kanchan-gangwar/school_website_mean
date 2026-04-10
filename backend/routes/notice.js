const express = require("express");
const router = express.Router();
const { createNotice, getNotices, deleteNotice, updateNotice } = require("../controllers/notice");
const authenticateJWt = require("../middleware/auth.middleware");
router.post("/", authenticateJWt, createNotice);

router.get("/", getNotices)

router.delete("/:id", authenticateJWt, deleteNotice)

router.put("/:id", authenticateJWt, updateNotice)

module.exports = router;