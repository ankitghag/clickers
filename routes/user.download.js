const downloadController=require("../controllers/download.controller.js");
var express = require("express");
var router = express.Router();
router.post("/",downloadController.totaldownload)
module.exports=router;