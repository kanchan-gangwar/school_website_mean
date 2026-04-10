const express = require("express");
const router = express.Router();
const { createEvent, getEvents, deleteEvent, updateEvent } = require("../controllers/event");
const authenticateJWt = require("../middleware/auth.middleware");
router.post("/",authenticateJWt, createEvent);

router.get("/", getEvents)

router.delete("/:id",authenticateJWt, deleteEvent)

router.put("/:id",authenticateJWt, updateEvent)

module.exports = router;