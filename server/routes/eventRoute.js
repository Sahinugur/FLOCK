const express = require("express");
const router = express.Router();

const {
  getEvents,
  createEvent,
  updatedEvent,
} = require("../controllers/EventController");

router.get("/", getEvents);
router.post("/", createEvent);
router.patch("/:id", updatedEvent);

module.exports = router;
