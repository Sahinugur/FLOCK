const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  title: {
    type: String,
    minLength: [5, "name is too short"],
    maxLength: 255,
    unique: true,
  },
  content: [{ type: Schema.Types.ObjectId, ref: "Posts" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  joinedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  //Events naming in question
  //   events: [{ type: Schema.Types.ObjectId, ref: Events }],
});

module.exports = mongoose.model("Room", roomSchema);
