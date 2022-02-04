const userHomeController=require("../controllers/home.controller.js");
var express = require("express");
var router = express.Router();

router.get("/",userHomeController.getImages)
router.post("/loadmoreImage",userHomeController.getMoreImages)
module.exports=router;