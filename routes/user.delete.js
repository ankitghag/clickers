const deleteController = require("../controllers/delete.controller");
var express = require("express");
var router = express.Router();

router.get("/",deleteController.deleteaccount)
module.exports=router;