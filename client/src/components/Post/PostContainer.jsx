import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import makeCall from "../../api/Call";
import env from "../../api/env";
import axios from "axios"
import "./post.css";
import "../../pages/home.css";
import {useContext} from 'react';
import {ChatContext} from "../../context/SharedContext";
import Post from './Post';

function PostContainer() {
  const [posts, setPosts] = useState([]);
  const [likes,setLikes]=useState(0);
  const { state, dispatch } = useContext(ChatContext);
  // console.log(state.user.id)
  const PUBLIClocation = "http://localhost:5001/uploads/";
  useEffect(() => {
    makeCall(env.POST).then((result) => {
      setPosts(result);
      console.log(result);
    });
  }, []);

  /*  const getServerData = (e) => {
    e.preventDefault();
};
 */

// LikeHeart-Function

const likePost=async(postId, userId)=>{
  //How to understand who (userid) logged in? 
  const res = await axios.patch(`http://localhost:5001/posts/like/${postId}/${userId}`);
  console.log(res.data)
  // posts.filter((post)=>{
  //  //return post._id===id?setLikes(likes+1):"not match"
  //  if(post._id==id){
  //     const data =  axios.post(`http://localhost:5001/posts/${id}`)
  //     console.log(data);
  //  }
  //})
}

  return (
    <div className="postWrap">
      {console.log("posts", posts)}
      <div className="postsL">
        {posts.length > 0 && posts.map(post=>{
          return (
            <Post post={post} state={state}  likePost={likePost}/>
          )
        })}
    
      </div>
      {/* {posts} */}
    </div>
  );
}

export default PostContainer;
