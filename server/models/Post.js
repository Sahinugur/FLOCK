const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, minlength: 3, maxlength: 255 },
  content: { type: String, minlength: 3, maxlength: 255 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdTime: { type: Date, default: Date.now },
  deletedTime: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  
  filePath: { type: String },
  // contentType: [{ type: String }, { enum: ["image", "video", "file", "none"] }],
  link: { type: String, minlength: 3, maxlength: 255 },
});

module.exports = mongoose.model("Posts", postSchema);
