const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadImage, uploadVideo, uploadFile } = require("../helpers/multer");
const postSchema = require("../models/Post");

const {
  getPost,
  createPost,
  getAllPosts,

  //Sorting function added as default to getAllposts route
  getLatest,

  updatePost,
  deletePost,
} = require("../controllers/PostController");

router.get("/", getAllPosts);
router.get("/post/:pid", getPost);
router.put("/updatepost/:pid", updatePost);
router.delete("/deletepost", deletePost);
// router.get("/getLatest", getLatest);

// router.post("/createPost and upload")
router.post(
  "/createpost/:uid&&:rid",
  uploadFile.single("filePath"),
  createPost
);

module.exports = router;
