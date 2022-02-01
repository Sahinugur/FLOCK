const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
    title: 
        {type: String, minlength: 3, maxlength: 255, required: true},
    founder: 
        { type: Schema.Types.ObjectId, ref: "User" },
    size_of_project:
        [{type: Array}, {enum: ["small", "medium", "large"]}],
    add_participants: 
        Array,
    type_of_project: 
        [{ type: String }, { enum: ["Static Web Apps", "Dynamic Web Apps", "Single Page Apps", "Multiple Page Apps", "Animated Web Apps", "Content Management System", "E-commerce Apps", "Portal Web Apps", "Progressive Web Apps" ] }],
    technologies: 
        Array,
    stage_of_project: 
        [{type: String}, {enum: ["first steps", "in construction", "done"]}],
    about_project: 
        {type: String, minlength: 3, maxlength: 255}
});

module.exports = mongoose.model("Project", projectSchema);