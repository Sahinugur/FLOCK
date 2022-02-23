import React, { useState, useContext, useEffect } from "react";
import "./newPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import makeCall from "../../api/Call";
import env from "../../api/env";
import { ChatContext } from "../../context/SharedContext";
import { CSSTransition } from "react-transition-group";

function StyledUploadBTN(props) {
  const hiddenFileInput = React.useRef();

  function handleChange(event) {
    const [fileUploaded] = event.target.files;
    console.log(fileUploaded);
    props.handleState(fileUploaded);
  }
  return (
    <div id="createNewPostFile">
      <label htmlFor="fileInput">
        <input
          id="fileInput"
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}></input>
        <FontAwesomeIcon icon={faUpload} className="uploadBTN" />
      </label>
      <div>
        {props.selectedFile && props.selectedFile.name ? (
          <p>{props.selectedFile.name}</p>
        ) : (
          <p>Upload</p>
        )}
      </div>
    </div>
  );
}

//Structure for new post
//Input required from User: Content, UploadFile
export default function CreateNewPost() {
  const { state } = useContext(ChatContext);
  const [newPostData, setNewPostData] = useState({
    content: "",
    fileDescription: "",
  });
  const [selectedFile, setSelectedFile] = useState({});
  const [postText, setPostText] = useState("");
  const [showButton, setShowButton] = useState(true);
  const [isCollapsed, setCollapse] = useState(false);

  useEffect(() => {});

  function handleState(entry) {
    setSelectedFile(entry);
    console.log("state:", selectedFile, "entry:", entry);
  }
  function handleChange(e) {
    setPostText(e.target.value);
    setNewPostData({
      ...newPostData,
      content: `${postText}`,
      fileDescription: selectedFile,
    });
    console.log(postText);
  }

  async function PublishPost(newPost, userID) {
    console.log("triggered");
    const response = await fetch(
      `http://localhost:5001/posts/createpost/${userID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      }
    ).catch((err) => console.log("error:", err));
  }
  function handleSubmit(e) {
    e.preventDefault(e);
    setCollapse(false);

    console.log(newPostData);
    PublishPost(newPostData, state.user._id);
  }
  function cancelPost(e) {
    e.preventDefault(e);
    setCollapse(false);
  }
  function collapse() {
    setCollapse(!isCollapsed);
    console.log(isCollapsed);
  }

  return (
    <div className="mainNewPostContainer">
      {showButton && <button onClick={collapse}>New Post</button>}
      <CSSTransition
        in={isCollapsed}
        timeout={400}
        classNames="NewPost"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExit={() => setShowButton(true)}>
        <div
        // className={`collapse-content-${
        //   isCollapsed ? "collapsed" : "expanded"
        // }`}
        >
          <form className="newPost">
            <label className="postTextContainer">
              <input
                className="postTextField"
                type="text"
                name="postContent"
                value={postText}
                placeholder="Post something :)"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </label>

            <div className="btnContainer">
              <StyledUploadBTN
                handleState={handleState}
                selectedFile={selectedFile}
              />
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="publishPostBTN">
                  Publish post
                </button>
                <button
                  className="cancelBTN publishPostBTN"
                  onClick={cancelPost}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </CSSTransition>
    </div>
  );
}
