const UserSchema = require("../models/User");
const { validationResult } = require("express-validator");
const { compare } = require('../lib/encryption');

/************ LIST OF USERS */
async function getUsers(req, res, next) {
    try {
        const users = await UserSchema.find();
        res.status(200).send(users);

    } catch (error) {
        next(error);
    }
}

/************ GET USER */
async function getUser(req, res, next) {
    try {
        const user = await UserSchema.findById(req.params.id);
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}


/************ REGISTER USER */
async function registerUser(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }
        const {userName, password, email,firstName,
            lastName,
            source} = req.body;
        const newUser = new UserSchema({
            userName,
            password,
            email,
            firstName,
            lastName,
            source
        });
        await newUser.save();
        console.log(userName)
        res.status(201).send('test')
        
    } catch (error) {
        next(error);
        }
}

/************ UPDATE USER */
async function updateUser(req, res, next) {
    const userId = req.params.uid;

    try {
        const result = await UserSchema.findByIdAndUpdate(userId, req.body);
        res.status(200).send(result);
    
    } catch (error) {
        next(error)
    }
}

/************ DELETE USER */
async function deleteUser(req, res, next) {
    const userId = req.params.uid;

    try {
        const result = await UserSchema.findByIdAndDelete(userId);
        res.status(200).send(result);

    } catch (error) {
        next(error);
    }
}

/************ LOGIN USER */
async function loginUser(req, res, next) {
    console.log(`req.body`, req.body);
    //find a user with the given username
    const user = await UserSchema.findOne().where('userName').equals(req.body.username);
    //if there is no user in db with the given username
    if (user == null) {
        return res.status(404)
            .send({ msg: 'This user not found.' });
    }

    try {
        //if plaintext password matched with hashed password
        if (await compare(req.body.password, user.password)) {
            res.status(200)
                .send({ msg: 'You logged in successfully.', status: true,user:user })
        } else {
            res.status(404)
                .send({ msg: 'Username or password is wrong. Please try again.', status: false })
        }
    } catch (error) {
        res.status(500)
            .send(error)
    }
}

/************ USER GOOGLE STRATEGY */

module.exports = { getUsers, getUser, registerUser, updateUser, deleteUser, loginUser };