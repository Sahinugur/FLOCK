const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEvent,
  createEvent,
  updatedEvent,
  deleteEvent,
  getFilteredEvents,
} = require("../controllers/EventController");

router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/", createEvent);
router.patch("/:id", updatedEvent);
router.delete("/:id", deleteEvent);
router.get("/cat/:id", getFilteredEvents);

module.exports = router;
