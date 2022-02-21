import React, { useState } from "react";
import "./newPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

// function FileUploader() {
//   const fileInput = React.useRef(null);

//   const handleFileInput = (e) => {
//     const file = e.target.files[0];
//     if (file.size > 1024) console.log("file is too big");
//     else console.log(file);
//     console.log(e.target.files[0]);
//   };

//   return (
//     <div className="file-uploader">
//       <input type="file" onChange={handleFileInput}></input>
//       <button
//         onClick={(e) => {
//           fileInput.current && fileInput.current.click();
//         }}
//       />
//     </div>
//   );
// }

function StyledUploadBTN(props) {
  const hiddenFileInput = React.useRef();

  function handleClick(e) {
    hiddenFileInput.current.click();
  }

  function handleChange(event) {
    const [fileUploaded] = event.target.files;
    console.log(fileUploaded);
    props.handleState(fileUploaded);

    // props.handleFile(fileUploaded);
  }
  return (
    <>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        // style={{ display: "none" }}
      ></input>
      <button onClick={handleClick} className="uploadBTN">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </>
  );
}

//Structure for new post
//Input required from User: Title, Content, UploadFile
export default function CreateNewPost() {
  const [text, setText] = useState("");
  const [newPostData, setNewPostData] = useState("");
  const [selectedFile, setSelectedFile] = useState({});

  const [postText, setPostText] = useState();
  // console.log("state:", selectedFile);
  function handleState(entry) {
    setSelectedFile(entry);
    console.log("state:", selectedFile, "entry:", entry);
  }
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
            value={text}
            placeholder="Post something :)"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </label>

        {/* <label>
          Please upload image
          <input type="file" placeholder="Upload File" />
        </label>
        <input
          type="file"
          value={selectedFile}
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
        /> */}

        <div className="btnContainer">
          <StyledUploadBTN handleState={handleState} />

          {/* <button onClick={handleSubmit} className="publishPostBTN">
            Publish post 
          </button>
            */}
        </div>
      </form>
    </>
  );
}
