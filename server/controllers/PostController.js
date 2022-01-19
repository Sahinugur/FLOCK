const postSchema = require("../models/Post");
const userSchema = require("../models/User");
//           Create a post

async function createPost(req, res, next) {
  try {
    //find the user who wants to add a post
    const user = await userSchema.findById(req.params.uid);

    if (user) {
      //add the new post to collection Post
      const result = await postSchema.create({
        title: req.body.title,
        content: req.body.content,
        author: user._id,
        filePath: req.filePath,
      });
      //send result to the front end
      res.status(200).send(result);
    } else {
      //if the id in req.params.uid doesn't exist
      res.status(400).send({ error: "This user doesn't exist." });
    }
  } catch (err) {
    next(err);
  }
}

//             Get a single post
async function getPost(req, res, next) {
  try {
    if (req.body.id) {
      const post = await postSchema.findById(req.body.id);
      res.status(200).send(post);
    } else if (!req.body.id) {
      res.status(200).send("Please include `id` in the body of the request");
    }
  } catch (error) {
    next(error);
  }
}

//              Get all post
async function getAllPosts(req, res, next) {
  try {
    const posts = await postSchema.find();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
}

async function getLatest(req, res, next) {
  try {
    const latestPost = await postSchema.find().sort({ _id: -1 });
    res.status(200).send(latestPost);
  } catch (error) {
    next(error);
  }
}

module.exports = { createPost, getAllPosts, getPost, getLatest };
