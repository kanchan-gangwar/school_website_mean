const express = require("express");
const router = express.Router();
const { createContact, getContacts, deleteContact } = require("../controllers/contact");
const authenticateJWt = require("../middleware/auth.middleware")
router.post("/", createContact);

router.get("/", authenticateJWt, getContacts)

router.delete("/:id",authenticateJWt, deleteContact)

module.exports = router;