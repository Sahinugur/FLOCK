const roomSchema = require("../models/Room");
const postSchema = require("../models/Post");
const userSchema = require("../models/User");
const { options } = require("../routes/roomRoute");

//Creating a Room - Admin rule is required in future?
async function createRoom(req, res, next) {
  try {
    const newRoom = await roomSchema.create({
      title: req.body.title,
      content: [],
      creator: req.params.uid,
      admin: [req.params.uid],
      joinedUsers: [],
    });
    res.status(200).send(newRoom);
  } catch (err) {
    next(err);
  }
}
async function getAllRooms(req, res, next) {
  try {
    const allRooms = await roomSchema
      .find()
      .populate("joinedUsers", "userName");
    res.status(200).send(allRooms);
  } catch (err) {
    next(err);
  }
}
async function getRoom(req, res, next) {
  try {
    roomId = req.params.rid;
    const room = await roomSchema.findById(roomId);
    console.log(room);
    res.status(200).send(room);
  } catch (err) {
    next(err);
  }
}

//Work in progress
//What could be updated ?
async function updateRoom() {}
// const updatedRoomTojoin = await roomSchema
//   .findById(roomRequest)
//   .populate("joinedUsers", "firstName");

// Function to join a room
// Check for duplicates ? is it needed on backend or frontend ?
async function joinRoom(req, res, next) {
  try {
    user = req.params.uid;
    roomRequest = req.params.rid;
    const roomToJoin = await roomSchema.findByIdAndUpdate(
      roomRequest,
      {
        $push: { joinedUsers: user },
      },
      { new: true }
    );
    console.log("roomToJoin:", roomToJoin, "user:", user);
    res.status(200).send("User successfully joined");
  } catch (err) {
    next(err);
  }
}

//Function to leave a room
async function leaveRoom(req, res, next) {
  try {
    user = req.params.uid;
    roomRequest = req.params.rid;
    const roomToleave = await roomSchema.findByIdAndUpdate(
      roomRequest,
      {
        $pull: { joinedUsers: user },
      },
      { new: true }
    );
    res.status(200).send("User successfully removed");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createRoom,
  updateRoom,
  getAllRooms,
  getRoom,
  joinRoom,
  leaveRoom,
};
