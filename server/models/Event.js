const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const eventSchema = new Schema({
  creator: String,
  title: String,
  description: String,
  category: String,
});
module.exports = mongoose.model("Event", eventSchema);
