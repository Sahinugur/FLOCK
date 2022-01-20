const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadImage, uploadVideo, uploadFile } = require("../helpers/multer");
const postSchema = require("../models/Post");

const {
  getPost,
  createPost,
  getAllPosts,
  getLatest,
} = require("../controllers/PostController");

// router.route("/").get(getPost);
router.post("/createPost/:uid", createPost);
// router.route("/createPost").post(createPost);

module.exports = router;


// router.post("/uploadImage/:uid", uploadImage.single("imagePath"), createPost);


// router.post("/uploadVideo", uploadVideo.single("thumbnailPath"), (req, res, next) => {
//     res.send(req.file);
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );
router.get("/", getAllPosts);
router.get("/post", getPost);
router.get("/getLatest", getLatest);

// router.post("/createPost and upload")
router.post("/createPost/:uid", uploadFile.single("filePath"), createPost);

module.exports = router;
