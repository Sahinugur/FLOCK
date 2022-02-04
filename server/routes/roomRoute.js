const express = require("express");
const router = express.Router();

const {
  createRoom,
  // updateRoom,
  //   deleteRoom,
  getAllRooms,
  getRoom,

  joinRoom,
  leaveRoom,
} = require("../controllers/RoomController");

//Create roomroute, passing UID in query for validation checks  or adding user as Admin/Owner
router.put("/createRoom/:uid&&:rid", createRoom);
router.get("/getallrooms", getAllRooms);
router.get("/:rid", getRoom);

router.put("/join/:uid&&:rid", joinRoom);
router.put("/leave/:uid&&:rid", leaveRoom);
// router.delete("/deleteRoom/:rid", deleteRoom);

// router.get("/", getAllRooms);
// router.get("/:rid", getRoom);

module.exports = router;
