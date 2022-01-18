const postSchema = require("../models/Post");

//           Create a post
async function createPost(req, res, next) {
  try {
    const { postTitle, postAuthor, postDescription, postContent } = req.body;
    // const newPost = new PostModel({
    //   postTitle,
    //   postAuthor,
    //   postDescription,
    //   postContent,
    // });
    const newPost = [
      { Title: postTitle },
      { Author: postAuthor },
      { Description: postDescription },
      { Content: postContent },
    ];
    // await newPost.save();
    res.status(200).send("New post created");

    console.log(req.body);
  } catch (error) {
    next(error);
  }
}

//             Get a single post
async function getPost(req, res, next) {
  try {
    const post = await PostModel.find();
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
}

//              Get all post
async function getAllPosts(req, res, next) {
  try {
    const posts = await PostModel.find();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
}

module.exports = { createPost, getAllPosts, getPost };
