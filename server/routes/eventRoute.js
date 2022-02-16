const express = require("express");
const router = express.Router();

const { createEvent, updateEvent } = require("../controllers/EventController");

router.post("/", createEvent);
router.patch("/:id", updateEvent);

module.exports = router;
