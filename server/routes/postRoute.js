const express = require("express");
const router = express.Router();

const {
  getPost,
  createPost,
  getAllPosts,
} = require("../controllers/PostController");

router.get("/", getPost);
// router.route("/").get(getPost);
router.post("/createPost", createPost);
// router.route("/createPost").post(createPost);

module.exports = router;
