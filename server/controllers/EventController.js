const mongoose = require("mongoose");
const EventCreator = require("../models/Event");

//CREATE EVENT
async function createEvent(req, res) {
  const event = req.body;
  const newEvent = new EventCreator(event);
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ error: error.message });
    next(error);
  }
}

//UPDATE EVENT

async function updateEvent(req, res) {
  const { id: _id } = req.params;
  const event = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log(mongoose);
    return res.status(404).send("No post with that id");
  }
  const updatedEvent = await EventCreator.findByIdAndUpdate(_id, event, {
    new: true,
  });

  res.json(updatedEvent);
}

module.exports = { createEvent, updateEvent };
