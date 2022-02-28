import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import makeCall from "../../api/Call";
import env from "../../api/env";
import axios from "axios";
import "./post.css";
// import "../../pages/home.css";
import { useContext } from "react";
import { ChatContext } from "../../context/SharedContext";
import { CSSTransition } from "react-transition-group";

function Post() {
  const [posts, setPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const { state, dispatch } = useContext(ChatContext);
  const [comment, setComment] = useState();
  const [openComment, setOpenComment] = useState(false);
  const [buttonValue, setButtonValue] = useState(Number);
  const postRef = useRef();
  const PUBLIClocation = "http://localhost:5001/uploads/";
  let commentedPost;
  function initiateComment(postNumber) {
    setButtonValue(postNumber);
    setOpenComment(!openComment);
  }

  useEffect(() => {
    makeCall(env.POST).then((result) => {
      setPosts(result);
      console.log(result);
    });
  }, [isLiked, comment, posts]);

  const likePost = async (postId, userId) => {
    const filteredPost = await posts.find((post) => post._id === postId);
    console.log(filteredPost);

    const isUserLikedPost = await filteredPost.likes.some(
      (user) => user === userId
    );
    if (isUserLikedPost) {
      console.log("user already liked the post");

      const res = await axios
        .patch(`http://localhost:5001/posts/unlike/${postId}/${userId}`)
        .then((response) => {
          console.log(response);
          setIsLiked(!isLiked);
        })
        .catch((err) => console.log(err));
    } else {
      //make call
      const res = await axios
        .patch(`http://localhost:5001/posts/like/${postId}/${userId}`)
        .then((response) => {
          console.log(response);
          setIsLiked(!isLiked);
        })
        .catch((err) => console.log(err));
    }
  };
  const addComment = async (pid, uid) => {
    const filteredPost = await posts.find((post) => post._id === pid);
    initiateComment();

    if (filteredPost) {
      const data = await axios.post(
        `http://localhost:5001/posts/comments/${pid}/${uid}`,
        {
          comment,
        }
      );
      console.log(data);
    }
  };
  return (
    <div className="postOuterWrap">
      <div className="postsContainer">
        {posts.length > 0 ? (
          posts.map((post, index) => {
            post["isShown"] = openComment;
            post["fronEndIndex"] = index;

            //start of a single post
            return (
              <div key={post._id} className="postCard" index={index}>
                <div>{/* avatar */}</div>
                <p className="author" key={post.createdTime.toString()}>
                  {post.author.userName}
                </p>
                <h3 className="postContent">{post.content}</h3>
                {/* <h4 className="date">{post.createdTime}</h4> */}

                <div className="icons">
                  <FontAwesomeIcon icon={faBookmark} className="iconBookmark" />

                  <span className="iconHeart">
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={(e) =>
                        likePost(post._id, state.user._id)
                      }></FontAwesomeIcon>
                    {post.likes && post.likes.length > 0
                      ? post.likes.length
                      : ""}
                  </span>
                  <button
                    className="writeComment_btn"
                    value={index}
                    onClick={(e) => initiateComment(e.target)}>
                    Comment
                  </button>
                  {/* Opening comment section */}
                </div>
                <div className="comment">
                  <CSSTransition
                    in={post.isShown}
                    timeout={400}
                    classNames="addComment"
                    unmountOnExit>
                    <div>
                      <input
                        className="comment_input"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        placeholder="Write a comment ..."
                      />
                      <button
                        className="comment_btn"
                        onClick={() => addComment(post._id, state.user._id)}>
                        add
                      </button>
                    </div>
                  </CSSTransition>

                  <div>
                    {post.comments &&
                      post.comments.map((com) => (
                        <p className="singleComment">{com}</p>
                      ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          //If no posts in database>
          <>
            <h3>hello</h3>
            <p key={Date}>the owner of the post </p>
            <img
              className="postImg"
              src="https://www.rismedia.com/wp-content/uploads/2019/05/social_media_post_936185802.jpg"
            />
            <div className="icons">
              <FontAwesomeIcon icon={faBookmark} className="iconBookmark" />

              <FontAwesomeIcon icon={faHeart} className="iconHeart" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Post;
