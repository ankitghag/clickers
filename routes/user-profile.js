const userProfileController = require("../controllers/userprofile.controller");
var express = require("express");
var router = express.Router();
/* 
router.get("/",(req,res)=>{
    //res.send("yes its working");
    res.render("yourProfile")
}); */

router.get("/",userProfileController.showProfile)
module.exports=router;