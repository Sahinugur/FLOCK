import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHeart} from '@fortawesome/free-solid-svg-icons'
import makeCall from '../api/Call'
import env from '../api/env'

function Post() {
    const [posts, setPosts] = useState([])

    const getServerData = (e) => {
    e.preventDefault();
  makeCall(env.POST).then((result) => {
    setPosts(result);
  });
};
/* console.log("the content of ", posts, "<<<<<<<ends here"); */
//useEffect(() => {
    //fetch("url from the backend to receive all the posts")
    // const posts =fetch("url from BE")
  
//}, [])
// next step with map 
/* {posts.map((post,index)=>{
    <div>
    <p>{post.title}</p>
    <img src={post.url}/>
    </div>
})} */


return (
    <div>
            {console.log("posts", posts)}
            <button onClick={getServerData}>Call server</button>
            <div className="postsL">
         <h3>{posts[3].content}</h3> 
         <p>the owner of the post </p>
         <img className='postImgL' src ="https://www.rismedia.com/wp-content/uploads/2019/05/social_media_post_936185802.jpg"/>
         <div className="icons">
         <FontAwesomeIcon icon={faBookmark} className='iconBofetch(url).then((response)=>{if(response.status===200){response.json().then((data)=>{resolve(data);})catch((error)=>{reject(error)})okmark'/>
         <FontAwesomeIcon icon={faHeart} className='iconHeart'/>
         </div>
         <h4 className='commentL'>Write a comment ..</h4>
        <button className='buttonL'>back to the top</button>
</div>

        </div>
    )
}

export default Post


