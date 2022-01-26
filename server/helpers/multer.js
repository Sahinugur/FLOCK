const express = require("express");
const multer  = require("multer");

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        cb(null, "uploads/")
        // switch (file.mimetype) {
        //     case "image/png" || "image/jpg" || "image/jpeg":
        //         cb(null, "uploads/images/")
        //         break;
            
        //     case "video/mp4" || "video/MPEG-4" || "video/mkv":
        //         cb(null, "uploads/videos/")
        //         break;

        //     case ".pdf" || ".doc" || ".docx":
        //         cb(null, "uploads/files/")
        //         break;

        //     default:
        //         break;
        // }

    },
    filename: (req, file, cb) => {
        // console.log(file);
        const filePath = file.originalname.split(".")[0] + "-" + Date.now() + "." + file.mimetype.split("/")[1]
        cb(null, filePath);
        req.filePath = filePath; //to attach file's path 
    }
});

const uploadFile = multer({ 
    storage: storage,
    limits: {
            fileSize: 10000000 // 10000000 Bytes = 10 MB
        },
});

module.exports = {  storage, uploadFile};




/** FRONT-END 
 * const [image, setImage] = useState({preview: , raw: })
 * Fahim's case
 * (image.preview)
 * const fileHandler = (e) =>{
 * if(e.target.files.length) {
 * setImage({
    * preview: URL.createObjectURK(e.target.files[0]),
    * raw: e.target.files[0]
    * })
 * }
 * }
 * const onSubmitHandler = (e) => {
 * e.preventDefault();
 * 
 * Handle file data from the state before sending 
 * 
 * const data = new FormData();
 * 
 * data.append('image', fileData)
 * (fd.append("email", user.email);)
 * 
 * fetch("http://localhost:5001/posts/single", {
 * method: "POST",
 * body: data, 
 * })
 * .then((result) => {
 * console.log('File sent successful)
 * })
 * .catch((error) => {
 * console.log(err.message);
 * });
 * };
*/