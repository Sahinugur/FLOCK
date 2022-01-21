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
        required: [true, "username required"],
        unique: [true, "username already registered"],
      },
      email: {
        type: String,
        //unique: [true, "email already registered"],
      },
      firstName: String,
      lastName: String,
      profilePhoto: String,
      password: String,
      source: { type: String, default:'local' },
      lastVisited: { type: Date, default: new Date() },
       verified: {
        type: Boolean,
        required: true,
      }, 
})

userSchema.pre('save', async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await encrypt(this.password)
    next()
})

module.exports = mongoose.model('User', userSchema);

