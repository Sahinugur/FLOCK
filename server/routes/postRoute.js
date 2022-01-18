const express = require("express");
const router = express.Router();
const multer = require("multer");
<<<<<<< HEAD
const upload = require("../helpers/multer");
const videoUpload = require("../helpers/multer");
=======
const {uploadImage, uploadVideo} = require("../helpers/multer");
>>>>>>> e7d12db1dc2877358e4d8e6dc67a778f6e2bd0e7
const postSchema = require("../models/Post");

const {
  getPost,
  createPost,
  getAllPosts,
} = require("../controllers/PostController");

router.get("/", getPost);
// router.route("/").get(getPost);
router.post("/createPost", createPost);
// router.route("/createPost").post(createPost);

<<<<<<< HEAD
router.post("/single", upload.single("image"), (req, res, next) => {
=======
module.exports = router;


router.post("/single", uploadImage.single("image"), (req, res, next) => {
>>>>>>> e7d12db1dc2877358e4d8e6dc67a778f6e2bd0e7
  try {
    console.log(req.file, req.body);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/uploadVideo",
  uploadVideo.single("video"),
  (req, res, next) => {
    res.send(req.file);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// router.get('/getLatest', async (req, res) => {
//     const getImage = await postSchema.findOne().sort({ _id: -1 });
//     res.json(getImage.imageUrl);
// });

module.exports = router;
