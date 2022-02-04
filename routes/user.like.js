const likeController=require("../controllers/like.controller.js");
var express = require("express");
var router = express.Router();

    router.post("/",likeController.likeDetails)



module.exports=router;