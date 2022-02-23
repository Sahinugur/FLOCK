const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const eventSchema = new Schema({
  creator: String,
  title: String,
  description: String,
  category: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  time: String,
  date: String,
});
module.exports = mongoose.model("Event", eventSchema);
