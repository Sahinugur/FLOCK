const express = require("express");
const multer  = require("multer");

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        switch (file.mimetype) {
            case "image/png" || "image/jpg" || "image/jpeg":
                cb(null, "uploads/images/")
                break;
            
            case "video/mp4" || "video/MPEG-4" || "video/mkv":
                cb(null, "uploads/videos/")
                break;

            case "article/pdf" || "article/doc" || "article/docx":
                cb(null, "uploads/articles/")
                break;

            default:
                break;
        }

    },
    filename: (req, file, cb) => {
        console.log(file);
        const filePath = file.originalname.split(".")[0] + "-" + Date.now() + "." + file.mimetype.split("/")[1]
        cb(null, filePath);
        req.filePath = filePath; //to attach file's path 
    }
});

const uploadFile = multer({ 
    storage: storage
    
});

// const uploadVideo = multer({
//     storage: videoStorage,
//     limits: {
//         fileSize: 10000000 // 10000000 Bytes = 10 MB
//     },
//     fileFilter(req, file, cb) {
//       // upload only mp4 and mkv format
//     if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
//         return cb(new Error('Please upload a video'))
//     }
//     cb(undefined, true)
// }
// })



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