const express = require("express");
const router = express.Router();
const { createGallery, getGallerys, deleteGallery, updateGallery } = require("../controllers/gallery");
const authenticateJWt = require("../middleware/auth.middleware");
router.post("/",authenticateJWt, createGallery);

router.get("/", getGallerys)

router.delete("/:id", authenticateJWt, deleteGallery)

router.put("/:id",authenticateJWt, updateGallery)

module.exports = router;