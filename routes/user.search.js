const searchController=require("../controllers/search.controller");
var express = require("express");
var router = express.Router();
router.get("/", searchController.getSearchImage)
    

module.exports=router
