const postSchema = require("../models/Post");

//           Create a post
async function createPost(req, res, next) {
  try {
    const { desc_content } = req.body;
    const newPost = new postSchema({
      desc_content,
    });

    await newPost.save();
    res.status(200).send("New post created");

    console.log(req.body);
  } catch (error) {
    next(error);
  }
}

//             Get a single post
async function getPost(req, res, next) {
  try {
    const post = await postSchema.find();
    console.log(post);
    res.status(200).send(post);
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

module.exports = { createPost, getAllPosts, getPost };
