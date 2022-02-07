import React,{useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import github from '../../img/github.png';



function Posts({post,state,likePost}) {



    const PUBLIClocation = "http://localhost:5001/uploads/";

    const [likes,setLikes]=useState(0);

    return (
        <div>
            {/* {posts.length > 0 ? (
                posts.map((post, index) => {
                    console.log(PUBLIClocation + post.filePath);
                    //start of a single post */}
                    {/* return ( */}
                        {/* <div key={index}> */}
                            <div>{/* avatar */}</div>
                            <p className="post-authorL">{post.author.userName}</p>
                            <h3 className="post-contentL">{post.content}</h3>
                            <h4 className="date-postL">{post.createdTime}</h4>
                            <img
                                className="postImgL"
                                // src="http://localhost:5002/uploads/fadi-xd-I4dR572y7l0-unsplash-1642755615657.jpeg"
                                src={post.filePath ? PUBLIClocation + post.filePath : github}
                                alt="image of the post"
                            />

                            <div className="icons">
                                <FontAwesomeIcon
                                    icon={faBookmark}
                                /*  className="iconBofetch(url).then((response)=>{if(response.status===200){response.json().then((data)=>{resolve(data);})catch((error)=>{reject(error)})okmark" */
                                />

                                <FontAwesomeIcon icon={faHeart} className="iconHeart" onClick={() => likePost(post._id, state.user.id)} />
                                {post.likes && post.likes.length > 0 ? post.likes.length : ""}
                            </div>
                            <h4 className="commentL">Write a comment ..</h4>
                            {/* <button className="buttonL">back to the top</button> */}
                        </div>
                    );
}

export default Posts;
