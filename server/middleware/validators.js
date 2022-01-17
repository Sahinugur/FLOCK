const { body } = require("express-validator");
const User = require("../models/User");

const userValidators = [
  // body("fullname")
  //     .notEmpty()
  //     .withMessage("Fullname is a required field.")
  //     .isAlpha("en-US", { ignore: [" ", ","] })
  //     .withMessage("Please enter only Alphabets for Fullname."),

  body("username")
    .notEmpty()
    .withMessage("Username is a required field.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username should be between 3-50 chars")
    .custom(async val => {
        console.log(val);
        return User.findOne({username: val})
        .then((user) => {
            return Promise.reject('This Username already exists')
        })
}),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 3 }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    // .custom((value) => {
    //   return User.find({ email: value }).then((user) => {
    //     if (user.length) {
    //       return Promise.reject("E-mail already in use");
    //     }
    //   });
    // }),
];

module.exports = { userValidators };
