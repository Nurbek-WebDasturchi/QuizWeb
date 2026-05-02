const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadTest } = require("../controllers/testController");

// POST /api/tests/upload
router.post("/upload", upload.single("testFile"), uploadTest);

module.exports = router;
