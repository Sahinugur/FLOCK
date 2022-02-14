import React, { useState } from "react";
import "./newPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function StyledUploadBTN(props) {
  const hiddenFileInput = React.useRef(null);
  function handleClick(e) {
    hiddenFileInput.current.click();
  }
  function handleChange(event) {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    // props.handleFile(fileUploaded);
  }
  return (
    <>
      <button
        onClick={handleClick}
        onChange={handleChange}
        className="uploadBTN">
        <FontAwesomeIcon icon={faUpload} />
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}></input>
    </>
  );
}

//Structure for new post
//Input required from User: Title, Content, UploadFile
export default function CreateNewPost() {
  const [newPostData, setNewPostData] = useState([{}]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [postText, setPostText] = useState();
  function handleChange(e) {
    console.log();
    setNewPostData(e.target.value);
  }
  function handleSubmit(e) {
    console.log(e.target.value);
  }

  return (
    <>
      <form className="newPost">
        <label className="postTextContainer">
          <input
            className="postTextField"
            type="text"
            name="postContent"
            placeholder="Post something :)"
            onChange={handleChange}
          />
        </label>

        {/* <label>
          Please upload image
          <input type="file" placeholder="Upload File" />
        </label> */}
        <div className="btnContainer">
          <StyledUploadBTN />
          <button onClick={handleSubmit} className="publishPostBTN">
            Publish post
          </button>
        </div>
      </form>
    </>
  );
}
