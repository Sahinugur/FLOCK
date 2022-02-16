const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: { type: String, minlength: 3, maxlength: 255, required: true },
  founder: { type: Schema.Types.ObjectId, ref: "User" },
  size_of_project: [{ type: String }, { enum: ["small", "medium", "large"] }],
  participants: String,
  add_link: { type: String },
  type_of_project: [
    { type: String },
    {
      enum: [
        "Static Web Apps",
        "Dynamic Web Apps",
        "Single Page Apps",
        "Multiple Page Apps",
        "Animated Web Apps",
        "Content Management System",
        "E-commerce Apps",
        "Portal Web Apps",
        "Progressive Web Apps",
      ],
    },
  ],
  technologies: String,
  stage_of_project: [
    { type: String },
    { enum: ["first steps", "in construction", "done"] },
  ],

  few_words: { type: String, minlength: 3, maxlength: 255 },
});

module.exports = mongoose.model("Project", projectSchema);
