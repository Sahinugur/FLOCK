const postSchema = require("../models/Post");
const userSchema = require("../models/User");
const roomSchema = require("../models/Room");
//           Create a post

async function createPost(req, res, next) {
  try {
    //find the user who wants to add a post
    const user = await userSchema.findById(req.params.uid);
    room = await roomSchema.findById(req.params.rid);
    console.log(user, room);
    if (user) {
      //add the new post to collection Post
      const newPost = await postSchema.create({
        title: req.body.title,
        roomID: req.params.rid,
        content: req.body.content,
        authorID: req.params.uid,
        filePath: req.filePath,
        likes: [],
        link: req.body.link,
      });

      if (newPost && roomID) {
        attachPostToRoom = await roomSchema.findById(roomID);
        console.log("room:", attachPostToRoom);
      }
      // .populate("author", "userName");
      //send result to the front end
      res.status(200).send(newPost);
    } else {
      //if the id in req.params.uid doesn't exist
      res.status(400).send({ error: "Please login in order to create a post" });
    }
  } catch (err) {
    next(err);
  }
}

//             Get a single post

async function getPost(req, res, next) {
  try {
    const post = await postSchema
      .findById(req.params.pid)
      .populate("author", "userName");
    console.log(post);
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
}
// ------ Get all posts
async function getAllPosts(req, res, next) {
  try {
    const posts = await postSchema.find().populate("author", "userName");
    res.status(200).send(posts);
    
  } catch (error) {
    next(error);
  }
}
//              Get all post sorted
async function getAllPosts(req, res, next) {
  try {
    const latestPost = await postSchema
      .find()
      .sort({ createdTime: -1 })
      .populate("author", "userName");
      
    res.status(200).send(latestPost);
  } catch (error) {
    next(error);
  }
}

//      Updating a post function
async function updatePost(req, res, next) {
  try {
    const id = req.params.pid;
    let updatedVersion = await postSchema
      .findByIdAndUpdate(id, req.body, { new: true })
      .populate("author", "userName");
    //not needed block >>
    // updatedVersion = await postSchema.findById(id);<<
    res.status(200).send(updatedVersion);
  } catch (error) {
    next(error);
  }
}

//added by hiba
async function likePost (req,res,next){
  try {
    //extract postid and userid
    let postID = req.params.pid;
    let userID = req.params.uid
    //findByIdAndUpdate 
    const addLike = await postSchema.findByIdAndUpdate(postID,{$push:{likes:userID}},{new:true})
    const post = await postSchema.findById(postID)
    res.send(post)
    console.log("postID", postID,"userID",userID)
  } catch (error) {
    next(error)
  }
}

//like a post (which post?, who liked the post?)

async function deletePost(req, res, next) {
  try {
    // let ownershipCheck = await postSchema.findById(req.param.pid);

    const id = req.body.id;
    const deletedPost = await postSchema.findByIdAndDelete(id);
    res.status(200).send("post is deleted");
    console.log(deletedPost);
  } catch (error) {
    next(error);
  }
}

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost ,likePost};
