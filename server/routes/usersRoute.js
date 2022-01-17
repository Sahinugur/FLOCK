const express = require("express");
const router = express.Router();

const { getUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUser } = require("../controllers/UserController");


router.route('/').get(getUsers)
router.route('/test', (req, res) => {
    res.send('here is a test')
    return
})
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

module.exports = router;