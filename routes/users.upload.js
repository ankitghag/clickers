const uploadController = require("../controllers/upload.controller");
const path = require("path");
var express = require("express");
var multer = require("multer");
var router = express.Router();

/*router.get("/",(req,res,next)=>{
    if(req.session.userRole==="downloader"){
        res.redirect("/contributor/Cregister");
    }
    else{
        res.render("upload");
    }
})*/

const storage = multer.diskStorage({
    destination: './allUploadedPhoto',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadphoto = multer({
    storage: storage
}).single('myfile');

const chkAuthority=async(req,res,next)=>{
    var a= await req.session.userRole;
     if(a=="contributor"){
       
        next();
      }
      else{
    
        res.redirect("/home");
      }
    }

router.get("/", uploadController.upload);
router.get("/upload",chkAuthority,(req, res) => {
    
    res.render("upload");
})

/*router.post("/upload", (req, res) => {
    uploadphoto(req, res, (err) => {
        if (err) {
            res.render("upload")
        }
        else {
            var w=JSON.parse(req.body.tags);
            uploadController.uploadimg(w,res);

            console.log(req);
            res.send("photo uloaded")
        }
    })

    console.log(req);
    res.send("photo uloaded");
})*/


router.post("/upload",uploadController.uploadimg);


router.post("/syncupload", uploadController.syncupload);



module.exports = router;

