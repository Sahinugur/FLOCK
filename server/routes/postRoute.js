const express = require("express");
const router = express.Router();
const multer = require("multer");
const {uploadImage, uploadVideo} = require("../helpers/multer");

const {
  getPost,
  createPost,
  getAllPosts,
} = require("../controllers/PostController");

router.get("/", getPost);
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

// router.get('/getLatest', async (req, res) => {
//     const getImage = await postSchema.findOne().sort({ _id: -1 });
//     res.json(getImage.imageUrl);
// });

module.exports = router;
