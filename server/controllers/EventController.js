const mongoose = require("mongoose");
const Event = require("../models/Event");

//GET
async function getEvents(req, res) {
  try {
    const Events = await Event.find();
    res.status(200).json(Events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

//CREATE EVENT
async function createEvent(req, res) {
  const event = req.body;
  const newEvent = new Event(event);
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ error: error.message });
    next(error);
  }
}

//UPDATE EVENT

async function updatedEvent(req, res) {
  const { id: _id } = req.params;
  const event = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log(mongoose);
    return res.status(404).send("No post with that id");
  }
  const updatedEvent = await Event.findByIdAndUpdate(_id, event, {
    new: true,
  });

  res.json(updatedEvent);
}

module.exports = { createEvent, updatedEvent, getEvents };
