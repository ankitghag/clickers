const photoController=require("../controllers/photo.controller");
var express = require("express");
var router = express.Router();

/* router.get("/:folder/:categories/:src",(req,res)=>{
    console.log(req.params)
    res.render("photo",{imgfolder:req.params.folder,imgcategories:req.params.categories,imgsrc:req.params.src});
}) */

router.get("/:folder/:categories/:src",photoController.photoAndDetails)
router.post("/follow",photoController.cfollowing)

module.exports=router;