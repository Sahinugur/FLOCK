const express = require("express");
const multer  = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {

//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, "./uploads/images/")
//         }

//         else if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//                 cb(null, "./uploads/videos/")
//             }

//         else (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, "./uploads/articles/")
//         }

//     },
//     filename: (req, file, cb) => {
//         const imagePath = file.originalname.split(".")[0] + "-" + Date.now() + "." + file.mimetype.split("/")[1]
//         cb(null, );
//         req.imagePath = imagePath; //to attach file's path 
//     }
// });

// const uploadFile = multer({ 
//     storage: imgStorage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//         cb(null, true);
//         } else {
//         cb(null, false);
//         return cb(new Error('Only .png, .jpg and .jpeg format allowed'));
//         }
//     }
// });

// const videoStorage = multer.diskStorage({
//     destination: "./uploads/videos/", // Destination to store video 
//     filename: (req, file, cb) => {
//         const thumbnailPath = file.originalname.split(".")[0] + "-" + Date.now() + "." + file.mimetype.split("/")[1]
//         cb(null, );
//         req.thumbnailPath = thumbnailPath;
//     }
// });

//const uploadVideo = multer({
//    storage: videoStorage,
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
//})



// module.exports = {  imgStorage, 
//                     uploadImage, 
//                     videoStorage, 
//                     uploadVideo};




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