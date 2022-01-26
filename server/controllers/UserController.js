const UserSchema = require("../models/User");
const { validationResult } = require("express-validator");
const { compare } = require('../lib/encryption');
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const emailSender = require("../models/emailSender")

const {connect} = require('../helpers/connection')
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
    await connect();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ errors: errors.array().map((err) =>err.msg) });
    }
    const { firstName, lastName, userName, password, email,

        source } = req.body;
    try {
        let registeredUser = await UserSchema.findOne({ email: email });
        if (registeredUser) {
            res.status(400).json({ msg: "user already registered" });
        }


        //create new user
        const newUser = new UserSchema({
            id: uuid.v4(),
            userName,
            password,
            email,
            firstName,
            lastName,
            source,
            verified:false,
            isAdmin:false
        });

        newUser.verified = false;
        newUser.isAdmin = false;
        //save user
        await newUser.save();
        //send email validation before saving in database
        let confirmation = emailSender.confirmEmail(email, userName, newUser._id)
        if (confirmation) {
            console.log('confirmed');
        }
        //sign JWT and res token to the FE
        const payload = {
            newUser: {
                id: newUser.id,
                userName: newUser.userName

            }
        };
        jwt.sign(payload, 'randomString', { expiresIn: '1h' }, (err, token) => {

            if (err) {
                res.status(500).json({ status: false})
            }else
            res.status(200).json({ token ,newUser,status: true})
        })

        // res.status(200).send(newUser);
    } catch (error) {
        next(error);
    }
};


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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ msg: errors.array().map((err) =>{
                console.log(`err`, err.msg);
                return err.msg}) });
    }
    try {
    console.log(`req.body`, req.body);
    let username = req.body.username;
    //find a user with the given username{userName:username}
    const user = await UserSchema.findOne({ userName: username })
    console.log('user', user);


   
        //if there is no user in db with the given username

        if (!user) {
            return res.status(404)
                .json({ msg: 'This user not found.' });
        }
        //if plaintext password matched with hashed password

        else if (await compare(req.body.password, user.password)) {
            res.status(200)
                .json({ msg: 'You logged in successfully.', status: true, user: user })
        } else {
            res.send({ msg: 'Username or password is wrong. Please try again.', status: false })
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}

/************ USER GOOGLE STRATEGY */

module.exports = { getUsers, getUser, registerUser, updateUser, deleteUser, loginUser };