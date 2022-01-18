const mongoose = require('mongoose');
const {Schema}=mongoose;
const { encrypt } = require('../lib/encryption');

const userSchema = new Schema({
    id: {
        type: String,
        default: null,
      },
      userName: {
        type: String,
        required: [true, "email required"],
        unique: [true, "email already registered"],
      },
      email: {
        type: String,
        //unique: [true, "email already registered"],
      },
      // firstName: String,
      // lastName: String,
      // profilePhoto: String,
      // password: String,
      // source: { type: String, required: [true, "source not specified"] },
      // lastVisited: { type: Date, default: new Date() }
})

userSchema.pre('save', async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await encrypt(this.password)
    next()
})

module.exports = mongoose.model('User', userSchema);

