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
        filePath: req.filePath
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

// async function createPost(req, res, next) {
//   try {
//     const user = await userSchema.findById(req.params.uid);
//     // const { content, author } = req.body;
//     console.log(req.body);
//     const newPost = new postSchema({
//       content: req.body.content,
//       author: user._id,
//       // createdTime,
//       // deletedTime,
//       // likes,
//       // thumbnailPath,
//       // contentType,
//       // link
//     });
//     await newPost.save();
//     res.status(200).send("New post created");

//     console.log(req.body);
//   } catch (error) {
//     next(error);
//   }
// }

//             Get a single post
async function getPost(req, res, next) {
  try {
    const post = await postSchema.find();
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

async function getLatest(req, res, next) {
  try {
    const latestPost = await postSchema.find().sort({_id: -1 });
    res.status(200).send(latestPost);
  } catch (error) {
    next(error);
  }
}

module.exports = { createPost, getAllPosts, getPost, getLatest };
