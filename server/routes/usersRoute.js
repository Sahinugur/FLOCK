const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { getUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUser } = require("../controllers/UserController");


router.get('/',getUsers);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.post(
    "/register",
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("firstName is Required")
      .isLength({ min: 3, max: 15 })
      .withMessage(
        "firstName should be at least 3 characters and max 15 characters"
      )
      .toLowerCase(),
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("lastName is Required")
      .isLength({ min: 3, max: 15 }),
      body("userName")
      .trim()
      .notEmpty()
      .withMessage("username is Required")
      .isLength({ min: 3, max: 15 }),
    body("email", "Email is required").isEmail(),
    body("password", "Password is required")
      .isLength({ min: 4 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
      .withMessage(
        "Password must include one lowercase character, one uppercase character, a number, and a special character."
      ),
  
      registerUser
  );

router.post('/login', body("username")
.trim()
.notEmpty()
.withMessage("username is Required")
.isLength({ min: 3, max: 15 }),loginUser);

module.exports = router;