import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import makeCall from "../api/Call";
import env from "../api/env";
//import {ChatContext} from "../context/SharedContext"
function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    makeCall(env.POST).then((result) => {
      setPosts(result);
    });
  }, []);

  /*  const getServerData = (e) => {
    e.preventDefault();
 
  



};
 */

  return (
    <div>
      {console.log("posts", posts)}
      <button>Call server</button>
      <div className="postsL">
        {posts ? (
          posts.map((post, index) => {
            return (
              <div key={index}>
                <div>{/* avatar */}</div>sk
                <p class="post-authorL">{post.author}</p>
                <h3 className="post-contentL">{post.content}</h3>
                <h4 className="date-postL">date post</h4>
                <img 
                  className="postImgL"
                  src="https://www.rismedia.com/wp-content/uploads/2019/05/social_media_post_936185802.jpg"
                />
                <div className="icons">
                  <FontAwesomeIcon
                    icon={faBookmark}
                   /*  className="iconBofetch(url).then((response)=>{if(response.status===200){response.json().then((data)=>{resolve(data);})catch((error)=>{reject(error)})okmark" */
                  />
                  <FontAwesomeIcon icon={faHeart} className="iconHeart" />
                </div>
                <h4 className="commentL">Write a comment ..</h4>
                {/* <button className="buttonL">back to the top</button> */}
              </div>
            );
          })
        ) : (
          <>
            <h3>hello</h3>
            <p>the owner of the post </p>
            <img
              className="postImgL"
              src="https://www.rismedia.com/wp-content/uploads/2019/05/social_media_post_936185802.jpg"
            />
            <div className="icons">
              <FontAwesomeIcon
                icon={faBookmark}
                className="iconBookmark"
              />
              {/* iconBofetch(url).then((response)=>{if(response.status===200){response.json().then((data)=>{resolve(data);})catch((error)=>{reject(error)})okmark */}
              <FontAwesomeIcon icon={faHeart} className="iconHeart" />
            </div>
            <h4 className="commentL">Write a comment ..</h4>
            {" "}
          </>
        )}
      </div>
    </div>
  );
}

export default Post;
