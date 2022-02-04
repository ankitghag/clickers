const collectController=require("../controllers/collect.controller");
var express = require("express");
var router = express.Router();

    router.get("/",collectController.getCollection)
     router.post("/",collectController.postCollection) 
     router.get("/usercollection",collectController.getuserCollection)
    router.get("/:Cname",collectController.specificCollection)
   

module.exports=router