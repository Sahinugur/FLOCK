const mongoose = require('mongoose');
const {Schema}=mongoose;

const postSchema = new Schema({
    // title: {type: String, required: true},
    video: {type: String}
});

module.exports = mongoose.model('Posts', postSchema);